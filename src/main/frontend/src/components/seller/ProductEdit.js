import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../../css/seller/ProductAdd.css";
import "../../css/common/CommonStyles.css";
import "../../css/variables.css";

function ProductEdit() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const { productid } = useParams(); // @PathVariable에 사용되는 productid

    const [productData, setProductData] = useState({
        productid: '',
        seller: '',
        productname: '',
        price: '',
        discount: '',
        type: '냉장',
        unit: '',
        description: '',
        subtitle: '',
        image: null,
        imagePreview: null
    });
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    // userId 확인
    const [userId, setUserId] = useState(null);

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
        console.error("Failed to get  I:", error.message);
        return null;
      }
    };
    // 권한 확인
    const seller = async (productid, userId) => {
    try {
      const response = await axios.post(
        "http://localhost:8090/product/edit/seller",
        { productid, userId },
        { withCredentials: true }
      );
      console.log("사용자 :", response.data);
      return true;          // ROLE_SELLER or ROLE_ADMIN
    } catch (error) {
      console.error("권한이 부족합니다.", error.message);
      return false;
    }
  };



    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        // 기존 URL 객체들 해제
        previewImages.forEach(url => URL.revokeObjectURL(url));

        // 이미지 미리보기 생성
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(previews);
    };

    const handleRemoveImage = (index) => {
        const newImages = [...images];
        const newPreviews = [...previewImages];

        // 제거되는 이미지의 URL 객체 해제
        URL.revokeObjectURL(newPreviews[index]);

        newImages.splice(index, 1);
        newPreviews.splice(index, 1);

        setImages(newImages);
        setPreviewImages(newPreviews);

        // 모든 이미지가 삭제된 경우에만 input 초기화
        if (newImages.length === 0) {
            fileInputRef.current.value = '';
        }

        // DataTransfer 객체를 사용하여 새로운 FileList 생성
        const dataTransfer = new DataTransfer();
        newImages.forEach(file => {
            dataTransfer.items.add(file);
        });

        // input의 files 속성 업데이트
        fileInputRef.current.files = dataTransfer.files;
    };

    // 상품 데이터 가져오기
    const getProduct = async () => {
        try {
//            const response = await axios.get(`http://localhost:8090/product/edit/${productid}`);
            const response = await axios.get(`http://localhost:8090/product/edit/`+9);          // 상품 id 수정 필요
            const data = response.data;

            // 기존 이미지 경로 생성
            const existingPreviews = (data.images || []).map(
                imageName => `/product/${data.seller}/${imageName}`
            );

            setProductData({
                productid: data.productid,
                productname: data.productname,
                seller: data.seller,
                price: data.price,
                discount: data.discount,
                type: data.type,
                unit: data.unit,
                subtitle: data.subtitle,
                description: data.description,
                image: null,
                imagePreview: null
            });

            setPreviewImages(existingPreviews);
        } catch (err) {
            console.error('Error fetching product:', err);
        }
    };


    // 컴포넌트 마운트 시 userId와 권한 가져오기
    useEffect(() => {
      (async () => {
        const userId = await getUserId();
        setUserId(9, userId);
        seller();
        if (userId) {
            const authorized = await seller(userId);
            setIsAuthorized(authorized);
        }
      })();
    }, []);

    const updateHandler = async (e) => {
        e.preventDefault();
        if (!userId) {
              alert("로그인이 필요합니다.");
              return;
        }

        // 필수 입력값 검증
        if (!productData.productname.trim()) {
            alert('상품명을 입력해주세요.');
            return;
        }
        if (!productData.price) {
            alert('상품 가격을 입력해주세요.');
            return;
        }
        if (!productData.type) {
            alert('상품 타입을 선택해주세요.');
            return;
        }
        if (!productData.unit.trim()) {
            alert('상품 무게를 입력해주세요.');
            return;
        }
        if (!productData.subtitle.trim()) {
            alert('상품 부제목을 입력해주세요.');
            return;
        }
        if (!productData.description.trim()) {
            alert('상품 설명을 입력해주세요.');
            return;
        }
        if (images.length === 0) {
            alert('상품 이미지를 등록해주세요.');
            return;
        }

        // 가격과 할인율 유효성 검사
        if (isNaN(productData.price) || productData.price <= 0) {
            alert('유효한 가격을 입력해주세요.');
            return;
        }
        if (productData.discount) {
            if (isNaN(productData.discount) || productData.discount < 0 || productData.discount > 100) {
                alert('할인율은 0에서 100 사이의 숫자여야 합니다.');
                return;
            }
        }

        // FormData 객체 생성
        const formData = new FormData();
        const pData = {
            productid: productData.productid,
            seller: productData.seller,
            productname: productData.productname,
            price: productData.price,
            discount: productData.discount || 0,
            type: productData.type,
            unit: productData.unit,
            subtitle: productData.subtitle,
            description: productData.description
        };
        formData.append("data", new Blob([JSON.stringify(pData)], { type: "application/json" }));
        images.forEach((image) => {
            formData.append('images', image);
        });

        // PUT 요청 -> updateController
        try {
            const response = await axios.put('http://localhost:8090/product/edit/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                alert('상품 정보가 성공적으로 수정되었습니다.');
            } else {
                alert('상품 수정에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('상품 수정 중 오류가 발생했습니다.');
        }
    };

    // 삭제 handler
    const deleteHandler = async (e) => {
        e.preventDefault();

        try {   // delete -> edit/delete
            const response = await axios.delete('http://localhost:8090/product/edit/delete/'+productData.productid);

            if (response.status === 200) {
                alert('상품이 성공적으로 삭제되었습니다.');
                setProductData({
                    productname: '',
                    price: '',
                    discount: '',
                    type: '냉장',
                    subtitle: '',
                    unit: '',
                    description: '',
                    image: null,
                    imagePreview: null
                });
                setImages([]);
                setPreviewImages([]);
            } else {
                alert('상품 삭제에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('상품 삭제 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="product-register-container">
            <h2>상품 편집</h2>
            <form onSubmit={updateHandler} className="product-register-form">
                <div className="form-group">
                    <label>상품 번호</label>
                    <input
                        type="text"
                        name="productid"
                        value={productData.productid}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>상품명</label>
                    <input
                        type="text"
                        name="productname"
                        value={productData.productname}
                        onChange={handleInputChange}
                        required
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
                    상품 수정
                </button>
            </form>

            <form onSubmit={deleteHandler} className="product-register-form">
                <button type="submit" className="submit-button">
                    상품 삭제
                </button>
            </form>
        </div>
    );
}

export default ProductEdit;
