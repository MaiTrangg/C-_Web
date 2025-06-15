package com.example.be_shopbangiay.Client.service;

import com.example.be_shopbangiay.Client.dto.CategoryDTO;
import com.example.be_shopbangiay.Client.dto.ProductDTO;
import com.example.be_shopbangiay.Client.mapper.CategoryMapper;
import com.example.be_shopbangiay.Client.repository.CategoryRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryService {
    CategoryRepository categoryRepository;
    CategoryMapper categoryMapper;

    public List<CategoryDTO> getAllCategories() {
        return categoryMapper.toCategoryDTO(categoryRepository.findByIsActiveTrue());
    }
}
