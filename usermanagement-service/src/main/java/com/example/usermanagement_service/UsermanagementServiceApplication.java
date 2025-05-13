package com.example.usermanagement_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories(basePackages = "com.example.usermanagement_service.repository")

public class UsermanagementServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(UsermanagementServiceApplication.class, args);
	}

}
