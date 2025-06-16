package com.example.be_shopbangiay.Admin.controller;

import com.example.be_shopbangiay.Admin.dto.OrderAdminDto;
import com.example.be_shopbangiay.Admin.dto.OrderItemAdminDto;
import com.example.be_shopbangiay.Client.dto.UserDto;
import com.example.be_shopbangiay.Client.entity.Order;
import com.example.be_shopbangiay.Client.entity.OrderItem;
import com.example.be_shopbangiay.Client.entity.User;
import com.example.be_shopbangiay.Admin.service.AdminService;
import com.example.be_shopbangiay.Client.repository.OrderItemRepository;
import com.example.be_shopbangiay.Client.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        List<UserDto> userDtos = adminService.getAllUsers().stream()
                .filter(user -> "user".equalsIgnoreCase(user.getRole().getName()))
                .map(UserDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(userDtos);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/user-role/{userId}")
    public ResponseEntity<?> updateUserRole(@PathVariable int userId, @RequestBody Map<String, String> payload) {
        String role = payload.get("role");
        if (role == null || role.isBlank()) {
            return ResponseEntity.badRequest().body("Missing role");
        }

        adminService.updateUserRole(userId, role);
        return ResponseEntity.ok("User role updated successfully");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable int userId) {
        adminService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/orders")
    public ResponseEntity<?> getAllOrders() {
        List<Order> orders = orderRepository.findAll();

        List<OrderAdminDto> orderDtos = orders.stream().map(order -> new OrderAdminDto(
                order.getId(),
                order.getUser().getUserID(),
                order.getReceiverName(),
                order.getPhone(),
                order.getShippingAddress(),
                order.getStatus(),
                order.getPaymentMethod(),
                order.getTotalAmount(),
                order.getCreatedAt(),
                order.getUpdatedAt()
        )).toList();

        return ResponseEntity.ok(orderDtos);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/orders/{orderId}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId, @RequestBody Map<String, String> payload) {
        String newStatus = payload.get("status");
        if (newStatus == null || newStatus.isBlank()) {
            return ResponseEntity.badRequest().body("Missing status");
        }

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));

        List<String> statusFlow = List.of(
                "Chờ xác nhận",
                "Đã xác nhận",
                "Đang giao",
                "Hoàn tất"
        );

        String currentStatus = order.getStatus();

        // Không cho hủy nếu đã hoàn tất
        if (currentStatus.equals("Hoàn tất") && newStatus.equals("Đã huỷ")) {
            return ResponseEntity.badRequest().body("Cannot cancel a completed order");
        }

        // Nếu không phải chuyển sang 'Đã huỷ', thì phải đúng theo luồng tiến
        if (!newStatus.equals("Đã huỷ")) {
            int currentIndex = statusFlow.indexOf(currentStatus);
            int newIndex = statusFlow.indexOf(newStatus);

            if (currentIndex == -1 || newIndex == -1) {
                return ResponseEntity.badRequest().body("Invalid status value");
            }

            if (newIndex < currentIndex) {
                return ResponseEntity.badRequest().body("Cannot revert to a previous status");
            }
        }

        order.setStatus(newStatus);
        orderRepository.save(order);

        return ResponseEntity.ok("Order status updated successfully");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/orders/{orderId}/items")
    public ResponseEntity<?> getOrderItems(@PathVariable Long orderId) {
        List<OrderItem> items = orderItemRepository.findByOrder_Id(orderId);

        List<OrderItemAdminDto> result = items.stream().map(item -> new OrderItemAdminDto(
                item.getId(),
                item.getProductVariant().getProduct().getName(),
                item.getColor(),
                item.getSize(),
                item.getQuantity(),
                item.getPrice()
        )).toList();

        return ResponseEntity.ok(result);
    }

    // lọc đơn theo ngày, tháng, năm
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/orders/filter")
    public ResponseEntity<?> filterOrders(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) Integer day
    ) {
        List<Order> orders = orderRepository.findAll();

        if (year != null) {
            orders = orders.stream()
                    .filter(o -> o.getCreatedAt().getYear() == year)
                    .collect(Collectors.toList());
        }
        if (month != null) {
            orders = orders.stream()
                    .filter(o -> o.getCreatedAt().getMonthValue() == month)
                    .collect(Collectors.toList());
        }
        if (day != null) {
            orders = orders.stream()
                    .filter(    o -> o.getCreatedAt().getDayOfMonth() == day)
                    .collect(Collectors.toList());
        }

        // Convert sang DTO
        List<OrderAdminDto> dtos = orders.stream()
                .map(order -> new OrderAdminDto(
                        order.getId(),
                        order.getUser().getUserID(),
                        order.getReceiverName(),
                        order.getPhone(),
                        order.getShippingAddress(),
                        order.getStatus(),
                        order.getPaymentMethod(),
                        order.getTotalAmount(),
                        order.getCreatedAt(),
                        order.getUpdatedAt()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

    // thống kê
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/orders/statistics")
    public ResponseEntity<?> getOrderStatistics(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) Integer day) {

        List<Order> orders = orderRepository.findAll();

        if (year != null) {
            orders = orders.stream()
                    .filter(order -> order.getCreatedAt().getYear() == year)
                    .collect(Collectors.toList());
        }

        if (month != null) {
            orders = orders.stream()
                    .filter(order -> order.getCreatedAt().getMonthValue() == month)
                    .collect(Collectors.toList());
        }

        if (day != null) {
            orders = orders.stream()
                    .filter(order -> order.getCreatedAt().getDayOfMonth() == day)
                    .collect(Collectors.toList());
        }

        Map<String, Long> statusCount = orders.stream()
                .collect(Collectors.groupingBy(Order::getStatus, Collectors.counting()));

        List<Map<String, Object>> result = statusCount.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("status", entry.getKey());
                    map.put("count", entry.getValue());
                    return map;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }

}

