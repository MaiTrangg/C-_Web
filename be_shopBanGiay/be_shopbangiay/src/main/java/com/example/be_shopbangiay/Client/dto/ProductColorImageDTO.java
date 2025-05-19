package com.example.be_shopbangiay.Client.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)

public class ProductColorImageDTO {
     Long id;
     String color;
     String url;
     Boolean isMain;
     Integer sortOrder;
}
