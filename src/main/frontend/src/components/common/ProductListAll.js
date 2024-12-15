import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/common/ProductList.css';
import '../../css/common/CommonStyles.css';
import '../../css/variables.css';
import bg5 from '../../img/5.png';

function ProductListAll() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8090/product/listAll');
            console.log('Response data:', response.data);

            if (Array.isArray(response.data)) {
                setProducts(response.data);
            } else {
                console.error('Unexpected response format:', response.data);
                setProducts([]);
            }
            setLoading(false);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(err.response?.data?.message || '상품 정보를 불러오는데 실패했습니다.');
            setLoading(false);
        }
    };

    // 나머지 코드는 동일...
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    const formatPrice = (price) => {
        if (typeof price !== 'number' || isNaN(price)) {
            return '0'; // 기본값 반환
        }
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const currentProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (loading) return <div className="loading">로딩 중...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="product-list-page">
            <div className="top-image">
                <img src={bg5} alt="bg5"/>
            </div>
            <div className='product-list-container'>
                <h2>상품 목록</h2>
                <div className='product-list-filter'>
                    <a href='#'>인기신상랭킹</a>
                    <a href='#'>입점특가</a>
                    <a href='#'>요즘간식</a>
                    <a href='#'>간편한끼</a>
                </div>
                <div className='product-list-sort'>
                    <div>총 {products.length}개</div>
                    <div className='product-list-sort-buttons'>
                        <a href='#'>추천순</a> |
                        <a href='#'>신상품순</a> |
                        <a href='#'>판매량순</a> |
                        <a href='#'>낮은가격순</a> |
                        <a href='#'>높은가격순</a>
                    </div>
                </div>
                <div className='product-list-items'>
                    {currentProducts.map((product, index) => (
                        <div key={index} className="product-item">
                            <a href={`/product/${product.id}`} className="product-link">
                                <div className="product-image">
                                    <img src={process.env.PUBLIC_URL + '/product/' + product.seller + "/" + product.image} alt={product.name} />
                                </div>
                            </a>
                            <button className="cart-button">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.5 1.5H3.16667L3.33333 2.5M3.33333 2.5L4.83333 11.5H14.5L16 2.5H3.33333Z" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                담기
                            </button>
                            <a href={`/product/${product.id}`} className="product-link">
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <div className="price-info">
                                        <div className="price-wrap">
                                            <span className="discount">{product.discount}%</span>
                                            <span className="price">{formatPrice(product.price)}원</span>
                                        </div>
                                        <div className="original-price">
                                            {formatPrice(product.originalPrice)}원
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>

                <div className="pagination">
                    {currentPage > 1 && (
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="page-button"
                        >
                            이전
                        </button>
                    )}

                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={`page-button ${currentPage === i + 1 ? 'active' : ''}`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    {currentPage < totalPages && (
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="page-button"
                        >
                            다음
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductListAll;