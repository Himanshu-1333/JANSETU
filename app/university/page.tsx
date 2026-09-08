'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { StatCard } from '@/components/dashboards/StatCard';
import { TeamBuilderModal } from '@/components/forms/TeamBuilderModal';
import { Challenge } from '@/lib/types';
import { 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  FolderKanban, 
  Award, 
  ArrowRight, 
  MapPin, 
  PlusCircle,
  Briefcase
} from 'lucide-react';

export default function UniversityDashboard() {
  const { challenges, projects, stats } = useApp();
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState<boolean>(false);

  const univStats = {
    activeProjects: stats.univActiveProjects,
    challengesMatched: stats.univChallengesMatched,
    completedProjects: stats.univCompletedPilots,
    studentsCount: stats.univStudentsCount,
  };

  const recommendedChallenges = challenges.filter(c => c.status === 'Verified' || c.status === 'Reported');

  const handleOpenAcceptModal = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setIsTeamModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* 14. UNIVERSITY EXPERIENCE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-extrabold mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>BIT Jharkhand — Academic Research & Innovation Hub</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Good evening, Innovation Team.</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Discover problems your students can solve. Convert community grievances into capstone student research projects.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/university/projects"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shadow-md transition-all"
          >
            <FolderKanban className="w-4 h-4" /> View My Active Projects ({projects.length})
          </Link>
        </div>
      </div>

      {/* Hero Banner matching Section 14 */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">AI Match Radar</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold">{recommendedChallenges.length} challenges match your university's expertise.</h2>
          <p className="text-xs text-slate-300">BIT Jharkhand IoT Lab, Environmental Engineering & Data Science research capabilities.</p>
        </div>

        <button
          onClick={() => {
            if (recommendedChallenges.length > 0) handleOpenAcceptModal(recommendedChallenges[0]);
          }}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-extrabold shadow-lg shrink-0"
        >
          Review Top Match →
        </button>
      </div>

      {/* Compact Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Active Projects"
          value={univStats.activeProjects}
          subtext="Under active development"
          icon={<FolderKanban className="w-5 h-5 text-indigo-600" />}
          colorTheme="indigo"
        />
        <StatCard
          title="Challenges Matched"
          value={univStats.challengesMatched}
          subtext="AI Capability Fit"
          icon={<Sparkles className="w-5 h-5 text-emerald-600" />}
          colorTheme="emerald"
        />
        <StatCard
          title="Completed Field Pilots"
          value={univStats.completedProjects}
          subtext="Government Verified"
          icon={<Award className="w-5 h-5 text-purple-600" />}
          colorTheme="purple"
        />
        <StatCard
          title="Students & Faculty"
          value={univStats.studentsCount}
          subtext="Enrolled researchers"
          icon={<Users className="w-5 h-5 text-amber-600" />}
          colorTheme="amber"
        />
      </div>

      {/* Recommended Challenges Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            AI Recommended Challenges for BIT Jharkhand
          </h2>
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            {recommendedChallenges.length} Open Matches
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedChallenges.map((challenge) => {
            const matchScore = challenge.university_matches[0]?.match || 96;
            const matchReason = challenge.university_matches[0]?.reason || 'IoT Lab • Environmental Research • Data Science';

            return (
              <div
                key={challenge.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-200">
                      {matchScore}% AI Match Score
                    </span>
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                      Priority: {challenge.priority_score}/100
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{challenge.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{challenge.description}</p>

                  <div className="text-xs text-slate-600 flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span>{challenge.district} District</span>
                    <span className="mx-1">•</span>
                    <Users className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>~{challenge.affected_population.toLocaleString()} Affected</span>
                  </div>

                  {/* Why Match Box matching Section 14 */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                    <span className="font-extrabold text-slate-800 block text-[11px]">Why this matches:</span>
                    <p className="text-[11px] text-slate-600 font-medium">{matchReason}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/challenges/${challenge.id}`}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleOpenAcceptModal(challenge)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shadow transition-all"
                  >
                    <PlusCircle className="w-4 h-4" /> Accept Challenge
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedChallenge && (
        <TeamBuilderModal
          challenge={selectedChallenge}
          isOpen={isTeamModalOpen}
          onClose={() => {
            setIsTeamModalOpen(false);
            setSelectedChallenge(null);
          }}
        />
      )}
    </div>
  );
}
