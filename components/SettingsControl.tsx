
import React from 'react';
import { PasswordSettings } from '../types';

interface SettingsControlProps {
  settings: PasswordSettings;
  setSettings: React.Dispatch<React.SetStateAction<PasswordSettings>>;
}

const SettingsControl: React.FC<SettingsControlProps> = ({ settings, setSettings }) => {
  const toggle = (key: keyof Omit<PasswordSettings, 'length'>) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updateLength = (val: number) => {
    setSettings(prev => ({ ...prev, length: val }));
  };

  return (
    <div className="space-y-3 bg-slate-800/30 p-3 rounded-xl border border-slate-700/30">
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs font-medium">
          <span className="text-slate-400">Password Length</span>
          <span className="text-orange-400 mono font-bold text-base">{settings.length}</span>
        </div>
        <input 
          type="range" 
          min="8" 
          max="32" 
          value={settings.length}
          onChange={(e) => updateLength(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Checkbox 
          label="Uppercase" 
          checked={settings.uppercase} 
          onChange={() => toggle('uppercase')} 
        />
        <Checkbox 
          label="Lowercase" 
          checked={settings.lowercase} 
          onChange={() => toggle('lowercase')} 
        />
        <Checkbox 
          label="Numbers" 
          checked={settings.numbers} 
          onChange={() => toggle('numbers')} 
        />
        <Checkbox 
          label="Symbols" 
          checked={settings.symbols} 
          onChange={() => toggle('symbols')} 
        />
      </div>

      <div className="pt-1">
        <button 
          onClick={() => toggle('funToType')}
          className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all duration-300 ${
            settings.funToType 
            ? 'bg-orange-500/20 border-orange-500 text-orange-100 shadow-lg shadow-orange-500/10' 
            : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500'
          }`}
        >
          <div className="flex items-center space-x-2">
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${settings.funToType ? 'bg-orange-500 text-white' : 'bg-slate-700'}`}>
              <i className="fas fa-brain text-xs"></i>
            </div>
            <div className="text-left">
              <span className="block text-xs font-bold">Memorable</span>
              <span className="block text-[9px] opacity-60">Easy-to-type word patterns</span>
            </div>
          </div>
          <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${settings.funToType ? 'bg-orange-500' : 'bg-slate-700'}`}>
            {settings.funToType && <i className="fas fa-check text-[10px] text-white"></i>}
          </div>
        </button>
      </div>
    </div>
  );
};

const Checkbox: React.FC<{ label: string, checked: boolean, onChange: () => void }> = ({ label, checked, onChange }) => (
  <button 
    onClick={onChange}
    className={`flex items-center justify-between p-2 rounded-lg border transition-all duration-200 ${
      checked 
      ? 'bg-orange-500/10 border-orange-500/50 text-orange-100' 
      : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
    }`}
  >
    <span className="text-xs font-semibold">{label}</span>
    <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${checked ? 'bg-orange-500' : 'bg-slate-700'}`}>
      {checked && <i className="fas fa-check text-[9px] text-white"></i>}
    </div>
  </button>
);

export default SettingsControl;
