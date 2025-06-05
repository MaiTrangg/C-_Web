package com.example.be_shopbangiay.Client.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentOrderRequest {
     int amount;
     String bankCode;
     String language;
     OrderRequest orderRequest;
}
