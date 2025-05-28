package com.example.be_shopbangiay.Client.security;

import com.example.be_shopbangiay.Client.entity.User;
import com.example.be_shopbangiay.Client.repository.UserRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {
    @Autowired
    private UserRepository userRepository;
    private final SecretKey secretKey;
    private final long expiration;

    public JwtUtil(@Value("${spring.jwt.secret}") String secret,
                   @Value("${spring.jwt.expiration}") long expiration) {
        byte[] decodedKey = Base64.getDecoder().decode(secret);
        this.secretKey = Keys.hmacShaKeyFor(decodedKey);
        this.expiration = expiration;
    }

        public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }


    public String generateTokenWithUsername(String username) {
        User user = userRepository.findUserByUsername(username); // hoặc getUserByUsername
        String role = "ROLE_" + user.getRole().getName().toUpperCase(); // → "ROLE_ADMIN"

        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    // Dùng cho đăng nhập thường - subject là username
//    public String generateTokenWithUsername(String username) {
//        return Jwts.builder()
//                .setSubject(username)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + expiration))
//                .signWith(secretKey, SignatureAlgorithm.HS256)
//                .compact();
//    }

    public String generateTokenWithUsernameAndEmail(String username, String email) {
        return Jwts.builder()
                .setSubject(username) // subject là username
                .claim("email", email) // email vẫn có trong claims
                .claim("username", username) // thêm rõ ràng để frontend đọc
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }


    // mới
    public String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public String extractRole(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.get("role", String.class);
    }

    public String extractUsername(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();

        if (claims.containsKey("username")) {
            return claims.get("username", String.class);
        } else {
            return claims.getSubject();
        }
    }


    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}

