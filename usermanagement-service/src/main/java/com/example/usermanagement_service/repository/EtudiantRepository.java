package com.example.usermanagement_service.repository;

import com.example.usermanagement_service.model.Etudiant;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EtudiantRepository extends MongoRepository<Etudiant, String> {
    // Recherche des étudiants par leur filière
    List<Etudiant> findByFiliere(String filiere);

    // Recherche des étudiants par leur niveau
    List<Etudiant> findByNiveau(int niveau);

    // Recherche des étudiants par leur filière et niveau
    List<Etudiant> findByFiliereAndNiveau(String filiere, int niveau);
}
