package com.example.usermanagement_service.service;

import com.example.usermanagement_service.dto.*;
import com.example.usermanagement_service.exception.ResourceNotFoundException;
import com.example.usermanagement_service.exception.UserAlreadyExistsException;
import com.example.usermanagement_service.mapper.UserMapper;
import com.example.usermanagement_service.model.Etudiant;
import com.example.usermanagement_service.model.*;

import com.example.usermanagement_service.repository.EnseignantRepository;
import com.example.usermanagement_service.repository.EtudiantRepository;
import com.example.usermanagement_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final EnseignantRepository enseignantRepository;
    private final EtudiantRepository etudiantRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(
            UserRepository userRepository,
            EnseignantRepository enseignantRepository,
            EtudiantRepository etudiantRepository,
            UserMapper userMapper,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.enseignantRepository = enseignantRepository;
        this.etudiantRepository = etudiantRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Récupère tous les utilisateurs
     */
    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return userMapper.toUserDTOList(users);
    }

    /**
     * Récupère un utilisateur par son ID
     */
    @Override
    public UserDTO getUserById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé avec l'id: " + id));
        return userMapper.toUserDTO(user);
    }

    /**
     * Récupère un utilisateur par son email
     */
    @Override
    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé avec l'email: " + email));
        return userMapper.toUserDTO(user);
    }

    /**
     * Supprime un utilisateur
     */
    @Override
    public void deleteUser(String id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("Utilisateur non trouvé avec l'id: " + id);
        }
        userRepository.deleteById(id);
    }

    // ============== ENSEIGNANTS ==============

    /**
     * Récupère tous les enseignants
     */
    @Override
    public List<EnseignantDTO> getAllEnseignants() {
        List<Enseignant> enseignants = enseignantRepository.findAll();
        return userMapper.toEnseignantDTOList(enseignants);
    }

    /**
     * Récupère un enseignant par son ID
     */
    @Override
    public EnseignantDTO getEnseignantById(String id) {
        Enseignant enseignant = enseignantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enseignant non trouvé avec l'id: " + id));
        return userMapper.toEnseignantDTO(enseignant);
    }

    /**
     * Crée un enseignant
     */
    @Override
    public EnseignantDTO createEnseignant(EnseignantCreateDTO dto) {
        // Vérifier si l'email existe déjà
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new UserAlreadyExistsException("Un utilisateur avec cet email existe déjà: " + dto.getEmail());
        }

        // Créer un nouvel enseignant
        Enseignant enseignant = new Enseignant();
        enseignant.setEmail(dto.getEmail());

        // Encoder le mot de passe avant de le stocker
        String encodedPassword = passwordEncoder.encode(dto.getPassword());  // Crypter le mot de passe

        enseignant.setPassword(encodedPassword);  // Stocker le mot de passe crypté dans l'objet enseignant

        enseignant.setNom(dto.getNom());
        enseignant.setPrenom(dto.getPrenom());
        enseignant.setRole(Role.ENSEIGNANT);
        enseignant.setTelephone(dto.getTelephone());

        // Sauvegarder l'enseignant
        Enseignant savedEnseignant = enseignantRepository.save(enseignant);
        return userMapper.toEnseignantDTO(savedEnseignant);
    }

    /**
     * Met à jour un enseignant
     */
    @Override
    public EnseignantDTO updateEnseignant(String id, EnseignantUpdateDTO dto) {
        Enseignant enseignant = enseignantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enseignant non trouvé avec l'id: " + id));

        // Mettre à jour les champs
        enseignant.setNom(dto.getNom() != null ? dto.getNom() : enseignant.getNom());
        enseignant.setPrenom(dto.getPrenom() != null ? dto.getPrenom() : enseignant.getPrenom());
        enseignant.setTelephone(dto.getTelephone() != null ? dto.getTelephone() : enseignant.getTelephone());



        // Sauvegarder les modifications
        Enseignant updatedEnseignant = enseignantRepository.save(enseignant);
        return userMapper.toEnseignantDTO(updatedEnseignant);
    }

    /**
     * Récupère tous les étudiants
     */
    @Override
    public List<EtudiantDTO> getAllEtudiants() {
        List<Etudiant> etudiants = etudiantRepository.findAll();
        return userMapper.toEtudiantDTOList(etudiants);
    }

    /**
     * Récupère un étudiant par son ID
     */
    @Override
    public EtudiantDTO getEtudiantById(String id) {
        Etudiant etudiant = etudiantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Etudiant non trouvé avec l'id: " + id));
        return userMapper.toEtudiantDTO(etudiant);
    }

    /**
     * Crée un étudiant
     */
    @Override
    public EtudiantDTO createEtudiant(EtudiantCreateDTO dto) {
        // Vérifier si l'email existe déjà
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new UserAlreadyExistsException("Un utilisateur avec cet email existe déjà: " + dto.getEmail());
        }

        // Créer un nouvel étudiant
        Etudiant etudiant = new Etudiant();
        etudiant.setEmail(dto.getEmail());

        // Encoder le mot de passe avant de le stocker
        String encodedPassword = passwordEncoder.encode(dto.getPassword());  // Crypter le mot de passe

        etudiant.setPassword(encodedPassword);  // Stocker le mot de passe crypté dans l'objet étudiant

        etudiant.setNom(dto.getNom());
        etudiant.setPrenom(dto.getPrenom());
        etudiant.setRole(Role.ETUDIANT);
        etudiant.setTelephone(dto.getTelephone());
        etudiant.setFiliere(dto.getFiliere());
        etudiant.setNiveau(dto.getNiveau());

        // Sauvegarder l'étudiant
        Etudiant savedEtudiant = etudiantRepository.save(etudiant);
        return userMapper.toEtudiantDTO(savedEtudiant);
    }


    /**
     * Met à jour un étudiant
     */
    @Override
    public EtudiantDTO updateEtudiant(String id, EtudiantUpdateDTO dto) {
        Etudiant etudiant = etudiantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Etudiant non trouvé avec l'id: " + id));

        // Mettre à jour les champs
        etudiant.setNom(dto.getNom() != null ? dto.getNom() : etudiant.getNom());
        etudiant.setPrenom(dto.getPrenom() != null ? dto.getPrenom() : etudiant.getPrenom());
        etudiant.setTelephone(dto.getTelephone() != null ? dto.getTelephone() : etudiant.getTelephone());
        etudiant.setFiliere(dto.getFiliere() != null ? dto.getFiliere() : etudiant.getFiliere());

        if (dto.getNiveau() > 0) {
            etudiant.setNiveau(dto.getNiveau());
        }

        // Sauvegarder les modifications
        Etudiant updatedEtudiant = etudiantRepository.save(etudiant);
        return userMapper.toEtudiantDTO(updatedEtudiant);
    }

    /**
     * Récupère les étudiants par filière
     */
    @Override
    public List<EtudiantDTO> getEtudiantsByFiliere(String filiere) {
        List<Etudiant> etudiants = etudiantRepository.findByFiliere(filiere);
        return userMapper.toEtudiantDTOList(etudiants);
    }

    /**
     * Récupère les étudiants par niveau
     */
    @Override
    public List<EtudiantDTO> getEtudiantsByNiveau(int niveau) {
        List<Etudiant> etudiants = etudiantRepository.findByNiveau(niveau);
        return userMapper.toEtudiantDTOList(etudiants);
    }

    /**
     * Récupère les étudiants par filière et niveau
     */
    @Override
    public List<EtudiantDTO> getEtudiantsByFiliereAndNiveau(String filiere, int niveau) {
        List<Etudiant> etudiants = etudiantRepository.findByFiliereAndNiveau(filiere, niveau);
        return userMapper.toEtudiantDTOList(etudiants);
    }
}
