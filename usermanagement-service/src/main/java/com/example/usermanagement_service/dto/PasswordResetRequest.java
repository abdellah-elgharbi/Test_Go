package com.example.usermanagement_service.dto;

import java.io.Serializable;

public class PasswordResetRequest implements Serializable {
    private String email;

    public PasswordResetRequest() {
    }

    public PasswordResetRequest(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}