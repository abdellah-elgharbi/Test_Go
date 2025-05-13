package com.ensaj.testpassageservice.repository;

import com.ensaj.testpassageservice.model.TestPassage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TestPassageRepository extends MongoRepository<TestPassage, String> {
    List<TestPassage> findByStudentId(String studentId);
    List<TestPassage> findByTestId(String testId);
    List<TestPassage> findByStudentIdAndTestId(String studentId, String testId);
    List<TestPassage> findByStatus(String status);
} 