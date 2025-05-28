package com.example.be_shopbangiay.Client.repository;

import com.example.be_shopbangiay.Client.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> { // Kiểu ID của Role là Integer

    // Optional: Thêm phương thức tìm theo tên nếu bạn muốn chuyển sang cách này sau này
    Optional<Role> findByName(String name);

}