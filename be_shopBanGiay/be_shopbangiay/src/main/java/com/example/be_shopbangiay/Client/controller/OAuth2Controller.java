package com.example.be_shopbangiay.Client.controller;

import com.example.be_shopbangiay.Client.dto.UserDto;
import com.example.be_shopbangiay.Client.security.JwtUtil;
import com.example.be_shopbangiay.Client.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.IOException;

@Controller
public class OAuth2Controller {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/oauth2/success")
    public void oauth2Success(@AuthenticationPrincipal OAuth2User oAuth2User,
                              HttpServletResponse response) throws IOException {
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String username = (name != null) ? name : email.split("@")[0];

        if (!userService.checkUserByEmail(email)) {
            UserDto userDto = new UserDto();
            userDto.setEmail(email);
            userDto.setUsername(name != null ? name : email.split("@")[0]);
            userDto.setTelephone("0000000000");
            userDto.setPassword("OAuth2User123*");
            userDto.setRole("user");
            userService.save(userDto);
        }

//        String token = jwtUtil.generateTokenWithEmail(email, name != null ? name : email.split("@")[0]);
        String token = jwtUtil.generateTokenWithUsernameAndEmail(username, email);

//        response.sendRedirect("http://localhost:3000/home?token=" + token);
        response.sendRedirect("http://localhost:3000/login?token=" + token);
        System.out.println(" [OAuth2] name: " + name);
        System.out.println(" [OAuth2] email: " + email);
        System.out.println(" [OAuth2] token: " + token);

    }

}
