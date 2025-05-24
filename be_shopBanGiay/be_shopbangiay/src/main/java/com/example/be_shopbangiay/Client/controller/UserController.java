package com.example.be_shopbangiay.Client.controller;

import com.example.be_shopbangiay.Client.dto.UserDto;
import com.example.be_shopbangiay.Client.entity.User;
import com.example.be_shopbangiay.Client.security.JwtUtil;
import com.example.be_shopbangiay.Client.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

//@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // test trên REST api
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/registration")
    public ResponseEntity<?> registerUserAccount(@Valid @RequestBody UserDto userDto, BindingResult result) {
        if (result.hasErrors()) {
            StringBuilder errors = new StringBuilder();
            result.getFieldErrors().forEach(error ->
                    errors.append(error.getField()).append(": ").append(error.getDefaultMessage()).append(". ")
            );
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors.toString());
        }

        // Kiểm tra mật khẩu mạnh
        String password = userDto.getPassword();
        boolean containsStar = password.contains("*");
        boolean containsSlash = password.contains("/");
        boolean hasOneSpecial = (containsStar ^ containsSlash);
        boolean hasUpperCase = password.matches(".*[A-Z].*");
        if (!(hasUpperCase || hasOneSpecial)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mật khẩu yếu: nên chứa ít nhất 1 ký tự đặc biệt (* hoặc /), hoặc ít nhất 1 chữ cái viết hoa");
        }
    

        if (userService.checkUserByEmail(userDto.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }

        if (userService.checkUsernameExists(userDto.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }

        // Mã hóa và lưu
        String encodedPassword = passwordEncoder.encode(password);
        userDto.setPassword(encodedPassword);
        userService.save(userDto);

        return ResponseEntity.ok("User registered successfully");
    }



    // Lấy thông tin user theo email
    @GetMapping("/email/{email}")
    @ResponseBody
    public User getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    // Lấy thông tin user theo username
    @GetMapping("/username/{username}")
    @ResponseBody
    public User getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

    // api dang nhap
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDto loginDto) {
        User user = userService.getUserByUsername(loginDto.getUsername());
        if (user == null || !passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        //  In ra thông tin user
        System.out.println(" User logged in successfully:");
        System.out.println("Username: " + user.getUsername());
        System.out.println("Email: " + user.getEmail());
        System.out.println("Role: " + user.getRole().getName());

//        String token = jwtUtil.generateToken(user.getUsername());
        String token = jwtUtil.generateTokenWithUsername(user.getUsername());

        return ResponseEntity.ok().body(Collections.singletonMap("token", token));

    }

}
