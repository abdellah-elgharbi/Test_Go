package com.example.usermanagement_service.security;

import com.example.usermanagement_service.service.JwtService;
import com.example.usermanagement_service.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private JwtService jwtService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.csrf().disable() // Désactive CSRF (utile pour les API stateless)
                .authorizeHttpRequests()
                .requestMatchers("/reset-password-form.html").permitAll()
                .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                .requestMatchers("/api/auth/complete-reset-password").permitAll()
                // Permet à tout le monde d'accéder aux routes d'authentification
                .requestMatchers("/api/auth/login", "/api/auth/refresh", "/api/auth/reset-password").permitAll()

                // Les routes des utilisateurs nécessitent un token valide
                .requestMatchers("/api/users").hasRole("ADMIN")
                .requestMatchers("/api/users/{id}").hasRole("ADMIN")
                .requestMatchers("/api/users/enseignants/{id}").hasRole("ENSEIGNANT")
                .requestMatchers("/api/users/enseignants/**").hasRole("ADMIN") // Accessible uniquement par ADMIN
                .requestMatchers("/api/users/enseignants").hasRole("ADMIN")
                .requestMatchers("/api/users/etudiants/{id}").hasAnyRole("ADMIN", "ENSEIGNANT")
                .requestMatchers("/api/users/etudiants/filiere/**").hasAnyRole("ADMIN", "ENSEIGNANT")
                .requestMatchers("/api/users/etudiants/niveau/**").hasAnyRole("ADMIN", "ENSEIGNANT")
                .requestMatchers("/api/users/etudiants/**").hasAnyRole("ADMIN", "ENSEIGNANT")
                .anyRequest().authenticated() // Toute autre requête nécessite une authentification

                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Stateless pour les API
                .and()
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class) // Filtre JWT avant UsernamePasswordAuthenticationFilter
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
