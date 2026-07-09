import React from 'react';
import { useGameStore } from '../stores/gameStore';
import { RECIPES, type Recipe } from '../data/recipes';
import { AURAS } from '../data/auras';
import { Check, X, FlaskConical, Sparkles } from 'lucide-react';

export const PotionView: React.FC = () => {
  const { inventory, essence, craft, potions, usePotion } = useGameStore();

  // Helper to check requirement counts
  const checkRequirement = (req: Recipe['requirements'][0]) => {
    let owned = 0;
    if (req.type === 'aura') {
      owned = inventory[req.id] || 0;
    } else if (req.type === 'essence') {
      owned = essence[req.id] || 0;
    }
    return {
      owned,
      isMet: owned >= req.amount
    };
  };

  // Helper to compute max craftable items
  const getMaxCraftable = (recipe: Recipe) => {
    let minCraftable = Infinity;
    for (const req of recipe.requirements) {
      let owned = 0;
      if (req.type === 'aura') {
        owned = inventory[req.id] || 0;
      } else if (req.type === 'essence') {
        owned = essence[req.id] || 0;
      }
      const canCraft = Math.floor(owned / req.amount);
      if (canCraft < minCraftable) {
        minCraftable = canCraft;
      }
    }
    return minCraftable === Infinity ? 0 : minCraftable;
  };

  const getRequirementName = (req: Recipe['requirements'][0]) => {
    if (req.type === 'aura') {
      const aura = AURAS.find(a => a.id === req.id);
      return aura ? `${aura.name} Aura` : req.id;
    }
    return `${req.id.charAt(0).toUpperCase() + req.id.slice(1)} Essence`;
  };

  // Split recipes into equipment vs potions
  const potionRecipes = RECIPES.filter(r => r.resultType === 'potion');

  return (
    <div className="flex flex-col py-6 px-6 h-full select-none overflow-y-auto space-y-6 text-left">
      <div className="border-b border-neutral-900 pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-wider text-white">Alchemist's Brewery</h1>
          <p className="text-xs text-neutral-500">Brew magical potions to multiply your rolling luck for a limited duration.</p>
        </div>
        <FlaskConical className="w-5 h-5 text-neutral-500" />
      </div>

      <div className="space-y-4">
        {potionRecipes.map(recipe => {
          const maxCraft = getMaxCraftable(recipe);
          const canCraft = maxCraft > 0;
          const brewedCount = potions[recipe.resultId] || 0;

          return (
            <div
              key={recipe.id}
              className="p-4 border border-neutral-900 bg-neutral-950/20 rounded-md relative flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2 max-w-md">
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-semibold text-white">
                    {recipe.name}
                  </h3>
                  {brewedCount > 0 && (
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                      In Bag: {brewedCount}
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-400">
                  {recipe.description}
                </p>

                {/* Recipe ingredients */}
                <div className="pt-1.5 space-y-1">
                  <span className="text-[10px] text-neutral-600 font-semibold uppercase tracking-wider block">Ingredients:</span>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                    {recipe.requirements.map((req, index) => {
                      const check = checkRequirement(req);
                      return (
                        <div key={index} className="flex items-center space-x-1.5 py-0.5">
                          {check.isMet ? (
                            <Check className="w-3.5 h-3.5 text-green-500" />
                          ) : (
                            <X className="w-3.5 h-3.5 text-red-500" />
                          )}
                          <span className={check.isMet ? 'text-neutral-300' : 'text-neutral-500 line-through'}>
                            {getRequirementName(req)}
                          </span>
                          <span className={`mono-font text-[11px] font-medium ${check.isMet ? 'text-white' : 'text-red-400'}`}>
                            ({check.owned}/{req.amount})
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 self-start md:self-auto">
                {/* Brew Button */}
                <button
                  disabled={!canCraft}
                  onClick={() => craft(recipe.id)}
                  className={`flat-btn text-xs font-semibold px-4 py-2 rounded flex items-center justify-center space-x-1 relative ${canCraft ? 'border-amber-500/50 hover:bg-amber-500/5 hover:border-amber-500' : ''
                    }`}
                >
                  <span>Brew</span>
                  {maxCraft > 0 && (
                    <span className="superscript-badge">{maxCraft}</span>
                  )}
                </button>

                {/* Quick Drink Button */}
                {brewedCount > 0 && (
                  <button
                    onClick={() => usePotion(recipe.resultId)}
                    className="flat-btn border-emerald-500/50 hover:border-emerald-500 hover:bg-emerald-500/5 text-xs font-semibold px-4 py-2 rounded flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Drink</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
