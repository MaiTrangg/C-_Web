package com.example.be_shopbangiay.Client.repository;

import com.example.be_shopbangiay.Client.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Repository

public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findByIsActiveTrue();

//    List<Product> findByCategoryIdIn(List<Long> categoryIds);
@Query("SELECT DISTINCT p FROM Product p " +
        "LEFT JOIN FETCH p.variants v " +
        "WHERE p.category.id IN :categoryIds " +
        "AND p.isActive = true AND v.isActive = true")
List<Product> findActiveProductsWithActiveVariantsByCategoryIds(List<Long> categoryIds);




    // Tìm sản phẩm theo tên chứa chuỗi (không phân biệt hoa thường), và sản phẩm còn active
//    List<Product> findByNameContainingIgnoreCaseAndIsActiveTrue(String name);

    @Query("SELECT DISTINCT p FROM Product p " +
            "LEFT JOIN FETCH p.variants v " +
            "WHERE p.isActive = true AND v.isActive = true")
    List<Product> findActiveProductsWithActiveVariants();


    // Tìm theo ID và lọc cả product + variants active
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.variants v " +
            "WHERE p.id = :productId AND p.isActive = true AND v.isActive = true")
    Optional<Product> findActiveProductWithVariantsById(@Param("productId") Long productId);

    // Tìm kiếm theo tên và lọc active
    @Query("SELECT DISTINCT p FROM Product p LEFT JOIN FETCH p.variants v " +
            "WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%')) " +
            "AND p.isActive = true AND v.isActive = true")
    List<Product> searchActiveProductsWithVariantsByName(@Param("name") String name);



}
