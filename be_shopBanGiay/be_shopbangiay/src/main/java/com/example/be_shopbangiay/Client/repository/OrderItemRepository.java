package com.example.be_shopbangiay.Client.repository;

import com.example.be_shopbangiay.Admin.dto.OrderItemAdminDto;
import com.example.be_shopbangiay.Client.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {
//    List<OrderItemAdminDto> findItemsByOrderId(Long orderId);
    List<OrderItem> findByOrder_Id(Long orderId);

}
