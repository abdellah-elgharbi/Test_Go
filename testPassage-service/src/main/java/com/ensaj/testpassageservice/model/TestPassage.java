package com.ensaj.testpassageservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "testPassages")
public class TestPassage {
    
    @Id
    private String id;
    private String studentId;
    private String testId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String status; // IN_PROGRESS, COMPLETED, ABANDONED
    private int score;
    private List<QuestionAnswer> answers;
    private boolean isFraudDetected;
    private String fraudDetectionResult;

    public static class QuestionAnswer {
        private String questionId;
        private String answer;
        private LocalDateTime answeredAt;
        private boolean isCorrect;
        private int points;

        // Getters and Setters
        public String getQuestionId() { return questionId; }
        public void setQuestionId(String questionId) { this.questionId = questionId; }
        public String getAnswer() { return answer; }
        public void setAnswer(String answer) { this.answer = answer; }
        public LocalDateTime getAnsweredAt() { return answeredAt; }
        public void setAnsweredAt(LocalDateTime answeredAt) { this.answeredAt = answeredAt; }
        public boolean isCorrect() { return isCorrect; }
        public void setCorrect(boolean correct) { isCorrect = correct; }
        public int getPoints() { return points; }
        public void setPoints(int points) { this.points = points; }
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public String getTestId() { return testId; }
    public void setTestId(String testId) { this.testId = testId; }
    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }
    public List<QuestionAnswer> getAnswers() { return answers; }
    public void setAnswers(List<QuestionAnswer> answers) { this.answers = answers; }
    public boolean isFraudDetected() { return isFraudDetected; }
    public void setFraudDetected(boolean fraudDetected) { isFraudDetected = fraudDetected; }
    public String getFraudDetectionResult() { return fraudDetectionResult; }
    public void setFraudDetectionResult(String fraudDetectionResult) { this.fraudDetectionResult = fraudDetectionResult; }
} 