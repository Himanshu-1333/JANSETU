'use client';

import React from 'react';
import { ChallengeStatus } from '@/lib/types';
import { CheckCircle2, Circle } from 'lucide-react';

interface ProjectPipelineProps {
  currentStatus: ChallengeStatus;
}

export const ProjectPipeline: React.FC<ProjectPipelineProps> = ({ currentStatus }) => {
  const steps: { key: ChallengeStatus; label: string; desc: string }[] = [
    { key: 'Reported', label: '1. Reported', desc: 'Citizen Submission' },
    { key: 'Verified', label: '2. Verified', desc: 'AI Structured' },
    { key: 'Matched', label: '3. Matched', desc: 'Univ & Industry Fit' },
    { key: 'Active', label: '4. Active', desc: 'Team & Prototype' },
    { key: 'Implemented', label: '5. Implemented', desc: 'Field Impact' },
  ];

  const statusOrder: Record<ChallengeStatus, number> = {
    Reported: 0,
    Verified: 1,
    Matched: 2,
    Active: 3,
    Implemented: 4,
  };

  const currentIndex = statusOrder[currentStatus] ?? 0;

  return (
    <div className="w-full bg-[#131B2E] text-white p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Innovation Lifecycle Pipeline</h4>
        <span className="text-xs font-bold text-indigo-300 bg-indigo-950/90 px-3 py-1 rounded-lg border border-indigo-800">
          Current State: {currentStatus}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 relative">
        {steps.map((step, idx) => {
          const isDone = idx <= currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div
              key={step.key}
              className={`p-3 rounded-xl border text-xs transition-all relative ${
                isCurrent
                  ? 'bg-indigo-600 text-white border-indigo-400 font-extrabold shadow-lg shadow-indigo-600/30'
                  : isDone
                  ? 'bg-slate-900 text-emerald-400 border-emerald-800/80 font-bold'
                  : 'bg-slate-950/60 text-slate-500 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                {isDone ? (
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-emerald-400'}`} />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-slate-600" />
                )}
                <span className="font-bold truncate">{step.label}</span>
              </div>
              <p className={`text-[10px] truncate ${isCurrent ? 'text-indigo-100' : isDone ? 'text-slate-400' : 'text-slate-600'}`}>
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
