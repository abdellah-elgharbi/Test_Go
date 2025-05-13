package com.example.usermanagement_service.dto;

public class EnseignantDTO extends UserDTO {

    // Constructeurs
    public EnseignantDTO() {
        super();
    }

    public EnseignantDTO(String id, String email, String nom, String prenom, String telephone) {
        super(id, email, nom, prenom, "ENSEIGNANT", telephone);
    }
}

