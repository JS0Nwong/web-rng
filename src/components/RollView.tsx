import React, { useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import { AURAS } from '../data/auras';
import { formatRarityChance } from '../engine/roller';
import { Dices, Trash2 } from 'lucide-react';

export const RollView: React.FC = () => {
  const { roll, inventory, recycleAura, rarestAuraId } = useGameStore();
  const [lastRolledId, setLastRolledId] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(false);

  const handleRoll = () => {
    if (cooldown) return;
    setCooldown(true);
    
    roll();
    // Read state after calling roll() to see the updated last rolled aura
    // Let's hook into the store to find which one was incremented.
    // To make it easy, we will listen to changes, but since roll updates the store logs, 
    // let's grab the rolled aura name from the top log line.
    const store = useGameStore.getState();
    const topLog = store.logs[0];
    
    // Find matching aura in the log line
    const matched = AURAS.find(a => topLog.includes(a.name));
    if (matched) {
      setLastRolledId(matched.id);
    }

    setTimeout(() => {
      setCooldown(false);
    }, 1000);
  };

  const lastAura = lastRolledId ? AURAS.find(a => a.id === lastRolledId) : null;
  const rarestAura = rarestAuraId ? AURAS.find(a => a.id === rarestAuraId) : null;

  const handleQuickRecycle = () => {
    if (!lastAura) return;
    recycleAura(lastAura.id, 1);
    setLastRolledId(null);
  };

  return (
    <div className="flex flex-col items-center justify-between py-12 px-6 h-full select-none text-center">
      {/* Rarest Aura display */}
      <div className="space-y-1">
        <span className="text-xs text-neutral-600 uppercase tracking-wider block">Rarest Discovery</span>
        {rarestAura ? (
          <span 
            className="text-sm font-bold tracking-wide underline decoration-dotted" 
            style={{ color: rarestAura.color }}
          >
            {rarestAura.name} (1/{rarestAura.rarity.toLocaleString()})
          </span>
        ) : (
          <span className="text-xs italic text-neutral-600">None yet. Keep rolling.</span>
        )}
      </div>

      {/* Main Roll Interaction */}
      <div className="flex flex-col items-center justify-center space-y-6 my-auto">
        {lastAura ? (
          <div className="space-y-2 p-6 border border-neutral-900 bg-neutral-950/20 max-w-sm rounded">
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">ROLLED</span>
            <h1 
              className="text-2xl font-bold tracking-wide" 
              style={{ color: lastAura.color }}
            >
              {lastAura.name}
            </h1>
            <p className="text-xs text-neutral-400 italic font-light px-4">
              "{lastAura.description}"
            </p>
            <span className="mono-font text-xs text-neutral-500 block pt-1">
              Rarity Base: {formatRarityChance(lastAura.rarity)} (1/{lastAura.rarity.toLocaleString()})
            </span>

            {/* Quick Recycle Action */}
            <div className="pt-4">
              <button
                onClick={handleQuickRecycle}
                className="text-[11px] text-neutral-500 hover:text-red-400 border border-neutral-800 hover:border-red-950 bg-neutral-950 px-2.5 py-1 rounded flex items-center justify-center mx-auto space-x-1 cursor-pointer transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Recycle into {lastAura.tier} essence</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2 p-6 border border-neutral-900 border-dashed max-w-sm rounded opacity-40">
            <p className="text-sm italic text-neutral-500">
              The cave is dark and silent.
            </p>
          </div>
        )}

        <button
          onClick={handleRoll}
          disabled={cooldown}
          className="flat-btn text-base font-bold tracking-wider px-8 py-3 rounded-md hover:scale-102 flex items-center justify-center space-x-2 w-48 shadow-lg shadow-black/40 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Dices className={`w-5 h-5 text-amber-500 ${cooldown ? 'animate-spin' : ''}`} />
          <span>{cooldown ? 'WAIT...' : 'ROLL'}</span>
        </button>
      </div>

      {/* Basic instructions helper */}
      <div className="max-w-xs text-neutral-600 text-xs leading-relaxed">
        Collect materials to craft tools in the <span className="font-semibold text-neutral-500">Craft</span> tab. Consume potions to multiply luck multipliers.
      </div>
    </div>
  );
};
