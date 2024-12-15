import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Axios 임포트
import '../../css/common/CommonStyles.css';
import '../../css/variables.css';
import '../../css/user/Login.css';
import google from '../../img/logo/google.png';
import naver from '../../img/logo/naver.png';
import kakao from '../../img/logo/kakao.webp';

function Login() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const loginHandler = async (userId, password, rememberMe) => {
        try {
            // 로그인 요청
            const response = await axios.post(
                "http://localhost:8090/user/auth/login",
                { userId, password },
                { withCredentials: true } // 세션 유지 위해 쿠키 포함
            );

            console.log("Login Response:", response.data);

            if (rememberMe) {
                // 로컬 저장소에 저장
                localStorage.setItem("rememberMeId", userId);
            }

            // 세션 유효성 확인 요청 (선택 사항)
            const sessionResponse = await axios.get(
                "http://localhost:8090/user/auth/session",
                { withCredentials: true }
            );

            console.log("Session Response:", sessionResponse.data);

            alert(sessionResponse.data + " 계정 로그인이 성공적으로 처리됐습니다.");
        } catch (error) {
            console.error("Login failed:", error);
            alert("ID Session 확인 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="login-container">
            <h2>로그인</h2>
            <form
                className="login-form"
                onSubmit={(e) => {
                    e.preventDefault(); // 폼 제출 기본 동작 방지
                    loginHandler(userId, password, document.getElementById("saveId").checked);
                }}
            >
                <div className="input-group">
                    <input 
                        type="text" 
                        placeholder="아이디를 입력해주세요" 
                        className="login-input"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="비밀번호를 입력해주세요" 
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                
                <div className="login-options">
                    <div className="checkbox-wrapper">
                        <input type="checkbox" id="saveId" />
                        <label htmlFor="saveId">아이디 저장</label>
                    </div>
                    <div className="find-links">
                        <Link to="/find-id">아이디 찾기</Link>
                        <span className="divider">|</span>
                        <Link to="/find-password">비밀번호 찾기</Link>
                    </div>
                </div>

                <div className="button-group">
                    <button type="submit" className="login-button">로그인</button>
                    <Link to="/user/register" className="register-link">회원가입</Link>
                </div>
            </form>

            <div className="social-login">
                <p className="social-title">소셜 간편 로그인</p>
                <div className="social-buttons">
                    <button className="social-button kakao">
                        <img src={kakao} alt="카카오 로그인" />
                        <span>카카오</span>
                    </button>
                    <button className="social-button naver">
                        <img src={naver} alt="네이버 로그인" />
                        <span>네이버</span>
                    </button>
                    <button className="social-button google">
                        <img src={google} alt="구글 로그인" />
                        <span>Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
