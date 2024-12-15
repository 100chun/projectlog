import React from 'react';
import '../css/Footer.css';
import '../css/common/CommonStyles.css';
import '../css/variables.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <h3>고객행복센터</h3>
                    <div className="footer-contact">
                        <h2>1644-1107</h2>
                        <h2>월~토요일 오전 7시 - 오후 6시</h2>
                    </div>
                    <div className="footer-links">
                        <a href="#">카카오톡 문의</a>
                        <a href="#">1:1 문의</a>
                        <a href="#">대량주문 문의</a>
                    </div>
                </div>
                <div className="footer-right">
                    <h3>컬리소개</h3>
                    <div className="footer-links">
                        <a href="#">컬리소개</a>
                        <a href="#">컬리패스</a>
                        <a href="#">이용약관</a>
                        <a href="#">개인정보처리방침</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer; 