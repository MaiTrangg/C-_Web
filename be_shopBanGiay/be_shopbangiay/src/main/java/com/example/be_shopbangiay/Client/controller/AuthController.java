package com.example.be_shopbangiay.Client.controller;

import com.example.be_shopbangiay.Client.service.FacebookLoginService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthController {
     FacebookLoginService facebookLoginService;

    @PostMapping("/facebook")
    public ResponseEntity<?> facebookLogin(@RequestBody Map<String, String> body) {
        String accessToken = body.get("accessToken");
        System.out.println("Token nhận được: " + accessToken);
        if (accessToken == null || accessToken.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Missing Facebook access token"));
        }

        try {
            String jwtToken = facebookLoginService.loginWithFacebook(accessToken);
            return ResponseEntity.ok(Map.of("token", jwtToken));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", e.getMessage()));
        }
    }

}
