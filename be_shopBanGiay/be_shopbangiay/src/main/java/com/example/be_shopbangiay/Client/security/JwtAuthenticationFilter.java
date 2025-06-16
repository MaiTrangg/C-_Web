package com.example.be_shopbangiay.Client.security;

import com.example.be_shopbangiay.Client.service.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

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
                || path.contains("/api/voucher/list")
                || path.equals("/favicon.ico")


        ) {
            filterChain.doFilter(request, response);
            return;
        }

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            System.out.println("Token: " + token);

//            if (jwtUtil.validateToken(token)) {
//                //  Token hợp lệ → cho phép đi tiếp, không cần đặt vào SecurityContext
//                filterChain.doFilter(request, response);
//                return;
//            }
//            if (jwtUtil.validateToken(token)) {
//                String username = jwtUtil.extractUsername(token);
//                String role = jwtUtil.extractRole(token);
//
//                UsernamePasswordAuthenticationToken authToken =
//                        new UsernamePasswordAuthenticationToken(
//                                username,
//                                null,
//                                List.of(new SimpleGrantedAuthority(role))
//                        );
//
//                SecurityContextHolder.getContext().setAuthentication(authToken);
//                filterChain.doFilter(request, response);
//                return;
//            }
            if (jwtUtil.validateToken(token)) {
                String username = jwtUtil.extractUsername(token);

                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                SecurityContextHolder.getContext().setAuthentication(authToken);
                filterChain.doFilter(request, response);
                return;
            }
        }


//    }
//        }

        //  Không có token hoặc token không hợp lệ
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or missing token");
    }
}
