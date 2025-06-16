package com.example.be_shopbangiay.Client.entity;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class OrderItemResponse {
    private Long productVariantId;
    private String color;
    private String size;
    private String imageUrl;
    private BigDecimal price;
    private Integer quantity;


}

