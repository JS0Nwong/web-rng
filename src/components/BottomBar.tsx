import React from 'react';
import { useGameStore } from '../stores/gameStore';
import { RefreshCw } from 'lucide-react';

export const BottomBar: React.FC = () => {
  const { clearSave, addLog } = useGameStore();

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all game progress? This cannot be undone.')) {
      clearSave();
      addLog('Save state cleared successfully.');
    }
  };

  return (
    <footer className="w-full flex items-center justify-between py-2 px-6 border-t border-neutral-900 bg-neutral-950/40 text-[11px] text-neutral-600 select-none">
      <div className="flex items-center space-x-4">
        <span>© 2026 WebRNG</span>
        <span>Version 1.0.0</span>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={handleReset}
          className="flex items-center space-x-1 hover:text-red-400 cursor-pointer transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset Game</span>
        </button>
        <a
          href="https://github.com/JS0Nwong/web-rng"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 hover:text-neutral-300 transition-colors"
        >
          {/* <Github className="w-3.5 h-3.5" /> */}
          <span>GitHub Repo</span>
        </a>
      </div>
    </footer>
  );
};
