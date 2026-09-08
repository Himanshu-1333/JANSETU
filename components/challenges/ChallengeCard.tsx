'use client';

import React from 'react';
import Link from 'next/link';
import { Challenge } from '@/lib/types';
import { PriorityScoreBadge } from '@/components/ui/PriorityScoreBadge';
import { MapPin, Users, FileText, Sparkles, ArrowRight } from 'lucide-react';

interface ChallengeCardProps {
  challenge: Challenge;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  const primaryUniversity = challenge.university_matches[0];
  const primaryIndustry = challenge.industry_matches[0];

  const statusStyles = {
    Reported: 'bg-slate-900 text-slate-400 border-slate-800',
    Verified: 'bg-indigo-950/80 text-indigo-300 border-indigo-800/80',
    Matched: 'bg-blue-950/80 text-blue-300 border-blue-800/80',
    Active: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80 font-bold',
    Implemented: 'bg-purple-950/80 text-purple-300 border-purple-800/80 font-bold',
  };

  return (
    <div className={`bg-surface rounded-2xl border shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1 dark:bg-[#131B2E]/90 dark:text-white ${
      challenge.isNew 
        ? 'border-emerald-500 shadow-emerald-500/20 ring-1 ring-emerald-500/40' 
        : challenge.justResolved 
        ? 'border-amber-500 shadow-amber-500/20 ring-1 ring-amber-500/40' 
        : 'border-slate-800/80 hover:border-indigo-500/50 hover:shadow-indigo-500/10'
    }`}>
      <div>
        {/* Card Image */}
        <div className="relative h-40 overflow-hidden bg-slate-950">
          <img
            src={challenge.image}
            alt={challenge.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent dark:from-[#131B2E]"></div>
          
          <div className="absolute top-2.5 left-2.5 flex items-center gap-2">
            <PriorityScoreBadge score={challenge.priority_score} severity={challenge.severity} size="sm" />
            {challenge.isNew && (
              <span className="bg-emerald-500 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950"></span>
                NEW REPORT ⚡
              </span>
            )}
            {challenge.justResolved && (
              <span className="bg-amber-400 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                JUST RESOLVED 🎉
              </span>
            )}
          </div>

          <div className="absolute top-2.5 right-2.5">
            <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-lg border backdrop-blur-md ${
              challenge.justResolved ? 'bg-amber-950 text-amber-300 border-amber-700 font-black' : statusStyles[challenge.status]
            }`}>
              {challenge.justResolved ? 'RESOLVED' : challenge.status}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          <div>
            <h3 className="text-base font-extrabold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
              {challenge.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              {challenge.description}
            </p>
          </div>

          {/* District & Impact Meta */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-xs font-medium">
            <div className="flex items-center gap-1.5 text-slate-200 font-bold">
              <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="truncate">{challenge.district}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>~{challenge.affected_population.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{challenge.similar_report_count} reports</span>
            </div>
          </div>

          {/* Skill Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {challenge.required_skills.map((skill, idx) => (
              <span key={idx} className="text-[10px] font-bold bg-slate-900 text-indigo-300 px-2.5 py-0.5 rounded-lg border border-slate-800">
                {skill}
              </span>
            ))}
          </div>

          {/* AI Recommended Match Highlight Box */}
          {primaryUniversity && (
            <div className="bg-slate-950/80 p-3 rounded-xl border border-indigo-500/20 text-xs space-y-1">
              <div className="flex items-center justify-between text-indigo-300 font-bold">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  AI Match: {primaryUniversity.name}
                </span>
                <span className="bg-indigo-600 text-white font-black text-[10px] px-1.5 py-0.5 rounded">
                  {primaryUniversity.match}% Match
                </span>
              </div>
              {primaryIndustry && (
                <p className="text-[11px] text-slate-400 truncate">
                  Industry Partner: <strong className="text-slate-200">{primaryIndustry.name}</strong> ({primaryIndustry.match}%)
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-slate-950/60 px-5 py-3 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-[10px] uppercase font-bold text-slate-500">{challenge.category}</span>
        <Link
          href={`/challenges/${challenge.id}`}
          className="inline-flex items-center gap-1 text-xs font-extrabold text-indigo-400 hover:text-indigo-300 group-hover:translate-x-1 transition-all"
        >
          View Challenge <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
