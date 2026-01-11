import axios, { AxiosInstance } from "axios";
import { ChallengerLeague, Summoner, Match } from "./types";

// Classe pour gérer les appels à l'API Riot Games avec throttling
export class RiotApiClient {
  private client: AxiosInstance;
  private requestDelay: number = 150; // Délai entre les requêtes en ms
  private lastRequestTime: number = 0;

  constructor(apiKey: string) {
    this.client = axios.create({
      headers: {
        "X-Riot-Token": apiKey,
      },
    });
  }

  // Fonction pour respecter le rate limiting
  private async throttle(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;

    if (timeSinceLastRequest < this.requestDelay) {
      await new Promise((resolve) =>
        setTimeout(resolve, this.requestDelay - timeSinceLastRequest)
      );
    }

    this.lastRequestTime = Date.now();
  }

  // Gérer les erreurs API communes
  private async handleRequest<T>(requestFn: () => Promise<T>): Promise<T> {
    try {
      await this.throttle();
      const response = await requestFn();
      return response;
    } catch (error: any) {
      if (error.response?.status === 429) {
        // Rate limit exceeded, attendre plus longtemps
        console.warn("Rate limit atteint, attente de 2 secondes...");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return this.handleRequest(requestFn);
      } else if (error.response?.status === 404) {
        console.warn("Ressource non trouvée (404)");
        throw error;
      } else if (error.response?.status === 403) {
        const message =
          error.response?.data?.status?.message ||
          "Clé API invalide ou expirée";
        throw new Error(`${message} (403)`);
      } else {
        throw error;
      }
    }
  }

  // Récupérer le leaderboard Challenger pour EUW
  async getChallengerLeaderboard(): Promise<ChallengerLeague | null> {
    const url =
      "https://euw1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5";

    try {
      const response = await this.handleRequest(() =>
        this.client.get<ChallengerLeague>(url)
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  // Récupérer le leaderboard Grandmaster pour EUW
  async getGrandmasterLeaderboard(): Promise<ChallengerLeague | null> {
    const url =
      "https://euw1.api.riotgames.com/lol/league/v4/grandmasterleagues/by-queue/RANKED_SOLO_5x5";

    try {
      const response = await this.handleRequest(() =>
        this.client.get<ChallengerLeague>(url)
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  // Récupérer le leaderboard Master pour EUW
  async getMasterLeaderboard(): Promise<ChallengerLeague | null> {
    const url =
      "https://euw1.api.riotgames.com/lol/league/v4/masterleagues/by-queue/RANKED_SOLO_5x5";

    try {
      const response = await this.handleRequest(() =>
        this.client.get<ChallengerLeague>(url)
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  // Récupérer les informations d'un summoner par son summonerId
  async getSummonerBySummonerId(summonerId: string): Promise<Summoner> {
    const url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}`;

    const response = await this.handleRequest(() =>
      this.client.get<Summoner>(url)
    );

    return response.data;
  }

  // Récupérer la liste des match IDs pour un PUUID
  async getMatchIdsByPuuid(
    puuid: string,
    count: number = 20
  ): Promise<string[]> {
    const url = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids`;
    const params = {
      queue: 420, // RANKED_SOLO_5x5
      type: "ranked",
      start: 0,
      count: count,
    };

    const response = await this.handleRequest(() =>
      this.client.get<string[]>(url, { params })
    );

    return response.data;
  }

  // Récupérer les détails d'un match par son matchId
  async getMatchByMatchId(matchId: string): Promise<Match> {
    const url = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`;

    const response = await this.handleRequest(() =>
      this.client.get<Match>(url)
    );

    return response.data;
  }

  // Récupérer plusieurs matchs en une fois
  async getMatches(matchIds: string[]): Promise<Match[]> {
    const matches: Match[] = [];

    for (const matchId of matchIds) {
      try {
        const match = await this.getMatchByMatchId(matchId);
        matches.push(match);
      } catch (error: any) {
        if (error.response?.status !== 404) {
          console.warn(
            `Erreur lors de la récupération du match ${matchId}:`,
            error.message
          );
        }
      }
    }

    return matches;
  }
}
