package com.example.usermanagement_service.dto;

public class EnseignantCreateDTO extends UserCreateDTO {
    // Constructeurs
    public EnseignantCreateDTO() {
        super();
        this.setRole("ENSEIGNANT");
    }

    public EnseignantCreateDTO(String email, String password, String nom, String prenom, String telephone) {
        super(email, password, nom, prenom, "ENSEIGNANT", telephone);
    }
}
