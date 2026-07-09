import { type Biome, BIOMES } from '../data/biomes';
import { rollInteger } from './rng';

/**
 * Selects a random biome based on their weighted spawn rates.
 */
export function selectNextBiome(): Biome {
  const totalWeight = BIOMES.reduce((sum, b) => sum + b.weight, 0);
  const randomValue = rollInteger(0, totalWeight - 1);

  let currentSum = 0;
  for (const biome of BIOMES) {
    currentSum += biome.weight;
    if (randomValue < currentSum) {
      return biome;
    }
  }

  return BIOMES[0]; // Fallback to Normal
}
