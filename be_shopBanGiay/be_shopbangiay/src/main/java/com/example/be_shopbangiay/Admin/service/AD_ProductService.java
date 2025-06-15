package com.example.be_shopbangiay.Admin.service;

import com.example.be_shopbangiay.Admin.dto.ProductUpdateRequest;
import com.example.be_shopbangiay.Client.dto.ProductDTO;
import com.example.be_shopbangiay.Client.entity.Category;
import com.example.be_shopbangiay.Client.entity.Product;
import com.example.be_shopbangiay.Client.mapper.ProductMapper;
import com.example.be_shopbangiay.Client.repository.CategoryRepository;
import com.example.be_shopbangiay.Client.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AD_ProductService {
    ProductRepository productRepository;
    CategoryRepository categoryRepository;
    ProductMapper productMapper;
    public ProductDTO add(ProductUpdateRequest reqProduct) {
        Category category = categoryRepository.findById(reqProduct.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục"));

        Product product = Product.builder()
                .name(reqProduct.getName())
                .shortDescription(reqProduct.getShortDescription())
                .description(reqProduct.getDescription())
                .price(reqProduct.getPrice())
                .isActive(reqProduct.getIsActive())
                .category(category)
                .createdAt(LocalDateTime.now())
                .discount(BigDecimal.valueOf(0))
                .build();


        return productMapper.toProductDTO( productRepository.save(product));
    }

    public ProductDTO update(Long id, ProductUpdateRequest newProduct) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

        existing.setName(newProduct.getName());
        existing.setPrice(newProduct.getPrice());
        existing.setIsActive(newProduct.getIsActive());

        if (newProduct.getCategoryId() != null ) {
            Category category = categoryRepository.findById(newProduct.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục"));
            existing.setCategory(category);
        }

        Product saved = productRepository.save(existing);
        return productMapper.toProductDTO(saved);

    }

    public void delete(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

        product.setIsActive(false); // xoá mềm bằng cách cập nhật trạng thái
        productRepository.save(product);
    }

}
