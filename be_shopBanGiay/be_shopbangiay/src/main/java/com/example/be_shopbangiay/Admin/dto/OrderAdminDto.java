package com.example.be_shopbangiay.Admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderAdminDto {
    private Long id;
    private Integer userId;
    private String receiverName;
    private String phone;
    private String shippingAddress;
    private String status;
    private String paymentMethod;
    private BigDecimal totalAmount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

