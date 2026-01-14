
import React, { useState, useCallback, useEffect } from 'react';
import { PasswordSettings, SecurityReport } from './types';
import { generatePassword } from './utils';
import { analyzePassword } from './services/geminiService';
import PasswordDisplay from './components/PasswordDisplay';
import SettingsControl from './components/SettingsControl';
import SecurityInsight from './components/SecurityInsight';
import PythonExporter from './components/PythonExporter';

const App: React.FC = () => {
  const [settings, setSettings] = useState<PasswordSettings>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    funToType: false,
  });

  const [password, setPassword] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState<SecurityReport | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    const newPass = generatePassword(settings);
    setPassword(newPass);

    // AI Analysis
    setIsAnalyzing(true);
    try {
      const result = await analyzePassword(newPass);
      setReport(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
      setTimeout(() => setIsGenerating(false), 500);
    }
  }, [settings]);

  // Initial generate
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="glass rounded-2xl shadow-2xl overflow-hidden p-6 space-y-6 relative border-t-4 border-orange-500">
      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-orange-500/20 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <header className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-2.5 rounded-xl shadow-lg animate-float">
            <i className="fas fa-key text-white text-xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">PyPass Elite</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Architect v1.0</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-500 hover:text-white transition-colors">
            <i className="fas fa-history"></i>
          </button>
          <button className="p-2 text-slate-500 hover:text-white transition-colors">
            <i className="fas fa-cog"></i>
          </button>
        </div>
      </header>

      <PasswordDisplay 
        password={password} 
        isGenerating={isGenerating} 
        onCopy={() => {}}
      />

      <SettingsControl settings={settings} setSettings={setSettings} />

      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300 transform active:scale-95 flex items-center justify-center space-x-2 ${
          isGenerating 
          ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
          : 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-orange-500/20'
        }`}
      >
        <i className={`fas ${isGenerating ? 'fa-spinner fa-spin' : 'fa-bolt'}`}></i>
        <span>{isGenerating ? 'GENETIC MAPPING...' : 'GENERATE PASSWORD'}</span>
      </button>

      <SecurityInsight report={report} isLoading={isAnalyzing} />

      <PythonExporter settings={settings} />

      <footer className="text-center pt-2">
        <p className="text-[9px] text-slate-600 uppercase tracking-tighter">
          &copy; 2024 Elite Security Labs • Encrypted with 256-bit AES
        </p>
      </footer>
    </div>
  );
};

export default App;
