package com.example.notification_service.service;

import com.example.notification_service.dto.PasswordResetMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

@Service
public class PasswordResetConsumer {

    private static final Logger logger = LoggerFactory.getLogger(PasswordResetConsumer.class);
    private final EmailService emailService;

    public PasswordResetConsumer(EmailService emailService) {
        this.emailService = emailService;
    }

    @KafkaListener(
            topics = "${app.kafka.topics.password-reset}",
            groupId = "${spring.kafka.consumer.group-id}"
    )
    public void consume(@Payload PasswordResetMessage message) {
        try {
            logger.info("📩 Message reçu pour l'email: {}", message.getEmail());

            // Vérifie si le token est encore valide
            long currentTime = System.currentTimeMillis();
            if (message.getExpiryDate() < currentTime) {
                logger.warn("⏰ Token expiré pour l'email: {}", message.getEmail());
                return;
            }

            // Envoie de l'email
            emailService.sendPasswordResetEmail(message.getEmail(), message.getResetToken());

            logger.info("✅ Email envoyé avec succès à: {}", message.getEmail());
        } catch (Exception e) {
            logger.error("❌ Erreur lors du traitement du message de réinitialisation: {}", e.getMessage(), e);
        }
    }
}
