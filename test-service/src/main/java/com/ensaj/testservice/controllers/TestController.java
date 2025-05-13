package com.ensaj.testservice.controllers;

import com.ensaj.testservice.document.Test;
import com.ensaj.testservice.sevices.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private TestService testService;

    @PostMapping
    public ResponseEntity<Test> createTest(
            @RequestParam String title,
            @RequestParam String module,
            @RequestParam int duration,
            @RequestParam List<String> questionIds) {
        Test createdTest = testService.createTest(title, module, duration, questionIds);
        return new ResponseEntity<>(createdTest, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Test> editTest(
            @PathVariable String id,
            @RequestParam String title,
            @RequestParam String module,
            @RequestParam int duration,
            @RequestParam List<String> questionIds) {
        Test updatedTest = testService.editTest(id, title, module, duration, questionIds);
        if (updatedTest != null) {
            return new ResponseEntity<>(updatedTest, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<Test>> getAllTests() {
        List<Test> tests = testService.getAllTests();
        return new ResponseEntity<>(tests, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Test> getTestById(@PathVariable String id) {
        Optional<Test> test = testService.getTestById(id);
        if(test.isPresent()) {
            return new ResponseEntity<>(test.get(), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTest(@PathVariable String id) {
        testService.deleteTest(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}


