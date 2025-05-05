package com.example.be_shopbangiay.Client.controller;

import com.example.be_shopbangiay.Client.dto.UserDto;
import com.example.be_shopbangiay.Client.entity.User;
import com.example.be_shopbangiay.Client.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

//@Controller
@RestController
@RequestMapping("/api")
public class UserRegistrationController {
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;
//    @ModelAttribute("userdto")
//    public UserDto userResgistrationDto(){
//        return new UserDto();
//    }
//    @GetMapping("/registration")
//    public String showRegistrationForm(){
//        return "/registration";
//    }

    //test trên giao diện
//    @PostMapping("/registration")
//    public String registerUserAccount(@ModelAttribute("userdto") UserDto userDto){
//        if(userService.checkUserByEmail(userDto.getEmail()))
//        {
//            return "redirect:/registration?emailexist";
//        }
//        if (userService.checkUsernameExists(userDto.getUsername())) {
//            return "redirect:/registration?usernameexist";
//        }
//
//        userService.save(userDto);
//        return "redirect:/registration?success";
//    }

    // test trên REST api
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/registration")
    public ResponseEntity<String> registerUserAccount(@RequestBody UserDto userDto){
        if(userService.checkUserByEmail(userDto.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }
        if (userService.checkUsernameExists(userDto.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }

        // Mã hóa mật khẩu
        String encodedPassword = passwordEncoder.encode(userDto.getPassword());
        userDto.setPassword(encodedPassword);

        userService.save(userDto);
        return ResponseEntity.ok("User registered successfully");
    }


    // Lấy thông tin user theo email
    @GetMapping("/user/email/{email}")
    @ResponseBody
    public User getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    // Lấy thông tin user theo username
    @GetMapping("/user/username/{username}")
    @ResponseBody
    public User getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }
}
