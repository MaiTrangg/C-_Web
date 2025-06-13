package com.example.be_shopbangiay.Admin.controller;

import com.example.be_shopbangiay.Admin.service.AD_CategoryService;
import com.example.be_shopbangiay.Client.dto.CategoryDTO;
import com.example.be_shopbangiay.Client.entity.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/categories")
@RequiredArgsConstructor
public class AD_CategoryController {

    private final AD_CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @PostMapping("/add")
    public ResponseEntity<Category> createCategory(@RequestBody Category category ) {
        return ResponseEntity.ok(categoryService.createCategory(category));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category updatedCategory) {
        return categoryService.updateCategory(id, updatedCategory)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        if (categoryService.softDeleteCategory(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
