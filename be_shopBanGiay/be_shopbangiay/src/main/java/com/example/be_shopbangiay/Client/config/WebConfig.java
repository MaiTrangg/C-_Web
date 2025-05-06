package com.example.be_shopbangiay.Client.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") // Áp dụng CORS cho tất cả các endpoint bắt đầu với /api/
                        .allowedOrigins("http://localhost:3000") // Cho phép các yêu cầu từ địa chỉ này
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // Các phương thức HTTP được phép
                        .allowedHeaders("*") // Cho phép tất cả các headers
                        .allowCredentials(true); // Cho phép gửi cookie và thông tin xác thực
            }
        };
    }
}

