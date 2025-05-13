package com.abdellah.pfa2.evaluation_service.controllers;

import com.abdellah.pfa2.evaluation_service.document.Question;
import com.abdellah.pfa2.evaluation_service.document.QuestionPratique;

import com.abdellah.pfa2.evaluation_service.document.QuestionThorique;
import com.abdellah.pfa2.evaluation_service.services.QuestionsService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions-service/")
@Api(value = "Gestion des questions", tags = {"Questions Service"})
public class QuestionController {

    @Autowired
    QuestionsService questionsService;

    @GetMapping("getAll")
    @ApiOperation(value = "Récupérer toutes les questions", notes = "Retourne une liste de toutes les questions.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Succès, liste des questions récupérée."),
            @ApiResponse(code = 500, message = "Erreur interne du serveur")
    })
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> questions = questionsService.getAll();
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @GetMapping("get/{id}")
    @ApiOperation(value = "Récupérer une question par ID", notes = "Retourne une question spécifique en fonction de son identifiant.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Succès, question récupérée."),
            @ApiResponse(code = 404, message = "Question non trouvée."),
            @ApiResponse(code = 500, message = "Erreur interne du serveur")
    })
    public ResponseEntity<Question> getQuestion(@PathVariable String id) {
        Question question = questionsService.getById(id);
        return new ResponseEntity<>(question, HttpStatus.OK);
    }

    @PostMapping("create-pratique")
    @ApiOperation(value = "Créer une question pratique", notes = "Crée une nouvelle question de type pratique.")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Succès, question pratique créée."),
            @ApiResponse(code = 400, message = "Données invalides fournies."),
            @ApiResponse(code = 500, message = "Erreur interne du serveur")
    })
    public ResponseEntity<String> createQuestionPratique(@RequestBody @Valid QuestionPratique question) {
        System.out.println(question.getId() + " " + question.getEnonce());
        questionsService.create(question);
        return new ResponseEntity<>("La question a bien été créée", HttpStatus.CREATED);
    }

    @PostMapping("create-Theorique")
    @ApiOperation(value = "Créer une question théorique", notes = "Crée une nouvelle question de type théorique.")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Succès, question théorique créée."),
            @ApiResponse(code = 400, message = "Données invalides fournies."),
            @ApiResponse(code = 500, message = "Erreur interne du serveur")
    })
    public ResponseEntity<String> createQuestionTheorique(@RequestBody @Valid QuestionThorique question) {
        System.out.println(question.getId() + " " + question.getEnonce());
        questionsService.create(question);
        return new ResponseEntity<>("La question a bien été créée", HttpStatus.CREATED);
    }

    @PutMapping("update-Theorique")
    @ApiOperation(value = "Mettre à jour une question théorique", notes = "Met à jour les détails d'une question théorique existante.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Succès, question théorique mise à jour."),
            @ApiResponse(code = 400, message = "Données invalides fournies."),
            @ApiResponse(code = 404, message = "Question non trouvée."),
            @ApiResponse(code = 500, message = "Erreur interne du serveur")
    })
    public ResponseEntity<String> updateQuestionTheorique(@RequestBody @Valid QuestionThorique question) {
        questionsService.update(question);
        return new ResponseEntity<>("La question a bien été mise à jour", HttpStatus.OK);
    }

    @PutMapping("update-pratique")
    @ApiOperation(value = "Mettre à jour une question pratique", notes = "Met à jour les détails d'une question pratique existante.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Succès, question pratique mise à jour."),
            @ApiResponse(code = 400, message = "Données invalides fournies."),
            @ApiResponse(code = 404, message = "Question non trouvée."),
            @ApiResponse(code = 500, message = "Erreur interne du serveur")
    })
    public ResponseEntity<String> updateQuestionPratique(@RequestBody @Valid QuestionPratique question) {
        questionsService.update(question);
        return new ResponseEntity<>("La question a bien été mise à jour", HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    @ApiOperation(value = "Supprimer une question par ID", notes = "Supprime une question en fonction de son identifiant.")
    @ApiResponses(value = {
            @ApiResponse(code = 204, message = "Succès, question supprimée."),
            @ApiResponse(code = 404, message = "Question non trouvée."),
            @ApiResponse(code = 500, message = "Erreur interne du serveur")
    })
    public ResponseEntity<String> deleteQuestion(@PathVariable @NotNull String id) {
        questionsService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
