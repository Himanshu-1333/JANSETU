'use client';

import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: React.ReactNode;
  trend?: string;
  isLive?: boolean;
  colorTheme?: 'indigo' | 'emerald' | 'amber' | 'blue' | 'purple';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtext,
  icon,
  trend,
  isLive = true,
  colorTheme = 'indigo',
}) => {
  const themeStyles = {
    indigo: 'bg-indigo-950/80 text-indigo-400 border-indigo-800/80 shadow-md shadow-indigo-900/30',
    emerald: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/80 shadow-md shadow-emerald-900/30',
    amber: 'bg-amber-950/80 text-amber-400 border-amber-800/80 shadow-md shadow-amber-900/30',
    blue: 'bg-blue-950/80 text-blue-400 border-blue-800/80 shadow-md shadow-blue-900/30',
    purple: 'bg-purple-950/80 text-purple-400 border-purple-800/80 shadow-md shadow-purple-900/30',
  };

  return (
    <div className="bg-[#131B2E]/90 p-5 rounded-2xl border border-slate-800/80 shadow-xl flex items-start justify-between relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-300">
      {isLive && (
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-emerald-950/90 border border-emerald-800/80 px-2 py-0.5 rounded-full text-[9px] font-black text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>LIVE</span>
        </div>
      )}
      <div className="space-y-1 z-10">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{title}</span>
        <div className="text-2xl sm:text-3xl font-black text-white tracking-tight transition-all duration-300">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        {subtext && <p className="text-xs text-slate-400 font-medium">{subtext}</p>}
        {trend && (
          <span className="inline-block text-[10px] font-bold text-emerald-400 bg-emerald-950/90 border border-emerald-800 px-2 py-0.5 rounded-md mt-1">
            {trend}
          </span>
        )}
      </div>
      <div className={`p-3 rounded-xl border ${themeStyles[colorTheme]} shrink-0 group-hover:scale-110 transition-transform mt-4 sm:mt-0`}>
        {icon}
      </div>
    </div>
  );
};
