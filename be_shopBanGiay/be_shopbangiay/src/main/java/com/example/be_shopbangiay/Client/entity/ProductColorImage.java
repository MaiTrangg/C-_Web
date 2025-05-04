package com.example.be_shopbangiay.Client.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "product_color_images")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductColorImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "color", nullable = false)
    private String color;

    @Column(name = "url", nullable = false)
    private String url;

    @Column(name = "is_main", nullable = false)
    private Boolean isMain;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder;

}
