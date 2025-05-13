package com.example.usermanagement_service.security;

import com.example.usermanagement_service.service.JwtService;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
public class ScheduleConfig {

    private final JwtService jwtService;

    public ScheduleConfig(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Scheduled(fixedRate = 86400000)
    public void cleanupExpiredTokens() {
        jwtService.cleanupExpiredTokens();
    }
}