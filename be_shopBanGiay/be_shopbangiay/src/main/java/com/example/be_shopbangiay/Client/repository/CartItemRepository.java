package com.example.be_shopbangiay.Client.repository;

import com.example.be_shopbangiay.Client.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    Optional<CartItem> findByUserIdAndProductVariantId(Integer userId, Long productVariantId);

    List<CartItem> findByUserId(Integer userId);
}

