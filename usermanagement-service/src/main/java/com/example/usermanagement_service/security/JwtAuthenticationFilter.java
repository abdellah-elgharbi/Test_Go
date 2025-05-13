package com.example.usermanagement_service.security;

import com.example.usermanagement_service.service.JwtService;
import com.example.usermanagement_service.service.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // 🔒 Ignorer les chemins d'authentification (login, refresh, reset-password)
        String path = request.getRequestURI();
        if (path.startsWith("/api/auth/login") || path.startsWith("/api/auth/refresh") ||
                path.startsWith("/api/auth/reset-password")) {
            filterChain.doFilter(request, response); // Continuer sans filtrer
            return;
        }

        // Extraire le token JWT de l'en-tête Authorization
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        // Vérifier si l'en-tête Authorization est présent et commence par "Bearer "
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response); // Continuer sans filtrer si pas de token
            return;
        }

        // Extraire le JWT et l'email de l'utilisateur du token
        jwt = authHeader.substring(7); // Extraire le token sans "Bearer "
        userEmail = jwtService.extractUsername(jwt);

        // Si un email est extrait du token et l'authentification n'est pas déjà établie
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Charger les détails de l'utilisateur (nom, rôles, etc.) à partir de la base de données
            UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

            // Valider le token JWT et s'assurer que l'utilisateur existe
            if (jwtService.validateToken(jwt, userDetails)) {
                // Si le token est valide, authentifier l'utilisateur dans le contexte de Spring Security
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request)); // Détails supplémentaires comme l'IP
                SecurityContextHolder.getContext().setAuthentication(authToken); // Authentifier l'utilisateur
            }
        }

        // Passer à la prochaine étape du filtre (route suivante)
        filterChain.doFilter(request, response);
    }
}
