import { Match, Participant, ChampionStats } from "./types";

// Extraire les champions joués par un joueur dans un match
export function getChampionFromMatch(
  match: Match,
  puuid: string
): string | null {
  const participant = match.info.participants.find(
    (p: Participant) => p.puuid === puuid && match.info.queueId === 420
  );

  if (!participant) {
    return null;
  }

  return participant.championName;
}

// Compter les champions joués par un joueur dans une liste de matchs
export function countChampionsPlayed(
  matches: Match[],
  puuid: string
): Map<string, number> {
  const championCount = new Map<string, number>();

  for (const match of matches) {
    const champion = getChampionFromMatch(match, puuid);
    if (champion) {
      const currentCount = championCount.get(champion) || 0;
      championCount.set(champion, currentCount + 1);
    }
  }

  return championCount;
}

// Obtenir les top 3 champions d'un joueur
export function getTop3Champions(championCount: Map<string, number>): string[] {
  const sorted = Array.from(championCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([champion]) => champion);

  return sorted;
}

// Obtenir tous les champions joués par un joueur
export function getAllChampions(championCount: Map<string, number>): string[] {
  return Array.from(championCount.keys());
}

// Agrégation des résultats de tous les joueurs
export function aggregateChampionCounts(
  allPlayerChampions: string[][]
): ChampionStats[] {
  const countMap = new Map<string, number>();

  // Compter combien de fois chaque champion apparaît dans les parties des joueurs
  for (const champions of allPlayerChampions) {
    for (const champion of champions) {
      const currentCount = countMap.get(champion) || 0;
      countMap.set(champion, currentCount + 1);
    }
  }

  // Convertir en tableau et trier
  const stats: ChampionStats[] = Array.from(countMap.entries())
    .map(([championName, count]) => ({
      championId: 0, // On n'a pas l'ID ici, on peut l'ignorer pour cette POC
      championName,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  return stats;
}

// Formater les résultats pour l'affichage console
export function formatResults(stats: ChampionStats[]): string {
  let output =
    "\n=== RÉSULTATS: TOP CHAMPIONS DES MEILLEURS JOUEURS EUW ===\n\n";

  stats.forEach((stat, index) => {
    output += `${index + 1}. ${stat.championName}: ${stat.count} apparitions\n`;
  });

  output += "\n=== FIN DES RÉSULTATS ===\n";

  return output;
}
