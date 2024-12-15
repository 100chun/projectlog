import React, { useState } from 'react';
import '../css/Header.css';
import logo from '../img/1234.svg';
import '../css/common/CommonStyles.css';
import '../css/variables.css';

function Header() {
   
    const [isLogin, setIsLogin] = useState(false);

    return (
        <>
            <div className="coupon">
                지금 가입하고, 1만원 할인 쿠폰 받아가세요!
            </div>
            <div className="header">
                <div className="left">
                    <a href="/"><img src={logo} /></a><a href="/"><span>마켓컬리</span></a>
                </div>
                <div className="center">
                    <div className="search-container">
                        <input type="text" placeholder="검색어를 입력해주세요"/>
                        <button className="search-button">
                            <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                <g fill="none" fill-rule="evenodd">
                                    <path fill="none" d="M0 0h36v36H0z"/>
                                    <g stroke="#5F0080" stroke-linecap="round" stroke-width="1.7">
                                        <path d="m26.081 26.081-4.12-4.12M16.467 23.334a6.867 6.867 0 1 0 0-13.734 6.867 6.867 0 0 0 0 13.734z"/>
                                    </g>
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="right">
                    {isLogin ? (
                        <>
                            <a href="/user/logout">로그아웃</a>
                            <a href="/user/mypage">마이페이지</a>
                            <a href="/user/cart">장바구니</a>
                        </>
                    ) : (
                        <>
                            <a href="/user/register">회원가입</a>
                            <a href="/user/login">로그인</a>
                        </>
                    )}
                    <a href="#">고객센터</a>

                </div>
            </div>

            <div className="dropdown">
                <div className="dropdown-wrapper">
                    <div className="dropdown-label">
                        <svg width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h16v1.7H0V0zm0 6.15h16v1.7H0v-1.7zm0 6.15h16V14H0v-1.7z" fill="currentColor" fill-rule="evenodd"/>
                        </svg>
                        <span>카테고리</span>
                        <div className="dropdown-menu">
                            <div className="dropdown-item"><a href="#">2024 연말정산</a></div>
                            <div className="dropdown-item"><a href="#">채소</a></div>
                            <div className="dropdown-item"><a href="#">과일 견과 쌀</a></div>
                            <div className="dropdown-item"><a href="#">수산 해산 건어물</a></div>
                            <div className="dropdown-item"><a href="#">정육 가공육 계란</a></div>
                            <div className="dropdown-item"><a href="#">국 반찬 메인요리</a></div>
                        </div>
                    </div>
                    <div className="list-item"><a href='#신상품'>신상품</a></div>
                    <div className="list-item"><a href='#베스트'>베스트</a></div>
                    <div className="list-item"><a href='#알뜰쇼핑'>알뜰쇼핑</a></div>
                    <div className="list-item"><a href='#특가/혜택'>특가/혜택</a></div>
                </div>   
            </div>
        </>
    );
}

export default Header; 