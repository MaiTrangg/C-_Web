package com.example.be_shopbangiay.Client.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApplyVoucherResponse {
    private double totalCart;
    private double discountAmount;
    private double finalAmount;
    private int discountPercent;
}
