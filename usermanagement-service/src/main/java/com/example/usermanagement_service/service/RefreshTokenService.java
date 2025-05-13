package com.example.usermanagement_service.service;

import com.example.usermanagement_service.exception.TokenRefreshException;
import com.example.usermanagement_service.model.RefreshToken;
import com.example.usermanagement_service.repository.RefreshTokenRepository;
import com.example.usermanagement_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {

    @Value("${jwt.refresh.expiration}")
    private Long refreshTokenDurationMs;

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository, UserRepository userRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
    }

    public RefreshToken createRefreshToken(String userId) {
        // Supprimer les anciens refresh tokens pour cet utilisateur
        refreshTokenRepository.deleteByUserId(userId);

        RefreshToken refreshToken = new RefreshToken(
                UUID.randomUUID().toString(),
                userId,
                Instant.now().plusMillis(refreshTokenDurationMs)
        );


        return refreshTokenRepository.save(refreshToken);
    }


    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.isExpired()) {
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException(token.getToken(), "Refresh token expiré. Veuillez vous reconnecter");
        }

        return token;
    }

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }


}