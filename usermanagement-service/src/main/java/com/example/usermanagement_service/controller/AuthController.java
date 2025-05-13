package com.example.usermanagement_service.controller;

import com.example.usermanagement_service.dto.*;
import com.example.usermanagement_service.service.AuthService;
import com.example.usermanagement_service.service.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    public AuthController(AuthService authService, JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @Operation(summary = "Login", description = "Authenticates user and returns JWT tokens")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully logged in"),
            @ApiResponse(responseCode = "400", description = "Invalid credentials")
    })
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @Operation(summary = "Refresh Token", description = "Generates a new JWT token from a refresh token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully refreshed token"),
            @ApiResponse(responseCode = "400", description = "Invalid refresh token")
    })
    @PostMapping("/refresh")
    public ResponseEntity<JwtResponse> refreshToken(@RequestBody TokenRefreshRequest request) {
        return ResponseEntity.ok(authService.refreshToken(request.getRefreshToken()));
    }

    @Operation(summary = "Logout", description = "Logs out the user by blacklisting their JWT token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully logged out"),
            @ApiResponse(responseCode = "400", description = "Token not provided")
    })
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            jwtService.blacklistToken(token);
            return ResponseEntity.ok().body("Déconnexion réussie");
        }
        return ResponseEntity.badRequest().body("Token non fourni");
    }

    @Operation(summary = "Request Password Reset", description = "Initiates a password reset request by sending a reset token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Password reset request sent successfully"),
            @ApiResponse(responseCode = "400", description = "Email is required")
    })
    @PostMapping("/request-reset-password")
    public ResponseEntity<?> requestResetPassword(@RequestBody PasswordResetRequest request) {
        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("L'email est requis");
        }
        String resetToken = authService.generateResetToken(request.getEmail());
        authService.publishPasswordResetRequest(request.getEmail(), resetToken);
        return ResponseEntity.ok().body("Demande de réinitialisation envoyée avec succès");
    }

    @Operation(summary = "Complete Password Reset", description = "Resets the password using the token received by email")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Password reset successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid or expired token")
    })
    @PostMapping("/complete-reset-password")
    public ResponseEntity<?> completeResetPassword(@RequestBody CompletePasswordResetRequest request) {
        if (request.getToken() == null || request.getToken().isEmpty()) {
            return ResponseEntity.badRequest().body("Le token est requis");
        }
        if (request.getNewPassword() == null || request.getNewPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Le nouveau mot de passe est requis");
        }

        try {
            authService.resetPassword(request.getToken(), request.getNewPassword());
            return ResponseEntity.ok().body("Mot de passe réinitialisé avec succès");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}