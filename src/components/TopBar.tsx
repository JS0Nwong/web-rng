import React from 'react';
import { useGameStore } from '../stores/gameStore';
import { Compass, Zap } from 'lucide-react';
import { POTIONS } from '../data/potions';

export const TopBar: React.FC = () => {
  const { currentBiome, biomeTimer, totalRolls, equippedGauntlet, activePotionId } = useGameStore();

  // Calculate current effective luck to display
  let gauntletLuck = 1.0;
  if (equippedGauntlet === 'luck_glove') gauntletLuck = 1.5;
  if (equippedGauntlet === 'exo_gauntlet') gauntletLuck = 3.0;
  if (equippedGauntlet === 'galactic_device') gauntletLuck = 5.0;

  let potionLuckBoost = 0;
  let activePotionName = '';
  if (activePotionId) {
    const potion = POTIONS.find(p => p.id === activePotionId);
    if (potion) {
      potionLuckBoost = potion.luckBoost;
      activePotionName = potion.name;
    }
  }

  const biomeLuck = currentBiome.luckMultiplier;
  const totalLuck = gauntletLuck * biomeLuck * (1.0 + potionLuckBoost);

  // Format timer into mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <header className="w-full flex items-center justify-between py-3 px-6 border-b border-neutral-900 bg-neutral-950/40 select-none">
      <div className="flex items-center space-x-3">
        <span className="mono-font text-lg font-bold tracking-wider text-white">
          WebRNG
        </span>
      </div>

      <div className="flex items-center space-x-6 text-sm text-neutral-400">
        {/* Biome Status */}
        <div className="flex items-center space-x-2">
          <Compass className="w-4 h-4 text-amber-500" />
          <span>Biome:</span>
          <span className="text-neutral-200 font-semibold" style={{ color: currentBiome.color }}>
            {currentBiome.name}
          </span>
          <span className="mono-font text-xs text-neutral-500">
            ({formatTime(biomeTimer)})
          </span>
        </div>

        {/* Current Luck Multiplier */}
        <div className="flex items-center space-x-2 relative group cursor-help">
          <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
          <span>Luck:</span>
          <span className="text-white mono-font font-bold">
            {totalLuck.toFixed(1)}x
          </span>

          {/* Tooltip for luck breakdown */}
          <div className="absolute right-0 top-8 hidden group-hover:block z-50 bg-neutral-900 border border-neutral-800 p-3 rounded shadow-lg text-xs w-48 space-y-1">
            <p className="font-semibold text-neutral-200 border-b border-neutral-800 pb-1">Luck Breakdown</p>
            <div className="flex justify-between">
              <span>Base:</span>
              <span className="mono-font text-white">1.0x</span>
            </div>
            <div className="flex justify-between">
              <span>Biome ({currentBiome.name}):</span>
              <span className="mono-font text-white">{biomeLuck.toFixed(1)}x</span>
            </div>
            <div className="flex justify-between">
              <span>Gauntlet:</span>
              <span className="mono-font text-white">{gauntletLuck.toFixed(1)}x</span>
            </div>
            {activePotionId && (
              <div className="flex justify-between text-yellow-400">
                <span>{activePotionName}:</span>
                <span className="mono-font">+{(potionLuckBoost * 100).toFixed(0)}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Total Rolls */}
        <div className="hidden md:flex items-center space-x-2">
          <span>Rolls:</span>
          <span className="text-white mono-font">{totalRolls}</span>
        </div>
      </div>
    </header>
  );
};
