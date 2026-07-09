export interface RecipeRequirement {
  type: 'aura' | 'essence';
  id: string; // aura id or 'essence'
  amount: number;
}

export interface Recipe {
  id: string;
  name: string;
  resultType: 'equipment' | 'potion';
  resultId: string;
  description: string;
  requirements: RecipeRequirement[];
}

export const RECIPES: Recipe[] = [
  // Equipment Recipes
  {
    id: 'luck_glove',
    name: 'Luck Glove',
    resultType: 'equipment',
    resultId: 'luck_glove',
    description: 'A leather glove woven with lucky fibers. Boosts base luck by +50% (1.5x multiplier).',
    requirements: [
      { type: 'aura', id: 'leaf', amount: 5 },
      { type: 'aura', id: 'silver', amount: 3 },
      { type: 'essence', id: 'common', amount: 20 }
    ]
  },
  {
    id: 'exo_gauntlet',
    name: 'Exo Gauntlet',
    resultType: 'equipment',
    resultId: 'exo_gauntlet',
    description: 'An advanced mechanical sleeve pulsing with raw force. Boosts base luck by +200% (3.0x multiplier).',
    requirements: [
      { type: 'aura', id: 'iron', amount: 8 },
      { type: 'aura', id: 'gold', amount: 4 },
      { type: 'aura', id: 'amethyst', amount: 2 },
      { type: 'essence', id: 'uncommon', amount: 50 }
    ]
  },
  {
    id: 'galactic_device',
    name: 'Galactic Device',
    resultType: 'equipment',
    resultId: 'galactic_device',
    description: 'A mini cosmic machine harnessing solar energies. Boosts base luck by +400% (5.0x multiplier).',
    requirements: [
      { type: 'aura', id: 'platinum', amount: 5 },
      { type: 'aura', id: 'comet', amount: 2 },
      { type: 'aura', id: 'nebula', amount: 1 },
      { type: 'essence', id: 'rare', amount: 100 }
    ]
  },

  // Potion Recipes
  {
    id: 'lucky_elixir',
    name: 'Lucky Elixir',
    resultType: 'potion',
    resultId: 'lucky_elixir',
    description: 'A shimmering yellow draft. Grants +50% luck for 30 rolls.',
    requirements: [
      { type: 'aura', id: 'sand', amount: 4 },
      { type: 'aura', id: 'copper', amount: 2 },
      { type: 'essence', id: 'common', amount: 10 }
    ]
  },
  {
    id: 'fortune_brew',
    name: 'Fortune Brew',
    resultType: 'potion',
    resultId: 'fortune_brew',
    description: 'A bubbly green concoction. Grants +200% luck for 20 rolls.',
    requirements: [
      { type: 'aura', id: 'silver', amount: 5 },
      { type: 'aura', id: 'drizzle', amount: 2 },
      { type: 'essence', id: 'uncommon', amount: 25 }
    ]
  },
  {
    id: 'divine_draft',
    name: 'Divine Draft',
    resultType: 'potion',
    resultId: 'divine_draft',
    description: 'A glowing white liquid. Grants +1000% luck for 10 rolls.',
    requirements: [
      { type: 'aura', id: 'gold', amount: 4 },
      { type: 'aura', id: 'obsidian', amount: 2 },
      { type: 'aura', id: 'blaze', amount: 1 },
      { type: 'essence', id: 'epic', amount: 15 }
    ]
  },
  {
    id: 'heavenly_potion',
    name: 'Heavenly Potion',
    resultType: 'potion',
    resultId: 'heavenly_potion',
    description: 'A blinding gold elixir of extreme power. Grants +15,000% luck for exactly 1 roll.',
    requirements: [
      { type: 'aura', id: 'archangel', amount: 1 },
      { type: 'essence', id: 'divine', amount: 5 }
    ]
  }
];
