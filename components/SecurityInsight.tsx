
import React from 'react';
import { SecurityReport } from '../types';

interface SecurityInsightProps {
  report: SecurityReport | null;
  isLoading: boolean;
}

const SecurityInsight: React.FC<SecurityInsightProps> = ({ report, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-3 rounded-xl border border-slate-700 bg-slate-800/20 animate-pulse flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-slate-700"></div>
        <div className="flex-1 space-y-1.5">
          <div className="h-2.5 bg-slate-700 rounded w-1/2"></div>
          <div className="h-2 bg-slate-700 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (!report) return null;

  const strengthColors = {
    'Weak': 'text-red-400',
    'Moderate': 'text-yellow-400',
    'Strong': 'text-green-400',
    'Elite': 'text-purple-400'
  };

  return (
    <div className="p-3 rounded-xl border border-slate-700 bg-slate-800/40 space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <i className="fas fa-shield-halved text-orange-400 text-sm"></i>
          <span className="text-xs font-semibold text-slate-300">Security Analysis</span>
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${strengthColors[report.strength]}`}>
          {report.strength}
        </span>
      </div>

      <div className="w-full bg-slate-700 h-1 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ${
            report.score < 30 ? 'bg-red-500' : report.score < 70 ? 'bg-yellow-500' : 'bg-green-500'
          }`}
          style={{ width: `${report.score}%` }}
        ></div>
      </div>

      <div className="text-[10px] text-orange-200/80 italic border-l-2 border-orange-500/30 pl-2 leading-tight">
        {report.improvementTip}
      </div>

      <div className="flex items-center space-x-2 text-[9px] text-slate-400">
        <i className="fas fa-clock text-orange-400/60"></i>
        <span>Estimated crack time: <span className="text-slate-200 font-medium">{report.timeToCrack}</span></span>
      </div>
    </div>
  );
};

export default SecurityInsight;
