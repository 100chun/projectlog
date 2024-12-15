import React, { useState } from 'react';
import "../../css/user/Cart.css"
import "../../css/common/CommonStyles.css";
import "../../css/variables.css";
import c1 from "../../img/cart/c1.jpg";
import c2 from "../../img/cart/c2.jpg";
import c3 from "../../img/cart/c3.jpg";
import axios from 'axios';

function Cart() {
    // 로그인 상태 추가
    const [isLoggedIn] = useState(true); 
    
    // 전체 선택 상태와 개별 아이템 선택 상태 관리
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "[농심] 빵부장 마늘빵 55g",
            option: "NEW! 12월 신상품! 7종 (택1)",
            price: 1360,
            type: "냉장",
            amount: 1,
            image: c1
        },
        {
            id: 2,
            name: "[캔디키튼스] 와일드스트로베리  140 55g",
            option: "[캔티키튼스] 스웨디시 젤리 6종 (택1)",
            price: 12900,
            type: "상온",
            amount: 1,
            image: c2
        },
        {
            id: 3,
            name: "[겨울간식][삼립] 단팥호빵 (4입)",
            option: "[겨울간식] 상품 호빵 5종 골라담기 (택1)",
            price: 4704,
            type: "냉장",
            amount: 1,
            image: c3
        }   
    ]);

    // 전체 선택 처리 함수
    const SelectAll = () => {
        if (!isAllSelected) {
            // 전체 선택
            setIsAllSelected(true);
            setSelectedItems(cartItems.map(item => item.id));
        } else {
            // 전체 선택 해제
            setIsAllSelected(false);
            setSelectedItems([]);
        }
    };

    // 개별 아이템 선택 처리 함수
    const handleItemSelect = (itemId) => {
        setSelectedItems(prev => {
            if (prev.includes(itemId)) {
                // 선택 해제
                const newSelected = prev.filter(id => id !== itemId);
                setIsAllSelected(false);
                return newSelected;
            } else {
                // 선택
                const newSelected = [...prev, itemId];
                if (newSelected.length === cartItems.length) {
                    setIsAllSelected(true);
                }
                return newSelected;
            }
        });
    };

    // 구매 처리 함수 수정
    const handlePurchase = async () => {
        try {
            // 선택된 상품들만 필터링
            const purchaseItems = cartItems
                .filter(item => selectedItems.includes(item.id))
                .map(item => ({
                    productId: item.id,
                    productName: item.name,
                    amount: item.amount,
                    price: item.price,
                    totalPrice: item.price * item.amount
                }));

            // 주문 데이터 구성
            const orderData = {
                userId: "user123", // 실제로는 로그인된 사용자 ID
                orderItems: purchaseItems,
                totalAmount: finalPrice,
                shippingFee: shippingFee,
                orderDate: new Date().toISOString()
            };

            // Spring Boot 서버로 데이터 전송
            const response = await axios.post('http://localhost:8090/api/orders', orderData);

            if (response.status === 200 || response.status === 201) {
                alert('주문이 완료되었습니다.');
                // 주문 완료된 상품들 장바구니에서 제거
                setCartItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
                setSelectedItems([]);
            }
        } catch (error) {
            console.error('주문 처리 중 오류 발생:', error);
            alert('주문 처리 중 오류가 발생했습니다.');
        }
    };

    // 버튼 클릭 핸들러 수정
    const handleButtonClick = () => {
        if (!isLoggedIn) {
            window.location.href = '/login';
        } else {
            if (selectedItems.length === 0) {
                alert('구매할 상품을 선택해주세요.');
                return;
            }
            handlePurchase();
        }
    };

    // 선택된 상품들의 총 금액 계산
    const totalPrice = selectedItems.reduce((sum, itemId) => {
        const item = cartItems.find(item => item.id === itemId);
        return sum + (item ? item.price * item.amount : 0);
    }, 0);

    // 배송비 계산 (3만원 이상 무료배송)
    const shippingFee = totalPrice >= 30000 ? 0 : 3000;

    // 최종 결제 금액
    const finalPrice = totalPrice + shippingFee;

    // 상품 삭제 처리 함수
    const handleDeleteItem = (itemId) => {
        // 장바구니에서 상품 제거
        setCartItems(prev => prev.filter(item => item.id !== itemId));
        
        // 선택된 상품 목록에서도 제거
        setSelectedItems(prev => prev.filter(id => id !== itemId));
        
        // 전체 선택 상태 업데이트
        if (cartItems.length <= 1) {
            setIsAllSelected(false);
        }
    };

    // 전체 삭제 처리 함수 추가
    const handleDeleteAll = () => {
        setCartItems([]);
        setSelectedItems([]);
        setIsAllSelected(false);
    };

    // 수량 변경 함수 추가
    const handleAmountChange = (itemId, change) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === itemId) {
                const newAmount = Math.max(1, item.amount + change); // 최소 1개
                return { ...item, amount: newAmount };
            }
            return item;
        }));
    };

    return (
        <>
            <div className='cart-container'>
                <div className='cart-content'>
                    <h2>장바구니</h2>
                    
                    <div className="cart-grid">
                        {/* 왼쪽 영역 */}
                        <div className="cart-left">
                            {/* 전체 선택 영역 */}
                            <div className="cart-select-box">
                                <div className="cart-select-all">
                                    <div className="select-area">
                                        <input 
                                            type="checkbox" 
                                            id="selectAll"
                                            checked={isAllSelected}
                                            onChange={SelectAll}
                                        />
                                        <label htmlFor="selectAll">
                                            전체선택 {selectedItems.length}/{cartItems.length}
                                        </label>
                                    </div>
                                    <button 
                                        className="delete-all-button"
                                        onClick={handleDeleteAll}
                                    >
                                        전체삭제
                                    </button>
                                </div>
                            </div>

                            {/* 상품 목록 영역 */}
                            <div className="cart-items-box">
                                {cartItems.map((item) => (
                                    <div className="cart-item" key={item.id}>
                                        <div className="cart-item-checkbox">
                                            <input 
                                                type="checkbox"
                                                checked={selectedItems.includes(item.id)}
                                                onChange={() => handleItemSelect(item.id)}
                                            />
                                        </div>
                                        <div className="cart-item-info">
                                            <div className="cart-item-image">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            <div className="cart-item-details">
                                                <div className="cart-item-name">
                                                    <span className="delivery-type">{item.type}</span>
                                                    <h3>{item.name}</h3>
                                                    <p className="item-option">{item.option}</p>
                                                </div>
                                                <div className="cart-item-right">
                                                    <div className="amount-control">
                                                        <button 
                                                            className="amount-button"
                                                            onClick={() => handleAmountChange(item.id, -1)}
                                                        >
                                                            -
                                                        </button>
                                                        <span className="amount">{item.amount}</span>
                                                        <button 
                                                            className="amount-button"
                                                            onClick={() => handleAmountChange(item.id, 1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <div className="cart-item-price">
                                                        <span className="price">{(item.price * item.amount).toLocaleString()}원</span>
                                                    </div>
                                                    <button 
                                                        className="delete-button"
                                                        onClick={() => handleDeleteItem(item.id)}
                                                    >
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" 
                                                                fill="#999"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 오른쪽 영역 */}
                        <div className="cart-right">
                            {/* 결제 정보 */}
                            <div className="payment-box">
                                <div className="payment-info">
                                    <div className="payment-row">
                                        <span>결제금액</span>
                                    </div>
                                    <div className="payment-row">
                                        <span>상품금액</span>
                                        <span>{totalPrice.toLocaleString()}원</span>
                                    </div>
                                    <div className="payment-row">
                                        <span>배송비</span>
                                        <span>{shippingFee.toLocaleString()}원</span>
                                        {totalPrice > 0 && totalPrice < 30000 && (
                                            <span className="sub-text">
                                                {(30000 - totalPrice).toLocaleString()}원 추가시 무료배송
                                            </span>
                                        )}
                                    </div>
                                    <div className="payment-row total">
                                        <span>결제예정금액</span>
                                        <span>{finalPrice.toLocaleString()}원</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* 로그인 버튼 */}
                            <div className="login-box">
                                <button 
                                    className="order-button"
                                    onClick={handleButtonClick}
                                >
                                    {isLoggedIn ? '구매하기' : '로그인'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;