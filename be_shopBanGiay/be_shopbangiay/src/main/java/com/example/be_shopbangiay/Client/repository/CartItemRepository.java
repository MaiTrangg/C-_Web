package com.example.be_shopbangiay.Client.repository;

import com.example.be_shopbangiay.Client.entity.CartItem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    Optional<CartItem> findByUser_UserIDAndProductVariant_Id(Integer userID, Long productVariantId);

    List<CartItem> findByUser_UserID(Integer userID);


    // Xóa tất cả cart items của user theo userId
    @Modifying
    @Transactional
    @Query("DELETE FROM CartItem c WHERE c.user.userID = :userId")
    void deleteByUserId(@Param("userId") int userId);


}

