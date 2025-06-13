package com.example.be_shopbangiay.Admin.service;


import com.example.be_shopbangiay.Client.dto.CategoryDTO;
import com.example.be_shopbangiay.Client.entity.Category;
import com.example.be_shopbangiay.Client.mapper.CategoryMapper;
import com.example.be_shopbangiay.Client.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AD_CategoryService {

        private final CategoryRepository categoryRepository;
        private final CategoryMapper categoryMapper;

        // Lấy tất cả danh mục
        public List<CategoryDTO> getAllCategories() {
            return categoryMapper.toCategoryDTO(categoryRepository.findByIsActiveTrue());
        }

        // Tạo danh mục mới
        public Category createCategory(Category category) {
            if (category.getIsActive() == null) {
                category.setIsActive(true); // đảm bảo mặc định là true
            }
            return categoryRepository.save(category);
        }

        // Cập nhật danh mục
        public Optional<Category> updateCategory(Long id, Category updatedCategory) {
            return categoryRepository.findById(id)
                    .map(existing -> {
                        existing.setName(updatedCategory.getName());
//                        existing.setParentCategory(updatedCategory.getParentCategory());
                        return categoryRepository.save(existing);
                    });
        }

        // Xoá danh mục
        public boolean softDeleteCategory(Long id) {
            Optional<Category> categoryOpt = categoryRepository.findById(id);
            if (categoryOpt.isPresent()) {
                Category category = categoryOpt.get();
                category.setIsActive(false);
                categoryRepository.save(category);
                return true;
            }
            return false;
        }


    // Tìm theo ID
        public Optional<Category> getById(Long id) {
            return categoryRepository.findById(id);
        }
}
