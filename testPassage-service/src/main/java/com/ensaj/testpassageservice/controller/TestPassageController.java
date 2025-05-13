package com.ensaj.testpassageservice.controller;

import com.ensaj.testpassageservice.model.TestPassage;
import com.ensaj.testpassageservice.service.TestPassageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/test-passages")
@CrossOrigin(origins = "*")
public class TestPassageController {

    private final TestPassageService testPassageService;

    @Autowired
    public TestPassageController(TestPassageService testPassageService) {
        this.testPassageService = testPassageService;
    }

    @PostMapping("/start")
    public ResponseEntity<TestPassage> startTest(
            @RequestParam String studentId,
            @RequestParam String testId) {
        return ResponseEntity.ok(testPassageService.startTest(studentId, testId));
    }

    @PostMapping("/{id}/answer")
    public ResponseEntity<TestPassage> submitAnswer(
            @PathVariable String id,
            @RequestParam String questionId,
            @RequestParam String answer) {
        return ResponseEntity.ok(testPassageService.submitAnswer(id, questionId, answer));
    }

    @PostMapping("/{id}/complete")
    public ResponseEntity<TestPassage> completeTest(@PathVariable String id) {
        return ResponseEntity.ok(testPassageService.completeTest(id));
    }

    @PostMapping("/{id}/abandon")
    public ResponseEntity<TestPassage> abandonTest(@PathVariable String id) {
        return ResponseEntity.ok(testPassageService.abandonTest(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestPassage> getTestPassageById(@PathVariable String id) {
        return ResponseEntity.ok(testPassageService.getTestPassageById(id));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<TestPassage>> getTestPassagesByStudentId(@PathVariable String studentId) {
        return ResponseEntity.ok(testPassageService.getTestPassagesByStudentId(studentId));
    }

    @GetMapping("/test/{testId}")
    public ResponseEntity<List<TestPassage>> getTestPassagesByTestId(@PathVariable String testId) {
        return ResponseEntity.ok(testPassageService.getTestPassagesByTestId(testId));
    }

    @GetMapping("/student/{studentId}/test/{testId}")
    public ResponseEntity<TestPassage> getTestPassageByStudentAndTest(
            @PathVariable String studentId,
            @PathVariable String testId) {
        return ResponseEntity.ok(testPassageService.getTestPassageByStudentAndTest(studentId, testId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTestPassage(@PathVariable String id) {
        testPassageService.deleteTestPassage(id);
        return ResponseEntity.ok().build();
    }
} 