package com.example.be_shopbangiay.Client.repository;

import com.example.be_shopbangiay.Client.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order,Long> {
}
