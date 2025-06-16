package com.example.be_shopbangiay.Client.repository;

import com.example.be_shopbangiay.Client.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findByUser_UserID(Integer userId);
    Optional<Order> findByIdAndUser_UserID(Long id, int userId);

}
