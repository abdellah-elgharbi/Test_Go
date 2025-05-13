package com.example.usermanagement_service.dto;


public class TokenRefreshRequest {
    private String refreshToken;
    private String email;  // Ajout de l'email

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
