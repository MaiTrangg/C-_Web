package com.example.be_shopbangiay.Client.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemDTO {
    private Long id;
    private Long productVariantId;
    private Integer quantity;
}
