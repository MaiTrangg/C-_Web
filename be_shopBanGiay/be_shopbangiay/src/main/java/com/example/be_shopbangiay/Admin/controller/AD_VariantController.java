package com.example.be_shopbangiay.Admin.controller;

import com.example.be_shopbangiay.Admin.service.AD_VariantService;
import com.example.be_shopbangiay.Client.dto.ProductVariantDTO;
import com.example.be_shopbangiay.Client.entity.ProductVariant;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/variants")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AD_VariantController {
    AD_VariantService adVariantService;

    @PostMapping("/add/{productId}")
    public ResponseEntity<ProductVariantDTO> add(
            @PathVariable Long productId,
            @RequestBody ProductVariantDTO dto) {
        return ResponseEntity.ok(adVariantService.add(productId, dto));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProductVariantDTO> update(@PathVariable Long id, @RequestBody ProductVariant dto) {
        return ResponseEntity.ok(adVariantService.update(id, dto));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        adVariantService.deleteSoft(id);
        return ResponseEntity.noContent().build();
    }
}
