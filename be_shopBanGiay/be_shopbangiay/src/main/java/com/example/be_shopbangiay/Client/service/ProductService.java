package com.example.be_shopbangiay.Client.service;

import com.example.be_shopbangiay.Client.dto.ProductDTO;
import com.example.be_shopbangiay.Client.entity.Product;
import com.example.be_shopbangiay.Client.mapper.ProductMapper;
import com.example.be_shopbangiay.Client.repository.CategoryRepository;
import com.example.be_shopbangiay.Client.repository.ProductRepository;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductService {
    ProductRepository productRepository;
    ProductMapper productMapper;
    CategoryRepository categoryRepository;
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(productMapper::toProductDTO)
                .collect(Collectors.toList());
    }


    public List<ProductDTO> getProductsByCategoryAndSub(Long categoryId) {
        List<Long> categoryIds = new ArrayList<>();
        categoryIds.add(categoryId);
        categoryIds.addAll(categoryRepository.findChildCategoryIds(categoryId));

        return productRepository.findByCategoryIdIn(categoryIds).stream()
                .map(productMapper::toProductDTO)
                .collect(Collectors.toList());
    }
}
