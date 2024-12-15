package com.example.whyjo.service;

import com.example.whyjo.domain.dto.OrderDto;
import com.example.whyjo.domain.dto.OrderItemDto;
import com.example.whyjo.domain.entity.Order;
import com.example.whyjo.domain.entity.OrderItem;
import com.example.whyjo.domain.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public Order createOrder(OrderDto orderDto) {
        Order order = new Order();
        order.setUserId(orderDto.getUserId());
        order.setTotalAmount(orderDto.getTotalAmount());
        order.setShippingFee(orderDto.getShippingFee());
        order.setOrderDate(LocalDateTime.now());

        orderDto.getOrderItems().forEach(orderItemDto -> {
            OrderItem orderItem = mapToOrderItem(orderItemDto, order);
            order.getOrderItems().add(orderItem);
        });

        return orderRepository.save(order);
    }

    private OrderItem mapToOrderItem(OrderItemDto orderItemDto, Order order) {
        OrderItem orderItem = new OrderItem();
        orderItem.setOrder(order);
        orderItem.setProductId(orderItemDto.getProductId());
        orderItem.setProductName(orderItemDto.getProductName());
        orderItem.setAmount(orderItemDto.getAmount());
        orderItem.setPrice(orderItemDto.getPrice());
        orderItem.setTotalPrice(orderItemDto.getTotalPrice());
        return orderItem;
    }
}
