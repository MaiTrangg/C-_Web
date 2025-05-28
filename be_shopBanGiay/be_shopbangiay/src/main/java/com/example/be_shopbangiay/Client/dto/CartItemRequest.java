package com.example.be_shopbangiay.Client.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemRequest {
    private Long productVariantId;
    private Integer quantity;
}

