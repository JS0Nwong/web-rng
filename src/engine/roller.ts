import { type Aura, AURAS } from '../data/auras';
import { sample } from './rng';

export interface RollResult {
  aura: Aura;
  isBreakthrough: boolean;
  chanceString: string;
  rollNumber: number;
}

/**
 * Rolls for an aura based on luck and current biome.
 * Uses the rarest-to-commonest independent roll check.
 */
export function performRoll(
  currentBiomeName: string,
  luckMultiplier: number,
  rollNumber: number
): RollResult {
  // Sort auras by rarity descending (rarest first)
  const sortedAuras = [...AURAS].sort((a, b) => b.rarity - a.rarity);

  for (const aura of sortedAuras) {
    let baseRarity = aura.rarity;
    let isBreakthrough = false;

    // Biome breakthrough handling
    if (aura.biome !== null && aura.biome !== currentBiomeName) {
      // 10x breakthrough penalty for rolling out of biome
      baseRarity = aura.rarity * 10;
      isBreakthrough = true;
    }

    // Apply luck multiplier (clamped to prevent division by zero or negative luck)
    const effectiveLuck = Math.max(1, luckMultiplier);
    const modifiedRarity = baseRarity / effectiveLuck;

    // Roll chance check
    const roll = sample();
    if (roll < 1 / modifiedRarity) {
      // Format rarity chance string (e.g. "1/2,500" or "1/10B")
      const chanceString = formatRarityChance(baseRarity);
      return {
        aura,
        isBreakthrough,
        chanceString,
        rollNumber
      };
    }
  }

  // Fallback to the commonest aura (usually Stone)
  const fallbackAura = AURAS.find(a => a.id === 'stone') || AURAS[0];
  return {
    aura: fallbackAura,
    isBreakthrough: false,
    chanceString: formatRarityChance(fallbackAura.rarity),
    rollNumber
  };
}

/** Formats denominators into readable values like 1/15.5k, 1/2.5M, or 1/10B */
export function formatRarityChance(rarity: number): string {
  if (rarity >= 1_000_000_000) {
    const val = rarity / 1_000_000_000;
    return `1/${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)}B`;
  }
  if (rarity >= 1_000_000) {
    const val = rarity / 1_000_000;
    return `1/${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)}M`;
  }
  if (rarity >= 1_000) {
    const val = rarity / 1_000;
    return `1/${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)}k`;
  }
  return `1/${rarity}`;
}
