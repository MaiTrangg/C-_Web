package com.example.be_shopbangiay.Client.dto;


import com.example.be_shopbangiay.Client.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {
    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    public int getUserID() {
        return user.getUserID(); // dùng đúng theo tên trong entity
    }

    public String getEmail() {
        return user.getEmail();
    }

    public String getRole() {
        return user.getRole().getName();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(() -> "ROLE_" + user.getRole().getName().toUpperCase());
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail(); // hoặc user.getUsername() nếu bạn login bằng username
    }

    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }

    public User getUser() {
        return user;
    }
}
