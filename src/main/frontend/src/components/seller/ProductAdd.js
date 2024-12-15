import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../../css/seller/ProductAdd.css";
import "../../css/common/CommonStyles.css";
import "../../css/variables.css";

function ProductAdd() {
  const [userId, setUserId] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false); // 권한 상태 추가
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  // userId 가져오기
  const getUserId = async () => {
    const rememberId = localStorage.getItem("remember");

    // RememberMe 상태면
    if (rememberId) {
      console.log("RememberMe ID :", rememberId);
      return rememberId;
    }
    // 일반 Session 확인
    try {
      const response = await axios.get("http://localhost:8090/user/auth/session", {
        withCredentials: true,
      });
      console.log("Session ID :", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed Session ID:", error.message);
      return null;
    }
  };

  // 권한 확인
  const role = async (userId) => {
    try {
      const response = await axios.post(
        "http://localhost:8090/user/auth/role",
        { userId },
        { withCredentials: true }
      );
      console.log("권한 :", response.data);
      return true;          // ROLE_SELLER or ROLE_ADMIN
    } catch (error) {
      console.error("권한이 부족합니다.", error.message);
      return false;
    }
  };

  // 컴포넌트 마운트 시 userId와 권한 가져오기
  useEffect(() => {
    (async () => {
      const userId = await getUserId();
      setUserId(userId);

      if (userId) {
        const authorized = await role(userId);
        setIsAuthorized(authorized);
      }
      setLoading(false);
    })();
  }, []);

  const [productData, setProductData] = useState({
    productname: "",
    price: "",
    discount: "",
    type: "냉장",
    unit: "",
    description: "",
    subtitle: "",
    image: null,
    imagePreview: null,
  });
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    previewImages.forEach((url) => URL.revokeObjectURL(url));

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...previewImages];

    URL.revokeObjectURL(newPreviews[index]);

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setImages(newImages);
    setPreviewImages(newPreviews);

    if (newImages.length === 0) {
      fileInputRef.current.value = "";
    }

    const dataTransfer = new DataTransfer();
    newImages.forEach((file) => {
      dataTransfer.items.add(file);
    });

    fileInputRef.current.files = dataTransfer.files;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 입력값 검증
    if (!productData.productname.trim()) {
      alert("상품명을 입력해주세요.");
      return;
    }
    if (!productData.price) {
      alert("상품 가격을 입력해주세요.");
      return;
    }
    if (!productData.type) {
      alert("상품 타입을 선택해주세요.");
      return;
    }
    if (!productData.unit.trim()) {
      alert("상품 무게를 입력해주세요.");
      return;
    }
    if (!productData.subtitle.trim()) {
      alert("상품 부제목을 입력해주세요.");
      return;
    }
    if (!productData.description.trim()) {
      alert("상품 설명을 입력해주세요.");
      return;
    }
    if (images.length === 0) {
      alert("상품 이미지를 등록해주세요.");
      return;
    }
    if (isNaN(productData.price) || productData.price <= 0) {
      alert("유효한 가격을 입력해주세요.");
      return;
    }
    if (productData.discount) {
      if (isNaN(productData.discount) || productData.discount < 0 || productData.discount > 100) {
        alert("할인율은 0에서 100 사이의 숫자여야 합니다.");
        return;
      }
    }

    const formData = new FormData();
    const pData = {
      productname: productData.productname,
      price: productData.price,
      discount: productData.discount || 0,
      type: productData.type,
      unit: productData.unit,
      subtitle: productData.subtitle,
      description: productData.description,
      userId,
    };
    formData.append(
      "data",
      new Blob([JSON.stringify(pData)], { type: "application/json" })
    );

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post("http://localhost:8090/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("상품이 성공적으로 등록되었습니다.");
        setProductData({
          productname: "",
          price: "",
          discount: "",
          type: "냉장",
          subtitle: "",
          unit: "",
          description: "",
          image: null,
          imagePreview: null,
        });
        setImages([]);
        setPreviewImages([]);
      } else {
        alert("상품 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("상품 등록 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!isAuthorized) {
    return <div>판매자 계정이 아닙니다. 다른 계정을 이용해주세요.</div>;
  }

  return (
        <div className="product-register-container">
            <h2>상품 등록</h2>
            <form onSubmit={handleSubmit} className="product-register-form">
                <div className="form-group">
                    <label>상품명</label>
                    <input
                        type="text"
                        name="productname"
                        value={productData.productname}
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                    />
                </div>

                <div className="form-group">
                    <label>가격</label>
                    <input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                    />
                </div>

                <div className="form-group">
                    <label>할인율 (%)</label>
                    <input
                        type="number"
                        name="discount"
                        value={productData.discount}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        autoComplete="off"
                    />
                </div>

                <div className="form-group">
                    <label>상품 타입</label>
                    <select
                        name="type"
                        value={productData.type}
                        onChange={handleInputChange}
                    >
                        <option value="냉장">냉장</option>
                        <option value="냉동">냉동</option>
                        <option value="상온">상온</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>상품 무게</label>
                    <input
                        type="text"
                        name="unit"
                        value={productData.unit}
                        onChange={handleInputChange}
                        placeholder="예: 5kg, 10g"
                        autoComplete="off"
                    />
                </div>

                <div className="form-group">
                    <label>상품 부제목</label>
                    <input
                        type="text"
                        name="subtitle"
                        value={productData.subtitle}
                        onChange={handleInputChange}
                        placeholder="설향딸기"
                        autoComplete="off"
                    />
                </div>

                <div className="form-group">
                    <label>상품 설명</label>
                    <input
                        type="text"
                        name="description"
                        value={productData.description}
                        onChange={handleInputChange}
                        placeholder="예: NEW! 12월 신상품! 7종 (택1)"
                        autoComplete="off"
                    />
                </div>

                <div className="image-upload-section">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                    />

                    <div className="image-preview-container">
                        {previewImages.map((preview, index) => (
                            <div key={index} className="image-preview-item">
                                <img src={preview} alt={`Preview ${index + 1}`} />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="remove-image-btn"
                                >
                                    삭제
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className="submit-button">
                    상품 등록
                </button>
            </form>
        </div>
    );
}

export default ProductAdd; 