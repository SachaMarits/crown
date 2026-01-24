// Types pour le frontend (React)
export interface ChampionResult {
  championId: number;
  championName: string;
  role?: string; // top, jungle, mid, adc, support
  count: number;
}

// Types pour le backend (API Riot)
export interface ChampionStats {
  championId: number;
  championName: string;
  role?: string; // top, jungle, mid, adc, support
  count: number;
}

export interface ChallengerPlayer {
  summonerId: string;
  summonerName: string;
  leaguePoints: number;
  rank: string;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
  puuid: string;
}

export interface ChallengerLeague {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  summonerId: string;
  summonerName: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
  entries: ChallengerPlayer[];
}

export interface Summoner {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

export interface Participant {
  puuid: string;
  championName: string;
  teamId: number;
  win: boolean;
  kills: number;
  deaths: number;
  assists: number;
  teamPosition?: string; // TOP, JUNGLE, MIDDLE, BOTTOM, UTILITY
  individualPosition?: string; // TOP, JUNGLE, MIDDLE, BOTTOM, UTILITY
  lane?: string; // TOP_LANE, MID_LANE, BOT_LANE, JUNGLE
  role?: string; // SOLO, DUO_CARRY, DUO_SUPPORT, NONE
}

export interface MatchInfo {
  gameCreation: number;
  gameDuration: number;
  gameId: number;
  gameMode: string;
  gameName: string;
  gameStartTimestamp: number;
  gameType: string;
  gameVersion: string;
  mapId: number;
  participants: Participant[];
  platformId: string;
  queueId: number;
  teams: any[];
  tournamentCode?: string;
}

export interface Match {
  metadata: {
    dataVersion: string;
    matchId: string;
    participants: string[];
  };
  info: MatchInfo;
}
