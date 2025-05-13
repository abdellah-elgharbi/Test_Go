package com.example.usermanagement_service.controller;

import com.example.usermanagement_service.dto.*;
import com.example.usermanagement_service.service.UserService;
import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Contrôleur pour la gestion des utilisateurs
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Récupère tous les utilisateurs
     * Accessible uniquement par l'ADMIN
     */
    @Operation(summary = "Get all users", description = "Retrieves a list of all users", security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved all users"),
            @ApiResponse(responseCode = "403", description = "Forbidden access")
    })
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    /**
     * Récupère un utilisateur par son ID
     * Accessible par l'ADMIN ou l'utilisateur lui-même
     */
    @Operation(summary = "Get user by ID", description = "Retrieves a user by their ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved user"),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "403", description = "Forbidden access")
    })
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    public ResponseEntity<UserDTO> getUserById(@PathVariable String id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    /**
     * Récupère un utilisateur par son email
     * Accessible uniquement par l'ADMIN
     */
    @Operation(summary = "Get user by email", description = "Retrieves a user by their email")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved user"),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "403", description = "Forbidden access")
    })
    @GetMapping("/email/{email}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email) {
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    /**
     * Supprime un utilisateur
     * Accessible uniquement par l'ADMIN
     */
    @Operation(summary = "Delete user", description = "Deletes a user by their ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Successfully deleted user"),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "403", description = "Forbidden access")
    })
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }


    // ============== ENSEIGNANTS ==============

    /**
     * Récupère tous les enseignants
     * Accessible par l'ADMIN et les ENSEIGNANTS
     */
    @Operation(summary = "Get all enseignants", description = "Retrieves a list of all enseignants")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved enseignants"),
            @ApiResponse(responseCode = "403", description = "Forbidden access")
    })
    @GetMapping("/enseignants")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<EnseignantDTO>> getAllEnseignants() {
        return ResponseEntity.ok(userService.getAllEnseignants());
    }

    /**
     * Récupère un enseignant par son ID
     * Accessible par l'ADMIN, les ENSEIGNANTS ou l'enseignant lui-même
     */
    @Operation(summary = "Get enseignant by ID", description = "Retrieves an enseignant by their ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved enseignant"),
            @ApiResponse(responseCode = "404", description = "Enseignant not found"),
            @ApiResponse(responseCode = "403", description = "Forbidden access")
    })
    @GetMapping("/enseignants/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ENSEIGNANT') or #id == authentication.principal.id")
    public ResponseEntity<EnseignantDTO> getEnseignantById(@PathVariable String id) {
        return ResponseEntity.ok(userService.getEnseignantById(id));
    }

    /**
     * Crée un nouvel enseignant
     * Accessible uniquement par l'ADMIN
     */
    @Operation(summary = "Create a new enseignant", description = "Creates a new enseignant")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Successfully created enseignant"),
            @ApiResponse(responseCode = "400", description = "Invalid enseignant data")
    })
    @PostMapping("/enseignants")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EnseignantDTO> createEnseignant(@Valid @RequestBody EnseignantCreateDTO dto) {
        return new ResponseEntity<>(userService.createEnseignant(dto), HttpStatus.CREATED);
    }

    @DeleteMapping("/enseignants/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteEnseignant(@PathVariable String id) {
        userService.deleteUser(id); // Utilise la méthode de suppression existante
        return ResponseEntity.noContent().build();
    }

    /**
     * Met à jour un enseignant
     * Accessible par l'ADMIN ou l'enseignant lui-même
     */
    @Operation(summary = "Update enseignant", description = "Updates enseignant information")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully updated enseignant"),
            @ApiResponse(responseCode = "400", description = "Invalid enseignant data"),
            @ApiResponse(responseCode = "403", description = "Forbidden access")
    })
    @PutMapping("/enseignants/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    public ResponseEntity<EnseignantDTO> updateEnseignant(
            @PathVariable String id,
            @Valid @RequestBody EnseignantUpdateDTO dto) {
        return ResponseEntity.ok(userService.updateEnseignant(id, dto));
    }




    // ============== ETUDIANTS ==============

    /**
     * Récupère tous les étudiants
     * Accessible par l'ADMIN et les ENSEIGNANTS
     */
    @Operation(summary = "Get all etudiants", description = "Retrieves a list of all etudiants")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved etudiants"),
            @ApiResponse(responseCode = "403", description = "Forbidden access")
    })
    @GetMapping("/etudiants")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<EtudiantDTO>> getAllEtudiants() {
        return ResponseEntity.ok(userService.getAllEtudiants());
    }

    /**
     * Récupère un étudiant par son ID
     * Accessible par l'ADMIN, les ENSEIGNANTS ou l'étudiant lui-même
     */
    @Operation(summary = "Get etudiant by ID", description = "Retrieves an etudiant by their ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved etudiant"),
            @ApiResponse(responseCode = "404", description = "Etudiant not found"),
            @ApiResponse(responseCode = "403", description = "Forbidden access")
    })
    @GetMapping("/etudiants/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ENSEIGNANT')")
    public ResponseEntity<EtudiantDTO> getEtudiantById(@PathVariable String id) {
        return ResponseEntity.ok(userService.getEtudiantById(id));
    }

    /**
     * Crée un nouvel étudiant
     * Accessible uniquement par l'ADMIN
     */
    @Operation(summary = "Create a new etudiant", description = "Creates a new etudiant")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Successfully created etudiant"),
            @ApiResponse(responseCode = "400", description = "Invalid etudiant data")
    })
    @PostMapping("/etudiants")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EtudiantDTO> createEtudiant(@Valid @RequestBody EtudiantCreateDTO dto) {
        return new ResponseEntity<>(userService.createEtudiant(dto), HttpStatus.CREATED);
    }

    /**
     * Met à jour un étudiant
     * Accessible par l'ADMIN ou l'étudiant lui-même
     */
    @Operation(summary = "Update etudiant", description = "Updates etudiant information")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully updated etudiant"),
            @ApiResponse(responseCode = "400", description = "Invalid etudiant data"),
            @ApiResponse(responseCode = "403", description = "Forbidden access")
    })
    @PutMapping("/etudiants/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    public ResponseEntity<EtudiantDTO> updateEtudiant(
            @PathVariable String id,
            @Valid @RequestBody EtudiantUpdateDTO dto) {
        return ResponseEntity.ok(userService.updateEtudiant(id, dto));
    }

    /**
     * Supprime un étudiant
     * Accessible uniquement par l'ADMIN
     */
    @Operation(summary = "Delete etudiant", description = "Deletes an etudiant by their ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Successfully deleted etudiant"),
            @ApiResponse(responseCode = "404", description = "Etudiant not found"),
            @ApiResponse(responseCode = "403", description = "Forbidden access")
    })
    @DeleteMapping("/etudiants/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteEtudiant(@PathVariable String id) {
        userService.deleteUser(id); // Utilise la méthode de suppression existante
        return ResponseEntity.noContent().build();
    }

    /**
     * Récupère les étudiants par filière
     * Accessible par l'ADMIN et les ENSEIGNANTS
     */
    @Operation(summary = "Get etudiants by filiere", description = "Retrieves etudiants by filiere")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved etudiants by filiere"),
            @ApiResponse(responseCode = "403", description = "Forbidden access")
    })
    @GetMapping("/etudiants/filiere/{filiere}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ENSEIGNANT')")
    public ResponseEntity<List<EtudiantDTO>> getEtudiantsByFiliere(@PathVariable String filiere) {
        return ResponseEntity.ok(userService.getEtudiantsByFiliere(filiere));
    }

    /**
     * Récupère les étudiants par niveau
     * Accessible par l'ADMIN et les ENSEIGNANTS
     */
    @Operation(summary = "Get etudiants by niveau", description = "Retrieves etudiants by niveau")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved etudiants by niveau"),
            @ApiResponse(responseCode = "403", description = "Forbidden access")
    })
    @GetMapping("/etudiants/niveau/{niveau}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ENSEIGNANT')")
    public ResponseEntity<List<EtudiantDTO>> getEtudiantsByNiveau(@PathVariable int niveau) {
        return ResponseEntity.ok(userService.getEtudiantsByNiveau(niveau));
    }

    /**
     * Récupère les étudiants par filière et niveau
     * Accessible par l'ADMIN et les ENSEIGNANTS
     */
    @Operation(summary = "Get etudiants by filiere and niveau", description = "Retrieves etudiants by filiere and niveau")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved etudiants by filiere and niveau"),
            @ApiResponse(responseCode = "403", description = "Forbidden access")
    })
    @GetMapping("/etudiants/filiere/{filiere}/niveau/{niveau}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ENSEIGNANT')")
    public ResponseEntity<List<EtudiantDTO>> getEtudiantsByFiliereAndNiveau(
            @PathVariable String filiere,
            @PathVariable int niveau) {
        return ResponseEntity.ok(userService.getEtudiantsByFiliereAndNiveau(filiere, niveau));
    }
}
