package com.example.be_shopbangiay.Client.service.Impl;

import com.example.be_shopbangiay.Client.dto.UserDto;
import com.example.be_shopbangiay.Client.entity.User;
import com.example.be_shopbangiay.Client.repository.UserRepository;
import com.example.be_shopbangiay.Client.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Override
    public void save(UserDto userDto) {
        String role = userDto.getRole();
        if (role == null || (!role.equals("admin") && !role.equals("user"))) {
            role = "user"; // fallback nếu không gửi hoặc sai định dạng
        }

        User user = new User(
                userDto.getUsername(),
                userDto.getEmail(),
                userDto.getTelephone(),
                userDto.getPassword(),
                role
        );
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
    public boolean checkUsernameExists(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }
}
