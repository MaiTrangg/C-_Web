package com.example.be_shopbangiay.Admin.service;

import com.example.be_shopbangiay.Client.entity.Role;
import com.example.be_shopbangiay.Client.entity.User;

import java.util.List;

public interface AdminService {
    List<User> getAllUsers();
    void deleteUser(int id);
    void updateUserRole(int userId, String roleName);
}
