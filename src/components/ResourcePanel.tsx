import React from 'react';
import { useGameStore } from '../stores/gameStore';
import { AURAS } from '../data/auras';
import { Coins, Flame, Gem } from 'lucide-react';

export const ResourcePanel: React.FC = () => {
  const { coins, inventory, essence } = useGameStore();

  // Filter inventory to get basic crafting auras
  const basicCraftingIds = ['stone', 'dirt', 'sand', 'wood', 'copper', 'leaf', 'coal', 'iron', 'silver', 'gold', 'obsidian', 'amethyst', 'platinum'];
  
  const basicItems = basicCraftingIds
    .map(id => {
      const aura = AURAS.find(a => a.id === id);
      const count = inventory[id] || 0;
      return { aura, count };
    })
    .filter(item => item.count > 0);

  return (
    <aside className="w-64 border-r border-neutral-900 bg-neutral-950/20 p-4 select-none overflow-y-auto flex flex-col space-y-6">
      <div>
        <h2 className="text-xs uppercase font-bold tracking-wider text-neutral-500 mb-3 flex items-center">
          <Coins className="w-3.5 h-3.5 mr-1 text-amber-500" /> Currency
        </h2>
        <div className="flex items-center justify-between text-sm py-1">
          <span className="text-neutral-400">Gold Coins</span>
          <span className="mono-font text-white font-semibold">{coins}</span>
        </div>
      </div>

      {/* Basic Materials */}
      <div>
        <h2 className="text-xs uppercase font-bold tracking-wider text-neutral-500 mb-3 flex items-center">
          <Gem className="w-3.5 h-3.5 mr-1 text-blue-400" /> Materials
        </h2>
        {basicItems.length === 0 ? (
          <p className="text-xs italic text-neutral-600">No raw materials collected.</p>
        ) : (
          <div className="space-y-1">
            {basicItems.map(item => {
              if (!item.aura) return null;
              return (
                <div key={item.aura.id} className="flex items-center justify-between text-xs py-0.5 border-b border-neutral-900 pb-1">
                  <span className="flex items-center text-neutral-300">
                    <span className="pip" style={{ backgroundColor: item.aura.color }} />
                    {item.aura.name}
                  </span>
                  <span className="mono-font text-white">{item.count}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Essences */}
      <div>
        <h2 className="text-xs uppercase font-bold tracking-wider text-neutral-500 mb-3 flex items-center">
          <Flame className="w-3.5 h-3.5 mr-1 text-purple-400 animate-pulse" /> Essences
        </h2>
        {Object.values(essence).every(val => val === 0) ? (
          <p className="text-xs italic text-neutral-600">No essences synthesized yet.</p>
        ) : (
          <div className="space-y-1">
            {Object.entries(essence)
              .filter(([_, count]) => count > 0)
              .map(([tier, count]) => (
                <div key={tier} className="flex items-center justify-between text-xs py-0.5 border-b border-neutral-900 pb-1">
                  <span className="capitalize text-neutral-400">
                    {tier} essence
                  </span>
                  <span className="mono-font text-purple-300 font-bold">{count}</span>
                </div>
              ))}
          </div>
        )}
      </div>
    </aside>
  );
};
