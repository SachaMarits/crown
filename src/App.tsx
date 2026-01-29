import { useState, useEffect, useMemo } from "react";
import { Header } from "./components/Header";
import { RoleFilter } from "./components/RoleFilter";
import { ChampionRanking } from "./components/ChampionRanking";
import { Footer } from "./components/Footer";
import { ChampionResult } from "./types";
import { Role, championMatchesRole } from "./data/championRoles";

/**
 * App component - Main application component
 */
function App() {
  const [allChampions, setAllChampions] = useState<ChampionResult[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // Charger le fichier actuel (results.json)
      const currentData = await fetch("results.json").then((response) =>
        response.json()
      );

      // Charger les fichiers historiques (results-1.json à results-6.json)
      const historicalDataPromises = [];
      for (let i = 1; i <= 6; i++) {
        historicalDataPromises.push(
          fetch(`results-${i}.json`)
            .then((response) => response.json())
            .catch(() => null) // Ignorer les erreurs si un fichier n'existe pas
        );
      }

      const historicalData = await Promise.all(historicalDataPromises);
      const validHistoricalData = historicalData.filter(
        (data) => data !== null
      );

      // Créer une map pour stocker les counts historiques par champion+role
      const historicalCountsMap = new Map<string, number[]>();

      // Parcourir tous les fichiers historiques et agréger les counts
      validHistoricalData.forEach((data) => {
        if (data && data.results) {
          data.results.forEach((champion: ChampionResult) => {
            const key = champion.role
              ? `${champion.championName}|${champion.role}`
              : champion.championName;
            if (!historicalCountsMap.has(key)) {
              historicalCountsMap.set(key, []);
            }
            historicalCountsMap.get(key)!.push(champion.count);
          });
        }
      });

      // Calculer la tendance pour chaque champion actuel
      const championsWithTrend = currentData.results.map(
        (champion: ChampionResult) => {
          const key = champion.role
            ? `${champion.championName}|${champion.role}`
            : champion.championName;
          const historicalCounts = historicalCountsMap.get(key) || [];

          let trendPercentage: number | undefined = undefined;
          let averageHistoricalCount: number | undefined = undefined;

          if (historicalCounts.length > 0) {
            // Calculer la moyenne des counts historiques
            averageHistoricalCount =
              historicalCounts.reduce((sum, count) => sum + count, 0) /
              historicalCounts.length;

            // Calculer le pourcentage de changement
            if (averageHistoricalCount > 0) {
              trendPercentage =
                ((champion.count - averageHistoricalCount) /
                  averageHistoricalCount) *
                100;
            } else if (champion.count > 0) {
              // Si la moyenne historique est 0 mais le count actuel > 0, c'est une hausse de 100%
              trendPercentage = 100;
            }
          }

          return {
            ...champion,
            trendPercentage,
            averageHistoricalCount,
          };
        }
      );

      const sortedChampions = [...championsWithTrend].sort(
        (a, b) => b.count - a.count
      );
      setAllChampions(sortedChampions);
    };
    fetchData();
  }, []);

  // Filter champions by selected role and search query
  const filteredChampions = useMemo(() => {
    let filtered = allChampions;

    // Filter by role
    if (selectedRole !== "all") {
      filtered = filtered.filter((champion) => {
        if (champion.role) return champion.role === selectedRole;
        return championMatchesRole(champion.championName, selectedRole);
      });
    }

    // Filter by search
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((champion) =>
        champion.championName.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allChampions, selectedRole, searchQuery]);

  // Count unique champions
  const uniqueChampionsCount = useMemo(() => {
    const uniqueChampions = new Set(
      filteredChampions.map((champion) => champion.championName)
    );
    return uniqueChampions.size;
  }, [filteredChampions]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <RoleFilter
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <main className="flex-1 pb-12">
        <ChampionRanking
          champions={filteredChampions}
          allChampions={allChampions}
          totalChampions={uniqueChampionsCount}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
