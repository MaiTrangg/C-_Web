package com.example.be_shopbangiay.Client.service;

import com.example.be_shopbangiay.Client.dto.OrderRequest;
import com.example.be_shopbangiay.Client.dto.OrderResponse;
import com.example.be_shopbangiay.Client.entity.CartItem;
import com.example.be_shopbangiay.Client.entity.Order;
import com.example.be_shopbangiay.Client.entity.OrderItem;
import com.example.be_shopbangiay.Client.entity.User;
import com.example.be_shopbangiay.Client.mapper.OrderMapper;
import com.example.be_shopbangiay.Client.repository.CartItemRepository;
import com.example.be_shopbangiay.Client.repository.OrderItemRepository;
import com.example.be_shopbangiay.Client.repository.OrderRepository;
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
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final OrderMapper orderMapper;

    public OrderResponse placeOrder(int userId, OrderRequest request) {
        // Lấy thông tin user, nếu không có thì ném lỗi
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        // Lấy giỏ hàng của user
        List<CartItem> cartItems = cartItemRepository.findByUser_UserID(userId);

        if (cartItems.isEmpty()) {
            throw new IllegalStateException("Giỏ hàng trống");
        }

        // Tính tổng tiền đơn hàng
        BigDecimal totalAmount = cartItems.stream()
                .map(item -> item.getProductVariant().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Tạo order mới
        Order order = Order.builder()
                .user(user)
                .receiverName(request.getReceiverName())
                .phone(request.getPhone())
                .shippingAddress(request.getShippingAddress())
                .paymentMethod(request.getPaymentMethod())
                .totalAmount(totalAmount)
                .status("Chờ xác nhận")
                .paymentStatus("cho thanh toan")
                .build();

        Order savedOrder = orderRepository.save(order);

        // Tạo danh sách orderItems từ cartItems
        List<OrderItem> orderItems = cartItems.stream()
                .map(cartItem -> OrderItem.builder()
                        .order(savedOrder)
                        .productVariant(cartItem.getProductVariant())
                        .quantity(cartItem.getQuantity())
                        .price(cartItem.getProductVariant().getPrice())
                        .color(cartItem.getProductVariant().getColor())
                        .size(cartItem.getProductVariant().getSize())
                        .imageUrl(cartItem.getProductVariant().getUrl())
                        .build()
                ).collect(Collectors.toList());

        // Lưu tất cả orderItems vào DB
        orderItemRepository.saveAll(orderItems);

        // Xóa giỏ hàng sau khi đặt đơn
        cartItemRepository.deleteByUserId(userId);

        // Map order entity sang response DTO trả về client
        return orderMapper.toResponse(savedOrder);
    }

    @Transactional
    public void updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));
        order.setPaymentStatus(status);
        orderRepository.save(order);
    }



}
