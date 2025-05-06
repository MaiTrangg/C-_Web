package com.example.be_shopbangiay.Client.service;

import com.example.be_shopbangiay.Client.dto.UserDto;
import com.example.be_shopbangiay.Client.entity.User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface UserService {
    void save(UserDto userDto);
    boolean checkPasswordUser(String email, String password);
    boolean checkUserByEmail(String email);
    User getUserByEmail(String email);
    User getUserName(String username);
    boolean checkUsernameExists(String username);
    User getUserByUsername(String username);


}
