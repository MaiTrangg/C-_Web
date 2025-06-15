package com.example.be_shopbangiay.Client.mapper;

import com.example.be_shopbangiay.Client.dto.ProductDTO;
import com.example.be_shopbangiay.Client.entity.Product;
import com.example.be_shopbangiay.Client.entity.ProductVariant;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = {
        CategoryMapper.class,
        ProductVariantMapper.class
})
public interface ProductMapper {
    ProductDTO toProductDTO(Product product);


}
