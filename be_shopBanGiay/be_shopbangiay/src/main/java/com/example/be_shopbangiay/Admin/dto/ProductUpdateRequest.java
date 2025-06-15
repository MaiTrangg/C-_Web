package com.example.be_shopbangiay.Admin.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductUpdateRequest {
     String name;
     String shortDescription;
     String description;
     BigDecimal price;
     Boolean isActive;
     Long categoryId;
}
