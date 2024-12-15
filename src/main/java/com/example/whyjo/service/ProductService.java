package com.example.whyjo.service;

import com.example.whyjo.domain.dto.ProductDto;
import com.example.whyjo.domain.entity.Product;
import com.example.whyjo.domain.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // products table create -> insert
    public Product insertProduct(Product product) {

        return productRepository.save(product);
    }

    // 전체 상품 조회
    public List<Product> selectAllProduct() {

        return productRepository.findAll();
    }
    // productid 기준으로 조회
    public Product selectById(Long productid) {

        return productRepository.findById(productid)
            .orElseThrow(()->new IllegalArgumentException(productid + " Product not found"));
    }

    // productid 기준으로 삭제
    public void deleteProductById(long productid) {

        productRepository.deleteById((long) Math.toIntExact(productid));
    }

    public Product updateProduct(Product product) { //  == insert

        return productRepository.save(product);
    }

    // productid로 seller 찾기
    public boolean checkSeller(long productid, String seller) {
        Product product = productRepository.findSellerByProductid(productid);
        if (seller.equals(product.getSeller())) {
            return true;
        }
        else
            return false;
    }
}
