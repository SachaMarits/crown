import resultsData from "../data/results.json";

/**
 * Header component - Displays the title and statistics
 */
export const Header = () => {
  const data = resultsData as {
    totalPlayersAnalyzed: number;
    timestamp: string;
  };
  const totalGames = data.totalPlayersAnalyzed * 20; // 20 last games per player

  // Format the timestamp
  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const lastUpdate = formatDate(data.timestamp);

  return (
    <header className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main title */}
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Crown
            </span>
          </h1>
        </div>

        {/* Description */}
        <p className="text-center text-gray-300 mb-6 text-lg">
          Discover the most played champions in the{" "}
          <span className="font-bold text-white">last 20 games</span> from the{" "}
          <span className="font-bold underline text-white">Top 100</span>{" "}
          players
        </p>

        {/* Statistics */}
        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-3 bg-black/40 backdrop-blur-sm px-6 py-3 rounded-lg border border-cyan-accent/20">
            <svg
              className="w-6 h-6 text-cyan-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-cyan-accent font-semibold">
              {totalGames.toLocaleString()} games analyzed
            </span>
          </div>
          <div className="flex items-center gap-3 bg-black/40 backdrop-blur-sm px-6 py-3 rounded-lg border border-yellow-500/20">
            <svg
              className="w-6 h-6 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-yellow-400 font-semibold">
              Top 100 Player EUW
            </span>
          </div>
          <div className="flex items-center gap-3 bg-black/40 backdrop-blur-sm px-6 py-3 rounded-lg border border-purple-500/20">
            <svg
              className="w-6 h-6 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-purple-400 font-semibold">
              Last update: {lastUpdate}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
