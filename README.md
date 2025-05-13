
# README - Exécution de l'Architecture Microservices

Ce projet utilise une architecture microservices avec plusieurs services construits avec Spring Boot. Les services communiquent via Kafka et utilisent MongoDB comme base de données.

## Prérequis

Avant de démarrer, assurez-vous que les éléments suivants sont installés sur votre machine :

- **Java 17** ou supérieur (assurez-vous que `JAVA_HOME` est configuré)
- **Maven** (ou **Gradle** si vous préférez)
- **Kafka** (si vous souhaitez tester les services qui en dépendent)
- **MongoDB** (si vous souhaitez tester les services qui en dépendent)
- **IDE** comme IntelliJ IDEA ou VSCode pour ouvrir et exécuter le projet

### Installation de Kafka et MongoDB

Si vous ne disposez pas encore de Kafka et MongoDB localement, vous pouvez suivre les instructions suivantes pour les installer.

#### Kafka

1. Téléchargez et extrayez Kafka à partir de [Apache Kafka](https://kafka.apache.org/downloads).
2. Démarrez Zookeeper :

   ```bash
   bin/zookeeper-server-start.sh config/zookeeper.properties
   ```

3. Ensuite, démarrez Kafka :

   ```bash
   bin/kafka-server-start.sh config/server.properties
   ```

#### MongoDB

1. Téléchargez et installez MongoDB à partir de [MongoDB Community Edition](https://www.mongodb.com/try/download/community).
2. Lancez MongoDB sur le port 27017 (c'est le port par défaut pour MongoDB) :

   ```bash
   mongod --port 27017
   ```

## Lancer les Microservices

### 1. Cloner le projet

Clonez ce projet dans votre répertoire local :

```bash
git clone https://github.com/votre-utilisateur/votre-repository.git
cd votre-repository
```

### 2. Construire les services

Utilisez Maven ou Gradle pour construire les services. Assurez-vous que chaque service dispose de son propre répertoire avec un `pom.xml` (pour Maven) ou `build.gradle` (pour Gradle).

#### Exemple pour Maven :

Pour chaque microservice, naviguez dans le répertoire du service et exécutez :

```bash
mvn clean install
```

Cela téléchargera les dépendances et construira le JAR exécutable de chaque microservice.

### 3. Lancer chaque service

Une fois les services construits, vous pouvez les exécuter. Voici les étapes pour démarrer chaque service individuellement. Pour chaque service, utilisez la commande suivante à partir du répertoire où le fichier `target/*.jar` du service est généré :

#### Exemple pour démarrer un service Spring Boot (par exemple, `question-service`) :

```bash
java -jar target/question-service.jar
```

### 4. Configuration des services

Certains services dépendent de la configuration de Kafka ou MongoDB. Vous pouvez définir ces configurations dans le fichier `application.properties` ou `application.yml` de chaque service. Assurez-vous que chaque service est configuré pour utiliser Kafka et MongoDB, comme suit :

#### Exemple de configuration dans `application.properties` pour un service Spring Boot :

```properties
spring.kafka.bootstrap-servers=localhost:9092
spring.data.mongodb.uri=mongodb://localhost:27017/votre-base-de-donnees
```

### 5. Vérifier le bon fonctionnement

- **Discovery Service** : Accédez à `http://localhost:8761` pour vérifier que le service de découverte fonctionne et que tous les services sont enregistrés.
- **Autres services** : Accédez à chaque service via les ports appropriés. Par exemple :
  - `http://localhost:8081` pour `question-service`
  - `http://localhost:8082` pour `filier-service`
  - `http://localhost:8083` pour `ev-service`

### 6. Consommation et production des messages avec Kafka

Si vous utilisez Kafka dans votre architecture microservices, assurez-vous que Kafka est en cours d'exécution et que les services qui consomment ou produisent des messages à l'aide de Kafka peuvent s'y connecter. Les services qui dépendent de Kafka devront consommer ou produire des messages via des topics Kafka spécifiques.

### 7. Gestion des bases de données

Assurez-vous que **MongoDB** est en cours d'exécution sur le port `27017` et que chaque service qui utilise MongoDB est connecté à la base de données correctement. Vous pouvez vérifier cela en vous connectant à MongoDB avec un outil comme **MongoDB Compass** ou en utilisant des commandes MongoDB dans le terminal.

---

## Dépannage

Si vous rencontrez des problèmes lors de l'exécution des services :

1. Vérifiez les logs de chaque service pour des erreurs spécifiques.
2. Assurez-vous que tous les services nécessaires (Kafka, MongoDB, etc.) sont en cours d'exécution avant de démarrer les microservices.
3. Si un service échoue à démarrer, essayez de nettoyer et de reconstruire ce service (avec `mvn clean install` pour Maven).
4. Vérifiez les configurations de vos services dans `application.properties` ou `application.yml` pour des erreurs de connexion aux services externes (Kafka, MongoDB, etc.).

---

## Conclusion

Cette architecture de microservices vous permet de déployer chaque service indépendamment, avec une communication via Kafka pour le passage de messages asynchrones et MongoDB pour la gestion des données. Assurez-vous que tous les services nécessaires sont bien configurés et fonctionnent correctement avant de tester l'application.
