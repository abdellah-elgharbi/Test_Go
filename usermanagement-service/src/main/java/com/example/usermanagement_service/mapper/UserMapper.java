package com.example.usermanagement_service.mapper;

import com.example.usermanagement_service.dto.*;
import com.example.usermanagement_service.model.*;
import com.example.usermanagement_service.model.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Classe utilitaire pour convertir entre les entités et les DTOs
 */
@Component
public class UserMapper {

    /**
     * Convertit un User en UserDTO
     */
    public UserDTO toUserDTO(User user) {
        if (user == null) {
            return null;
        }

        if (user instanceof Enseignant) {
            return toEnseignantDTO((Enseignant) user);
        } else if (user instanceof Etudiant) {
            return toEtudiantDTO((Etudiant) user);
        }

        return new UserDTO(
                user.getId(),
                user.getEmail(),
                user.getNom(),
                user.getPrenom(),
                user.getRole().toString(),
                user.getTelephone()
        );
    }

    /**
     * Convertit un Enseignant en EnseignantDTO
     */
    public EnseignantDTO toEnseignantDTO(Enseignant enseignant) {
        if (enseignant == null) {
            return null;
        }

        // Pas de modules dans l'enseignant maintenant, on laisse juste les informations de base
        return new EnseignantDTO(
                enseignant.getId(),
                enseignant.getEmail(),
                enseignant.getNom(),
                enseignant.getPrenom(),
                enseignant.getTelephone()
        );
    }

    /**
     * Convertit un Etudiant en EtudiantDTO
     */
    public EtudiantDTO toEtudiantDTO(Etudiant etudiant) {
        if (etudiant == null) {
            return null;
        }

        // Pas d'historique des tests dans l'étudiant maintenant, on laisse juste les informations de base
        return new EtudiantDTO(
                etudiant.getId(),
                etudiant.getEmail(),
                etudiant.getNom(),
                etudiant.getPrenom(),
                etudiant.getTelephone(),
                etudiant.getFiliere(),
                etudiant.getNiveau());
    }

    /**
     * Convertit une liste d'utilisateurs en liste de DTOs
     */
    public List<UserDTO> toUserDTOList(List<User> users) {
        if (users == null) {
            return List.of();
        }

        return users.stream()
                .map(this::toUserDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convertit une liste d'enseignants en liste de DTOs
     */
    public List<EnseignantDTO> toEnseignantDTOList(List<Enseignant> enseignants) {
        if (enseignants == null) {
            return List.of();
        }

        return enseignants.stream()
                .map(this::toEnseignantDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convertit une liste d'étudiants en liste de DTOs
     */
    public List<EtudiantDTO> toEtudiantDTOList(List<Etudiant> etudiants) {
        if (etudiants == null) {
            return List.of();
        }

        return etudiants.stream()
                .map(this::toEtudiantDTO)
                .collect(Collectors.toList());
    }
}
