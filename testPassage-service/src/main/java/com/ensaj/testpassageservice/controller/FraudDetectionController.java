package com.ensaj.testpassageservice.controller;

import com.ensaj.testpassageservice.model.FraudDetection;
import com.ensaj.testpassageservice.service.FraudDetectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/fraud-detection")
public class FraudDetectionController {

    private final FraudDetectionService fraudDetectionService;

    @Autowired
    public FraudDetectionController(FraudDetectionService fraudDetectionService) {
        this.fraudDetectionService = fraudDetectionService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<FraudDetection> analyzeImage(
            @RequestParam("image") MultipartFile image,
            @RequestParam("studentId") String studentId,
            @RequestParam("testId") String testId) {
        
        FraudDetection result = fraudDetectionService.processImage(image, studentId, testId);
        return ResponseEntity.ok(result);
    }
}

