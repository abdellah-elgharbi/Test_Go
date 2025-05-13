package com.example.usermanagement_service.repository;

import com.example.usermanagement_service.model.Role;
import com.example.usermanagement_service.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository pour les utilisateurs génériques
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    List<User> findByRole(Role role);
    boolean existsByEmail(String email);

    @Query("{'_class': ?0}")
    List<User> findByClassType(String classType);
}