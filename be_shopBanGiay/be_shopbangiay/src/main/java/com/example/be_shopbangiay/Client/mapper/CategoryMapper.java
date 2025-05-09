package com.example.be_shopbangiay.Client.mapper;

import com.example.be_shopbangiay.Client.dto.CategoryDTO;
import com.example.be_shopbangiay.Client.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface  CategoryMapper {
    @Mapping(target = "parentCategory", source = "parentCategory")
    CategoryDTO toCategoryDTO(Category category);
    List<CategoryDTO> toCategoryDTO(List<Category> categories);
}
