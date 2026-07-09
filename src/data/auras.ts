export interface Aura {
  id: string;
  name: string;
  rarity: number; // 1 in X chance
  tier: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic' | 'divine' | 'celestial' | 'exalted' | 'transcendent' | 'dimensional';
  biome: string | null; // Null means any biome
  description: string;
  color: string; // Tailwind text/border color representation or hex
}

export const AURAS: Aura[] = [
  // Common (1/2 to 1/5)
  { id: 'stone', name: 'Stone', rarity: 2, tier: 'common', biome: null, description: 'A solid, dusty fragment of bedrock.', color: '#737373' },
  { id: 'dirt', name: 'Dirt', rarity: 3, tier: 'common', biome: null, description: 'Slightly damp soil. It smells of earth.', color: '#78716c' },
  { id: 'sand', name: 'Sand', rarity: 4, tier: 'common', biome: null, description: 'Granular silica that slips through your fingers.', color: '#d97706' },
  { id: 'wood', name: 'Wood', rarity: 5, tier: 'common', biome: null, description: 'A sturdy splinter of oak.', color: '#a16207' },

  // Uncommon (1/10 to 1/50)
  { id: 'copper', name: 'Copper', rarity: 10, tier: 'uncommon', biome: null, description: 'A dull orange metal, faintly conducting heat.', color: '#b45309' },
  { id: 'leaf', name: 'Leaf', rarity: 15, tier: 'uncommon', biome: null, description: 'A fresh green leaf pulsing with moisture.', color: '#22c55e' },
  { id: 'gale', name: 'Gale', rarity: 30, tier: 'uncommon', biome: 'Windy', description: 'A draft of fast-moving air wraps around your wrist.', color: '#a7f3d0' },
  { id: 'coal', name: 'Coal', rarity: 40, tier: 'uncommon', biome: null, description: 'Highly combustible compressed organic matter.', color: '#404040' },
  { id: 'drizzle', name: 'Drizzle', rarity: 50, tier: 'uncommon', biome: 'Rainy', description: 'A soft misty condensation clings to you.', color: '#60a5fa' },

  // Rare (1/100 to 1/500)
  { id: 'silver', name: 'Silver', rarity: 100, tier: 'rare', biome: null, description: 'Lustrous precious metal that catches the moonlight.', color: '#9ca3af' },
  { id: 'iron', name: 'Iron', rarity: 150, tier: 'rare', biome: null, description: 'Heavy, cold, and magnetic. The bedrock of crafting.', color: '#6b7280' },
  { id: 'frostbite', name: 'Frostbite', rarity: 250, tier: 'rare', biome: 'Snowy', description: 'Stinging crystals of pure cold.', color: '#93c5fd' },
  { id: 'tempest', name: 'Tempest', rarity: 350, tier: 'rare', biome: 'Rainy', description: 'Dark stormclouds swirl beneath your feet.', color: '#1d4ed8' },
  { id: 'gold', name: 'Gold', rarity: 500, tier: 'rare', biome: null, description: 'Pure, heavy, and extremely malleable.', color: '#fbbf24' },

  // Epic (1/1,000 to 1/5,000)
  { id: 'amethyst', name: 'Amethyst', rarity: 1000, tier: 'epic', biome: null, description: 'Deep purple crystal containing mystical energy.', color: '#c084fc' },
  { id: 'zephyr', name: 'Zephyr', rarity: 1500, tier: 'epic', biome: 'Windy', description: 'A violent updraft that lifts you off the ground.', color: '#34d399' },
  { id: 'blaze', name: 'Blaze', rarity: 2500, tier: 'epic', biome: 'Hell', description: 'Licking tongues of superheated magma.', color: '#f97316' },
  { id: 'glacier', name: 'Glacier', rarity: 3000, tier: 'epic', biome: 'Snowy', description: 'An ancient, slow-moving block of solid blue ice.', color: '#3b82f6' },
  { id: 'obsidian', name: 'Obsidian', rarity: 5000, tier: 'epic', biome: null, description: 'Volcanic glass, razor-sharp and dark as night.', color: '#1e1b4b' },

  // Legendary (1/10,000 to 1/50,000)
  { id: 'platinum', name: 'Platinum', rarity: 10000, tier: 'legendary', biome: null, description: 'Exceedingly rare and resilient bright white metal.', color: '#cbd5e1' },
  { id: 'comet', name: 'Comet', rarity: 15000, tier: 'legendary', biome: 'Starfall', description: 'A burning icy rock leaving a trail of stardust.', color: '#38bdf8' },
  { id: 'ruby', name: 'Ruby Core', rarity: 25000, tier: 'legendary', biome: 'Hell', description: 'A glowing gemstone of deep crimson, hot to the touch.', color: '#ef4444' },
  { id: 'duststorm', name: 'Dust Devil', rarity: 35000, tier: 'legendary', biome: 'Sandstorm', description: 'A spinning pillar of gritty sand and dust.', color: '#b45309' },
  { id: 'emerald', name: 'Emerald Glow', rarity: 50000, tier: 'legendary', biome: null, description: 'Pulsing emerald aura of pure biological energy.', color: '#10b981' },

  // Mythic (1/100,000 to 1/500,000)
  { id: 'nebula', name: 'Nebula', rarity: 100000, tier: 'mythic', biome: 'Starfall', description: 'A nursery of stars glowing in pink and blue dust.', color: '#ec4899' },
  { id: 'decay', name: 'Decay', rarity: 150000, tier: 'mythic', biome: 'Corruption', description: 'A rotting black mist that breaks down matter.', color: '#4b5563' },
  { id: 'inferno', name: 'Inferno', rarity: 250000, tier: 'mythic', biome: 'Hell', description: 'The absolute core of hellfire, consuming everything.', color: '#ea580c' },
  { id: 'glitch_v1', name: 'Broken Code', rarity: 500000, tier: 'mythic', biome: 'Glitched', description: 'Syntax errors manifest physically around you.', color: '#ef4444' },

  // Divine (1/1,000,000 to 1/5,000,000)
  { id: 'archangel', name: 'Archangel', rarity: 1000000, tier: 'divine', biome: 'Heaven', description: 'Blinding white wings of pristine light.', color: '#fef08a' },
  { id: 'void', name: 'The Void', rarity: 2000000, tier: 'divine', biome: 'Corruption', description: 'Absolute nothingness. The eyes in the dark watch.', color: '#6b21a8' },
  { id: 'solar', name: 'Solaris', rarity: 5000000, tier: 'divine', biome: null, description: 'A small sun floats right above your head.', color: '#f59e0b' },

  // Celestial (1/10,000,000 to 1/50,000,000)
  { id: 'astral', name: 'Astral Majesty', rarity: 10000000, tier: 'celestial', biome: 'Starfall', description: 'Confront the sheer infinity of the cosmos.', color: '#6366f1' },
  { id: 'glitched_aurora', name: 'Glitched Aurora', rarity: 25000000, tier: 'celestial', biome: 'Glitched', description: 'A shimmering curtain of code and sky.', color: '#06b6d4' },
  { id: 'overlord', name: 'Overlord', rarity: 50000000, tier: 'celestial', biome: 'Heaven', description: 'Golden crown and rings of pure authority.', color: '#eab308' },

  // Exalted (1/100,000,000 to 1/500,000,000)
  { id: 'monarch', name: 'Monarch', rarity: 100000000, tier: 'exalted', biome: null, description: 'The sovereign aura of absolute power.', color: '#f97316' },
  { id: 'oblivion', name: 'Oblivion', rarity: 250000000, tier: 'exalted', biome: 'Corruption', description: 'The universe fading into static memory.', color: '#1e1b4b' },
  { id: 'singularity', name: 'Singularity', rarity: 500000000, tier: 'exalted', biome: null, description: 'A black hole bending time and light.', color: '#000000' },

  // Transcendent (1/1,000,000,000 to 1/7,500,000,000)
  { id: 'equinox', name: 'Equinox Prime', rarity: 1000000000, tier: 'transcendent', biome: null, description: 'Perfect balance between infinite light and endless dark.', color: '#14b8a6' },
  { id: 'breakthrough_bt', name: 'Matrix Breakthrough', rarity: 5000000000, tier: 'transcendent', biome: 'Glitched', description: 'You have transcended the limits of the software.', color: '#10b981' },

  // Dimensional (1/7,500,000,001 to 1/12,500,000,000)
  { id: 'dimensional_rift', name: 'Dimensional Rift', rarity: 10000000000, tier: 'dimensional', biome: null, description: 'A tear in the space-time fabric exposing infinite timelines.', color: '#ffffff' }
];
