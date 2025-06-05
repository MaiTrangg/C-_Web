package com.example.be_shopbangiay.Client.controller;

import com.example.be_shopbangiay.Client.dto.CustomUserDetails;
import com.example.be_shopbangiay.Client.dto.OrderRequest;
import com.example.be_shopbangiay.Client.dto.OrderResponse;
import com.example.be_shopbangiay.Client.entity.Order;
import com.example.be_shopbangiay.Client.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/checkout")
    public ResponseEntity<OrderResponse> placeOrder(
            @RequestBody OrderRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {

        Integer userId = extractUserIdFromUserDetails(userDetails);
        OrderResponse response = orderService.placeOrder(userId, request);
        return ResponseEntity.ok(response);
    }


    private Integer extractUserIdFromUserDetails(UserDetails userDetails) {
        System.out.println("UserDetails class: " + (userDetails == null ? "null" : userDetails.getClass().getName()));

        if (userDetails instanceof CustomUserDetails custom) {
            return custom.getUserID();
        }
        throw new IllegalArgumentException("Invalid user details");
    }



}