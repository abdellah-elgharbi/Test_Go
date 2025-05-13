package com.ensaj.testpassageservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "fraudDetection")
public class FraudDetection {
    
    @Id
    private String id;
    private String studentId;
    private String testId;
    private String detectionResult; // "left" or "right"
    private LocalDateTime timestamp;
    private String imageUrl;

    // Constructors
    public FraudDetection() {}

    public FraudDetection(String studentId, String testId, String detectionResult, String imageUrl) {
        this.studentId = studentId;
        this.testId = testId;
        this.detectionResult = detectionResult;
        this.imageUrl = imageUrl;
        this.timestamp = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getTestId() {
        return testId;
    }

    public void setTestId(String testId) {
        this.testId = testId;
    }

    public String getDetectionResult() {
        return detectionResult;
    }

    public void setDetectionResult(String detectionResult) {
        this.detectionResult = detectionResult;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
} 