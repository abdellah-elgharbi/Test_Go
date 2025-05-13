package com.example.usermanagement_service.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class Etudiant extends User {
    private String filiere;
    private int niveau;

    // Constructeurs
    public Etudiant() {
        super();
        this.setRole(Role.ETUDIANT);
    }

    public Etudiant(String email, String password, String nom, String prenom, String telephone, String filiere, int niveau) {
        super(email, password, nom, prenom, Role.ETUDIANT, telephone);
        this.filiere = filiere;
        this.niveau = niveau;
    }

    // Getters et Setters
    public String getFiliere() {
        return filiere;
    }
    public void setFiliere(String filiere) {
        this.filiere = filiere;
    }

    public int getNiveau() {
        return niveau;
    }
    public void setNiveau(int niveau) {
        this.niveau = niveau;
    }
}
