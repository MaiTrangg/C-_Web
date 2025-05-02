package com.example.be_shopbangiay.Client.controller;

import com.example.be_shopbangiay.Client.service.UploadImageFileService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
public class UploadImageFileController {

    private final UploadImageFileService uploadImageFileService;
    @PostMapping("/image")
    public String uploadImage(@RequestParam("file")MultipartFile file) throws IOException{
        return uploadImageFileService.uploadImage(file);
    }
}
