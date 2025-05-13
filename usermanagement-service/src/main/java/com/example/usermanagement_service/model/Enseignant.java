package com.example.usermanagement_service.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class Enseignant extends User {

    // Constructeurs
    public Enseignant() {
        super();
        this.setRole(Role.ENSEIGNANT);
    }

    public Enseignant(String email, String password, String nom, String prenom, String telephone) {
        super(email, password, nom, prenom, Role.ENSEIGNANT, telephone);
    }


}
