package com.example.be_shopbangiay.Client.repository;

import com.example.be_shopbangiay.Client.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    User getUserByEmail(String email);
    User getUserByUsername(String username);
    User findUserByEmail(String email);
    boolean existsByUsername(String username);
    User findUserByUsername(String username);
    Optional<User> findByEmail(String email);
}
