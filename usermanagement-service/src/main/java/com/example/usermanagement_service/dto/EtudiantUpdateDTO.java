package com.example.usermanagement_service.dto;

public class EtudiantUpdateDTO extends UserUpdateDTO {
    private String filiere;
    private int niveau;

    // Constructeurs
    public EtudiantUpdateDTO() {
        super();
    }

    public EtudiantUpdateDTO(String nom, String prenom, String telephone, String filiere, int niveau) {
        super(nom, prenom, telephone);
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
