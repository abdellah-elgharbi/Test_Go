package com.example.usermanagement_service.dto;

public class UserDTO {
    private String id;
    private String email;
    private String nom;
    private String prenom;
    private String role;
    private String telephone;

    // Constructeurs
    public UserDTO() {}

    public UserDTO(String id, String email, String nom, String prenom, String role, String telephone) {
        this.id = id;
        this.email = email;
        this.nom = nom;
        this.prenom = prenom;
        this.role = role;
        this.telephone = telephone;
    }

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }
}
