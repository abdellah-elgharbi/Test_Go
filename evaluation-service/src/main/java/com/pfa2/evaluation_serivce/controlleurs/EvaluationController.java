package com.pfa2.evaluation_serivce.controlleurs;

import com.pfa2.evaluation_serivce.model.ReponseEtudiant;
import com.pfa2.evaluation_serivce.model.TestUnitaire;
import com.pfa2.evaluation_serivce.model.reponseEtudaint.ReponseEtudiantPratique;
import com.pfa2.evaluation_serivce.model.reponseEtudaint.ReponseEtudiantTheorique;
import com.pfa2.evaluation_serivce.service.EvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/evaluation-service")
public class EvaluationController {

    @Autowired
    private EvaluationService evaluationService;

    // Méthode d'évaluation
    @PostMapping("/evaluation")
    public ResponseEntity<List<ReponseEtudiant>> evaluation(@RequestBody List<ReponseEtudiant> reponses) {

        String codeExemple = "a = int(input())\nb = int(input())\nprint(a + b)";

        reponses.forEach(r -> {
            if (r instanceof ReponseEtudiantPratique) {
                ReponseEtudiantPratique reponsePratique = (ReponseEtudiantPratique) r;
                String codeSoumis = reponsePratique.getReponse();
                List<TestUnitaire> tests = reponsePratique.getQuestion().getListTestUnitaire();
                String language = reponsePratique.getQuestion().getLanguage();
                System.out.println(codeSoumis);
                String fileName=reponsePratique.getQuestion().getFileName();

                boolean estCorrecte = evaluationService.testCode(tests, codeSoumis, language,fileName);


                reponsePratique.setEstCorrecte(estCorrecte);
            }else {
                r.setEstCorrecte(evaluationService.testTheorique(
                        ((ReponseEtudiantTheorique) r).getReponse(),
                        ((ReponseEtudiantTheorique) r).getQuestion().getIndiceCorrectOption()
                ));
            }
        });

        return ResponseEntity.ok(reponses);
    }
}
