package com.example.be_shopbangiay.Client.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userID;

    @Column(nullable = false, length = 255)
    private String username;

    @Column(nullable = false, length = 255, unique = true) // Email thường nên là unique
    private String email;

    @Column(length = 20)
    private String telephone;

    @Column(nullable = false, length = 255)
    private String password;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    public User(int userID, String username, String email, String telephone, String password, Role role) {
        this.userID = userID;
        this.username = username;
        this.email = email;
        this.telephone = telephone;
        this.password = password;
        this.role = role;
    }

    public User(String username, String email, String telephone, String password, Role role) {
        this.username = username;
        this.email = email;
        this.telephone = telephone;
        this.password = password;
        this.role = role;
    }

    public User() {
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}