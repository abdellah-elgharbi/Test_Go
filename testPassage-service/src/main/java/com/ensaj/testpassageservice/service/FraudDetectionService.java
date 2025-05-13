package com.ensaj.testpassageservice.service;

import com.ensaj.testpassageservice.model.FraudDetection;
import org.springframework.web.multipart.MultipartFile;

public interface FraudDetectionService {
    FraudDetection processImage(MultipartFile image, String studentId, String testId);
} 