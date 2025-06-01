package com.example.be_shopbangiay.Client.repository;

import com.example.be_shopbangiay.Client.entity.ProductColorImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductColorImageRepository extends JpaRepository<ProductColorImage, Long> {
//    Optional<ProductColorImage> findFirstByProductIdAndColorAndIsMainTrue(Long productId, String color);
}
