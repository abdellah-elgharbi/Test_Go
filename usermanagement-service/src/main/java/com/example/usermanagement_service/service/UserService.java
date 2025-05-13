package com.example.usermanagement_service.service;

import com.example.usermanagement_service.dto.*;

import java.util.List;
/**
 * Interface pour le service de gestion des utilisateurs
 */
public interface UserService {
    // Méthodes génériques pour tous les utilisateurs
    List<UserDTO> getAllUsers();
    UserDTO getUserById(String id);
    UserDTO getUserByEmail(String email);
    void deleteUser(String id);

    // Méthodes spécifiques pour les enseignants
    List<EnseignantDTO> getAllEnseignants();
    EnseignantDTO getEnseignantById(String id);
    EnseignantDTO createEnseignant(EnseignantCreateDTO dto);
    EnseignantDTO updateEnseignant(String id, EnseignantUpdateDTO dto);

    // Méthodes spécifiques pour les étudiants
    List<EtudiantDTO> getAllEtudiants();
    EtudiantDTO getEtudiantById(String id);
    EtudiantDTO createEtudiant(EtudiantCreateDTO dto);
    EtudiantDTO updateEtudiant(String id, EtudiantUpdateDTO dto);
    List<EtudiantDTO> getEtudiantsByFiliere(String filiere);
    List<EtudiantDTO> getEtudiantsByNiveau(int niveau);
    List<EtudiantDTO> getEtudiantsByFiliereAndNiveau(String filiere, int niveau);
}