package com.example.be_shopbangiay.Client.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)

public class ProductVariantDTO {
     Long id;
     String sku;
     String size;
     String color;
     BigDecimal price;
     Integer stock;
     String url;

}
