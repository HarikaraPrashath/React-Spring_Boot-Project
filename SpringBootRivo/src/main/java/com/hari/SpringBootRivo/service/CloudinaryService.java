package com.hari.SpringBootRivo.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(
            @Value("${cloudinary.cloud_name}") String cloudName,
            @Value("${cloudinary.api_key}") String apiKey,
            @Value("${cloudinary.api_secret}") String apiSecret
    ) {
        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret
        ));
    }

    public Map uploadImage(byte[] image) throws IOException {
        try {
            // Upload the image with the 'auto' resource type
            Map result = cloudinary.uploader().upload(image, ObjectUtils.asMap("resource_type", "auto"));
            System.out.println("Cloudinary upload result: " + result);
            return result;
        } catch (Exception e) {
            System.err.println("Cloudinary upload error: " + e.getMessage());
            throw new IOException("Failed to upload image to Cloudinary", e);
        }
    }
}
