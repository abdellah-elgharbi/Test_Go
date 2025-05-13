package com.ensaj.testpassageservice.controller;

import com.ensaj.testpassageservice.model.TestResult;
import com.ensaj.testpassageservice.service.TestResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/test-results")
@CrossOrigin(origins = "*") // Configure this according to your frontend URL
public class TestResultController {

    private final TestResultService testResultService;

    @Autowired
    public TestResultController(TestResultService testResultService) {
        this.testResultService = testResultService;
    }

    @PostMapping("/calculate/{testPassageId}")
    public ResponseEntity<TestResult> calculateTestResult(@PathVariable String testPassageId) {
        return ResponseEntity.ok(testResultService.calculateAndSaveResult(testPassageId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestResult> getTestResultById(@PathVariable String id) {
        return ResponseEntity.ok(testResultService.getTestResultById(id));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<TestResult>> getTestResultsByStudentId(@PathVariable String studentId) {
        return ResponseEntity.ok(testResultService.getTestResultsByStudentId(studentId));
    }

    @GetMapping("/test/{testId}")
    public ResponseEntity<List<TestResult>> getTestResultsByTestId(@PathVariable String testId) {
        return ResponseEntity.ok(testResultService.getTestResultsByTestId(testId));
    }

    @GetMapping("/student/{studentId}/test/{testId}")
    public ResponseEntity<TestResult> getTestResultByStudentAndTest(
            @PathVariable String studentId,
            @PathVariable String testId) {
        return ResponseEntity.ok(testResultService.getTestResultByStudentAndTest(studentId, testId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTestResult(@PathVariable String id) {
        testResultService.deleteTestResult(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/student/{studentId}/date-range")
    public ResponseEntity<List<TestResult>> getTestResultsByDateRange(
            @PathVariable String studentId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        // You can add date range filtering logic here if needed
        return ResponseEntity.ok(testResultService.getTestResultsByStudentId(studentId));
    }
} 