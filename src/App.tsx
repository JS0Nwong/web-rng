import { useEffect } from 'react';
import { useGameStore } from './stores/gameStore';
import { TopBar } from './components/TopBar';
import { ResourcePanel } from './components/ResourcePanel';
import { EquipmentPanel } from './components/EquipmentPanel';
import { MainArea } from './components/MainArea';
import { ActivityLog } from './components/ActivityLog';
import { BottomBar } from './components/BottomBar';

function App() {
  const { tickBiome } = useGameStore();

  // Set up the global clock timer for biome changes
  useEffect(() => {
    const timer = setInterval(() => {
      tickBiome();
    }, 1000);

    return () => clearInterval(timer);
  }, [tickBiome]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-neutral-950 text-neutral-300 font-sans">
      {/* Header Info */}
      <TopBar />

      {/* Main 4-Column Panel Grid */}
      <main className="flex-1 flex overflow-hidden">
        {/* Column 1: Resources Sidebar */}
        <ResourcePanel />

        {/* Column 2: Equipment Panel */}
        <EquipmentPanel />

        {/* Column 3: Center Tabbed Actions */}
        <MainArea />

        {/* Column 4: Right Scrolling Log Feed */}
        <ActivityLog />
      </main>

      {/* Bottom Bar Info */}
      <BottomBar />
    </div>
  );
}

export default App;
