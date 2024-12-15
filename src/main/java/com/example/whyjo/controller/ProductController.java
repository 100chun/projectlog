package com.example.whyjo.controller;

import com.example.whyjo.domain.entity.Login;
import com.example.whyjo.domain.entity.Product;
import com.example.whyjo.service.ProductService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/product")
@Slf4j
@Transactional(rollbackOn = Exception.class)
public class ProductController {
    // userid(로그인에 사용된), role으로 valid 확인 필요!
    // remember-me -> local / 일반 - coockie? session? token?

    String imageDir = "C:\\Users\\black\\Downloads\\whyjo2\\src\\main\\frontend\\public\\product\\";

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<?> addProduct(@RequestPart("data") Product product,
                                        @RequestPart("images") List<MultipartFile> files
    ) {
        try {
            System.out.println("[PC] addController");

            product.setImage(imageController(files, product.getSeller()));     // 이미지 저장 후 반환값 = 이미지 이름 목록

            System.out.println(product);
            productService.insertProduct(product);

            System.out.println("[PC] addController Success");
            return ResponseEntity.ok().body("상품 등록이 성공적으로 처리되었습니다.");
        } catch (Exception e) {
            System.out.println("[PC] addController Fail" + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("상품 등록 중 오류가 발생했습니다.");
        }
    }

    @GetMapping("/listAll")
    public ResponseEntity<List<Product>> listAll() {
        System.out.println("[PC] GET /product/listAll");
        try {
            System.out.println("[PC] listAll");
            List<Product> list = productService.selectAllProduct();
            System.out.println(list);
            System.out.println("[PC] listAll Success");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            System.out.println("[PC] listAll Fail" + e.getMessage());
            return null;
        }
    }
    @GetMapping("/listId/{id}")
    public ResponseEntity<?> listById(@PathVariable("id") long productid) {    // 상품 id로 검색
        System.out.println("[PC] GET /product/listId/" + productid);
        try {
            Product product = productService.selectById(productid);
            System.out.println(product);
            System.out.println("[PC] listUser Success");
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            System.out.println("[PC] listById Fail" + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("상품 선택 중 오류가 발생했습니다.");
        }
    }

    @GetMapping("/edit/{productid}")
    public ResponseEntity<?> editProduct(@PathVariable("productid") long productid) {
        System.out.println("[PC] GET /product/edit/" + productid);
        try {
            Product product = productService.selectById(productid);
            System.out.println(product);
            System.out.println("[PC] editProduct Success");
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            System.out.println("[PC] editProduct Fail" + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("상품 편집 중 오류가 발생했습니다.");
        }
    }
    @PutMapping("/edit/update")
    public ResponseEntity<?> updateProduct(@RequestPart("data") Product newProduct,
                                           @RequestPart("images") List<MultipartFile> files
    ) {
        try {
            System.out.println("[PC] PUT /product/edit/update");

            Product oldProduct = productService.selectById(newProduct.getProductid());
            oldProduct.setProductname(newProduct.getProductname());
            oldProduct.setPrice(newProduct.getPrice());
            oldProduct.setDiscount(newProduct.getDiscount());
            oldProduct.setType(newProduct.getType());
            oldProduct.setUnit(newProduct.getUnit());
            oldProduct.setSubtitle(newProduct.getSubtitle());
            oldProduct.setDescription(newProduct.getDescription());

            imageDelete(oldProduct.getImage(), oldProduct.getSeller());
            oldProduct.setImage(imageController(files, oldProduct.getSeller()));

            System.out.println(oldProduct);
            productService.updateProduct(oldProduct);

            System.out.println("[PC] updateProduct Success");
            return ResponseEntity.ok().body("상품 수정이 성공적으로 처리되었습니다.");
        } catch (Exception e) {
            System.out.println("[PC] updateController Failed" + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("상품 수정 중 오류가 발생했습니다.");
        }
    }

    @DeleteMapping("/edit/delete/{productid}")
    public ResponseEntity<?> deleteProduct(@PathVariable("productid") long productid)  {
        System.out.println("[PC] DELETE /product/edit/delete/" + productid);
        try {
            Product product = productService.selectById(productid);           // id로 product ��기
            imageDelete(product.getImage(), product.getSeller());
            productService.deleteProductById(productid);
            System.out.println("[PC] deleteController Success");

            return ResponseEntity.ok().body("상품 삭제가 성공적으로 처리되었습니다.");
        } catch (Exception e) {
            System.out.println("[PC] deleteController Fail" + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("상품 삭제 중 오류가 발생했습니다.");
        }

    }

    // 이미지 로컬에 저장, 이미지명 list 반환
    private List<String> imageController(List<MultipartFile> files, String seller) throws IOException {
        System.out.println("[PC] imageController");
        try {
            List<String> imagenames = new ArrayList<>();

            for (MultipartFile file : files) {   // 파일 1개씩 저장
                String randomName = UUID.randomUUID().toString();           // 랜덤한 이름 지정
                String originalName = file.getOriginalFilename();           // 원본 파일 이름 추출
                String saveName = randomName + "_" + originalName;          // 이름에 원본 이름 추가 <- 파일 형식 때문에 (.jpg, .png)
                File saveFile = new File(imageDir+seller, saveName);  // 이름, 경로를 가진 객체

                if (!saveFile.getParentFile().exists()) {           // 저장 폴더가 없는 경우 생성 (Product.seller 폴더)
                    saveFile.getParentFile().mkdirs();
                }
                file.transferTo(saveFile);                          // 경로에 파일 저장
                imagenames.add(saveName);

                System.out.println(imagenames);
            }
            return imagenames;    // 이미지 이름 목록 반환
        } catch (IOException e) {
            System.out.println("[PC] imageController Fail" + e.getMessage());
            return Collections.singletonList("");
        }
    }
    // 로컬에 seller 폴더 삭제
    private void imageDelete(List<String> files, String seller) {
        System.out.println("[PC] imageDelete");
        try {
            for (String file : files) {                                    // 파일 1개씩
                File saveFile = new File(imageDir + seller, file);  // 이름, 경로를 가진 객체
                saveFile.delete();                                         // 폴더 내부 파일 삭제
            }
            File dir = new File(imageDir + seller);               // 사용자명 폴더 삭제
            dir.delete();
            System.out.println("[PC] imageDelete Success.");
        } catch (Exception e) {
            System.out.println("[PC] imageDelete Fail: " + e.getMessage());
        }
    }

    // productid로 seller 찾기
    @PostMapping("/edit/seller")
    public ResponseEntity<?> sellerCheck(@RequestBody Product product) {
        System.out.println("[PC] POST /product/sellerCheck");
        try {
            if (productService.checkSeller(product.getProductid(), product.getSeller()) == true) {
                System.out.println("[PC] sellerCheck Success");

                return ResponseEntity.ok().body("사용자 확인이 성공적으로 처리되었습니다.");
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("상품 사용자가 아닙니다.");
            }
        } catch (Exception e) {
            System.out.println("[PC] sellerCheck Fail" + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("사용자 확인 중 오류가 발생했습니다.");
        }
    }
}
