import { useEffect, useRef, useState } from "react";
import { ChampionResult } from "../types";
import { getChampionRole } from "../data/championRoles";
import { getChampionTitle } from "../data/championTitles";
import { getChampionDisplayName } from "../utils/championNames";

interface ChampionRankingProps {
  champions: ChampionResult[];
  allChampions: ChampionResult[];
  totalChampions: number;
}

/**
 * Get the role color for the tag
 */
const getRoleColor = (role: string): string => {
  switch (role) {
    case "top":
      return "bg-role-top text-white";
    case "jungle":
      return "bg-role-jungle text-white";
    case "mid":
      return "bg-role-mid text-white";
    case "adc":
      return "bg-role-adc text-white";
    case "support":
      return "bg-role-support text-white";
    default:
      return "bg-gray-600 text-white";
  }
};

/**
 * Get the role label in uppercase
 */
const getRoleLabel = (role: string): string => {
  switch (role) {
    case "top":
      return "TOP";
    case "jungle":
      return "JUNGLE";
    case "mid":
      return "MID";
    case "adc":
      return "ADC";
    case "support":
      return "SUPPORT";
    default:
      return "UNKNOWN";
  }
};

/**
 * ChampionRanking component - Displays the champion ranking with horizontal cards
 */
export const ChampionRanking = ({
  champions,
  allChampions,
  totalChampions,
}: ChampionRankingProps) => {
  if (champions.length === 0) return null;

  // Create a map of champion+role to their global rank
  const globalRankMap = new Map<string, number>();
  allChampions.forEach((champion, index) => {
    const key = champion.role
      ? `${champion.championName}|${champion.role}`
      : champion.championName;
    globalRankMap.set(key, index + 1);
  });

  return (
    <section className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Champion Ranking
            </h2>
          </div>
          <div className="text-right">
            <p className="text-pink-500 font-bold text-xl">
              {totalChampions} champions
            </p>
          </div>
        </div>

        {/* Champion list in single column */}
        <div className="flex flex-col gap-4 w-full">
          {champions.map((champion, index) => {
            const key = champion.role
              ? `${champion.championName}|${champion.role}`
              : champion.championName;
            const rank = globalRankMap.get(key) || 0;
            // Utiliser le rôle réel joué s'il est disponible, sinon le rôle théorique
            const role =
              champion.role || getChampionRole(champion.championName);
            const title = getChampionTitle(champion.championName);

            // Champion image
            const imageUrl = `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champion.championName}.png`;

            return (
              <ChampionCard
                key={key}
                champion={champion}
                rank={rank}
                role={role}
                title={title}
                imageUrl={imageUrl}
                index={index}
                getRoleColor={getRoleColor}
                getRoleLabel={getRoleLabel}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

/**
 * Formate le nom du champion pour l'URL dpm.lol
 * Supprime les espaces et utilise le PascalCase (AurelionSol, TwistedFate, etc.)
 * Préserve les majuscules existantes comme "IV" dans "JarvanIV"
 */
const formatChampionNameForUrl = (championName: string): string => {
  const displayName = getChampionDisplayName(championName);
  // Supprime les apostrophes et les points
  let formatted = displayName.replace(/'/g, '').replace(/\./g, '');

  // Si le nom contient des espaces, utilise le PascalCase
  if (formatted.includes(' ')) {
    const words = formatted.split(/\s+/);
    formatted = words
      .map((word) => {
        // Si le mot est déjà tout en majuscules (comme "IV"), le garder tel quel
        if (word === word.toUpperCase() && word.length > 1) {
          return word;
        }
        // Sinon, mettre la première lettre en majuscule et le reste en minuscule
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join('');
  } else {
    // Si pas d'espaces, mettre juste la première lettre en majuscule
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1).toLowerCase();
  }

  return formatted;
};

/**
 * Mappe le rôle du champion vers la lane dpm.lol
 */
const mapRoleToLane = (role: string): string => {
  switch (role) {
    case 'top':
      return 'top';
    case 'jungle':
      return 'jungle';
    case 'mid':
      return 'middle';
    case 'adc':
      return 'bottom';
    case 'support':
      return 'utility';
    default:
      return 'middle'; // Par défaut
  }
};

/**
 * ChampionCard component with animation on viewport entry
 */
interface ChampionCardProps {
  champion: ChampionResult;
  rank: number;
  role: string;
  title: string;
  imageUrl: string;
  index: number;
  getRoleColor: (role: string) => string;
  getRoleLabel: (role: string) => string;
}

const ChampionCard = ({
  champion,
  rank,
  role,
  title,
  imageUrl,
  getRoleColor,
  getRoleLabel,
}: ChampionCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  // Construire l'URL dpm.lol
  const formattedName = formatChampionNameForUrl(champion.championName);
  const lane = mapRoleToLane(role);
  const dpmUrl = `https://dpm.lol/champions/${formattedName}/build?lane=${lane}&tier=master_plus`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <a
      ref={cardRef}
      href={dpmUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative bg-gradient-to-r from-purple-900/20 to-black/40 backdrop-blur-sm rounded-lg border border-purple-500/20 p-5 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer block ${isVisible ? "fade-in-up" : "opacity-0"
        }`}
    >
      <div className="flex items-center gap-6">
        {/* Champion image with glow effect */}
        <div className="flex-shrink-0 relative">
          {/* Glow effect behind the image */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/20 rounded-full blur-xl -z-10" />
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-black/40 relative z-10">
            <img
              src={imageUrl}
              alt={champion.championName}
              className="w-full h-full object-cover object-center scale-125"
              style={{ objectPosition: "center center" }}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%231a1a2e" width="100" height="100"/%3E%3Ctext fill="%23fff" x="50" y="50" text-anchor="middle" dominant-baseline="middle"%3E' +
                  champion.championName +
                  "%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
          {/* Ranking number - floating bottom left */}
          <div className="absolute -bottom-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center font-bold text-lg text-black shadow-lg z-20 border-2 border-black/20">
            #{rank}
          </div>
        </div>

        {/* Champion information */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {role && (
              <span
                className={`px-2 py-0.5 rounded text-xs font-semibold ${getRoleColor(
                  role
                )}`}
              >
                {getRoleLabel(role)}
              </span>
            )}
            <h3 className="text-xl font-bold text-white">
              {getChampionDisplayName(champion.championName)}
            </h3>
          </div>
          {title && (
            <p className="text-sm text-gray-400 uppercase opacity-40">
              {title}
            </p>
          )}
        </div>

        {/* Statistics */}
        <div className="flex-shrink-0 text-right">
          <div className="flex items-center justify-end gap-2 mb-2">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-white font-semibold text-lg">
              {champion.count}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};
