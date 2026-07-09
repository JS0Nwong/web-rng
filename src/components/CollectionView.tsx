import React from 'react';
import { useGameStore } from '../stores/gameStore';
import { AURAS, type Aura } from '../data/auras';
import { formatRarityChance } from '../engine/roller';
import { BookOpen } from 'lucide-react';

export const CollectionView: React.FC = () => {
  const { collectionLog } = useGameStore();

  // Group auras by their tier
  const tiers: Aura['tier'][] = [
    'common', 'uncommon', 'rare', 'epic', 'legendary',
    'mythic', 'divine', 'celestial', 'exalted', 'transcendent', 'dimensional'
  ];

  const getTierAuras = (tier: Aura['tier']) => {
    return AURAS.filter(a => a.tier === tier);
  };

  const totalAuras = AURAS.length;
  const discoveredCount = collectionLog.length;
  const completionPercentage = Math.round((discoveredCount / totalAuras) * 100) || 0;

  return (
    <div className="flex flex-col py-6 px-6 h-full select-none overflow-y-auto space-y-6 text-left">
      {/* Header with progress */}
      <div className="border-b border-neutral-900 pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-wider text-white">Aura Collection Log</h1>
          <p className="text-xs text-neutral-500">Record of all anomalous space-time fields discovered in the cave.</p>
        </div>
        <div className="text-right">
          <span className="mono-font text-sm font-bold text-emerald-400 block">
            {discoveredCount} / {totalAuras} ({completionPercentage}%)
          </span>
          <span className="text-[10px] uppercase text-neutral-600 block">discovered</span>
        </div>
      </div>

      {/* Rarity Tier List */}
      <div className="space-y-6">
        {tiers.map(tier => {
          const tierAuras = getTierAuras(tier);
          const tierDiscovered = tierAuras.filter(a => collectionLog.includes(a.id)).length;

          return (
            <div key={tier} className="space-y-2">
              <div className="flex justify-between border-b border-neutral-900 pb-1">
                <span className="text-xs uppercase font-bold text-neutral-500 tracking-wider">
                  {tier}
                </span>
                <span className="mono-font text-[11px] text-neutral-600">
                  {tierDiscovered} / {tierAuras.length}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {tierAuras.map(aura => {
                  const isDiscovered = collectionLog.includes(aura.id);

                  return (
                    <div
                      key={aura.id}
                      className={`p-2.5 border rounded flex flex-col justify-between space-y-1 transition-all ${isDiscovered
                          ? 'border-neutral-850 bg-neutral-900/10'
                          : 'border-neutral-950 bg-neutral-950/40 opacity-40'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-xs font-semibold">
                          <span
                            className="pip"
                            style={{ backgroundColor: isDiscovered ? aura.color : '#404040' }}
                          />
                          <span style={{ color: isDiscovered ? aura.color : '#888888' }}>
                            {isDiscovered ? aura.name : '???'}
                          </span>
                        </span>
                        {isDiscovered && (
                          <span className="mono-font text-[10px] text-neutral-500">
                            {formatRarityChance(aura.rarity)}
                          </span>
                        )}
                      </div>

                      {isDiscovered && (
                        <p className="text-[11px] text-neutral-500 font-light italic leading-normal">
                          "{aura.description}"
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
