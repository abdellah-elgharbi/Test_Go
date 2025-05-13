package com.ensaj.testpassageservice.repository;

import com.ensaj.testpassageservice.model.FraudDetection;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FraudDetectionRepository extends MongoRepository<FraudDetection, String> {
    // Add custom queries if needed
} 