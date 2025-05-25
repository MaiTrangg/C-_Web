package com.example.be_shopbangiay.Client.service.impl;
import com.example.be_shopbangiay.Client.dto.UserDto;
import com.example.be_shopbangiay.Client.entity.Role; // Import entity Role
import com.example.be_shopbangiay.Client.entity.User;
import com.example.be_shopbangiay.Client.repository.RoleRepository;
import com.example.be_shopbangiay.Client.repository.UserRepository;
import com.example.be_shopbangiay.Client.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Override
    public void save(UserDto userDto) {
        // 1. Xác định Role ID
        Integer roleId;
        String requestedRole = userDto.getRole();

        if ("admin".equalsIgnoreCase(requestedRole)) {
            roleId = 0;
        } else {
            roleId = 1; // Mặc định là user
        }

        // 2. Lấy đối tượng Role từ database bằng ID
        Role userRole = roleRepository.findById(roleId)
                .orElseThrow(() -> new EntityNotFoundException("Required Role not found (ID: " + roleId + ")" +
                        ". Please ensure roles with ID 0 and 1 exist."));

        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setTelephone(userDto.getTelephone());
        user.setPassword(userDto.getPassword());
        user.setRole(userRole);

        userRepository.save(user);
    }

    @Override
    public boolean checkPasswordUser(String email, String password) {
        User user = userRepository.findUserByEmail(email);
        if(user.getPassword().equals(password)) return true;
        return false;
    }

    @Override
    public boolean checkUserByEmail(String email) {
        User user = userRepository.findUserByEmail(email);
        if(user==null) return false;
        return true;
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.getUserByEmail(email);
    }

    @Override
    public User getUserName(String username) {
        return userRepository.getUserByUsername(username);
    }


    @Override
    public boolean checkUsernameExists(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    @Override
    public void updateUser(User user) {
        userRepository.save(user);
    }


}
