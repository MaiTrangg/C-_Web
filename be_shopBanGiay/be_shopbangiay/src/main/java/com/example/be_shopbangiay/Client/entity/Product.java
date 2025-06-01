package com.example.be_shopbangiay.Client.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "products")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;

    @Column(name = "short_description")
    String shortDescription;

    String description;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonManagedReference
    Category category;

     BigDecimal price;

     BigDecimal discount;

    @Column(name = "is_active")
     Boolean isActive;

    @Column(name = "created_at")
     LocalDateTime createdAt;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    List<ProductVariant> variants;

//    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
//     List<ProductColorImage> colorImages;

    // getters, setters
}

