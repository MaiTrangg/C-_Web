package com.example.be_shopbangiay.Admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class OrderItemAdminDto {
    private Long id;
    private String productName;
    private String color;
    private String size;
//    private String imageUrl;
    private Integer quantity;
    private BigDecimal price;
}
