package com.example.be_shopbangiay.Admin.controller;

import com.example.be_shopbangiay.Admin.dto.ProductUpdateRequest;
import com.example.be_shopbangiay.Admin.service.AD_ProductService;
import com.example.be_shopbangiay.Client.dto.ProductDTO;
import com.example.be_shopbangiay.Client.entity.Product;
import com.example.be_shopbangiay.Client.service.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AD_ProductController {
    ProductService productService;
    AD_ProductService ad_productService;

    @GetMapping
    public List<ProductDTO> getProductList(){
        return productService.getAllProducts();
    }
    @PostMapping("/add")
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductUpdateRequest reqProduct) {
        return ResponseEntity.ok(ad_productService.add(reqProduct));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody ProductUpdateRequest product) {
        return ResponseEntity.ok(ad_productService.update(id, product));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        ad_productService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
