package com.pfa2.evaluation_serivce.model.reponseEtudaint;

import com.pfa2.evaluation_serivce.model.ReponseEtudiant;
import com.pfa2.evaluation_serivce.model.question.Question;
import com.pfa2.evaluation_serivce.model.question.QuestionPratique;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class ReponseEtudiantPratique extends ReponseEtudiant {
    @NotNull
    private QuestionPratique question;
    @NotNull
    private String reponse;

    public ReponseEtudiantPratique() {
            super();
    }


    public ReponseEtudiantPratique(String id, LocalDateTime heureReponse, int essaisUtilises, boolean estCorrecte, float score, QuestionPratique question, String reponse) {
        super(id, heureReponse, essaisUtilises, estCorrecte, score);
        this.question = question;
        this.reponse = reponse;
    }

    public ReponseEtudiantPratique(QuestionPratique question, String reponse) {
        this.question = question;
        this.reponse = reponse;
    }

    public @NotNull QuestionPratique getQuestion() {
        return question;
    }

    public void setQuestion(@NotNull QuestionPratique question) {
        this.question = question;
    }

    public @NotNull String getReponse() {
        return reponse;
    }

    public void setReponse(@NotNull String reponse) {
        this.reponse = reponse;
    }

    @Override
    public String toString() {
        return "ReponseEtudiantPratique{" +
                "question=" + question +
                ", reponse=" + reponse +
                '}';
    }
}
