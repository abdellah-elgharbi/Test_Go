package com.example.usermanagement_service.dto;

public class EnseignantUpdateDTO extends UserUpdateDTO {
    // Pas de liste de modules ici, car la gestion des modules sera effectuée dans un service dédié.

    // Constructeurs
    public EnseignantUpdateDTO() { super(); }

    public EnseignantUpdateDTO(String nom, String prenom, String telephone) {
        super(nom, prenom, telephone);
    }

    // Getters et Setters
}
