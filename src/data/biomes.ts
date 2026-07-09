export interface Biome {
  name: string;
  luckMultiplier: number;
  description: string;
  weight: number; // For biome rotation selection
  color: string; // Theme color representation
}

export const BIOMES: Biome[] = [
  { name: 'Normal', luckMultiplier: 1.0, description: 'A calm, clear day. Neutral rolling conditions.', weight: 600, color: '#737373' },
  { name: 'Rainy', luckMultiplier: 1.2, description: 'Rain falls gently. Water-based rolling conditions.', weight: 100, color: '#3b82f6' },
  { name: 'Windy', luckMultiplier: 1.1, description: 'Gale winds howl. Air-based rolling conditions.', weight: 80, color: '#10b981' },
  { name: 'Snowy', luckMultiplier: 1.3, description: 'A light blizzard. Frost-based rolling conditions.', weight: 60, color: '#93c5fd' },
  { name: 'Starfall', luckMultiplier: 1.5, description: 'Starlight showers the land. Cosmic rolling conditions.', weight: 50, color: '#a855f7' },
  { name: 'Sandstorm', luckMultiplier: 1.4, description: 'A blinding desert storm. Earth-based rolling conditions.', weight: 40, color: '#b45309' },
  { name: 'Corruption', luckMultiplier: 2.0, description: 'A dark decay takes over. Void rolling conditions.', weight: 30, color: '#6b21a8' },
  { name: 'Hell', luckMultiplier: 2.5, description: 'Intense fire rises. Infernal rolling conditions.', weight: 20, color: '#ef4444' },
  { name: 'Heaven', luckMultiplier: 3.0, description: 'Divine light beams down. Blessed rolling conditions.', weight: 15, color: '#fbbf24' },
  { name: 'Glitched', luckMultiplier: 5.0, description: 'The fabric of reality tears. Infinite rolling conditions.', weight: 5, color: '#ec4899' }
];
