package com.example.be_shopbangiay.Client.service;

import com.example.be_shopbangiay.Client.dto.ProductDTO;
import com.example.be_shopbangiay.Client.entity.Product;
import com.example.be_shopbangiay.Client.entity.ProductVariant;
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
//        return productRepository.findActiveProductsWithActiveVariants()
//                .stream()
//                .map(productMapper::toProductDTO)
//                .collect(Collectors.toList());
        return productRepository.findByIsActiveTrue()  // Lấy tất cả sản phẩm đang active
                .stream()
                .map(product -> {
                    // Lọc chỉ những variant đang active
                    product.setVariants(
                            product.getVariants()
                                    .stream()
                                    .filter(ProductVariant::getIsActive)
                                    .collect(Collectors.toList())
                    );
                    return productMapper.toProductDTO(product);
                })
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

    public ProductDTO getProductsByProductId(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

      return productMapper.toProductDTO(product);

    }

    // Tìm kiếm đơn giản
    public List<ProductDTO> searchProductsByName(String name) {
        List<Product> products = productRepository.findByNameContainingIgnoreCaseAndIsActiveTrue(name);
        return products.stream().map(productMapper::toProductDTO).collect(Collectors.toList());
    }
}
