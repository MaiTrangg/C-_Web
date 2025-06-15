package com.example.be_shopbangiay.Admin.service;

import com.example.be_shopbangiay.Client.dto.ProductVariantDTO;
import com.example.be_shopbangiay.Client.entity.Product;
import com.example.be_shopbangiay.Client.entity.ProductVariant;
import com.example.be_shopbangiay.Client.mapper.ProductVariantMapper;
import com.example.be_shopbangiay.Client.repository.ProductRepository;
import com.example.be_shopbangiay.Client.repository.ProductVariantRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AD_VariantService {
     ProductRepository productRepository;
     ProductVariantMapper mapper;
     ProductVariantRepository variantRepository;


    public ProductVariantDTO add(Long productId,ProductVariantDTO dto) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

        ProductVariant variant = mapper.toEntity(dto);
        variant.setProduct(product);
        variant.setIsActive(true);

        return mapper.toProductVariantDTO(variantRepository.save(variant));
    }

    public ProductVariantDTO update(Long id, ProductVariant dto) {
        ProductVariant variant = variantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Variant not found"));
        variant.setSize(dto.getSize());
        variant.setColor(dto.getColor());
        variant.setPrice(dto.getPrice());
        variant.setStock(dto.getStock());
        variant.setSku(dto.getSku());
        variant.setUrl(dto.getUrl());
        return mapper.toProductVariantDTO(variantRepository.save(variant));
    }

    public void deleteSoft(Long id) {
        ProductVariant variant = variantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Variant not found"));
        variant.setIsActive(false);
        variantRepository.save(variant);
    }
}
