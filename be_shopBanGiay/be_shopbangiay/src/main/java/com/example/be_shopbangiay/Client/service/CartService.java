package com.example.be_shopbangiay.Client.service;

import com.example.be_shopbangiay.Client.dto.CartItemDTO;
import com.example.be_shopbangiay.Client.dto.CartItemRequest;
import com.example.be_shopbangiay.Client.entity.CartItem;
import com.example.be_shopbangiay.Client.entity.ProductVariant;
import com.example.be_shopbangiay.Client.mapper.CartItemMapper;
import com.example.be_shopbangiay.Client.repository.CartItemRepository;
import com.example.be_shopbangiay.Client.repository.ProductVariantRepository;
import com.example.be_shopbangiay.Client.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class    CartService {

    private final CartItemRepository cartItemRepository;
    private final CartItemMapper cartItemMapper;
    private final UserRepository userRepository;
    private final ProductVariantRepository productVariantRepository;


    // Lấy danh sách giỏ hàng user
    public List<CartItemDTO> getCartItemsByUser(Integer userId) {
        return cartItemRepository.findByUser_UserID(userId).stream()
                .map(cartItemMapper::toDto)
                .collect(Collectors.toList());
    }

    // Thêm hoặc cập nhật số lượng (nếu đã có)
    public CartItemDTO addOrUpdateCartItem(Integer userId, CartItemRequest request) {
        System.out.println("111111111"+request.getProductVariantId());
        System.out.println("111111111"+request.getQuantity());
        CartItem cartItem = cartItemRepository.findByUser_UserIDAndProductVariant_Id(userId, request.getProductVariantId())
                .orElseGet(() -> {
                    return CartItem.builder()
                            .user(userRepository.findById(userId).orElseThrow())  // cần inject thêm UserRepository
                            .productVariant(productVariantRepository.findById(request.getProductVariantId()).orElseThrow())
                            .quantity(0)
                            .build();
                });


        cartItem.setQuantity(cartItem.getQuantity() + request.getQuantity());
//        System.out.println("111111112"+cartItem.getProductVariantId());
//        System.out.println("111111112"+cartItem.getQuantity());
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

    // tính tổng cart
    public double calculateTotalCart(Integer userId) {
        return cartItemRepository.findByUser_UserID(userId)
                .stream()
                .map(item -> item.getProductVariant().getPrice()
                        .multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .doubleValue();  // vì bạn muốn trả về double
    }

}

