
package com.example.be_shopbangiay.Client.config;


import com.example.be_shopbangiay.Client.security.JwtAuthenticationFilter;
import com.example.be_shopbangiay.Client.security.JwtUtil;
import com.example.be_shopbangiay.Client.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
                    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    config.setAllowedHeaders(Arrays.asList("*"));
                    config.setAllowCredentials(true);
                    return config;
                }))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/products/categories/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/categories").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/products/search").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/cart/items").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/cart/add").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/orders/checkout").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/payment/create_payment").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/payment/vnpay_return").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/upload/image").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/user/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/user/registration").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/user/forgot-password").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/user/reset-password").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/facebook").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/api/cart/delete/**").authenticated()
                        .requestMatchers("/oauth2/**", "/login/**", "/oauth2/success").permitAll()
//                        .requestMatchers(HttpMethod.GET, "/api/user/infoUser").permitAll()
//                        .requestMatchers(HttpMethod.PUT, "/api/user/update").permitAll()
                       .requestMatchers(HttpMethod.GET, "/api/user/infoUser").authenticated()
                       .requestMatchers(HttpMethod.PUT, "/api/user/update").authenticated()
                       .requestMatchers(HttpMethod.GET, "/api/user/orders").authenticated()
                       .requestMatchers(HttpMethod.GET, "/api/user/ordersDetail").authenticated()
                       .requestMatchers(HttpMethod.GET, "/api/cart/apply-voucher").authenticated()
                       .requestMatchers(HttpMethod.GET, "/api/voucher/list").permitAll()
                       .requestMatchers(HttpMethod.GET, "/api/voucher/check").authenticated()




                                .requestMatchers("/api/admin/**").hasRole("ADMIN")
//                        .requestMatchers("/api/cart/add").authenticated()


                        .anyRequest().authenticated()
                )
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
                        })
                        .accessDeniedHandler((request, response, accessDeniedException) -> {
                            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Forbidden");
                        })
                )

                .oauth2Login(oauth2 -> oauth2
                        .loginPage("/oauth2/authorization/google")
                        .defaultSuccessUrl("/oauth2/success", true)
                )

                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public HttpFirewall allowSemicolonHttpFirewall() {
        StrictHttpFirewall firewall = new StrictHttpFirewall();
        firewall.setAllowSemicolon(true);
        return firewall;
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer(HttpFirewall firewall) {
        return web -> web.httpFirewall(firewall);
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
