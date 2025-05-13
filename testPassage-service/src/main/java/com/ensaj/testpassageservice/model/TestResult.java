package com.ensaj.testpassageservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "testResults")
public class TestResult {
    
    @Id
    private String id;
    private String studentId;
    private String testId;
    private String testPassageId;
    private int totalScore;
    private int maxPossibleScore;
    private double percentageScore;
    private LocalDateTime completedAt;
    private List<QuestionResult> questionResults;
    private boolean passed;
    private String grade;

    public static class QuestionResult {
        private String questionId;
        private String studentAnswer;
        private String correctAnswer;
        private boolean isCorrect;
        private int pointsEarned;
        private int maxPoints;

        // Getters and Setters
        public String getQuestionId() { return questionId; }
        public void setQuestionId(String questionId) { this.questionId = questionId; }
        public String getStudentAnswer() { return studentAnswer; }
        public void setStudentAnswer(String studentAnswer) { this.studentAnswer = studentAnswer; }
        public String getCorrectAnswer() { return correctAnswer; }
        public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }
        public boolean isCorrect() { return isCorrect; }
        public void setCorrect(boolean correct) { isCorrect = correct; }
        public int getPointsEarned() { return pointsEarned; }
        public void setPointsEarned(int pointsEarned) { this.pointsEarned = pointsEarned; }
        public int getMaxPoints() { return maxPoints; }
        public void setMaxPoints(int maxPoints) { this.maxPoints = maxPoints; }
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public String getTestId() { return testId; }
    public void setTestId(String testId) { this.testId = testId; }
    public String getTestPassageId() { return testPassageId; }
    public void setTestPassageId(String testPassageId) { this.testPassageId = testPassageId; }
    public int getTotalScore() { return totalScore; }
    public void setTotalScore(int totalScore) { this.totalScore = totalScore; }
    public int getMaxPossibleScore() { return maxPossibleScore; }
    public void setMaxPossibleScore(int maxPossibleScore) { this.maxPossibleScore = maxPossibleScore; }
    public double getPercentageScore() { return percentageScore; }
    public void setPercentageScore(double percentageScore) { this.percentageScore = percentageScore; }
    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
    public List<QuestionResult> getQuestionResults() { return questionResults; }
    public void setQuestionResults(List<QuestionResult> questionResults) { this.questionResults = questionResults; }
    public boolean isPassed() { return passed; }
    public void setPassed(boolean passed) { this.passed = passed; }
    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }
} 