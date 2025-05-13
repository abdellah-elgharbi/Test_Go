package com.pfa2.evaluation_serivce.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.pfa2.evaluation_serivce.model.question.Question;
import com.pfa2.evaluation_serivce.model.reponseEtudaint.ReponseEtudiantPratique;
import com.pfa2.evaluation_serivce.model.reponseEtudaint.ReponseEtudiantTheorique;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@JsonTypeInfo(
        use=JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property="type"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value= ReponseEtudiantPratique.class,name="PRATIQUE"),
        @JsonSubTypes.Type(value= ReponseEtudiantTheorique.class,name="THEORIQUE")
})
public class ReponseEtudiant {
    @NotNull
    private String id;
    @NotNull

    @NotNull
    private LocalDateTime heureReponse;
    @NotNull
    private int essaisUtilises;
    @NotNull
    private boolean estCorrecte;
    @NotNull
    private float score;

    public ReponseEtudiant(String id, LocalDateTime heureReponse, int essaisUtilises, boolean estCorrecte, float score) {
        this.id = id;
        this.heureReponse = heureReponse;
        this.essaisUtilises = essaisUtilises;
        this.estCorrecte = estCorrecte;
        this.score = score;
    }

    public ReponseEtudiant() {
    }

    public void soumettre() {
    }

    public boolean verifierValidite() {
        return false;
    }

    @Override
    public String toString() {
        return "ReponseEtudiant{" +
                "id='" + id + '\'' +
                ", heureReponse=" + heureReponse +
                ", essaisUtilises=" + essaisUtilises +
                ", estCorrecte=" + estCorrecte +
                ", score=" + score +
                '}';
    }

    public @NotNull String getId() {
        return id;
    }

    public void setId(@NotNull String id) {
        this.id = id;
    }

    @NotNull
    public int getEssaisUtilises() {
        return essaisUtilises;
    }

    public void setEssaisUtilises(@NotNull int essaisUtilises) {
        this.essaisUtilises = essaisUtilises;
    }

    public @NotNull @NotNull LocalDateTime getHeureReponse() {
        return heureReponse;
    }

    public void setHeureReponse(@NotNull @NotNull LocalDateTime heureReponse) {
        this.heureReponse = heureReponse;
    }

    @NotNull
    public boolean isEstCorrecte() {
        return estCorrecte;
    }

    public void setEstCorrecte(@NotNull boolean estCorrecte) {
        this.estCorrecte = estCorrecte;
    }

    @NotNull
    public float getScore() {
        return score;
    }

    public void setScore(@NotNull float score) {
        this.score = score;
    }
}