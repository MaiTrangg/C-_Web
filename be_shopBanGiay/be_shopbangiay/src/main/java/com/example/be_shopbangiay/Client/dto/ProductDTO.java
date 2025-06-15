package com.example.be_shopbangiay.Client.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDTO {
     Long id;
     String name;
     String shortDescription;
     String description;
     CategoryDTO category;
     BigDecimal price;
     BigDecimal discount;
     Boolean isActive;
     LocalDateTime createdAt;
     @Builder.Default
     List<ProductVariantDTO> variants = new ArrayList<>();
//     List<ProductColorImageDTO> colorImages;
}
