export interface Potion {
  id: string;
  name: string;
  description: string;
  duration: number; // in number of rolls
  luckBoost: number; // e.g. 0.5 for +50%, 2.0 for +200%
  color: string;
}

export const POTIONS: Potion[] = [
  {
    id: 'lucky_elixir',
    name: 'Lucky Elixir',
    description: 'Grants +50% luck for 30 rolls.',
    duration: 30,
    luckBoost: 0.5,
    color: '#fbbf24' // gold/yellow
  },
  {
    id: 'fortune_brew',
    name: 'Fortune Brew',
    description: 'Grants +200% luck for 20 rolls.',
    duration: 20,
    luckBoost: 2.0,
    color: '#22c55e' // green
  },
  {
    id: 'divine_draft',
    name: 'Divine Draft',
    description: 'Grants +1000% luck for 10 rolls.',
    duration: 10,
    luckBoost: 10.0,
    color: '#ffffff' // white
  },
  {
    id: 'heavenly_potion',
    name: 'Heavenly Potion',
    description: 'Grants +15,000% luck for exactly 1 roll.',
    duration: 1,
    luckBoost: 150.0,
    color: '#eab308' // strong gold
  }
];
