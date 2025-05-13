package com.example.usermanagement_service.repository;

import com.example.usermanagement_service.model.BlacklistedToken;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface BlacklistedTokenRepository extends MongoRepository<BlacklistedToken, String> {
    boolean existsByToken(String token);
    List<BlacklistedToken> findByExpiryDateBefore(Date date);
}