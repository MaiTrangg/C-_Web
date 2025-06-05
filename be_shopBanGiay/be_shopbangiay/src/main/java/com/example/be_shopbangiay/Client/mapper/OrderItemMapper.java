package com.example.be_shopbangiay.Client.mapper;

import com.example.be_shopbangiay.Client.entity.OrderItem;
import com.example.be_shopbangiay.Client.entity.OrderItemResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderItemMapper {
    @Mapping(source = "productVariant.id", target = "productVariantId")
    OrderItemResponse toResponse(OrderItem orderItem);
}

