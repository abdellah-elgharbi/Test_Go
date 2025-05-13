package com.example.usermanagement_service.dto;

public class UserCreateDTO {
    private String email;
    private String password;
    private String nom;
    private String prenom;
    private String role;
    private String telephone;

    // Constructeurs
    public UserCreateDTO() {}

    public UserCreateDTO(String email, String password, String nom, String prenom, String role, String telephone) {
        this.email = email;
        this.password = password;
        this.nom = nom;
        this.prenom = prenom;
        this.role = role;
        this.telephone = telephone;
    }

    // Getters et Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }
}
