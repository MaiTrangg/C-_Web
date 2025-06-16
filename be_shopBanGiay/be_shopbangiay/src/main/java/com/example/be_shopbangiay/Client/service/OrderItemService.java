package com.example.be_shopbangiay.Client.service;

import com.example.be_shopbangiay.Admin.dto.OrderItemAdminDto;
import com.example.be_shopbangiay.Client.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

//    public List<OrderItemAdminDto> getOrderItems(Long orderId) {
//        return orderItemRepository.findItemsByOrderId(orderId);
//    }
}
