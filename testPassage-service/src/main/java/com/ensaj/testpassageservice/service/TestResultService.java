package com.ensaj.testpassageservice.service;

import com.ensaj.testpassageservice.model.TestResult;
import org.springframework.stereotype.Service;

import java.util.List;
public interface TestResultService {
    TestResult saveTestResult(TestResult testResult);
    TestResult getTestResultById(String id);
    List<TestResult> getTestResultsByStudentId(String studentId);
    List<TestResult> getTestResultsByTestId(String testId);
    TestResult getTestResultByStudentAndTest(String studentId, String testId);
    void deleteTestResult(String id);
    TestResult calculateAndSaveResult(String testPassageId);
}