import React from 'react';
import { useGameStore } from '../stores/gameStore';
import { AURAS } from '../data/auras';
import { BIOMES } from '../data/biomes';
import { Terminal } from 'lucide-react';

export const ActivityLog: React.FC = () => {
  const { logs } = useGameStore();

  // Helper to colorize log lines based on content keywords
  const parseLogLine = (line: string) => {
    let typeelement = <span>{line}</span>;

    // Check if new discovery
    const isNew = line.includes('🆕 NEW DISCOVERY!');
    // Check if breakthrough
    const isBreakthrough = line.includes('✨ BREAKTHROUGH!');

    // Clean up indicator tags from the line for color matching
    let textToMatch = line
      .replace('🆕 NEW DISCOVERY! ', '')
      .replace('✨ BREAKTHROUGH! ', '');

    // Check if it's a biome shift
    if (line.includes('🌍 The weather shifts.')) {
      const match = BIOMES.find(b => line.includes(b.name));
      return (
        <span className="text-neutral-100 font-semibold italic">
          {line}
        </span>
      );
    }

    // Try to find if an Aura name is mentioned
    const matchedAura = AURAS.find(aura => textToMatch.includes(aura.name));

    if (matchedAura) {
      // Find where aura name starts in text
      const parts = line.split(matchedAura.name);
      return (
        <span className="text-neutral-200 ">
          {parts[0]}
          <span
            className="font-bold underline decoration-dotted"
            style={{ color: matchedAura.color }}
          >
            {matchedAura.name}
          </span>
          {parts[1]}
        </span>
      );
    }

    if (isNew) {
      return <span className="text-emerald-400 font-medium">{line}</span>;
    }

    if (isBreakthrough) {
      return <span className="text-pink-400 font-semibold animate-pulse">{line}</span>;
    }

    return <span className="text-neutral-400">{line}</span>;
  };

  return (
    <section className="flex-1 min-w-[280px] max-w-[380px] border-l border-neutral-900 bg-neutral-950/40 p-4 select-none flex flex-col h-full overflow-hidden">
      <h2 className="text-xs uppercase font-bold tracking-wider text-neutral-500 mb-3 flex items-center border-b border-neutral-900 pb-2">
        <Terminal className="w-3.5 h-3.5 mr-1.5 text-neutral-400" /> Log Feed
      </h2>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs mono-font scrollbar-none">
        {logs.map((log, index) => (
          <div
            key={index}
            className="py-1 border-b border-neutral-950 opacity-60 hover:opacity-100 transition-opacity"
          >
            {parseLogLine(log)}
          </div>
        ))}
      </div>
    </section>
  );
};
