package com.example.be_shopbangiay.Client.mapper;

import com.example.be_shopbangiay.Client.dto.ProductDTO;
import com.example.be_shopbangiay.Client.entity.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {
        CategoryMapper.class,
        ProductVariantMapper.class
})
public interface ProductMapper {
    ProductDTO toProductDTO(Product product);
}
