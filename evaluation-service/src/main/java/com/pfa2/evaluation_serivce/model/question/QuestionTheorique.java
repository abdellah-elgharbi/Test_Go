package com.pfa2.evaluation_serivce.model.question;


import com.pfa2.evaluation_serivce.enumeration.TypeQuestion;
import com.pfa2.evaluation_serivce.model.question.Question;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;



public class QuestionTheorique extends Question {
   @NotNull
   private List<String> options;
   @NotNull
   private int indiceCorrectOption;
   @NotNull
   private Date DateDebut;
   public boolean verifierTests(int indexRespense) {
      if (this.indiceCorrectOption == indexRespense) {
         return true;
      }
      return false;
   }


   public QuestionTheorique(String id, String enonce, String module, int dureeReponse, int niveau, TypeQuestion type, String explications, int pointsMax, int nbEssaisMax, List<String> options, int indiceCorrectOption, Date dateDebut) {
      super(id, enonce, module, dureeReponse, niveau, type, explications, pointsMax, nbEssaisMax);
      this.options = options;
      this.indiceCorrectOption = indiceCorrectOption;
      DateDebut = dateDebut;
   }

   public QuestionTheorique(List<String> options, int indiceCorrectOption, Date dateDebut) {
      this.options = options;
      this.indiceCorrectOption = indiceCorrectOption;
      DateDebut = dateDebut;
   }
   public QuestionTheorique(){
      super();
   }
   public List<String> getOptions() {
      return options;
   }

   public void setOptions(List<String> options) {
      this.options = options;
   }

   public int getIndiceCorrectOption() {
      return indiceCorrectOption;
   }

   public void setIndiceCorrectOption(int indiceCorrectOption) {
      this.indiceCorrectOption = indiceCorrectOption;
   }

   public Date getDateDebut() {
      return DateDebut;
   }

   public void setDateDebut(Date dateDebut) {
      DateDebut = dateDebut;
   }

   @Override
   public String toString() {
      return "QuestionTheorique{" +
              "options=" + options +
              ", indiceCorrectOption=" + indiceCorrectOption +
              ", DateDebut=" + DateDebut +
              '}';
   }
}
