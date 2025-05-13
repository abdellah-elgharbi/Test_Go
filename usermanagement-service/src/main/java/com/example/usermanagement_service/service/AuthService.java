package com.example.usermanagement_service.service;

import com.example.usermanagement_service.dto.JwtResponse;
import com.example.usermanagement_service.dto.LoginRequest;
import com.example.usermanagement_service.dto.PasswordResetMessage;
import com.example.usermanagement_service.exception.TokenRefreshException;
import com.example.usermanagement_service.exception.UserNotFoundException;
import com.example.usermanagement_service.model.RefreshToken;
import com.example.usermanagement_service.model.User;
import com.example.usermanagement_service.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenService refreshTokenService;
    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final PasswordResetService passwordResetService;
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    @Value("${app.kafka.topics.password-reset}")
    private String passwordResetTopic;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       JwtService jwtService, AuthenticationManager authenticationManager,
                       RefreshTokenService refreshTokenService, KafkaTemplate<String, Object> kafkaTemplate,
                       PasswordResetService passwordResetService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.refreshTokenService = refreshTokenService;
        this.kafkaTemplate = kafkaTemplate;
        this.passwordResetService = passwordResetService;
    }

    public void publishPasswordResetRequest(String email, String resetToken) {
        PasswordResetMessage message = passwordResetService.generatePasswordResetMessage(email);

        kafkaTemplate.send(passwordResetTopic, message);
        logger.info("Message de réinitialisation envoyé pour l'email: {}", email);
    }

    public JwtResponse login(LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new UserNotFoundException("Utilisateur non trouvé avec l'email: " + request.getEmail()));

            if (!user.isActive()) {
                logger.warn("Tentative de connexion à un compte désactivé: {}", request.getEmail());
                throw new DisabledException("Ce compte utilisateur est désactivé");
            }

            String token = jwtService.generateToken(user);
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());

            logger.info("Connexion réussie pour l'utilisateur: {}", request.getEmail());
            return new JwtResponse(token, refreshToken.getToken(), user.getEmail(), user.getRole());
        } catch (BadCredentialsException e) {
            logger.warn("Échec de connexion - Mauvais identifiants pour: {}", request.getEmail());
            throw e;
        }
    }

    public String generateResetToken(String email) {
        // Récupérer l'utilisateur par email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("Utilisateur non trouvé avec l'email: " + email));

        // Créer le RefreshToken et obtenir le token
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());

        // Passer le token à encryptToken
        return passwordResetService.encryptToken(refreshToken.getToken());
    }



    public JwtResponse refreshToken(String refreshToken) {
        return refreshTokenService.findByToken(refreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUserId)
                .flatMap(userRepository::findById)
                .map(user -> {
                    String accessToken = jwtService.generateToken(user);
                    return new JwtResponse(accessToken, refreshToken, user.getEmail(), user.getRole());
                })
                .orElseThrow(() -> new TokenRefreshException(refreshToken,
                        "Refresh token non trouvé dans la base de données"));
    }

    public void resetPassword(String token, String newPassword) {
        passwordResetService.validateResetTokenAndUpdatePassword(token, newPassword);
    }
}