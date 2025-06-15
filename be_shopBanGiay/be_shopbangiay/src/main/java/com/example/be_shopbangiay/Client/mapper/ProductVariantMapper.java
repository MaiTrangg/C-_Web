package com.example.be_shopbangiay.Client.mapper;

import com.example.be_shopbangiay.Client.dto.ProductVariantDTO;
import com.example.be_shopbangiay.Client.entity.ProductVariant;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductVariantMapper {

    ProductVariantDTO toProductVariantDTO(ProductVariant variant);
    ProductVariant toEntity(ProductVariantDTO dto);
}
