import { ChampionResult } from '../types';
import { ChampionCard } from './ChampionCard';

interface ChampionGridProps {
  champions: ChampionResult[];
}

/**
 * ChampionGrid component - Affiche les champions restants dans une grille
 */
export const ChampionGrid = ({ champions }: ChampionGridProps) => {
  if (champions.length === 0) return null;

  return (
    <section className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-cyan-accent">
          All Champions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {champions.map((champion) => (
            <ChampionCard key={champion.championName} champion={champion} />
          ))}
        </div>
      </div>
    </section>
  );
};
