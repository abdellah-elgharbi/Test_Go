package com.abdellah.pfa2.evaluation_service.document;

import com.abdellah.pfa2.evaluation_service.enumeration.TypeQuestion;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "question")
@TypeAlias("question")
public class Question {
    @Id
    private String id;
    @NotNull
    private String enonce;
    @NotNull
    private String module;
    @NotNull
    private int dureeReponse;
    @NotNull
    private int niveau;
    @NotNull
    private TypeQuestion type;
    @NotNull
    private String explications;
    @NotNull
    private int pointsMax;
    @NotNull
    private int nbEssaisMax;


    public Question() {
    }


    public Question(String id, String enonce, String module, int dureeReponse, int niveau, TypeQuestion type, String explications, int pointsMax, int nbEssaisMax) {
        this.id = id;
        this.enonce = enonce;
        this.module = module;
        this.dureeReponse = dureeReponse;
        this.niveau = niveau;
        this.type = type;
        this.explications = explications;
        this.pointsMax = pointsMax;
        this.nbEssaisMax = nbEssaisMax;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEnonce() {
        return enonce;
    }

    public void setEnonce(String enonce) {
        this.enonce = enonce;
    }

    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module;
    }

    public int getDureeReponse() {
        return dureeReponse;
    }

    public void setDureeReponse(int dureeReponse) {
        this.dureeReponse = dureeReponse;
    }

    public int getNiveau() {
        return niveau;
    }

    public void setNiveau(int niveau) {
        this.niveau = niveau;
    }

    public TypeQuestion getType() {
        return type;
    }

    public void setType(TypeQuestion type) {
        this.type = type;
    }

    public String getExplications() {
        return explications;
    }

    public void setExplications(String explications) {
        this.explications = explications;
    }

    public int getPointsMax() {
        return pointsMax;
    }

    public void setPointsMax(int pointsMax) {
        this.pointsMax = pointsMax;
    }

    public int getNbEssaisMax() {
        return nbEssaisMax;
    }

    public void setNbEssaisMax(int nbEssaisMax) {
        this.nbEssaisMax = nbEssaisMax;
    }


    @Override
    public String toString() {
        return "Question{" +
                "id='" + id + '\'' +
                ", enonce='" + enonce + '\'' +
                ", module='" + module + '\'' +
                ", dureeReponse=" + dureeReponse +
                ", niveau=" + niveau +
                ", type=" + type +
                ", explications='" + explications + '\'' +
                ", pointsMax=" + pointsMax +
                ", nbEssaisMax=" + nbEssaisMax +
                '}';
    }
}
