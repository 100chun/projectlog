package com.example.whyjo.controller;

import com.example.whyjo.domain.dto.OrderDto;
import com.example.whyjo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderDto orderDTO) {
        try {
            // 주문 처리 로직
            System.out.println(orderDTO);
            orderService.createOrder(orderDTO);
            return ResponseEntity.ok().body("주문이 성공적으로 처리되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("주문 처리 중 오류가 발생했습니다.");
        }
    }

}