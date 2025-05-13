# Utiliser une image officielle Python slim
FROM python:3.10-slim

# Définir le répertoire de travail
WORKDIR /app

# Copier les dépendances (fichier requirements.txt)
COPY requirements.txt .

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Copier tout le code de l'application
COPY . .

# Exposer le port (par défaut 5000 pour Flask)
EXPOSE 5000

# Définir la commande pour démarrer l'application Flask
CMD ["python", "app.py"]
