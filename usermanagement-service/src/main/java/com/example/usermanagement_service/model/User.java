package com.example.usermanagement_service.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "users")
public class User {

    @Id
    private String id;

    @NotBlank(message = "Le nom est obligatoire")
    private String nom;

    @NotBlank(message = "Le prénom est obligatoire")
    private String prenom;

    @NotBlank(message = "L'adresse email est obligatoire")
    @Email(message = "Format d'email invalide")
    @Indexed(unique = true)
    private String email;

    @NotBlank(message = "Le mot de passe est obligatoire")
    @Size(min = 8, message = "Le mot de passe doit contenir au moins 8 caractères")
    private String password;

    private Role role;

    private String telephone;

    private boolean active = true;

    public User(String nom, String prenom, String email, String password, Role role) {
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public User(String email, String password, String nom, String prenom, Role role, String telephone) {
        this.email = email;
        this.password = password;
        this.nom = nom;
        this.prenom = prenom;
        this.role = role;
        this.telephone = telephone;
    }

    public User() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public @NotBlank(message = "Le nom est obligatoire") String getNom() {
        return nom;
    }

    public void setNom(@NotBlank(message = "Le nom est obligatoire") String nom) {
        this.nom = nom;
    }

    public @NotBlank(message = "Le prénom est obligatoire") String getPrenom() {
        return prenom;
    }

    public void setPrenom(@NotBlank(message = "Le prénom est obligatoire") String prenom) {
        this.prenom = prenom;
    }

    public @NotBlank(message = "L'adresse email est obligatoire") @Email(message = "Format d'email invalide") String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank(message = "L'adresse email est obligatoire") @Email(message = "Format d'email invalide") String email) {
        this.email = email;
    }

    public @NotBlank(message = "Le mot de passe est obligatoire") @Size(min = 8, message = "Le mot de passe doit contenir au moins 8 caractères") String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank(message = "Le mot de passe est obligatoire") @Size(min = 8, message = "Le mot de passe doit contenir au moins 8 caractères") String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
