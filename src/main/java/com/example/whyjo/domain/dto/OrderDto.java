package com.example.whyjo.domain.dto;

import lombok.*;

import java.util.List;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderDto {
    private String userId;
    private List<OrderItemDto> orderItems;
    private int totalAmount;
    private int shippingFee;
    private String orderDate;
}
