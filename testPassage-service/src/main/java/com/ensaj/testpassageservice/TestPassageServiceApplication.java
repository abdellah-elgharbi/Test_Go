package com.ensaj.testpassageservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories(basePackages = "com.ensaj.testpassageservice.repository")
public class TestPassageServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(TestPassageServiceApplication.class, args);
    }

}
