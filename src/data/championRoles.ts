/**
 * Mapping des champions vers leurs rôles principaux
 * Basé sur les rôles les plus communs en ranked solo queue
 */
export type Role = "top" | "jungle" | "mid" | "adc" | "support" | "all";

const championRoles: Record<string, Role[]> = {
  // Top
  Aatrox: ["top"],
  Akali: ["mid", "top"],
  Akshan: ["mid", "top"],
  Camille: ["top"],
  Darius: ["top"],
  DrMundo: ["top"],
  Fiora: ["top"],
  Gangplank: ["top"],
  Garen: ["top"],
  Gnar: ["top"],
  Gwen: ["top"],
  Illaoi: ["top"],
  Irelia: ["top", "mid"],
  Jax: ["top"],
  Jayce: ["top", "mid"],
  Kayle: ["top"],
  KSante: ["top"],
  Malphite: ["top", "support"],
  Mordekaiser: ["top"],
  Nasus: ["top"],
  Olaf: ["top", "jungle"],
  Ornn: ["top"],
  Pantheon: ["top", "mid", "support"],
  Poppy: ["top", "support"],
  Quinn: ["top"],
  Renekton: ["top"],
  Riven: ["top"],
  Rumble: ["top", "mid"],
  Sett: ["top"],
  Shen: ["top"],
  Singed: ["top"],
  Sion: ["top"],
  TahmKench: ["top", "support"],
  Teemo: ["top"],
  Trundle: ["top"],
  Tryndamere: ["top"],
  Urgot: ["top"],
  Vladimir: ["top", "mid"],
  Volibear: ["top", "jungle"],
  Wukong: ["top", "jungle"],
  Yorick: ["top"],
  Yone: ["top", "mid"],

  // Jungle
  Belveth: ["jungle"],
  Elise: ["jungle"],
  Ekko: ["jungle", "mid"],
  Evelynn: ["jungle"],
  FiddleSticks: ["jungle"],
  Graves: ["jungle"],
  Hecarim: ["jungle"],
  Ivern: ["jungle"],
  JarvanIV: ["jungle"],
  Karthus: ["jungle"],
  Kayn: ["jungle"],
  Khazix: ["jungle"],
  Kindred: ["jungle"],
  LeeSin: ["jungle"],
  Lillia: ["jungle"],
  MasterYi: ["jungle"],
  Naafiri: ["mid", "jungle"],
  Nidalee: ["jungle"],
  Nocturne: ["jungle"],
  Nunu: ["jungle"],
  Rammus: ["jungle"],
  RekSai: ["jungle"],
  Rengar: ["jungle"],
  Sejuani: ["jungle"],
  Shaco: ["jungle"],
  Shyvana: ["jungle"],
  Skarner: ["jungle"],
  Taliyah: ["jungle", "mid"],
  Udyr: ["jungle"],
  Vi: ["jungle"],
  Viego: ["jungle"],
  Warwick: ["jungle"],
  XinZhao: ["jungle"],
  Zac: ["jungle"],
  Zed: ["jungle", "mid"],

  // Mid
  Ahri: ["mid"],
  Ambessa: ["top", "mid"],
  Anivia: ["mid"],
  Annie: ["mid"],
  AurelionSol: ["mid"],
  Aurora: ["mid"],
  Azir: ["mid"],
  Brand: ["mid", "support"],
  Cassiopeia: ["mid"],
  Corki: ["mid"],
  Diana: ["mid", "jungle"],
  Fizz: ["mid"],
  Galio: ["mid", "support"],
  Hwei: ["mid"],
  Kassadin: ["mid"],
  Katarina: ["mid"],
  Leblanc: ["mid"],
  Lissandra: ["mid"],
  Lux: ["mid", "support"],
  Malzahar: ["mid"],
  Neeko: ["mid", "support"],
  Orianna: ["mid"],
  Qiyana: ["mid"],
  Ryze: ["mid", "top"],
  Swain: ["mid", "support"],
  Syndra: ["mid"],
  Talon: ["mid"],
  TwistedFate: ["mid"],
  Veigar: ["mid"],
  Velkoz: ["mid", "support"],
  Vex: ["mid"],
  Viktor: ["mid"],
  Xerath: ["mid", "support"],
  Yasuo: ["mid"],
  Yunara: ["mid"],
  Zaahen: ["mid"],
  Zoe: ["mid"],

  // ADC
  Aphelios: ["adc"],
  Ashe: ["adc"],
  Caitlyn: ["adc"],
  Draven: ["adc"],
  Ezreal: ["adc"],
  Jhin: ["adc"],
  Jinx: ["adc"],
  Kaisa: ["adc"],
  Kalista: ["adc"],
  KogMaw: ["adc"],
  Lucian: ["adc"],
  Mel: ["adc"],
  MissFortune: ["adc"],
  Nilah: ["adc"],
  Samira: ["adc"],
  Sivir: ["adc"],
  Smolder: ["adc"],
  Tristana: ["adc"],
  Twitch: ["adc"],
  Varus: ["adc"],
  Vayne: ["adc"],
  Xayah: ["adc"],
  Zeri: ["adc"],

  // Support
  Alistar: ["support"],
  Bard: ["support"],
  Blitzcrank: ["support"],
  Braum: ["support"],
  Janna: ["support"],
  Karma: ["support"],
  Leona: ["support"],
  Lulu: ["support"],
  Milio: ["support"],
  Morgana: ["support"],
  Nami: ["support"],
  Nautilus: ["support"],
  Pyke: ["support"],
  Rakan: ["support"],
  Rell: ["support"],
  Senna: ["support"],
  Seraphine: ["support"],
  Sona: ["support"],
  Soraka: ["support"],
  Taric: ["support"],
  Thresh: ["support"],
  Yuumi: ["support"],
  Zilean: ["support"],
  Zyra: ["support"],

  // Champions polyvalents
  MonkeyKing: ["top", "jungle", "mid"],
  Sylas: ["mid", "jungle"],
};

/**
 * Obtenir le rôle principal d'un champion
 */
export function getChampionRole(championName: string): Role {
  const roles = championRoles[championName];
  if (!roles || roles.length === 0) {
    return "mid"; // Par défaut si non trouvé
  }
  return roles[0] as Role;
}

/**
 * Vérifier si un champion correspond à un rôle
 */
export function championMatchesRole(championName: string, role: Role): boolean {
  if (role === "all") return true;
  const roles = championRoles[championName];
  // Si le champion n'est pas dans le mapping, on le montre uniquement pour "all"
  if (!roles || roles.length === 0) return false;
  return roles.includes(role);
}
