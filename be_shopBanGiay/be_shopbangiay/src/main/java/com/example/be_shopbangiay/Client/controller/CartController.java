package com.example.be_shopbangiay.Client.controller;

import com.example.be_shopbangiay.Client.dto.CartItemDTO;
import com.example.be_shopbangiay.Client.dto.CartItemRequest;
import com.example.be_shopbangiay.Client.dto.CustomUserDetails;
import com.example.be_shopbangiay.Client.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    // Lấy giỏ hàng user hiện tại
    @GetMapping("/items")
    public ResponseEntity<List<CartItemDTO>> getCartItems(@AuthenticationPrincipal UserDetails userDetails) {
        Integer userId = extractUserIdFromUserDetails(userDetails);
        List<CartItemDTO> items = cartService.getCartItemsByUser(userId);
        return ResponseEntity.ok(items);
    }

    // Thêm / cập nhật số lượng (cộng dồn)
    @PostMapping("/add")
    public ResponseEntity<CartItemDTO> addOrUpdateItem(@AuthenticationPrincipal UserDetails userDetails,
                                                       @RequestBody CartItemRequest request) {
        Integer userId = extractUserIdFromUserDetails(userDetails);
        if (request.getQuantity() <= 0) {
            return ResponseEntity.badRequest().build();
        }
        CartItemDTO dto = cartService.addOrUpdateCartItem(userId, request);
        return ResponseEntity.ok(dto);
    }

    // Cập nhật số lượng chính xác
    @PutMapping("/update/{id}")
    public ResponseEntity<CartItemDTO> updateItem(@AuthenticationPrincipal UserDetails userDetails,
                                                  @PathVariable Long id,
                                                  @RequestBody CartItemRequest request) {
        if (request.getQuantity() <= 0) {
            return ResponseEntity.badRequest().build();
        }
        CartItemDTO dto = cartService.updateCartItemQuantity(id, request);
        return ResponseEntity.ok(dto);
    }

    // Xóa sản phẩm trong giỏ hàng
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteItem(@AuthenticationPrincipal UserDetails userDetails,
                                        @PathVariable Long id) {
        cartService.deleteCartItem(id);
        return ResponseEntity.ok().build();
    }


    private Integer extractUserIdFromUserDetails(UserDetails userDetails) {
        System.out.println("UserDetails class: " + (userDetails == null ? "null" : userDetails.getClass().getName()));

        if (userDetails instanceof CustomUserDetails custom) {
            return custom.getUserID();
        }
        throw new IllegalArgumentException("Invalid user details");
    }

}
