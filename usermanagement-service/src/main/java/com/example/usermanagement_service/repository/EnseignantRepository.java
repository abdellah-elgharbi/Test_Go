package com.example.usermanagement_service.repository;

import com.example.usermanagement_service.model.Enseignant;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnseignantRepository extends MongoRepository<Enseignant, String> {
}
