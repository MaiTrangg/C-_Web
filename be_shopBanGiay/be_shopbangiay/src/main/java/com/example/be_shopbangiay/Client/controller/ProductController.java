package com.example.be_shopbangiay.Client.controller;

import com.example.be_shopbangiay.Client.dto.ProductDTO;
import com.example.be_shopbangiay.Client.entity.Product;
import com.example.be_shopbangiay.Client.repository.CategoryRepository;
import com.example.be_shopbangiay.Client.service.ProductService;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductController {
    ProductService productService;

    @GetMapping
    public List<ProductDTO> getProductList(){
        return productService.getAllProducts();
    }

    @GetMapping("/categories/{categoryId}")
    public List<ProductDTO> getProductsByCategoryAndSub(@PathVariable Long categoryId) {
        return productService.getProductsByCategoryAndSub(categoryId);
    }
    @GetMapping("/{productId}")
    public ProductDTO getProductsByProductId(@PathVariable Long productId) {
        return productService.getProductsByProductId(productId);
    }

    @GetMapping("/search")
    public List<ProductDTO> searchProducts(@RequestParam(required = false) String name) {
        // Nếu không truyền tên, trả về tất cả sản phẩm
        if (name == null || name.isBlank()) {
            return productService.getAllProducts();
        }
        return productService.searchProductsByName(name);
    }
}
