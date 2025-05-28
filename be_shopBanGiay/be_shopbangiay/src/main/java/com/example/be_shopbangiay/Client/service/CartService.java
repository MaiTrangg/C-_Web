package com.example.be_shopbangiay.Client.service;

import com.example.be_shopbangiay.Client.dto.CartItemDTO;
import com.example.be_shopbangiay.Client.dto.CartItemRequest;
import com.example.be_shopbangiay.Client.entity.CartItem;
import com.example.be_shopbangiay.Client.mapper.CartItemMapper;
import com.example.be_shopbangiay.Client.repository.CartItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final CartItemMapper cartItemMapper;

    // Lấy danh sách giỏ hàng user
    public List<CartItemDTO> getCartItemsByUser(Integer userId) {
        return cartItemRepository.findByUserId(userId).stream()
                .map(cartItemMapper::toDto)
                .collect(Collectors.toList());
    }

    // Thêm hoặc cập nhật số lượng (nếu đã có)
    public CartItemDTO addOrUpdateCartItem(Integer userId, CartItemRequest request) {
        CartItem cartItem = cartItemRepository.findByUserIdAndProductVariantId(userId, request.getProductVariantId())
                .orElse(CartItem.builder()
                        .userId(userId)
                        .productVariantId(request.getProductVariantId())
                        .quantity(0)
                        .build());

        cartItem.setQuantity(cartItem.getQuantity() + request.getQuantity());
        CartItem saved = cartItemRepository.save(cartItem);
        return cartItemMapper.toDto(saved);
    }

    // Cập nhật số lượng chính xác
    public CartItemDTO updateCartItemQuantity(Long id, CartItemRequest request) {
        CartItem cartItem = cartItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart item not found with id " + id));
        cartItem.setQuantity(request.getQuantity());
        CartItem saved = cartItemRepository.save(cartItem);
        return cartItemMapper.toDto(saved);
    }

    // Xóa sản phẩm trong giỏ
    public void deleteCartItem(Long id) {
        if (!cartItemRepository.existsById(id)) {
            throw new RuntimeException("Cart item not found with id " + id);
        }
        cartItemRepository.deleteById(id);
    }
}

