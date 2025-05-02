package com.example.be_shopbangiay.Client.service.impl;

import ch.qos.logback.core.util.StringUtil;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.cloudinary.utils.StringUtils;
import com.example.be_shopbangiay.Client.service.UploadImageFileService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

@Service
//@AllArgsConstructor
@Slf4j
@RequiredArgsConstructor
public class UploadImageFileServiceImpl implements UploadImageFileService {
    private final Cloudinary cloudinary;
    @Override
    public String uploadImage(MultipartFile file) throws IOException {
        assert file.getOriginalFilename()!=null;
        String publicValue = generatePublicValue(file.getOriginalFilename());
        log.info("publicValue is: {}",publicValue);
        String extension = getFileName(file.getOriginalFilename())[1];
        log.info("extension is: {}",extension);
        File fileUpload = convert(file);
        log.info("fileUpload is: {}",fileUpload);
//        cloudinary.uploader().upload("http://www.example.com/image.jpg", ObjectUtils.asMap("public_id", "sample_remote"));
        cloudinary.uploader().upload(fileUpload, ObjectUtils.asMap("public_id", publicValue));
        cleanDisk(fileUpload);
       return cloudinary.url().generate(StringUtils.join(new String[]{publicValue,extension},"."));

    }
    private File convert(MultipartFile file) throws IOException {
        assert file.getOriginalFilename()!=null;
//        File convertFile = new File(StringUtils.join(generatePublicValue(file.getOriginalFilename()), getFileName(file.getOriginalFilename())[1]));
        File convertFile = new File(
                StringUtils.join(
                        new String[]{generatePublicValue(file.getOriginalFilename()), getFileName(file.getOriginalFilename())[1]},
                        ""
                )
        );
        try (InputStream is = file.getInputStream()){
            Files.copy(is,convertFile.toPath());

        }
        return convertFile;
    }
    private void cleanDisk(File file){
        try {
            log.info("file.toPath() is: {}",file.toPath());
            Path filePath = file.toPath();
            Files.delete(filePath);
        }catch (IOException e){
            log.error("ERROR");
        }
    }

    public String generatePublicValue(String originalName){
        String fileName = getFileName(originalName)[0];
//        return StringUtils.join(UUID.randomUUID().toString(),"_",fileName);
        return StringUtils.join(new String[]{"img", fileName}, "_");

    }

    public String[] getFileName(String originalName){
        return originalName.split("\\.");
    }
}
