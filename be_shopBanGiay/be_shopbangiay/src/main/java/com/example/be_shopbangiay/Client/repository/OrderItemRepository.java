package com.example.be_shopbangiay.Client.repository;

import com.example.be_shopbangiay.Client.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {
}
