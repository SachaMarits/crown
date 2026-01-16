import * as dotenv from "dotenv";
import * as fs from "fs/promises";
import * as path from "path";
import { RiotApiClient } from "./riotApi";
import {
  countChampionsPlayed,
  aggregateChampionCounts,
  formatResults,
} from "./utils";
import { ChallengerPlayer } from "./types";

// Charger les variables d'environnement
dotenv.config();

const RIOT_API_KEY = process.env.RIOT_API_KEY;
const BEST_PLAYER_COUNT = 100;

if (!RIOT_API_KEY) {
  console.error("ERREUR: RIOT_API_KEY n'est pas définie dans le fichier .env");
  process.exit(1);
}

async function main() {
  console.log(
    `🚀 Démarrage de l'analyse des top ${BEST_PLAYER_COUNT} joueurs EUW...\n`
  );

  const apiClient = new RiotApiClient(RIOT_API_KEY as string);
  const allPlayerChampionCounts: Map<string, number>[] = [];

  try {
    // 1. Récupérer les leaderboards (Challenger, Grandmaster, Master)
    console.log("📊 Récupération des leaderboards EUW...");

    const challengerLeague = await apiClient.getChallengerLeaderboard();
    const grandmasterLeague = await apiClient.getGrandmasterLeaderboard();
    const masterLeague = await apiClient.getMasterLeaderboard();

    // Combiner tous les joueurs de tous les tiers
    const allPlayers: ChallengerPlayer[] = [];

    if (challengerLeague?.entries) {
      console.log(
        `  ✅ ${challengerLeague.entries.length} Challengers trouvés`
      );
      allPlayers.push(...challengerLeague.entries);
    }

    if (grandmasterLeague?.entries) {
      console.log(
        `  ✅ ${grandmasterLeague.entries.length} Grandmasters trouvés`
      );
      allPlayers.push(...grandmasterLeague.entries);
    }

    if (masterLeague?.entries) {
      console.log(`  ✅ ${masterLeague.entries.length} Masters trouvés`);
      allPlayers.push(...masterLeague.entries);
    }

    if (allPlayers.length === 0) {
      throw new Error(
        "Aucun joueur trouvé dans les leaderboards Challenger/Grandmaster/Master"
      );
    }

    // 2. Trier par leaguePoints et prendre le top N
    const topPlayers = allPlayers
      .sort((a, b) => b.leaguePoints - a.leaguePoints)
      .slice(0, BEST_PLAYER_COUNT);

    console.log(
      `\n✅ ${topPlayers.length} joueurs sélectionnés (parmi ${allPlayers.length} au total)\n`
    );

    // 3. Pour chaque joueur, récupérer ses champions les plus joués
    let processed = 0;
    for (const player of topPlayers) {
      processed++;
      const playerId = `${player.puuid.substring(0, 8)}...`;
      console.log(
        `[${processed}/${BEST_PLAYER_COUNT}] Traitement du joueur ${playerId} (${player.leaguePoints} LP)...`
      );

      try {
        // Récupérer les 20 derniers matchs ranked solo
        const matchIds = await apiClient.getMatchIdsByPuuid(player.puuid, 20);

        if (matchIds.length === 0) {
          console.log(`  ⚠️  Aucun match trouvé pour le joueur ${playerId}`);
          continue;
        }

        // Récupérer les détails des matchs
        const matches = await apiClient.getMatches(matchIds);

        if (matches.length === 0) {
          console.log(
            `  ⚠️  Aucun détail de match trouvé pour le joueur ${playerId}`
          );
          continue;
        }

        // Compter les champions joués
        const championCount = countChampionsPlayed(matches, player.puuid);

        if (championCount.size > 0) {
          allPlayerChampionCounts.push(championCount);
          const championList = Array.from(championCount.entries())
            .map(([key, count]) => {
              const [name, role] = key.split("|");
              return `${name} ${role} (${count}x)`;
            })
            .join(", ");
          console.log(`  ✅ Champions: ${championList}`);
        } else {
          console.log(`  ⚠️  Aucun champion trouvé pour le joueur ${playerId}`);
        }
      } catch (error: any) {
        console.error(`  ❌ Erreur pour le joueur ${playerId}:`, error.message);

        // Si c'est une erreur 403, arrêter le script car la clé API est invalide
        if (error.message.includes("403")) {
          console.error("\n❌ ERREUR: La clé API semble invalide ou expirée.");
          console.error("   Vérifiez votre clé API dans le fichier .env");
          console.error(
            "   Obtenez une nouvelle clé sur: https://developer.riotgames.com/\n"
          );
          process.exit(1);
        }
      }
    }

    console.log(
      `\n✅ Traitement terminé: ${allPlayerChampionCounts.length} joueurs avec des données valides\n`
    );

    // 4. Agrégation des résultats
    console.log("📈 Agrégation des résultats...");
    const aggregatedStats = aggregateChampionCounts(allPlayerChampionCounts);

    // 5. Affichage des résultats
    const formattedResults = formatResults(aggregatedStats);
    console.log(formattedResults);

    // 6. Sauvegarder dans un fichier JSON
    const outputPath = path.join(process.cwd(), "public", "results.json");
    const outputData = {
      timestamp: new Date().toISOString(),
      totalPlayersAnalyzed: allPlayerChampionCounts.length,
      results: aggregatedStats,
    };

    await fs.writeFile(
      outputPath,
      JSON.stringify(outputData, null, 2),
      "utf-8"
    );
    console.log(`💾 Résultats sauvegardés dans: ${outputPath}\n`);
  } catch (error: any) {
    console.error("❌ Erreur fatale:", error.message);
    process.exit(1);
  }
}

// Exécuter le script
main();
