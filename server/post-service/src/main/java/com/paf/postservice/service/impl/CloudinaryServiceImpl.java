package com.paf.postservice.service.impl;

import com.cloudinary.Cloudinary;
import com.paf.postservice.service.CloudinaryService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class CloudinaryServiceImpl implements CloudinaryService {

    @Resource
    private Cloudinary cloudinary;

    @Override
    public String uploadFile(MultipartFile file, String folderName) {
        try {
            HashMap<Object, Object> options = new HashMap<>();
            options.put("folder", folderName);
            options.put("resource_type", "auto");  // Let Cloudinary detect the resource type

            Map<String, Object> uploadedFile = cloudinary.uploader().upload(file.getBytes(), options);
            String publicId = (String) uploadedFile.get("public_id");
            String format = (String) uploadedFile.get("format");  // Get the format of the uploaded file

            // Generate the URL based on file type
            if ("video".equals(uploadedFile.get("resource_type"))) {
                // For videos, append the format to generate a correct URL
                return cloudinary.url().resourceType("video").format(format).secure(true).generate(publicId);
            } else {
                // For images and other files, the format is usually not necessary
                return cloudinary.url().secure(true).generate(publicId);
            }

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
