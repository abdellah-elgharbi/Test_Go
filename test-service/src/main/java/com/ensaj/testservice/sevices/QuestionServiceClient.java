package com.ensaj.testservice.sevices;

import com.ensaj.testservice.dto.QuestionDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.FeignClientProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;

@FeignClient(
    name = "question-service",
    url = "http://localhost:8081",
)
public interface QuestionServiceClient {
    @GetMapping("/question/{id}")
    ResponseEntity<QuestionDTO> getQuestionById(@PathVariable("id") String id);

    @GetMapping("/question")
    ResponseEntity<List<QuestionDTO>> getAllQuestions();
}
