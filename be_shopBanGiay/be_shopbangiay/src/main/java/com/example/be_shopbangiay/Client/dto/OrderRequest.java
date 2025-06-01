package com.example.be_shopbangiay.Client.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// OrderRequest.java (DTO nhận từ frontend)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
    private String receiverName;
    private String phone;
    private String shippingAddress;
    private String paymentMethod;
    private String note;
}
