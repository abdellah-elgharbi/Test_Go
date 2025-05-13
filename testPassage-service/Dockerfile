FROM openjdk:17-jdk-slim

WORKDIR /app

# Copier n'importe quel JAR dans le dossier /app et le renommer en app.jar
COPY target/*.jar Passage_service.jar

EXPOSE 8086

ENTRYPOINT ["java", "-jar", "app.jar"]
