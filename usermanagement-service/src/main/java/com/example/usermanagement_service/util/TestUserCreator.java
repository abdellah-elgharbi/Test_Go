//package com.example.usermanagement_service.util;
//
//import com.example.usermanagement_service.model.Role;
//import com.example.usermanagement_service.model.User;
//import com.example.usermanagement_service.repository.UserRepository;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//@Configuration
//public class TestUserCreator {
//    @Bean
//    public CommandLineRunner createTestUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
//        return args -> {
//            User user = new User(
//                    "Dupont",
//                    "Jean",
//                    "test@example.com",
//                    passwordEncoder.encode("password123"),
//                    Role.ADMIN
//            );
//            user.setTelephone("0123456789");
//            user.setActive(true);
//
//            userRepository.save(user);
//            System.out.println("Utilisateur test créé avec succès!");
//            System.out.println("Mot de passe encodé: " + user.getPassword());
//        };
//    }
//}