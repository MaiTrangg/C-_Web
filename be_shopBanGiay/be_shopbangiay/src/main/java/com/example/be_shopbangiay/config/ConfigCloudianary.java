package com.example.be_shopbangiay.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class ConfigCloudianary {
    @Bean
    public Cloudinary configKey(){
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "n07t21i7");
        config.put("api_key", "582123876129884");
        config.put("api_secret", "j-Qv5zwnaY8Auri13o-MIKHj4NI");
        return new Cloudinary(config);
    }
}
