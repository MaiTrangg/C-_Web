package com.example.be_shopbangiay.Client.service;

import com.example.be_shopbangiay.Client.entity.Role;
import com.example.be_shopbangiay.Client.entity.User;
import com.example.be_shopbangiay.Client.repository.RoleRepository;
import com.example.be_shopbangiay.Client.repository.UserRepository;
import com.example.be_shopbangiay.Client.security.JwtUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class FacebookLoginService {

     UserRepository userRepository;

     RoleRepository roleRepository;

     JwtUtil jwtUtil;

    public String loginWithFacebook(String accessToken) {
        String url = "https://graph.facebook.com/me?fields=id,name,email&access_token=" + accessToken;
        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> fbData;
        try {
            fbData = restTemplate.getForObject(url, Map.class);
        } catch (Exception e) {
            throw new RuntimeException("Invalid Facebook token");
        }

        String email = (String) fbData.get("email");
        String name = (String) fbData.get("name");

        if (email == null || name == null) {
            throw new RuntimeException("Facebook email permission required");
        }

        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setUsername(name);
            newUser.setPassword("facebook"); // optional, không cần mật khẩu
            Role defaultRole = roleRepository.findByName("user").orElseThrow();
            newUser.setRole(defaultRole);
            return userRepository.save(newUser);
        });

        return jwtUtil.generateToken(user.getEmail());
    }
}

