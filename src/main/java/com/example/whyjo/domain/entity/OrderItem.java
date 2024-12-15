package com.example.whyjo.domain.entity;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name = "order_items")
@Data
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    private Long productId;
    private String productName;
    private int amount;
    private int price;
    private int totalPrice;
} 