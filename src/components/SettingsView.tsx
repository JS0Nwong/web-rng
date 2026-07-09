import React, { useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import { Download, Upload, Trash2, Settings } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { clearSave, addLog } = useGameStore();
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState('');

  const handleExport = () => {
    try {
      const state = localStorage.getItem('web-rng-save-state');
      if (!state) {
        alert('No save state found to export.');
        return;
      }
      // Encode to base64 to make it clean to copy
      const base64Save = btoa(unescape(encodeURIComponent(state)));
      
      // Copy to clipboard
      navigator.clipboard.writeText(base64Save);
      addLog('Exported save data copied to clipboard.');
      alert('Save string copied to clipboard! Keep it safe.');
    } catch (e) {
      alert('Failed to export save data.');
    }
  };

  const handleImport = () => {
    setImportError('');
    setImportSuccess('');
    
    if (!importText.trim()) {
      setImportError('Please enter a valid save code.');
      return;
    }

    try {
      // Decode base64
      const decoded = decodeURIComponent(escape(atob(importText.trim())));
      const parsed = JSON.parse(decoded);
      
      // Basic check
      if (parsed && typeof parsed === 'object') {
        localStorage.setItem('web-rng-save-state', decoded);
        setImportSuccess('Import successful! Reloading page...');
        addLog('Successfully imported save data.');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setImportError('Invalid save structure.');
      }
    } catch (e) {
      setImportError('Could not decode save string. Verify the text is correct.');
    }
  };

  const handleWipe = () => {
    if (window.confirm('WIPE ALL DATA? This is permanent.')) {
      clearSave();
      alert('Data wiped.');
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col py-6 px-6 h-full select-none overflow-y-auto space-y-6 text-left">
      <div className="border-b border-neutral-900 pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-wider text-white">Cave Diagnostics</h1>
          <p className="text-xs text-neutral-500">Backup, transfer, or restore your chronological save file.</p>
        </div>
        <Settings className="w-5 h-5 text-neutral-500" />
      </div>

      <div className="space-y-6 max-w-lg">
        {/* Export Card */}
        <div className="p-4 border border-neutral-900 bg-neutral-950/20 rounded space-y-2">
          <h3 className="text-xs uppercase font-bold tracking-wider text-neutral-400">Export Save</h3>
          <p className="text-xs text-neutral-500">Copies an encrypted string of your progress to your clipboard so you can transfer it to another browser.</p>
          <button
            onClick={handleExport}
            className="flat-btn text-xs py-1.5 px-3 rounded flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Copy Save Code</span>
          </button>
        </div>

        {/* Import Card */}
        <div className="p-4 border border-neutral-900 bg-neutral-950/20 rounded space-y-3">
          <h3 className="text-xs uppercase font-bold tracking-wider text-neutral-400">Import Save</h3>
          <p className="text-xs text-neutral-500">Paste your exported save code below to restore progress.</p>
          
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="Paste your save code here..."
            className="w-full text-xs p-2 bg-neutral-950 border border-neutral-900 text-neutral-300 rounded h-16 outline-none focus:border-neutral-700 font-mono resize-none"
          />

          <div className="flex items-center space-x-2">
            <button
              onClick={handleImport}
              className="flat-btn border-amber-500/50 text-xs py-1.5 px-3 rounded flex items-center space-x-1.5"
            >
              <Upload className="w-3.5 h-3.5 text-amber-500" />
              <span>Import & Reload</span>
            </button>
          </div>

          {importError && <p className="text-xs text-red-500 font-medium">{importError}</p>}
          {importSuccess && <p className="text-xs text-green-500 font-medium">{importSuccess}</p>}
        </div>

        {/* Wipe Data Card */}
        <div className="p-4 border border-red-950 bg-red-950/5 rounded space-y-2">
          <h3 className="text-xs uppercase font-bold tracking-wider text-red-400">Wipe Progress</h3>
          <p className="text-xs text-neutral-500">Delete all your collected auras, crafting recipes, and progress logs completely.</p>
          <button
            onClick={handleWipe}
            className="flat-btn border-red-900 hover:border-red-600 text-red-400 text-xs py-1.5 px-3 rounded flex items-center space-x-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Wipe Save State</span>
          </button>
        </div>
      </div>
    </div>
  );
};
