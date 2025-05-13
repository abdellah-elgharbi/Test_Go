package com.ensaj.testpassageservice.service.impl;

import com.ensaj.testpassageservice.model.FraudDetection;
import com.ensaj.testpassageservice.repository.FraudDetectionRepository;
import com.ensaj.testpassageservice.service.FraudDetectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

@Service
public class FraudDetectionServiceImpl implements FraudDetectionService {

    private final FraudDetectionRepository fraudDetectionRepository;
    private final RestTemplate restTemplate;

    @Value("${flask.endpoint.url}")
    private String flaskEndpointUrl;

    @Autowired
    public FraudDetectionServiceImpl(FraudDetectionRepository fraudDetectionRepository) {
        this.fraudDetectionRepository = fraudDetectionRepository;
        this.restTemplate = new RestTemplate();
    }

    @Override
    public FraudDetection processImage(MultipartFile image, String studentId, String testId) {
        try {
            // Convert image to base64
            String base64Image = Base64.getEncoder().encodeToString(image.getBytes());

            // Prepare request to Flask endpoint
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
            map.add("image", base64Image);

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

            // Call Flask endpoint
            ResponseEntity<String> response = restTemplate.postForEntity(
                flaskEndpointUrl,
                request,
                String.class
            );

            // Process response
            String detectionResult = response.getBody();
            if (detectionResult == null || (!detectionResult.equals("left") && !detectionResult.equals("right"))) {
                throw new RuntimeException("Invalid detection result from Flask endpoint");
            }

            // Create and save fraud detection record
            FraudDetection fraudDetection = new FraudDetection(
                studentId,
                testId,
                detectionResult,
                "image_url_placeholder" // You might want to store the actual image URL or path
            );

            return fraudDetectionRepository.save(fraudDetection);

        } catch (IOException e) {
            throw new RuntimeException("Error processing image", e);
        }
    }
} 