import { useState, useEffect, useMemo } from "react";
import { Header } from "./components/Header";
import { RoleFilter } from "./components/RoleFilter";
import { ChampionRanking } from "./components/ChampionRanking";
import { ChampionResult, ResultsData } from "./types";
import { Role, championMatchesRole } from "./data/championRoles";
import resultsData from "./data/results.json";

/**
 * App component - Main application component
 */
function App() {
  const [allChampions, setAllChampions] = useState<ChampionResult[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Load data from JSON file
    const data = resultsData as ResultsData;

    // Sort champions by count in descending order
    const sortedChampions = [...data.results].sort((a, b) => b.count - a.count);

    setAllChampions(sortedChampions);
  }, []);

  // Filter champions by selected role and search query
  const filteredChampions = useMemo(() => {
    let filtered = allChampions;

    // Filter by role
    if (selectedRole !== "all") {
      filtered = filtered.filter((champion) =>
        championMatchesRole(champion.championName, selectedRole)
      );
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

  return (
    <div className="min-h-screen">
      <Header />
      <RoleFilter
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <main className="pb-12">
        <ChampionRanking
          champions={filteredChampions}
          allChampions={allChampions}
          totalChampions={filteredChampions.length}
        />
      </main>
    </div>
  );
}

export default App;
