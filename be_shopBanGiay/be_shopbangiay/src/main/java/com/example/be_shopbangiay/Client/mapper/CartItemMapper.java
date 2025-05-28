package com.example.be_shopbangiay.Client.mapper;

import com.example.be_shopbangiay.Client.dto.CartItemDTO;
import com.example.be_shopbangiay.Client.dto.CartItemRequest;
import com.example.be_shopbangiay.Client.entity.CartItem;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface CartItemMapper {

    CartItemDTO toDto(CartItem entity);

    CartItem toEntity(CartItemRequest dto);

    // Nếu cần cập nhật entity từ request
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(CartItemRequest dto, @MappingTarget CartItem entity);
}

