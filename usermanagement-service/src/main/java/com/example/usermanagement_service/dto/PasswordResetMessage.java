package com.example.usermanagement_service.dto;

import java.io.Serializable;

public class PasswordResetMessage implements Serializable {
    private String email;
    private String resetToken;
    private long expiryDate;

    // Constructeur par défaut requis pour la sérialisation/désérialisation
    public PasswordResetMessage() {
    }

    public PasswordResetMessage(String email, String resetToken,long expiryDate) {
        this.email = email;
        this.resetToken = resetToken;
        // Token valide pendant 24 heures
        this.expiryDate = System.currentTimeMillis() + (24 * 60 * 60 * 1000);
    }



    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getResetToken() {
        return resetToken;
    }

    public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }

    public long getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(long expiryDate) {
        this.expiryDate = expiryDate;
    }
}