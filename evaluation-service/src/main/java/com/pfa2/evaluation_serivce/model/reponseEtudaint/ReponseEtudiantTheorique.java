package com.pfa2.evaluation_serivce.model.reponseEtudaint;

import com.pfa2.evaluation_serivce.model.ReponseEtudiant;
import com.pfa2.evaluation_serivce.model.question.QuestionTheorique;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class ReponseEtudiantTheorique extends ReponseEtudiant {
    @NotNull
    private QuestionTheorique question;
    @NotNull
    private int reponse;
    public ReponseEtudiantTheorique() {
        super();
    }
    public ReponseEtudiantTheorique(String id, LocalDateTime heureReponse, int essaisUtilises, boolean estCorrecte, float score, QuestionTheorique question, int reponse) {
        super(id, heureReponse, essaisUtilises, estCorrecte, score);
        this.question = question;
        this.reponse = reponse;
    }

    public ReponseEtudiantTheorique(QuestionTheorique question, int reponse) {
        this.question = question;
        this.reponse = reponse;
    }
    public @NotNull QuestionTheorique getQuestion() {
        return question;
    }
    public void setQuestion(@NotNull QuestionTheorique question) {
        this.question = question;
    }
    public @NotNull int getReponse() {
        return reponse;
    }
    public void setReponse(@NotNull int reponse) {
        this.reponse = reponse;
    }

    @Override
    public String toString() {
        return "ReponseEtudiantTheorique{" +
                "question=" + question +
                ", reponse='" + reponse + '\'' +
                '}';
    }
}
