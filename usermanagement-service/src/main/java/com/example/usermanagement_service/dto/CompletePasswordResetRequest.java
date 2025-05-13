package com.example.usermanagement_service.dto;

import java.io.Serializable;

public class CompletePasswordResetRequest implements Serializable {
    private String token;
    private String newPassword;

    public CompletePasswordResetRequest() {
    }

    public CompletePasswordResetRequest(String token, String newPassword) {
        this.token = token;
        this.newPassword = newPassword;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}