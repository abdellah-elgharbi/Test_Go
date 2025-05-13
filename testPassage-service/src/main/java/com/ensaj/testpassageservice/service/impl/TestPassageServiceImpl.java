package com.ensaj.testpassageservice.service.impl;

import com.ensaj.testpassageservice.model.TestPassage;
import com.ensaj.testpassageservice.repository.TestPassageRepository;
import com.ensaj.testpassageservice.service.TestPassageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TestPassageServiceImpl implements TestPassageService {

    private final TestPassageRepository testPassageRepository;

    @Autowired
    public TestPassageServiceImpl(TestPassageRepository testPassageRepository) {
        this.testPassageRepository = testPassageRepository;
    }

    @Override
    public TestPassage startTest(String studentId, String testId) {
        TestPassage testPassage = new TestPassage();
        testPassage.setStudentId(studentId);
        testPassage.setTestId(testId);
        testPassage.setStartTime(LocalDateTime.now());
        testPassage.setStatus("IN_PROGRESS");
        testPassage.setAnswers(new ArrayList<>());
        testPassage.setScore(0);
        testPassage.setFraudDetected(false);
        return testPassageRepository.save(testPassage);
    }

    @Override
    public TestPassage submitAnswer(String testPassageId, String questionId, String answer) {
        TestPassage testPassage = getTestPassageById(testPassageId);
        
        if (!"IN_PROGRESS".equals(testPassage.getStatus())) {
            throw new IllegalStateException("Cannot submit answer for a test that is not in progress");
        }

        TestPassage.QuestionAnswer questionAnswer = new TestPassage.QuestionAnswer();
        questionAnswer.setQuestionId(questionId);
        questionAnswer.setAnswer(answer);
        questionAnswer.setAnsweredAt(LocalDateTime.now());
        
        // TODO: Validate answer with Question Service
        // questionAnswer.setCorrect(true/false);
        // questionAnswer.setPoints(points);
        
        testPassage.getAnswers().add(questionAnswer);
        return testPassageRepository.save(testPassage);
    }

    @Override
    public TestPassage completeTest(String testPassageId) {
        TestPassage testPassage = getTestPassageById(testPassageId);
        testPassage.setEndTime(LocalDateTime.now());
        testPassage.setStatus("COMPLETED");
        
        // TODO: Calculate final score
        // testPassage.setScore(calculatedScore);
        
        return testPassageRepository.save(testPassage);
    }

    @Override
    public TestPassage abandonTest(String testPassageId) {
        TestPassage testPassage = getTestPassageById(testPassageId);
        testPassage.setEndTime(LocalDateTime.now());
        testPassage.setStatus("ABANDONED");
        return testPassageRepository.save(testPassage);
    }

    @Override
    public TestPassage getTestPassageById(String id) {
        return testPassageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Test passage not found with id: " + id));
    }

    @Override
    public List<TestPassage> getTestPassagesByStudentId(String studentId) {
        return testPassageRepository.findByStudentId(studentId);
    }

    @Override
    public List<TestPassage> getTestPassagesByTestId(String testId) {
        return testPassageRepository.findByTestId(testId);
    }

    @Override
    public TestPassage getTestPassageByStudentAndTest(String studentId, String testId) {
        List<TestPassage> passages = testPassageRepository.findByStudentIdAndTestId(studentId, testId);
        if (passages.isEmpty()) {
            throw new RuntimeException("No test passage found for student: " + studentId + " and test: " + testId);
        }
        return passages.get(0);
    }

    @Override
    public void deleteTestPassage(String id) {
        testPassageRepository.deleteById(id);
    }
} 