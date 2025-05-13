package com.example.usermanagement_service.service;

import com.example.usermanagement_service.model.BlacklistedToken;
import com.example.usermanagement_service.model.User;
import com.example.usermanagement_service.repository.BlacklistedTokenRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private Long jwtExpirationMs;

    @Autowired
    private BlacklistedTokenRepository blacklistedTokenRepository;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("role", user.getRole().name())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public Date extractExpiration(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        // Vérifier si le token est dans la blacklist
        if (blacklistedTokenRepository.existsByToken(token)) {
            return false;
        }

        String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration()
                .before(new Date());
    }

    public void blacklistToken(String token) {
        Date expiration = extractExpiration(token);
        BlacklistedToken blacklistedToken = new BlacklistedToken(token, expiration);
        blacklistedTokenRepository.save(blacklistedToken);
    }

    // Méthode pour nettoyer les tokens expirés de la blacklist (à exécuter périodiquement)
    public void cleanupExpiredTokens() {
        blacklistedTokenRepository.findByExpiryDateBefore(new Date())
                .forEach(blacklistedTokenRepository::delete);
    }
}