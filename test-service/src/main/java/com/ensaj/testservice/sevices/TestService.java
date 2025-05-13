package com.ensaj.testservice.sevices;

import com.ensaj.testservice.document.Test;
import com.ensaj.testservice.dto.QuestionDTO;
import com.ensaj.testservice.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

@Service
public class TestService {

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private QuestionServiceClient questionServiceClient;

    // Method to create a new test
    public Test createTest(String title, String module, int duration, List<String> questionIds) {
        // Fetch question details from the Question Service using OpenFeign
        List<QuestionDTO> questions = new ArrayList<>();
        if (questionIds != null && !questionIds.isEmpty()) {
            for (String questionId : questionIds) {
                ResponseEntity<QuestionDTO> questionResponse = questionServiceClient.getQuestionById(questionId);
                if (questionResponse.getStatusCode().is2xxSuccessful()) {
                    questions.add(questionResponse.getBody());
                } else {
                    // Handle the error, e.g., log it and/or throw an exception
                    System.err.println("Failed to retrieve question with ID: " + questionId);
                    // Consider if you want to continue with the valid questions or fail the entire test creation
                    // For now, we'll skip the invalid questions and log
                }
            }
        }

        // Create a new Test object
        Test test = new Test();
        test.setTitle(title);
        test.setModule(module);
        test.setDuration(duration);
        test.setQuestions(questions); // Store QuestionDTO, not just IDs.

        // Save the test to the database
        return testRepository.save(test);
    }

    // Method to edit an existing test
    public Test editTest(String id, String title, String module, int duration, List<String> questionIds) {
        // First, find the test to edit
        Optional<Test> optionalTest = testRepository.findById(id);
        if (optionalTest.isPresent()) {
            Test test = optionalTest.get();
            List<QuestionDTO> questions = new ArrayList<>();
            if (questionIds != null && !questionIds.isEmpty()) {
                for (String questionId : questionIds) {
                    ResponseEntity<QuestionDTO> questionResponse = questionServiceClient.getQuestionById(questionId);
                    if (questionResponse.getStatusCode().is2xxSuccessful()) {
                        questions.add(questionResponse.getBody());
                    } else {
                        System.err.println("Failed to retrieve question with ID: " + questionId);
                    }
                }
            }
            // Update the test properties
            test.setTitle(title);
            test.setModule(module);
            test.setDuration(duration);
            test.setQuestions(questions); // Update with QuestionDTO

            // Save the updated test to the database
            return testRepository.save(test);
        } else {
            // Handle the case where the test with the given ID does not exist
            return null; // Or throw an exception
        }
    }

    public List<Test> getAllTests() {
        List<Test> tests = testRepository.findAll();
        for (Test test : tests) {
            List<QuestionDTO> questions = new ArrayList<>();
            for(QuestionDTO question : test.getQuestions()){
                ResponseEntity<QuestionDTO> questionResponse = questionServiceClient.getQuestionById(question.getId());
                if (questionResponse.getStatusCode().is2xxSuccessful()) {
                    questions.add(questionResponse.getBody());
                } else {
                    System.err.println("Failed to retrieve question with ID: " + question.getId());
                }
            }
            test.setQuestions(questions);
        }
        return tests;
    }

    public Optional<Test> getTestById(String id) {
        Optional<Test> optionalTest =  testRepository.findById(id);
        if(optionalTest.isPresent()){
            Test test = optionalTest.get();
            List<QuestionDTO> questions = new ArrayList<>();
            for(QuestionDTO question : test.getQuestions()){
                ResponseEntity<QuestionDTO> questionResponse = questionServiceClient.getQuestionById(question.getId());
                if (questionResponse.getStatusCode().is2xxSuccessful()) {
                    questions.add(questionResponse.getBody());
                } else {
                    System.err.println("Failed to retrieve question with ID: " + question.getId());
                }
            }
            test.setQuestions(questions);
            return Optional.of(test);
        }
        else{
            return optionalTest;
        }
    }

    public void deleteTest(String id) {
        testRepository.deleteById(id);
    }
}
