package com.example.be_shopbangiay.Client.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@RestController
public class TestDbController {
    @Autowired
    private DataSource dataSource;

    @GetMapping("/test-connection")
    public String testConnection() {
        try (Connection conn = dataSource.getConnection()) {
            return "Kết nối DB thành công! AutoCommit = " + conn.getAutoCommit();
        } catch (SQLException e) {
            return "Lỗi kết nối DB: " + e.getMessage();
        }
    }

}
