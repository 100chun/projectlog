import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/main.css"
import "../css/common/CommonStyles.css";
import "../css/variables.css";
import bg1 from "../img/1.jpg"
import bg2 from "../img/2.jpg"
import bg3 from "../img/3.jpg"
import bg4 from "../img/4.jpg"
import bg5 from "../img/5.png"
import main1 from "../img/main/p1.jpg"
import main2 from "../img/main/p2.jpg"
import main3 from "../img/main/p3.jpg"
import main4 from "../img/main/p4.jpeg"
import main5 from "../img/main/p5.jpg"
import main6 from "../img/main/p6.jpg"
import main7 from "../img/main/p7.jpg"
import main8 from "../img/main/p8.jpeg"
import main9 from "../img/main/p9.jpg"



function Main() {
    const [products] = useState([
        {
            image: main1,
            info: {
                name: "[겨울간식] 상품 호빵 5종 골라담기 (택1)",
                originalPrice: 5380,
                discount: 20,
                price: 4304
            }
        },
        {
            image: main2,
            info: {
                name: "[금주의라면] 농심 라면 5종 골라담기 (택3)",
                originalPrice: 5300,
                discount: 26,
                price: 3900
            }
        },
        {
            image: main3,
            info: {
                name: "[홍익궁중전통] 육개장 (2인분)",
                originalPrice: 9000,
                discount: 20,
                price: 7840
            }
        },
        {
            image: main4,
            info: {
                name: "칠레산 생 블루베리 2종 (택1)",
                originalPrice: 8980,
                discount: 33,
                price: 5980
            }
        },
        {
            image: main5,
            info: {
                name: "[조선호텔] 떡갈비 345g",
                originalPrice: 9900,
                discount: 10,
                price: 8910
            }
        },
        {
            image: main6,
            info: {
                name: "[제주 삼다수] 그린 무라벨 (2L X 6개)",
                originalPrice: 6480,
                discount: 16,
                price: 5380
            }
        },
        {
            image: main7,
            info: {
                name: "[연안식당] 꼬막 비빔장 2종 (택1)",
                originalPrice: 6900,
                discount: 15,
                price: 5800
            }
        },
        {
            image: main8,
            info: {
                name: "[브룩클린688] 호주산 목초육 치마살 이용 300g (냉장)",
                originalPrice: 16590,
                discount: 27,
                price: 11990
            }
        },
        {
            image: main9,
            info: {
                name: "[압구정쭈꾸미] 인기 볶음 6종 (택1)",
                originalPrice: 8900,
                discount: 22,
                price: 6900
            }
        }
    ]);

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: (
            <div className="slick-next custom-arrow">
                <svg width="52" height="52" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(1 1)" fill="none" fill-rule="evenodd">
                        <circle fill-opacity=".2" fill="#000" cx="25" cy="25" r="25"/>
                        <path 
                            d="M22.285 33.699a1 1 0 0 0 1.319.098l.095-.082 8-7.817a1 1 0 0 0 .108-1.306l-.08-.096-7.723-8.182a1 1 0 0 0-1.535 1.276l.08.096 7.049 7.469-7.297 7.13a1 1 0 0 0-.098 1.319l.082.095z" 
                            fill="#FFF" 
                            fill-rule="nonzero"
                        />
                    </g>
                </svg>
            </div>
        ),
        prevArrow: (
            <div className="slick-prev custom-arrow">
                <svg width="52" height="52" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(1 1)" fill="none" fill-rule="evenodd">
                        <circle fill-opacity=".2" fill="#000" cx="25" cy="25" r="25"/>
                        <path 
                            d="M27.715 33.699a1 1 0 0 1-1.319.098l-.095-.082-8-7.817a1 1 0 0 1-.108-1.306l.08-.096 7.723-8.182a1 1 0 0 1 1.535 1.276l-.08.096-7.049 7.469 7.297 7.13a1 1 0 0 1 .098 1.319l-.082.095z" 
                            fill="#FFF" 
                            fill-rule="nonzero"
                        />
                    </g>
                </svg>
            </div>
        ),
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const multipleSliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: (
            <div className="main-section-arrow slick-next1 custom-arrow1">
                <svg width="60" height="60" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter x="-14%" y="-14%" width="128%" height="128%" filterUnits="objectBoundingBox" id="a">
                            <feOffset in="SourceAlpha" result="shadowOffsetOuter1"/>
                            <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"/>
                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" in="shadowBlurOuter1" result="shadowMatrixOuter1"/>
                            <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter2"/>
                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0" in="shadowOffsetOuter2" result="shadowMatrixOuter2"/>
                            <feMorphology radius=".5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter3"/>
                            <feOffset in="shadowSpreadOuter3" result="shadowOffsetOuter3"/>
                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0" in="shadowOffsetOuter3" result="shadowMatrixOuter3"/>
                            <feMerge>
                                <feMergeNode in="shadowMatrixOuter1"/>
                                <feMergeNode in="shadowMatrixOuter2"/>
                                <feMergeNode in="shadowMatrixOuter3"/>
                            </feMerge>
                        </filter>
                        <circle id="b" cx="25" cy="25" r="25"/>
                    </defs>
                    <g fill="none" fillRule="evenodd">
                        <g transform="matrix(-1 0 0 1 55 5)">
                            <use fill="#000" filter="url(#a)" href="#b"/>
                            <use fill="#FFF" href="#b"/>
                        </g>
                        <path d="M32.715 38.699a1 1 0 0 1-1.319.098l-.095-.082-8-7.817a1 1 0 0 1-.108-1.306l.08-.096 7.723-8.182a1 1 0 0 1 1.535 1.276l-.08.096-7.049 7.469 7.297 7.13a1 1 0 0 1 .098 1.319l-.082.095z" fill="#333" fillRule="nonzero"/>
                    </g>
                </svg>
            </div>
        ),
        prevArrow: (
            <div className="main-section-arrow slick-prev1 custom-arrow1">
                <svg width="60" height="60" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter x="-14%" y="-14%" width="128%" height="128%" filterUnits="objectBoundingBox" id="a">
                            <feOffset in="SourceAlpha" result="shadowOffsetOuter1"/>
                            <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"/>
                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" in="shadowBlurOuter1" result="shadowMatrixOuter1"/>
                            <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter2"/>
                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0" in="shadowOffsetOuter2" result="shadowMatrixOuter2"/>
                            <feMorphology radius=".5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter3"/>
                            <feOffset in="shadowSpreadOuter3" result="shadowOffsetOuter3"/>
                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0" in="shadowOffsetOuter3" result="shadowMatrixOuter3"/>
                            <feMerge>
                                <feMergeNode in="shadowMatrixOuter1"/>
                                <feMergeNode in="shadowMatrixOuter2"/>
                                <feMergeNode in="shadowMatrixOuter3"/>
                            </feMerge>
                        </filter>
                        <circle id="b" cx="25" cy="25" r="25"/>
                    </defs>
                    <g fill="none" fillRule="evenodd">
                        <g transform="matrix(-1 0 0 1 55 5)">
                            <use fill="#000" filter="url(#a)" href="#b"/>
                            <use fill="#FFF" href="#b"/>
                        </g>
                        <path d="M32.715 38.699a1 1 0 0 1-1.319.098l-.095-.082-8-7.817a1 1 0 0 1-.108-1.306l.08-.096 7.723-8.182a1 1 0 0 1 1.535 1.276l-.08.096-7.049 7.469 7.297 7.13a1 1 0 0 1 .098 1.319l-.082.095z" fill="#333" fillRule="nonzero"/>
                    </g>
                </svg>
            </div>
        )
    };

    // 천 단위 콤마 추가하는 함수
    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div>
            <div className="slide-main">
                <Slider {...sliderSettings}>
                    <div className="slide">
                        <img src={bg1} alt="Slide 1"/>
                    </div>
                    <div className="slide">
                        <img src={bg2} alt="Slide 2"/>
                    </div>
                    <div className="slide">
                        <img src={bg3} alt="Slide 3"/>
                    </div>
                    <div className="slide">
                        <img src={bg4} alt="Slide 4"/>
                    </div>
                </Slider>
            </div>

            <div className="section">
                <div className="section-container">
                    <p className="section-title">🛒지금 가장 많이 담는 특가</p>
                    <p className="section-subtitle">컬리 추천 특가템 최대 40%</p>
                </div>
                <div className="slider-container">
                    <Slider {...multipleSliderSettings}>
                        {products.map((product, index) => (
                            <div key={index} className="product-item">
                                <div className="product-image">
                                    <a href={`/product/${index}`} className="product-link">
                                        <img src={product.image} alt={product.info.name} />
                                    </a>
                                </div>
                                <button className="cart-button">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.5 1.5H3.16667L3.33333 2.5M3.33333 2.5L4.83333 11.5H14.5L16 2.5H3.33333Z" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    담기
                                </button>
                                <a href={`/product/${index}`} className="product-link">
                                    <div className="product-info">
                                        <h3>{product.info.name}</h3>
                                        <div className="price-info">
                                            <div className="original-price">
                                                {formatPrice(product.info.originalPrice)}원
                                            </div>
                                            <div className="price-wrap">
                                                <span className="discount">{product.info.discount}%</span>
                                                <span className="price">{formatPrice(product.info.price)}원</span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            <div className="section">
                <div className="section-container">
                    <p className="section-title">🥇2024 명예의 전당</p>
                    <p className="section-subtitle">최고 인기 상품 할인가로 만나보세요!</p>
                </div>
                <div className="slider-container">
                    <Slider {...multipleSliderSettings}>
                        {products.map((product, index) => (
                            <div key={index} className="product-item">
                                <div className="product-image">
                                    <a href={`/product/${index}`} className="product-link">
                                        <img src={product.image} alt={product.info.name} />
                                    </a>
                                </div>
                                <button className="cart-button">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.5 1.5H3.16667L3.33333 2.5M3.33333 2.5L4.83333 11.5H14.5L16 2.5H3.33333Z" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    담기
                                </button>
                                <a href={`/product/${index}`} className="product-link">
                                    <div className="product-info">
                                        <h3>{product.info.name}</h3>
                                        <div className="price-info">
                                            <div className="price-wrap">
                                                <span className="discount">{product.info.discount}%</span>
                                                <span className="price">{formatPrice(product.info.price)}원</span>
                                            </div>
                                            <div className="original-price">
                                                {formatPrice(product.info.originalPrice)}원
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            <div className="center-image">
                <img src={bg5} alt="bg5"/>
            </div>

            <div className="section">
                <div className="section-container">
                    <p className="section-title">👑2024 신상품 베스트</p>
                    <p className="section-subtitle">올해 입점한 상품 중 가장 많이 사랑 받았어요</p>
                </div>
                <div className="slider-container">
                    <Slider {...multipleSliderSettings}>
                        {products.map((product, index) => (
                            <div key={index} className="product-item">
                                <div className="product-image">
                                    <a href={`/product/${index}`} className="product-link">
                                        <img src={product.image} alt={product.info.name} />
                                    </a>
                                </div>
                                <button className="cart-button">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.5 1.5H3.16667L3.33333 2.5M3.33333 2.5L4.83333 11.5H14.5L16 2.5H3.33333Z" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    담기
                                </button>
                                <a href={`/product/${index}`} className="product-link">
                                    <div className="product-info">
                                        <h3>{product.info.name}</h3>
                                        <div className="price-info">
                                            <div className="price-wrap">
                                                <span className="discount">{product.info.discount}%</span>
                                                <span className="price">{formatPrice(product.info.price)}원</span>
                                            </div>
                                            <div className="original-price">
                                                {formatPrice(product.info.originalPrice)}원
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default Main;