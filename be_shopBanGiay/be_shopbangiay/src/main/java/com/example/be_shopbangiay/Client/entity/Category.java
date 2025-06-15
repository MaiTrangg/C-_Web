package com.example.be_shopbangiay.Client.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Table(name = "categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id ;
    @Column(name = "name", nullable = false)
    String name;
    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Category parentCategory;
    @Column(name = "is_active")
    Boolean isActive;


    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
//    @JsonBackReference
    @JsonManagedReference
    private List<Product> products;



}
