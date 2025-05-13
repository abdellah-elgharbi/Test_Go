package com.ensaj.testpassageservice.repository;

import com.ensaj.testpassageservice.model.TestResult;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TestResultRepository extends MongoRepository<TestResult, String> {
    List<TestResult> findByStudentId(String studentId);
    List<TestResult> findByTestId(String testId);
    List<TestResult> findByStudentIdAndTestId(String studentId, String testId);
    TestResult findByTestPassageId(String testPassageId);
} 