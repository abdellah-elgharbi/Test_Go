package com.example.usermanagement_service.dto;

public class EtudiantCreateDTO extends UserCreateDTO {
    private String filiere;
    private int niveau;

    // Constructeurs
    public EtudiantCreateDTO() {
        super();
        this.setRole("ETUDIANT");
    }

    public EtudiantCreateDTO(String email, String password, String nom, String prenom, String telephone, String filiere, int niveau) {
        super(email, password, nom, prenom, "ETUDIANT", telephone);
        this.filiere = filiere;
        this.niveau = niveau;
    }

    // Getters et Setters
    public String getFiliere() { return filiere; }
    public void setFiliere(String filiere) { this.filiere = filiere; }

    public int getNiveau() { return niveau; }
    public void setNiveau(int niveau) { this.niveau = niveau; }
}
