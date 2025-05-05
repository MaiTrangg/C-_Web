package com.example.be_shopbangiay.Client.repository;

import com.example.be_shopbangiay.Client.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;
@Repository

public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findByIsActiveTrue();

    List<Product> findByCategoryIdIn(List<Long> categoryIds);

}
