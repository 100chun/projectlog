import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../css/common/ProductDetail.css';
import '../../css/common/CommonStyles.css';
import '../../css/variables.css';
import main1 from '../../img/main/p1.jpg';

function ProductDetail() {
    const { id } = useParams();
    const [amount, setAmount] = useState(1);

    // 임시 상품 데이터
    const product = {
        name: "[겨울간식] 상품 호빵 5종 골라담기 (택1)",
        price: 3984,
        originalPrice: 4980,
        discount: 20,
        type: "냉장",
        subTitle: "각양각색의 매력을 담은 호빵",
        option: [
            "배송 : 택배배송",
            "판매자 : 컬리",
            "포장타입 : 냉장",
            "판매단위 : 봉",
            "중량/용량 : 옵션별 상이",
            "소비기한 : 상품 소비기한 참조"
        ],
        description: [
            "호호 불어 먹는 따끈한 호빵만큼 맛있는 겨울 간식이 또 있을까요. 다양한 브랜드 중에서도 호빵의 대표 자리를 지키고 있는 SPC 삼립. 이번에는 삼립의 호빵 시리즈를 다채롭게 즐길 수 있도록 골라담기를 준비했어요. 기본적인 단팥 소는 물론이고 각양각색의 매력이 돋보이는 호빵까지 만나볼 수 있답니다. 5가지 종류 중 입맛에 따라 골라 담아 보세요. 김이 모락모락 나도록 따끈하게 데우면 겨울철 별미 간식을 맛볼 수 있을 거예요."
        ]
    };

    // 후기와 문의 데이터 상태 관리
    const [reviews] = useState([
        { id: 1, title: "맛있어요!", content: "재구매 의사 있습니다.", date: "2024.01.10" },
        { id: 2, title: "배송이 빨라요", content: "포장도 꼼꼼하고 좋네요.", date: "2024.01.9" },
        { id: 3, title: "맛있습니다.", content: "아이들이 좋아해요.", date: "2024.01.8" },
        { id: 4, title: "괜찮아요", content: "가성비 좋습니다.", date: "2024.01.7" },
        { id: 5, title: "좋네요", content: "잘 먹겠습니다.", date: "2024.01.6" },
        { id: 6, title: "만족합니다", content: "또 구매할게요.", date: "2024.01.5" },
        { id: 7, title: "추천해요", content: "친구들한테도 추천했어요.", date: "2024.01.4" }
    ]);

    const [inquiries] = useState([
        { id: 1, title: "배송 문의", content: "언제 배송되나요?" },
        { id: 2, title: "재입고 문의", content: "재입고 일정 알 수 있을까요?" },
        { id: 3, title: "상품 문의", content: "유통기한이 어떻게 되나요?" },
        { id: 4, title: "포장 문의", content: "선물용으로 포장 가능한가요?" }
    ]);

    // 페이지네이션 상태 관리
    const [reviewPage, setReviewPage] = useState(1);
    const [inquiryPage, setInquiryPage] = useState(1);
    const itemsPerPage = 5;

    // 페이지네이션 계산
    const totalReviewPages = Math.ceil(reviews.length / itemsPerPage);
    const totalInquiryPages = Math.ceil(inquiries.length / itemsPerPage);

    // 현재 페이지에 표시할 아이템들
    const currentReviews = reviews.slice(
        (reviewPage - 1) * itemsPerPage,
        reviewPage * itemsPerPage
    );
    const currentInquiries = inquiries.slice(
        (inquiryPage - 1) * itemsPerPage,
        inquiryPage * itemsPerPage
    );

    // 페이지 변경 핸들러
    const handleReviewPage = (page) => {
        setReviewPage(page);
    };

    const handleInquiryPage = (page) => {
        setInquiryPage(page);
    };

    const handleAmountChange = (change) => {
        const newAmount = Math.max(1, amount + change);
        setAmount(newAmount);
    };

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const totalPrice = product.price * amount;

    // 스크롤 핸들러 추가
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="product-detail-page">
            <div className="product-detail-container">
                <div className="product-detail-left">
                    <div className="product-detail-image">
                        <img src={main1} alt={product.name} />
                    </div>
                </div>
                <div className="product-detail-right">
                    <div className="product-info">
                        <div className="delivery-type">{product.type}</div>
                        <h2>{product.name}</h2>
                        <p className="product-subTitle">{product.subTitle}</p>
                        
                        <div className="price-info-detail">
                            <div className="price-wrap">
                                <span className="discount">{product.discount}%</span>
                                <span className="price">{formatPrice(product.price)}원</span>
                            </div>
                            <div className="original-price">
                                {formatPrice(product.originalPrice)}원
                            </div>
                        </div>

                        <div className="product-options">
                            {product.option.map((desc, index) => (
                                <p key={index}>{desc}</p>
                            ))}
                        </div>

                        <div className="amount-control">
                            <button onClick={() => handleAmountChange(-1)}>-</button>
                            <span>{amount}</span>
                            <button onClick={() => handleAmountChange(1)}>+</button>
                        </div>

                        <div className="total-price">
                            <span>총 상품금액:</span>
                            <span className="total">{formatPrice(totalPrice)}원</span>
                        </div>

                        <div className="button-group">
                            <button className="detail-cart-button">장바구니 담기</button>
                            <button className="detail-buy-button">바로 구매</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="product-detail-tabs">
                <div className="tab-buttons">
                    <button 
                        className="tab-button active"
                        onClick={() => scrollToSection('product-description')}
                    >
                        상품설명
                    </button>
                    <button 
                        className="tab-button"
                        onClick={() => scrollToSection('product-reviews')}
                    >
                        후기 ({reviews.length})
                    </button>
                    <button 
                        className="tab-button"
                        onClick={() => scrollToSection('product-inquiries')}
                    >
                        문의
                    </button>
                </div>
            </div>

            <div id="product-description" className="product-detail-main">
                <h4>각양각색의 매력을 담은 호빵</h4>
                <h1>[겨울간식] 삼립 호빵 5종</h1>
                <hr/>
                <span>{product.description}</span>
            </div>

            <div id="product-reviews" className="product-reviews">
                <div className="review-header">
                    <h3>상품 후기 ({reviews.length})</h3>
                </div>
                <div className="review-notice">
                    <p>• 상품에 대한 후기를 남기는 공간입니다.</p>
                    <p>• 배송관련, 주문(취소/교환/환불)관련 문의 및 요청사항은 문의하기를 이용해주세요.</p>
                </div>
                <div className="review-list">
                    {currentReviews.map((review) => (
                        <div key={review.id} className="review-item">
                            <div className="review-item-header">
                                <span className="review-item-title">{review.title}</span>
                                <span className="review-item-date">{review.date}</span>
                            </div>
                            <p className="review-item-content">{review.content}</p>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    <button 
                        className={`page-button ${reviewPage <= 1 ? 'disabled' : ''}`}
                        onClick={() => reviewPage > 1 && handleReviewPage(reviewPage - 1)}
                        disabled={reviewPage <= 1}
                    >
                        ←
                    </button>
                    <button 
                        className={`page-button ${reviewPage >= totalReviewPages ? 'disabled' : ''}`}
                        onClick={() => reviewPage < totalReviewPages && handleReviewPage(reviewPage + 1)}
                        disabled={reviewPage >= totalReviewPages}
                    >
                        →
                    </button>
                </div>
            </div>

            <div id="product-inquiries" className="product-inquiries">
                <div className="inquiry-header">
                    <h3>상품 문의 ({inquiries.length})</h3>
                    <button className="write-inquiry">문의하기</button>
                </div>
                <div className="inquiry-notice">
                    <p>• 상품에 대한 문의를 남기는 공간입니다.</p>
                </div>
                <div className="inquiry-list">
                    {currentInquiries.map((inquiry) => (
                        <div key={inquiry.id} className="inquiry-item">
                            <div className="inquiry-item-header">
                                <span className="inquiry-item-title">{inquiry.title}</span>
                                <span className="inquiry-item-date">2024.01.10</span>
                            </div>
                            <p className="inquiry-item-content">{inquiry.content}</p>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    <button 
                        className={`page-button ${inquiryPage <= 1 ? 'disabled' : ''}`}
                        onClick={() => inquiryPage > 1 && handleInquiryPage(inquiryPage - 1)}
                        disabled={inquiryPage <= 1}
                    >
                        ←
                    </button>
                    <button 
                        className={`page-button ${inquiryPage >= totalInquiryPages ? 'disabled' : ''}`}
                        onClick={() => inquiryPage < totalInquiryPages && handleInquiryPage(inquiryPage + 1)}
                        disabled={inquiryPage >= totalInquiryPages}
                    >
                        →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;