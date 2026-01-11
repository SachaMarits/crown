# Riot Challenger Analyzer

POC pour analyser les champions les plus joués par le top 100 des joueurs Challenger sur EUW.

## Installation

```bash
npm install
```

## Configuration

1. Créez un fichier `.env` à la racine du projet
2. Ajoutez votre clé API Riot Games :

```
RIOT_API_KEY=votre_cle_api_ici
```

Pour obtenir une clé API Riot Games : https://developer.riotgames.com/

## Utilisation

### Script manuel

```bash
npm run backend:dev
```

Le script va :
1. Récupérer le top 100 Challenger EUW
2. Analyser les 20 derniers matchs ranked solo de chaque joueur
3. Déterminer les top 3 champions de chaque joueur
4. Agrégation et tri des résultats
5. Afficher les résultats dans la console
6. Sauvegarder les résultats dans `src/data/results.json`

### Développement frontend

```bash
npm run dev
```

### Automatisation avec GitHub Actions

Le projet utilise GitHub Actions pour automatiser la régénération des données quotidiennement. Le workflow s'exécute tous les jours à 00:00 UTC et met à jour automatiquement `src/data/results.json`.

**Configuration requise :**
1. Ajoutez votre clé API Riot Games dans les secrets GitHub : `Settings > Secrets and variables > Actions > New repository secret`
   - Nom : `RIOT_API_KEY`
   - Valeur : votre clé API Riot Games

Le workflow committera et poussera automatiquement les nouvelles données.

## Note

- Le script inclut un throttling (150ms entre les requêtes) pour respecter les rate limits de l'API
- La clé API de développement gratuite permet 100 requêtes toutes les 2 minutes
- Le traitement complet peut prendre plusieurs minutes selon la limite de taux
