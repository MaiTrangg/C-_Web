package com.example.be_shopbangiay.Client.mapper;

import com.example.be_shopbangiay.Client.dto.OrderResponse;
import com.example.be_shopbangiay.Client.entity.Order;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    OrderResponse toResponse(Order order);
}
