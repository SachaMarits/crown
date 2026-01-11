import { ChampionResult } from '../types';

interface ChampionCardProps {
  champion: ChampionResult;
  rank?: number;
}

/**
 * ChampionCard component - Affiche une carte de champion avec son image, nom et nombre d'apparitions
 */
export const ChampionCard = ({ champion, rank }: ChampionCardProps) => {
  const imageUrl = `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champion.championName}.png`;

  return (
    <div className="group relative bg-deep-blue rounded-lg overflow-hidden border border-gray-800 hover:border-cyan-accent transition-all duration-300 hover:scale-105 hover:glow-cyan">
      <div className="relative aspect-square">
        <img
          src={imageUrl}
          alt={champion.championName}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            // Fallback si l'image ne charge pas
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%231a1a2e" width="100" height="100"/%3E%3Ctext fill="%23fff" x="50" y="50" text-anchor="middle" dominant-baseline="middle"%3E' + champion.championName + '%3C/text%3E%3C/svg%3E';
          }}
        />
        {rank && (
          <div className="absolute top-2 right-2 bg-gradient-to-br from-cyan-accent to-blue-500 text-black font-bold text-lg w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
            #{rank}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-1">
          {champion.championName}
        </h3>
        <p className="text-sm text-gray-400">
          <span className="text-cyan-accent font-medium">{champion.count}</span>{' '}
          {champion.count === 1 ? 'appearance' : 'appearances'}
        </p>
      </div>
    </div>
  );
};
