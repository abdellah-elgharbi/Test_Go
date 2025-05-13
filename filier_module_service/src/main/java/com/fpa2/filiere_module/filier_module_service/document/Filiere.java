package com.fpa2.filiere_module.filier_module_service.document;

import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@Document
public class Filiere {



    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDepartement() {
        return departement;
    }

    public void setDepartement(String departement) {
        this.departement = departement;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<Module> getModules() {
        return modules;
    }

    public void setModules(List<Module> modules) {
        this.modules = modules;
    }

    @Id
    private String id;
    private String nom;
    private String departement;

    private List<Module> modules;

    public Filiere() {}

    public Filiere(String nom, String departement) {
        this.nom = nom;
        this.departement = departement;
    }

    public Filiere(String nom, String departement, List<Module> modules) {
        this.nom = nom;
        this.departement = departement;
        this.modules = modules;
    }

    @Override
    public String toString() {
        return "Filiere{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", departement='" + departement + '\'' +
                ", modules=" + modules +
                '}';
    }
}
