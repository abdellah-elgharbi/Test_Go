package com.pfa2.evaluation_serivce.model.question;

import com.pfa2.evaluation_serivce.enumeration.TypeQuestion;
import com.pfa2.evaluation_serivce.model.TestUnitaire;
import com.pfa2.evaluation_serivce.model.question.Question;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;



public class QuestionPratique extends Question {
    @NotNull
    String  codeInitial;
    @NotNull
    String fileName;

    public @NotNull String getFileName() {
        return fileName;
    }

    public void setFileName(@NotNull String fileName) {
        this.fileName = fileName;
    }

    @NotNull
    String language;
    @NotNull
    List<TestUnitaire> listTestUnitaire;
    public QuestionPratique () {
        super();
    }
    public QuestionPratique(String codeInitial, List<TestUnitaire> listTestUnitaire) {
        this.codeInitial = codeInitial;
        this.listTestUnitaire = listTestUnitaire;
    }

    public @NotNull String getLanguage() {
        return language;
    }

    public void setLanguage(@NotNull String language) {
        this.language = language;
    }

    public QuestionPratique(String id, String enonce, String module, int dureeReponse, int niveau, TypeQuestion type, String explications, int pointsMax, int nbEssaisMax, String codeInitial, List<TestUnitaire> listTestUnitaire) {
        super(id, enonce, module, dureeReponse, niveau, type, explications, pointsMax, nbEssaisMax);
        this.codeInitial = codeInitial;
        this.listTestUnitaire = listTestUnitaire;
    }

    public String getCodeInitial() {
        return codeInitial;
    }

    public void setCodeInitial(String codeInitial) {
        this.codeInitial = codeInitial;
    }

    public List<TestUnitaire> getListTestUnitaire() {
        return listTestUnitaire;
    }

    public void setListTestUnitaire(List<TestUnitaire> listTestUnitaire) {
        this.listTestUnitaire = listTestUnitaire;
    }

    @Override
    public String toString() {
        return "QuestionPratique{" +
                "codeInitial='" + codeInitial + '\'' +
                ", listTestUnitaire=" + listTestUnitaire +
                '}';
    }
}
