package com.example.be_shopbangiay.Client.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Entity
@Table(name = "product_variants")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductVariant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    /**
     * name = "product_id": Đây là tên cột trong bảng product_variants.
     * nullable = false: Không cho phép product_id null – tức là mỗi biến thể phải thuộc về một sản phẩm.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    /**
     * nullable = false: Bắt buộc phải có giá trị.
     * unique = true: Không được trùng lặp trong toàn bộ bảng product_variants.
     */
    @Column(name = "sku", nullable = false, unique = true)
    private String sku;

    @Column(name = "size")
    private String size;

    @Column(name = "color")
    private String color;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "stock")
    private int stock;

    @Column(name = "url")
    private String url;

    @Column(name = "is_active")
    Boolean isActive;

}
