package com.ovs.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "*", maxAge = 3600)
public class FileUploadController {

    private final String uploadDir = "uploads";

    public FileUploadController() {
        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload directory!", e);
        }
    }

    @PostMapping("")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        Map<String, String> response = new HashMap<>();
        try {
            if (file.isEmpty()) {
                response.put("error", "File is empty");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
            String extension = "";
            int i = originalFilename.lastIndexOf('.');
            if (i > 0) {
                extension = originalFilename.substring(i);
            }

            // Generate a unique filename to prevent overwriting
            String newFilename = UUID.randomUUID().toString() + extension;
            Path filePath = Paths.get(uploadDir).resolve(newFilename);

            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Construct the URL to access this file. 
            // We'll configure a ResourceHandler to serve /uploads/**
            String fileUrl = "/uploads/" + newFilename;
            
            response.put("url", fileUrl);
            response.put("message", "File uploaded successfully");
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            response.put("error", "Could not store the file. Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
