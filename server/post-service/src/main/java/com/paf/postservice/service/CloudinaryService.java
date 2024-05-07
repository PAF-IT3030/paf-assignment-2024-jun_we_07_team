package com.paf.postservice.service;

import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {

    public String uploadFile(MultipartFile file, String folderName);
}
