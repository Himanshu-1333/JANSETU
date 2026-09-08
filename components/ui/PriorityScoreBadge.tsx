 'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Severity } from '@/lib/types';
import { ShieldAlert, AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface PriorityScoreBadgeProps {
  score: number;
  severity?: Severity;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const PriorityScoreBadge: React.FC<PriorityScoreBadgeProps> = ({
  score,
  severity = 'High',
  showLabel = true,
  size = 'md',
}) => {
  let colorStyle = 'bg-rose-950/80 text-rose-300 border-rose-800/80 shadow-sm shadow-rose-900/30';
  let icon = <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />;

  if (score >= 85 || severity === 'Critical') {
    colorStyle = 'bg-rose-950/90 text-rose-300 border-rose-700/80 shadow-md shadow-rose-900/40 ring-1 ring-rose-500/30';
    icon = <ShieldAlert className="w-4 h-4 text-rose-400" />;
  } else if (score >= 70 || severity === 'High') {
    colorStyle = 'bg-amber-950/90 text-amber-300 border-amber-700/80 shadow-md shadow-amber-900/30';
    icon = <AlertTriangle className="w-4 h-4 text-amber-400" />;
  } else if (score >= 50 || severity === 'Medium') {
    colorStyle = 'bg-blue-950/90 text-blue-300 border-blue-700/80 shadow-md shadow-blue-900/30';
    icon = <AlertCircle className="w-4 h-4 text-blue-400" />;
  } else {
    colorStyle = 'bg-slate-900 text-slate-400 border-slate-800';
    icon = <Info className="w-4 h-4 text-slate-400" />;
  }

  const { role } = useApp();

  // Only show priority badge to admin/government users
  if (role !== 'government') return null;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1 font-bold',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-extrabold',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-black',
  };

  return (
    <div className={`inline-flex items-center rounded-xl border backdrop-blur-md ${colorStyle} ${sizeClasses[size]}`}>
      {icon}
      <span>{score}/100</span>
      {showLabel && <span className="opacity-80 uppercase text-[10px] tracking-wider font-extrabold">• {severity}</span>}
    </div>
  );
};
