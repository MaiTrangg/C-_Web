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
                ||path.matches("^/api/products/categories(/.*)?$")
                ||path.matches("^/api/products(/.*)?$")
                ||path.matches("/api/categories")
                ||path.matches("/api/auth/facebook")
        ) {
            filterChain.doFilter(request, response);
            return;
        }

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (jwtUtil.validateToken(token)) {
                // TODO: Có thể đặt Authentication vào SecurityContext nếu cần
                filterChain.doFilter(request, response);
                return;
            }
        }

        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or missing token");
    }
}
