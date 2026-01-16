import { Match, Participant, ChampionStats } from "./types";

export type Role = "top" | "jungle" | "mid" | "adc" | "support";

// Mapper les champs de position de l'API Riot vers un rôle simple
export function mapPositionToRole(participant: Participant): Role {
  // Priorité: individualPosition > teamPosition > lane+role
  const position =
    participant.individualPosition ||
    participant.teamPosition ||
    participant.lane;

  if (position) {
    const posUpper = position.toUpperCase();
    if (posUpper.includes("TOP")) return "top";
    if (posUpper.includes("JUNGLE")) return "jungle";
    if (posUpper.includes("MIDDLE") || posUpper.includes("MID")) return "mid";
    if (posUpper.includes("BOTTOM") || posUpper.includes("BOT")) {
      // Si c'est BOTTOM, on doit vérifier le rôle pour distinguer ADC et support
      const role = participant.role?.toUpperCase() || "";
      if (role.includes("SUPPORT") || role.includes("UTILITY")) {
        return "support";
      }
      return "adc";
    }
    if (posUpper.includes("UTILITY")) return "support";
  }

  // Fallback: utiliser lane + role si position n'est pas disponible
  const lane = participant.lane?.toUpperCase() || "";
  const role = participant.role?.toUpperCase() || "";

  if (lane.includes("TOP")) return "top";
  if (lane.includes("JUNGLE")) return "jungle";
  if (lane.includes("MID")) return "mid";
  if (lane.includes("BOT")) {
    if (role.includes("SUPPORT") || role.includes("UTILITY")) {
      return "support";
    }
    return "adc";
  }

  // Par défaut, retourner mid si on ne peut pas déterminer
  return "mid";
}

// Extraire le champion et le rôle joués par un joueur dans un match
export function getChampionAndRoleFromMatch(
  match: Match,
  puuid: string
): { champion: string; role: Role } | null {
  const participant = match.info.participants.find(
    (p: Participant) => p.puuid === puuid && match.info.queueId === 420
  );

  if (!participant) {
    return null;
  }

  const role = mapPositionToRole(participant);
  return {
    champion: participant.championName,
    role,
  };
}

// Compter les champions joués par un joueur dans une liste de matchs (avec rôle)
// La clé est au format "champion|rôle" (ex: "Sylas|mid", "Sylas|jungle")
export function countChampionsPlayed(
  matches: Match[],
  puuid: string
): Map<string, number> {
  const championRoleCount = new Map<string, number>();

  for (const match of matches) {
    const result = getChampionAndRoleFromMatch(match, puuid);
    if (result) {
      const key = `${result.champion}|${result.role}`;
      const currentCount = championRoleCount.get(key) || 0;
      championRoleCount.set(key, currentCount + 1);
    }
  }

  return championRoleCount;
}

// Obtenir les top 3 champions d'un joueur
export function getTop3Champions(championCount: Map<string, number>): string[] {
  const sorted = Array.from(championCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([champion]) => champion);

  return sorted;
}

// Agrégation des résultats de tous les joueurs
// Les clés sont au format "champion|rôle" (ex: "Sylas|mid", "Sylas|jungle")
export function aggregateChampionCounts(
  allPlayerChampionCounts: Map<string, number>[]
): ChampionStats[] {
  const countMap = new Map<string, number>();

  // Agréger tous les comptes de champions+rôles de tous les joueurs
  for (const playerChampionCount of allPlayerChampionCounts) {
    for (const [championRoleKey, count] of playerChampionCount.entries()) {
      const currentCount = countMap.get(championRoleKey) || 0;
      countMap.set(championRoleKey, currentCount + count);
    }
  }

  // Convertir en tableau, parser les clés "champion|rôle", et trier
  const stats: ChampionStats[] = Array.from(countMap.entries())
    .map(([championRoleKey, count]) => {
      const [championName, role] = championRoleKey.split("|");
      return {
        championId: 0, // On n'a pas l'ID ici, on peut l'ignorer pour cette POC
        championName,
        role: role as Role,
        count,
      };
    })
    .sort((a, b) => b.count - a.count);

  return stats;
}

// Formater les résultats pour l'affichage console
export function formatResults(stats: ChampionStats[]): string {
  let output =
    "\n=== RÉSULTATS: TOP CHAMPIONS DES MEILLEURS JOUEURS EUW ===\n\n";

  stats.forEach((stat, index) => {
    const roleDisplay = stat.role ? ` (${stat.role})` : "";
    output += `${index + 1}. ${stat.championName}${roleDisplay}: ${
      stat.count
    } parties\n`;
  });

  output += "\n=== FIN DES RÉSULTATS ===\n";

  return output;
}
