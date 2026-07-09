import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Aura, AURAS } from '../data/auras';
import { type Biome, BIOMES } from '../data/biomes';
import { type Recipe, RECIPES } from '../data/recipes';
import { type Potion, POTIONS } from '../data/potions';
import { performRoll } from '../engine/roller';
import { selectNextBiome } from '../engine/biomeManager';

export interface GameState {
  // Stats
  totalRolls: number;
  coins: number;
  rarestAuraId: string | null;

  // Game Items
  inventory: Record<string, number>; // auraId -> count
  collectionLog: string[]; // list of auraIds discovered
  ownedEquipment: string[]; // list of itemIds crafted
  equippedGauntlet: string | null;
  potions: Record<string, number>; // potionId -> count

  // Active Buffs
  activePotionId: string | null;
  activePotionDuration: number; // rolls remaining

  // Biome
  currentBiome: Biome;
  biomeTimer: number; // seconds remaining

  // Essence
  essence: Record<string, number>; // tier -> count

  // Event Feed
  logs: string[];

  // Actions
  roll: () => void;
  craft: (recipeId: string) => boolean;
  usePotion: (potionId: string) => void;
  recycleAura: (auraId: string, amount: number) => void;
  tickBiome: () => void;
  addLog: (text: string) => void;
  clearSave: () => void;
}

const DEFAULT_BIOME = BIOMES[0];

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      totalRolls: 0,
      coins: 0,
      rarestAuraId: null,
      inventory: {},
      collectionLog: [],
      ownedEquipment: [],
      equippedGauntlet: null,
      potions: {},
      activePotionId: null,
      activePotionDuration: 0,
      currentBiome: DEFAULT_BIOME,
      biomeTimer: 60,
      essence: {
        common: 0,
        uncommon: 0,
        rare: 0,
        epic: 0,
        legendary: 0,
        mythic: 0,
        divine: 0,
        celestial: 0,
        exalted: 0,
        transcendent: 0,
        dimensional: 0,
      },
      logs: ['Welcome to WebRNG. Click Roll to begin exploring.'],

      roll: () => {
        const state = get();
        const nextRollNumber = state.totalRolls + 1;

        // 1. Calculate active luck
        let gauntletLuck = 1.0;
        if (state.equippedGauntlet === 'luck_glove') gauntletLuck = 1.5;
        if (state.equippedGauntlet === 'exo_gauntlet') gauntletLuck = 3.0;
        if (state.equippedGauntlet === 'galactic_device') gauntletLuck = 5.0;

        let potionLuckBoost = 0;
        if (state.activePotionId) {
          const potion = POTIONS.find(p => p.id === state.activePotionId);
          if (potion) {
            potionLuckBoost = potion.luckBoost;
          }
        }

        const biomeLuck = state.currentBiome.luckMultiplier;
        const totalLuck = gauntletLuck * biomeLuck * (1.0 + potionLuckBoost);

        // 2. Perform the roll
        const result = performRoll(state.currentBiome.name, totalLuck, nextRollNumber);
        const rolledAura = result.aura;

        // 3. Update inventory & collection
        const updatedInventory = { ...state.inventory };
        updatedInventory[rolledAura.id] = (updatedInventory[rolledAura.id] || 0) + 1;

        const updatedCollection = [...state.collectionLog];
        let isNewDiscovery = false;
        if (!updatedCollection.includes(rolledAura.id)) {
          updatedCollection.push(rolledAura.id);
          isNewDiscovery = true;
        }

        // 4. Update rarest aura check
        let updatedRarest = state.rarestAuraId;
        if (!updatedRarest) {
          updatedRarest = rolledAura.id;
        } else {
          const currentRarestAura = AURAS.find(a => a.id === updatedRarest);
          if (currentRarestAura && rolledAura.rarity > currentRarestAura.rarity) {
            updatedRarest = rolledAura.id;
          }
        }

        // 5. Update active potion duration
        let nextPotionId = state.activePotionId;
        let nextPotionDuration = state.activePotionDuration;
        if (nextPotionId && nextPotionDuration > 0) {
          nextPotionDuration -= 1;
          if (nextPotionDuration <= 0) {
            nextPotionId = null;
            nextPotionDuration = 0;
          }
        }

        // 6. Build log entry
        let logText = `You rolled: ${rolledAura.name} (${result.chanceString})`;
        if (result.isBreakthrough) {
          logText = `✨ BREAKTHROUGH! You rolled: ${rolledAura.name} (${result.chanceString})`;
        }
        if (isNewDiscovery) {
          logText = `🆕 NEW DISCOVERY! ${logText}`;
        }

        // Keep last 100 logs
        const updatedLogs = [logText, ...state.logs].slice(0, 100);

        set({
          totalRolls: nextRollNumber,
          inventory: updatedInventory,
          collectionLog: updatedCollection,
          rarestAuraId: updatedRarest,
          activePotionId: nextPotionId,
          activePotionDuration: nextPotionDuration,
          logs: updatedLogs,
          coins: state.coins + 1 // Earn 1 coin per roll to act as basic progression resource
        });
      },

      craft: (recipeId: string) => {
        const state = get();
        const recipe = RECIPES.find(r => r.id === recipeId);
        if (!recipe) return false;

        // Verify requirements
        const tempInventory = { ...state.inventory };
        const tempEssence = { ...state.essence };

        for (const req of recipe.requirements) {
          if (req.type === 'aura') {
            const count = tempInventory[req.id] || 0;
            if (count < req.amount) return false;
            tempInventory[req.id] = count - req.amount;
          } else if (req.type === 'essence') {
            const count = tempEssence[req.id] || 0;
            if (count < req.amount) return false;
            tempEssence[req.id] = count - req.amount;
          }
        }

        // Deductions valid, apply crafting result
        let updatedEquipment = [...state.ownedEquipment];
        let updatedEquipped = state.equippedGauntlet;
        const updatedPotions = { ...state.potions };

        if (recipe.resultType === 'equipment') {
          if (!updatedEquipment.includes(recipe.resultId)) {
            updatedEquipment.push(recipe.resultId);
          }
          // Auto equip the newly crafted gauntlet if it is better than current
          updatedEquipped = recipe.resultId;
        } else if (recipe.resultType === 'potion') {
          updatedPotions[recipe.resultId] = (updatedPotions[recipe.resultId] || 0) + 1;
        }

        const logText = `Crafted: ${recipe.name}.`;
        const updatedLogs = [logText, ...state.logs].slice(0, 100);

        set({
          inventory: tempInventory,
          essence: tempEssence,
          ownedEquipment: updatedEquipment,
          equippedGauntlet: updatedEquipped,
          potions: updatedPotions,
          logs: updatedLogs
        });

        return true;
      },

      usePotion: (potionId: string) => {
        const state = get();
        const count = state.potions[potionId] || 0;
        if (count <= 0) return;

        const potion = POTIONS.find(p => p.id === potionId);
        if (!potion) return;

        const updatedPotions = { ...state.potions };
        updatedPotions[potionId] = count - 1;

        const logText = `Activated ${potion.name}. Buff active for ${potion.duration} rolls.`;
        const updatedLogs = [logText, ...state.logs].slice(0, 100);

        set({
          potions: updatedPotions,
          activePotionId: potionId,
          activePotionDuration: potion.duration,
          logs: updatedLogs
        });
      },

      recycleAura: (auraId: string, amount: number) => {
        const state = get();
        const count = state.inventory[auraId] || 0;
        if (count < amount) return;

        const aura = AURAS.find(a => a.id === auraId);
        if (!aura) return;

        const updatedInventory = { ...state.inventory };
        updatedInventory[auraId] = count - amount;

        const updatedEssence = { ...state.essence };
        updatedEssence[aura.tier] = (updatedEssence[aura.tier] || 0) + amount;

        const logText = `Recycled ${amount}x ${aura.name} into ${amount}x ${aura.tier} essence.`;
        const updatedLogs = [logText, ...state.logs].slice(0, 100);

        set({
          inventory: updatedInventory,
          essence: updatedEssence,
          logs: updatedLogs
        });
      },

      tickBiome: () => {
        const state = get();
        const nextTime = state.biomeTimer - 1;

        if (nextTime <= 0) {
          const nextBiome = selectNextBiome();
          const logText = `🌍 The weather shifts. Current biome: ${nextBiome.name} (${nextBiome.luckMultiplier}x luck).`;
          const updatedLogs = [logText, ...state.logs].slice(0, 100);

          set({
            currentBiome: nextBiome,
            biomeTimer: 60, // Reset to 60 seconds
            logs: updatedLogs
          });
        } else {
          set({ biomeTimer: nextTime });
        }
      },

      addLog: (text: string) => {
        set(state => ({
          logs: [text, ...state.logs].slice(0, 100)
        }));
      },

      clearSave: () => {
        set({
          totalRolls: 0,
          coins: 0,
          rarestAuraId: null,
          inventory: {},
          collectionLog: [],
          ownedEquipment: [],
          equippedGauntlet: null,
          potions: {},
          activePotionId: null,
          activePotionDuration: 0,
          currentBiome: DEFAULT_BIOME,
          biomeTimer: 60,
          essence: {
            common: 0,
            uncommon: 0,
            rare: 0,
            epic: 0,
            legendary: 0,
            mythic: 0,
            divine: 0,
            celestial: 0,
            exalted: 0,
            transcendent: 0,
            dimensional: 0,
          },
          logs: ['Game reset. Ready to roll.']
        });
      }
    }),
    {
      name: 'web-rng-save-state',
    }
  )
);
