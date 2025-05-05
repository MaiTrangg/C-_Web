package com.example.be_shopbangiay.Client.repository;

import com.example.be_shopbangiay.Client.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query("SELECT c.id FROM Category c WHERE c.parentCategory.id = :parentId")
    List<Long> findChildCategoryIds(@Param("parentId") Long parentId);
}
