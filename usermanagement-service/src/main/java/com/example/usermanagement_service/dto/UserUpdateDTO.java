package com.example.usermanagement_service.dto;

public class UserUpdateDTO {
    private String nom;
    private String prenom;
    private String telephone;

    // Constructeurs
    public UserUpdateDTO() {}

    public UserUpdateDTO(String nom, String prenom, String telephone) {
        this.nom = nom;
        this.prenom = prenom;
        this.telephone = telephone;
    }

    // Getters et Setters
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }
}
