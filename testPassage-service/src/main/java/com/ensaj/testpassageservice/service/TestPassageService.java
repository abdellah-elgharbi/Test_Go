package com.ensaj.testpassageservice.service;

import com.ensaj.testpassageservice.model.TestPassage;
import java.util.List;

public interface TestPassageService {
    TestPassage startTest(String studentId, String testId);
    TestPassage submitAnswer(String testPassageId, String questionId, String answer);
    TestPassage completeTest(String testPassageId);
    TestPassage abandonTest(String testPassageId);
    TestPassage getTestPassageById(String id);
    List<TestPassage> getTestPassagesByStudentId(String studentId);
    List<TestPassage> getTestPassagesByTestId(String testId);
    TestPassage getTestPassageByStudentAndTest(String studentId, String testId);
    void deleteTestPassage(String id);
} 