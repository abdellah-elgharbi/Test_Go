package com.abdellah.pfa2.evaluation_service.document;

import com.abdellah.pfa2.evaluation_service.enumeration.TypeQuestion;
import com.abdellah.pfa2.evaluation_service.model.TestUnitaire;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@TypeAlias("questionPratique")
@Document(collection = "question")
public class QuestionPratique extends Question {
   @NotNull
   String  codeInitial;
   @NotNull
   List<TestUnitaire> listTestUnitaire;
public QuestionPratique () {
   super();
}
   public QuestionPratique(String codeInitial, List<TestUnitaire> listTestUnitaire) {
      this.codeInitial = codeInitial;
      this.listTestUnitaire = listTestUnitaire;
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
      return "QuestionTheorique{" +
              "codeInitial='" + codeInitial + '\'' +
              ", listTestUnitaire=" + listTestUnitaire +
              '}';
   }
}
