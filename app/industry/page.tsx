'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { StatCard } from '@/components/dashboards/StatCard';
import { CollaborationModal } from '@/components/forms/CollaborationModal';
import { Challenge } from '@/lib/types';
import { 
  Briefcase, 
  Sparkles, 
  DollarSign, 
  CheckCircle2, 
  GraduationCap, 
  Award, 
  Users, 
  MapPin, 
  ArrowRight,
  SlidersHorizontal,
  Plus
} from 'lucide-react';

export default function IndustryDashboard() {
  const { challenges, industries, stats } = useApp();

  const [selectedSupportFilter, setSelectedSupportFilter] = useState<string>('All Support Types');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [isCollabModalOpen, setIsCollabModalOpen] = useState<boolean>(false);

  const supportTypes = [
    'All Support Types',
    'Mentorship',
    'Funding',
    'Hardware',
    'Software',
    'Internship',
    'Pilot',
    'CSR',
    'Technology Transfer'
  ];

  const handleOpenPledgeModal = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setIsCollabModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* 15. INDUSTRY EXPERIENCE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-extrabold mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Corporate CSR & R&D Partnership Portal</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Help good ideas become real solutions.</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Projects looking for support. Fund high-impact university research teams with CSR grants, hardware sensors, technical mentorship, and pilot trials.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link 
            href="/live-support"
            className="bg-emerald-950 text-emerald-300 hover:bg-emerald-900 border border-emerald-700 px-4 py-2.5 rounded-2xl flex items-center gap-2 text-xs font-bold transition-all shadow-md group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Live Support Terminal 📈</span>
          </Link>

          <Link href="/live-support" className="bg-slate-900 text-white p-4 rounded-2xl flex items-center gap-3 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group">
            <DollarSign className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block flex items-center gap-1">
                Pledged Support Pool <span className="text-amber-400 text-[9px] font-black bg-amber-950 border border-amber-800 px-1 rounded">LIVE</span>
              </span>
              <span className="text-lg font-black text-amber-400">₹{stats.csrPledgePoolLakhs.toFixed(2)} Lakh Total CSR</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Compact Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Active CSR Projects"
          value={stats.industryActiveCsr}
          subtext="Funded & Mentored"
          icon={<Briefcase className="w-5 h-5 text-amber-600" />}
          colorTheme="amber"
        />
        <Link href="/live-support" className="block transform hover:scale-[1.02] transition-transform cursor-pointer">
          <StatCard
            title="Avg Prototype Support"
            value={stats.avgPrototypeGrant || "₹3,00,000"}
            subtext="Click for Live Terminal 📈"
            icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
            colorTheme="emerald"
            isLive={true}
          />
        </Link>
        <StatCard
          title="University Partners"
          value={stats.industryPartners}
          subtext="Academic Labs"
          icon={<GraduationCap className="w-5 h-5 text-indigo-600" />}
          colorTheme="indigo"
        />
        <Link href="/mentors" className="block transform hover:scale-[1.02] transition-transform cursor-pointer">
          <StatCard
            title="Industry Mentors"
            value={stats.industryMentors}
            subtext="Click for Live Mentors Hub 👥"
            icon={<Users className="w-5 h-5 text-blue-600" />}
            colorTheme="blue"
            isLive={true}
          />
        </Link>
      </div>

      {/* Support Type Filter Pills */}
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider">Filter Opportunity Cards by Support Type</label>
        <div className="flex flex-wrap gap-2">
          {supportTypes.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedSupportFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                selectedSupportFilter === st
                  ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunity Cards Grid matching Section 15 */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          Projects Looking for Support
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => {
            const industryMatch = challenge.industry_matches[0];
            const hasCollaborated = !!challenge.industry_collaboration;

            return (
              <div
                key={challenge.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-50 text-amber-900 px-2.5 py-1 rounded-lg border border-amber-200">
                      {industryMatch?.match || 91}% AI Match Score
                    </span>
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      {challenge.district}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{challenge.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{challenge.description}</p>

                  <div className="text-xs text-slate-700 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <p>University Lead: <strong>{challenge.assigned_university || 'BIT Jharkhand'}</strong></p>
                    <p className="text-amber-900 font-bold">
                      Looking for: ₹3L prototype support + sensors + technical mentor
                    </p>
                  </div>

                  {hasCollaborated && (
                    <div className="bg-emerald-50 text-emerald-900 p-2.5 rounded-xl border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Collaboration Request Sent ✓
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/challenges/${challenge.id}`}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    View Opportunity
                  </Link>

                  <button
                    onClick={() => handleOpenPledgeModal(challenge)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold transition-all shadow ${
                      hasCollaborated
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-amber-500 text-slate-950 hover:bg-amber-600'
                    }`}
                  >
                    {hasCollaborated ? 'Update Pledge' : 'Support This Project →'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedChallenge && (
        <CollaborationModal
          challenge={selectedChallenge}
          isOpen={isCollabModalOpen}
          onClose={() => {
            setIsCollabModalOpen(false);
            setSelectedChallenge(null);
          }}
        />
      )}
    </div>
  );
}
