import { ChampionResult } from "../types";

interface TopThreeChampionsProps {
  champions: ChampionResult[];
}

/**
 * Fonction utilitaire pour obtenir l'URL du splash art d'un champion
 * Les noms de champions dans les données correspondent généralement au format Riot
 */
const getSplashArtUrl = (championName: string): string => {
  return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_0.jpg`;
};

/**
 * Composant de carte de champion avec splash art
 */
interface ChampionCardProps {
  champion: ChampionResult;
  rank: number;
  isHero?: boolean;
}

const ChampionCard = ({
  champion,
  rank,
  isHero = false,
}: ChampionCardProps) => {
  const splashUrl = getSplashArtUrl(champion.championName);

  return (
    <div
      className={`relative group overflow-hidden rounded-2xl border-2 border-cyan-accent/30 hover:border-cyan-accent transition-all duration-500 ${
        isHero
          ? "hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
          : "hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
      }`}
    >
      {/* Image de fond - splash art */}
      <div
        className={`relative overflow-hidden ${
          isHero ? "aspect-[21/9]" : "aspect-[4/3]"
        }`}
      >
        <img
          src={splashUrl}
          alt={champion.championName}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          onError={(e) => {
            // Fallback si l'image ne charge pas
            (e.target as HTMLImageElement).src =
              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450"%3E%3Crect fill="%231a1a2e" width="800" height="450"/%3E%3Ctext fill="%23fff" x="400" y="225" text-anchor="middle" dominant-baseline="middle" font-size="24"%3E' +
              champion.championName +
              "%3C/text%3E%3C/svg%3E";
          }}
        />
        {/* Gradient overlay pour la lisibilité du texte */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
      </div>

      {/* Contenu de la carte */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
        <div className="flex items-center justify-between mb-3">
          {/* Badge de rang */}
          <div
            className={`flex items-center justify-center rounded-full font-bold text-white ${
              isHero
                ? "w-16 h-16 text-4xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg"
                : "w-12 h-12 text-2xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-md"
            }`}
          >
            #{rank}
          </div>
          {/* Compteur d'apparitions */}
          <div className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-accent/30">
            <span
              className={`font-semibold text-white ${
                isHero ? "text-xl" : "text-base"
              }`}
            >
              {champion.count}{" "}
              <span className="text-cyan-accent">
                {champion.count === 1 ? "apparition" : "apparitions"}
              </span>
            </span>
          </div>
        </div>
        {/* Nom du champion */}
        <div className="flex items-center gap-3">
          <h3
            className={`font-bold text-white ${
              isHero ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"
            }`}
          >
            {champion.championName}
          </h3>
          {champion.role && (
            <span
              className={`px-3 py-1 rounded text-sm font-semibold ${
                champion.role === "top"
                  ? "bg-red-600 text-white"
                  : champion.role === "jungle"
                  ? "bg-green-600 text-white"
                  : champion.role === "mid"
                  ? "bg-blue-600 text-white"
                  : champion.role === "adc"
                  ? "bg-yellow-600 text-white"
                  : champion.role === "support"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-600 text-white"
              }`}
            >
              {champion.role.toUpperCase()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * TopThreeChampions component - Affiche les 3 champions les plus joués
 * avec des splash arts haute qualité et un layout hero pour le #1
 */
export const TopThreeChampions = ({ champions }: TopThreeChampionsProps) => {
  if (champions.length === 0) return null;

  const topThree = champions.slice(0, 3);
  const [first, second, third] = topThree;

  return (
    <section className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-cyan-accent">
          Top 3 Champions
        </h2>

        <div className="space-y-6">
          {/* #1 Champion - Hero card horizontal */}
          {first && <ChampionCard champion={first} rank={1} isHero={true} />}

          {/* #2 et #3 Champions - Cartes plus petites côte à côte */}
          {(second || third) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {second && <ChampionCard champion={second} rank={2} />}
              {third && <ChampionCard champion={third} rank={3} />}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
