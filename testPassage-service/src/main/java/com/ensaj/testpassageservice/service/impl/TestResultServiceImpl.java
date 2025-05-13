package com.ensaj.testpassageservice.service.impl;

import com.ensaj.testpassageservice.model.TestPassage;
import com.ensaj.testpassageservice.model.TestResult;
import com.ensaj.testpassageservice.repository.TestResultRepository;
import com.ensaj.testpassageservice.service.TestPassageService;
import com.ensaj.testpassageservice.service.TestResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TestResultServiceImpl implements TestResultService {

    private final TestResultRepository testResultRepository;
    private final TestPassageService testPassageService;

    @Autowired
    public TestResultServiceImpl(TestResultRepository testResultRepository, 
                               TestPassageService testPassageService) {
        this.testResultRepository = testResultRepository;
        this.testPassageService = testPassageService;
    }

    @Override
    public TestResult saveTestResult(TestResult testResult) {
        return testResultRepository.save(testResult);
    }

    @Override
    public TestResult getTestResultById(String id) {
        return testResultRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Test result not found with id: " + id));
    }

    @Override
    public List<TestResult> getTestResultsByStudentId(String studentId) {
        return testResultRepository.findByStudentId(studentId);
    }

    @Override
    public List<TestResult> getTestResultsByTestId(String testId) {
        return testResultRepository.findByTestId(testId);
    }

    @Override
    public TestResult getTestResultByStudentAndTest(String studentId, String testId) {
        List<TestResult> results = testResultRepository.findByStudentIdAndTestId(studentId, testId);
        if (results.isEmpty()) {
            throw new RuntimeException("No test result found for student: " + studentId + " and test: " + testId);
        }
        return results.get(0);
    }

    @Override
    public void deleteTestResult(String id) {
        testResultRepository.deleteById(id);
    }

    @Override
    public TestResult calculateAndSaveResult(String testPassageId) {
        TestPassage testPassage = testPassageService.getTestPassageById(testPassageId);
        
        if (!"COMPLETED".equals(testPassage.getStatus())) {
            throw new IllegalStateException("Cannot calculate result for incomplete test");
        }

        TestResult testResult = new TestResult();
        testResult.setStudentId(testPassage.getStudentId());
        testResult.setTestId(testPassage.getTestId());
        testResult.setTestPassageId(testPassageId);
        testResult.setCompletedAt(testPassage.getEndTime());
        
        // Calculate scores and results
        int totalScore = 0;
        int maxPossibleScore = 0;
        List<TestResult.QuestionResult> questionResults = new ArrayList<>();

        for (TestPassage.QuestionAnswer answer : testPassage.getAnswers()) {
            TestResult.QuestionResult questionResult = new TestResult.QuestionResult();
            questionResult.setQuestionId(answer.getQuestionId());
            questionResult.setStudentAnswer(answer.getAnswer());
            questionResult.setPointsEarned(answer.getPoints());
            questionResult.setCorrect(answer.isCorrect());
            
            // TODO: Get correct answer and max points from Question Service
            // questionResult.setCorrectAnswer(correctAnswer);
            // questionResult.setMaxPoints(maxPoints);
            
            totalScore += answer.getPoints();
            maxPossibleScore += 10; // Assuming 10 points per question, adjust as needed
            
            questionResults.add(questionResult);
        }

        testResult.setTotalScore(totalScore);
        testResult.setMaxPossibleScore(maxPossibleScore);
        testResult.setPercentageScore((double) totalScore / maxPossibleScore * 100);
        testResult.setQuestionResults(questionResults);
        
        // Determine if passed and grade
        testResult.setPassed(testResult.getPercentageScore() >= 60); // 60% passing threshold
        testResult.setGrade(calculateGrade(testResult.getPercentageScore()));

        return testResultRepository.save(testResult);
    }

    private String calculateGrade(double percentageScore) {
        if (percentageScore >= 90) return "A";
        if (percentageScore >= 80) return "B";
        if (percentageScore >= 70) return "C";
        if (percentageScore >= 60) return "D";
        return "F";
    }
} 