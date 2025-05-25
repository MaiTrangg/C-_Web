package com.example.be_shopbangiay.Client.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        // Cho phép các API không cần xác thực

        String path = request.getRequestURI();
        if (path.contains("/api/user/login") || path.contains("/api/user/registration")
                || path.contains("/api/user/forgot-password")
                || path.contains("/api/user/reset-password")
                ||path.matches("^/api/products/categories(/.*)?$")
                ||path.matches("^/api/products(/.*)?$")
                ||path.matches("/api/categories")
                ||path.matches("/api/upload/image")
                ||path.matches("/api/products/search")
                ||path.matches("/api/auth/facebook")
                || path.contains("/oauth2")
                || path.startsWith("/login")
                || path.startsWith("/oauth2/success")
                || path.equals("/favicon.ico")

        ) {
            filterChain.doFilter(request, response);
            return;
        }

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            if (jwtUtil.validateToken(token)) {
                //  Token hợp lệ → cho phép đi tiếp, không cần đặt vào SecurityContext
                filterChain.doFilter(request, response);
                return;
            }
        }

        //  Không có token hoặc token không hợp lệ
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or missing token");
    }
}
