package com.example.usermanagement_service.service;

import com.example.usermanagement_service.dto.PasswordResetMessage;
import com.example.usermanagement_service.exception.TokenRefreshException;
import com.example.usermanagement_service.exception.UserNotFoundException;
import com.example.usermanagement_service.model.PasswordResetToken;
import com.example.usermanagement_service.model.User;
import com.example.usermanagement_service.repository.PasswordResetTokenRepository;
import com.example.usermanagement_service.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.UUID;

@Service
public class PasswordResetService {

    private static final Logger logger = LoggerFactory.getLogger(PasswordResetService.class);

    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.reset-token.encryption-key}")
    private String resetTokenEncryptionKey;

    public PasswordResetService(PasswordResetTokenRepository passwordResetTokenRepository,
                                UserRepository userRepository,
                                PasswordEncoder passwordEncoder) {
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public PasswordResetToken createPasswordResetTokenForUser(User user) {
        // Supprimer les jetons existants pour cet utilisateur
        passwordResetTokenRepository.deleteByUserId(user.getId());

        // Créer un nouveau jeton
        String token = UUID.randomUUID().toString();
        PasswordResetToken passwordResetToken = new PasswordResetToken(
                token,
                user.getId(),
                Instant.now().plus(24, ChronoUnit.HOURS)
        );

        return passwordResetTokenRepository.save(passwordResetToken);
    }

    public String encryptToken(String token) {
        try {
            SecretKeySpec key = new SecretKeySpec(resetTokenEncryptionKey.getBytes(), "AES");
            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.ENCRYPT_MODE, key);

            byte[] encryptedToken = cipher.doFinal(token.getBytes());
            return Base64.getEncoder().encodeToString(encryptedToken);
        } catch (Exception e) {
            throw new RuntimeException("Erreur de cryptage du token", e);
        }
    }

    public String decryptToken(String encryptedToken) {
        try {
            SecretKeySpec key = new SecretKeySpec(resetTokenEncryptionKey.getBytes(), "AES");
            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.DECRYPT_MODE, key);

            byte[] decodedToken = Base64.getDecoder().decode(encryptedToken);
            byte[] decryptedToken = cipher.doFinal(decodedToken);
            return new String(decryptedToken);
        } catch (Exception e) {
            throw new RuntimeException("Erreur de décryptage du token", e);
        }
    }

    public PasswordResetMessage generatePasswordResetMessage(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("Utilisateur non trouvé avec l'email: " + email));

        PasswordResetToken passwordResetToken = createPasswordResetTokenForUser(user);
        String encryptedToken = encryptToken(passwordResetToken.getToken());

        return new PasswordResetMessage(
                user.getEmail(),
                encryptedToken,
                passwordResetToken.getExpiryDate().toEpochMilli()
        );
    }

    @Transactional
    public void validateResetTokenAndUpdatePassword(String encryptedToken, String newPassword) {
        try {
            String token = decryptToken(encryptedToken);

            PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                    .orElseThrow(() -> new TokenRefreshException(token, "Token de réinitialisation invalide"));

            if (resetToken.isExpired()) {
                passwordResetTokenRepository.delete(resetToken);
                throw new TokenRefreshException(token, "Token de réinitialisation expiré");
            }

            User user = userRepository.findById(resetToken.getUserId())
                    .orElseThrow(() -> new UserNotFoundException("Utilisateur non trouvé"));

            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);

            // Supprimer le token après utilisation
            passwordResetTokenRepository.delete(resetToken);

            logger.info("Mot de passe réinitialisé avec succès pour: {}", user.getEmail());
        } catch (Exception e) {
            logger.error("Erreur lors de la réinitialisation du mot de passe: {}", e.getMessage());
            throw e;
        }
    }
}