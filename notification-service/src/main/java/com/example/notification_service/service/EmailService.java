package com.example.notification_service.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    @Value("${app.email.from}")
    private String fromEmail;

    @Value("${app.email.reset-password-subject}")
    private String resetPasswordSubject;

    @Value("${app.email.reset-password-url}")
    private String resetPasswordUrl;

    public EmailService(JavaMailSender mailSender, SpringTemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    public void sendPasswordResetEmail(String email, String encryptedToken) {
        try {
            // Construction correcte du lien
            String fullResetLink = resetPasswordUrl + "?token=" + encryptedToken;

            Map<String, Object> templateModel = new HashMap<>();
            templateModel.put("resetLink", fullResetLink);
            templateModel.put("email", email);

            String htmlContent = processTemplate("password-reset-email", templateModel);

            sendHtmlEmail(email, resetPasswordSubject, htmlContent);

            logger.info("Email de réinitialisation de mot de passe envoyé à: {}", email);
        } catch (Exception e) {
            logger.error("Erreur lors de l'envoi de l'email de réinitialisation à {}: {}", email, e.getMessage());
            throw new RuntimeException("Échec de l'envoi de l'email de réinitialisation", e);
        }
    }


    private String processTemplate(String templateName, Map<String, Object> variables) {
        Context context = new Context();
        context.setVariables(variables);
        return templateEngine.process(templateName, context);
    }

    private void sendHtmlEmail(String to, String subject, String htmlContent) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, StandardCharsets.UTF_8.name());

        helper.setFrom(fromEmail);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);

        mailSender.send(message);
    }
}