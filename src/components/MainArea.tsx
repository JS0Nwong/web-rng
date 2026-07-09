import React, { useState } from 'react';
import { RollView } from './RollView';
import { CraftView } from './CraftView';
import { PotionView } from './PotionView';
import { CollectionView } from './CollectionView';
import { SettingsView } from './SettingsView';

type TabType = 'roll' | 'craft' | 'potions' | 'collection' | 'settings';

export const MainArea: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('roll');

  const renderContent = () => {
    switch (activeTab) {
      case 'roll':
        return <RollView />;
      case 'craft':
        return <CraftView />;
      case 'potions':
        return <PotionView />;
      case 'collection':
        return <CollectionView />;
      case 'settings':
        return <SettingsView />;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Reference image minimal tabs */}
      <nav className="flex space-x-6 px-6 py-2 border-b border-neutral-900 bg-neutral-950/20 text-xs select-none">
        {(['roll', 'craft', 'potions', 'collection', 'settings'] as TabType[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize tracking-wide cursor-pointer transition-colors py-1 ${
              activeTab === tab 
                ? 'text-white font-bold border-b border-white' 
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Main Tab View contents */}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};
