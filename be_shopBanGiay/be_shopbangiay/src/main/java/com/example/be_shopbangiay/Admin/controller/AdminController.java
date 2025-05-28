package com.example.be_shopbangiay.Admin.controller;

import com.example.be_shopbangiay.Client.dto.UserDto;
import com.example.be_shopbangiay.Client.entity.User;
import com.example.be_shopbangiay.Admin.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        List<UserDto> userDtos = adminService.getAllUsers().stream()
                .filter(user -> "user".equalsIgnoreCase(user.getRole().getName()))
                .map(UserDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(userDtos);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/user-role/{userId}")
    public ResponseEntity<?> updateUserRole(@PathVariable int userId, @RequestBody Map<String, String> payload) {
        String role = payload.get("role");
        if (role == null || role.isBlank()) {
            return ResponseEntity.badRequest().body("Missing role");
        }

        adminService.updateUserRole(userId, role);
        return ResponseEntity.ok("User role updated successfully");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable int userId) {
        adminService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully");
    }
}

