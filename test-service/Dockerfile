FROM openjdk:17-jdk-slim

WORKDIR /app

# Copier n'importe quel JAR dans le dossier /app et le renommer en app.jar
COPY target/*.jar Test_service.jar

EXPOSE 8087

ENTRYPOINT ["java", "-jar", "app.jar"]
