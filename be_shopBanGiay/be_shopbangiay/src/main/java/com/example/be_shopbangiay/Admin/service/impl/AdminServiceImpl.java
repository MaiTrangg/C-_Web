package com.example.be_shopbangiay.Admin.service.impl;

import com.example.be_shopbangiay.Client.entity.Role;
import com.example.be_shopbangiay.Client.entity.User;
import com.example.be_shopbangiay.Client.repository.RoleRepository;
import com.example.be_shopbangiay.Client.repository.UserRepository;
import com.example.be_shopbangiay.Admin.service.AdminService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    @Override
    public void updateUserRole(int userId, String roleName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new EntityNotFoundException("Role not found: " + roleName));

        user.setRole(role);
        userRepository.save(user);
    }

}
