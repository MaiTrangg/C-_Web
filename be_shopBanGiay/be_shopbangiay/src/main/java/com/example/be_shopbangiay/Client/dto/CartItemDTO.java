package com.example.be_shopbangiay.Client.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemDTO {
    private Long id;
    private ProductVariantDTO productVariant;
    private Integer quantity;
}
