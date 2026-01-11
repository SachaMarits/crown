/**
 * Mapping of internal champion names to display names
 * Internal names are used by Riot API, display names are the correct formatting
 */
const championNameMapping: Record<string, string> = {
  // Champions with apostrophes
  Khazix: "Kha'Zix",
  Chogath: "Cho'Gath",
  KSante: "K'Sante",
  RekSai: "Rek'Sai",
  KogMaw: "Kog'Maw",
  Velkoz: "Vel'Koz",
  Kaisa: "Kai'Sa",
  Belveth: "Bel'Veth",

  // Champions with spaces
  MonkeyKing: "Wukong",
  DrMundo: "Dr. Mundo",
  MasterYi: "Master Yi",
  MissFortune: "Miss Fortune",
  TwistedFate: "Twisted Fate",
  XinZhao: "Xin Zhao",
  JarvanIV: "Jarvan IV",
  LeeSin: "Lee Sin",
  AurelionSol: "Aurelion Sol",
  TahmKench: "Tahm Kench",

  // Champions with different formatting
  FiddleSticks: "Fiddlesticks",
};

/**
 * Convert internal champion name to display name
 * @param internalName - The internal name from Riot API
 * @returns The display name if mapping exists, otherwise returns the original name
 */
export function getChampionDisplayName(internalName: string): string {
  return championNameMapping[internalName] || internalName;
}
