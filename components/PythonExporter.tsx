
import React, { useState } from 'react';
import { generatePythonCode } from '../utils';
import { PasswordSettings } from '../types';

const PythonExporter: React.FC<{ settings: PasswordSettings }> = ({ settings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const code = generatePythonCode(settings);

  return (
    <div className="mt-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-300 transition-colors flex items-center justify-center space-x-2"
      >
        <span>{isOpen ? 'Hide' : 'Show'} Python Implementation</span>
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
      </button>

      {isOpen && (
        <div className="mt-3 p-4 bg-black/40 rounded-lg border border-slate-700 overflow-x-auto no-scrollbar">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] text-orange-400 font-bold uppercase">generator.py</span>
            <button 
              onClick={() => navigator.clipboard.writeText(code)}
              className="text-[10px] text-slate-500 hover:text-white"
            >
              Copy Script
            </button>
          </div>
          <pre className="text-[11px] mono text-slate-300 leading-tight">
            {code}
          </pre>
        </div>
      )}
    </div>
  );
};

export default PythonExporter;
