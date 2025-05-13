package com.fpa2.filiere_module.filier_module_service.document;

import com.fpa2.filiere_module.filier_module_service.enumuration.Semestre;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.UUID;

public class Module {
    @Getter
    @Setter
    @Id
    private String id;
    private String code;
    @Getter
    private String nom;
    @Getter
    private String description;
    private Semestre semestre;

    public Module(String nom, String code, String description, Semestre semestre) {
        this.id = UUID.randomUUID().toString();
        this.nom = nom;
        this.code = code;
        this.description = description;
        this.semestre = semestre;
    }

    public Module() {

        // Générer également un ID lors de la création avec le constructeur par défaut
        this.id = UUID.randomUUID().toString();
    }

    public Module(String id, String code, String nom, String description) {
        this.id = id;
        this.code = code;
        this.nom = nom;
        this.description = description;
    }

    // Getters et setters (vous avez des duplications que j'ai conservées)
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Semestre getSemestre() {
        return semestre;
    }

    public void setSemestre(Semestre semestre) {
        this.semestre = semestre;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Module{" +
                "id='" + id + '\'' +
                ", code='" + code + '\'' +
                ", nom='" + nom + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}