package com.pfa2.evaluation_serivce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class Pfa2Application {

	public static void main(String[] args) {
		SpringApplication.run(Pfa2Application.class, args);
	}

}
