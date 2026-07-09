import React from 'react';
import { useGameStore } from '../stores/gameStore';
import { POTIONS } from '../data/potions';
import { Shield, Sparkles, Activity } from 'lucide-react';

export const EquipmentPanel: React.FC = () => {
  const { 
    ownedEquipment, 
    equippedGauntlet, 
    potions, 
    activePotionId, 
    activePotionDuration,
    usePotion
  } = useGameStore();

  const handleEquip = (itemId: string) => {
    useGameStore.setState({ equippedGauntlet: itemId });
    useGameStore.getState().addLog(`Equipped: ${formatName(itemId)}`);
  };

  const handleUnequip = () => {
    useGameStore.setState({ equippedGauntlet: null });
    useGameStore.getState().addLog(`Unequipped current gauntlet.`);
  };

  const formatName = (id: string) => {
    return id.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <aside className="w-64 border-r border-neutral-900 bg-neutral-950/20 p-4 select-none overflow-y-auto flex flex-col space-y-6">
      {/* Active Potions/Buffs */}
      <div>
        <h2 className="text-xs uppercase font-bold tracking-wider text-neutral-500 mb-3 flex items-center">
          <Activity className="w-3.5 h-3.5 mr-1 text-emerald-500" /> Active Buffs
        </h2>
        {activePotionId ? (
          <div className="bg-neutral-900/50 p-2.5 border border-neutral-800 text-xs rounded space-y-1">
            <div className="flex justify-between font-bold text-neutral-200">
              <span>{formatName(activePotionId)}</span>
              <span className="mono-font text-yellow-500">Active</span>
            </div>
            <p className="text-neutral-400 text-[11px]">
              {POTIONS.find(p => p.id === activePotionId)?.description}
            </p>
            <div className="flex justify-between text-[11px] text-neutral-500 border-t border-neutral-800 pt-1 mt-1">
              <span>Duration remaining:</span>
              <span className="mono-font font-bold text-white">{activePotionDuration} rolls</span>
            </div>
          </div>
        ) : (
          <p className="text-xs italic text-neutral-600">No active potion effects.</p>
        )}
      </div>

      {/* Equipment Slots */}
      <div>
        <h2 className="text-xs uppercase font-bold tracking-wider text-neutral-500 mb-3 flex items-center">
          <Shield className="w-3.5 h-3.5 mr-1 text-sky-500" /> Equipment
        </h2>
        
        {/* Equipped Slot */}
        <div className="mb-4">
          <span className="text-[11px] text-neutral-600 block mb-1">Equipped Gauntlet:</span>
          {equippedGauntlet ? (
            <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 p-2 rounded">
              <span className="text-xs font-semibold text-white">{formatName(equippedGauntlet)}</span>
              <button 
                onClick={handleUnequip}
                className="text-[10px] text-red-500 hover:text-red-400 underline cursor-pointer"
              >
                Unequip
              </button>
            </div>
          ) : (
            <div className="text-xs italic text-neutral-600 bg-neutral-900/25 border border-dashed border-neutral-900 p-2 text-center rounded">
              Bare Hands
            </div>
          )}
        </div>

        {/* Owned Equipment List */}
        <div>
          <span className="text-[11px] text-neutral-600 block mb-1">Available Devices:</span>
          {ownedEquipment.length === 0 ? (
            <p className="text-[11px] italic text-neutral-600">None crafted.</p>
          ) : (
            <div className="space-y-1">
              {ownedEquipment.map(item => (
                <button
                  key={item}
                  onClick={() => handleEquip(item)}
                  className={`w-full text-left text-xs p-1.5 border rounded cursor-pointer transition-all ${
                    equippedGauntlet === item
                      ? 'border-amber-500/50 bg-amber-500/5 text-white font-medium'
                      : 'border-neutral-850 hover:border-neutral-700 bg-neutral-900/40 text-neutral-400'
                  }`}
                >
                  {formatName(item)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Potion Usage */}
      <div>
        <h2 className="text-xs uppercase font-bold tracking-wider text-neutral-500 mb-3 flex items-center">
          <Sparkles className="w-3.5 h-3.5 mr-1 text-yellow-400" /> Potions Inventory
        </h2>
        {Object.entries(potions).filter(([_, count]) => count > 0).length === 0 ? (
          <p className="text-xs italic text-neutral-600">No potions brewed.</p>
        ) : (
          <div className="space-y-1.5">
            {Object.entries(potions)
              .filter(([_, count]) => count > 0)
              .map(([id, count]) => {
                const potion = POTIONS.find(p => p.id === id);
                if (!potion) return null;
                return (
                  <div key={id} className="flex items-center justify-between text-xs bg-neutral-900/40 border border-neutral-850 p-1.5 rounded">
                    <div>
                      <span className="font-semibold text-neutral-300 block">{potion.name}</span>
                      <span className="mono-font text-[10px] text-neutral-500">Qty: {count}</span>
                    </div>
                    <button
                      onClick={() => usePotion(id)}
                      className="flat-btn text-[11px] px-2 py-0.5 rounded"
                    >
                      Drink
                    </button>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </aside>
  );
};
