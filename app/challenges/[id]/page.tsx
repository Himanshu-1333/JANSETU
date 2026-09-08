'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { PriorityScoreBadge } from '@/components/ui/PriorityScoreBadge';
import { ProjectPipeline } from '@/components/dashboards/ProjectPipeline';
import { TeamBuilderModal } from '@/components/forms/TeamBuilderModal';
import { CollaborationModal } from '@/components/forms/CollaborationModal';
import { 
  MapPin, 
  Users, 
  FileText, 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  ArrowLeft, 
  CheckCircle2, 
  Building2,
  Heart,
  ShieldCheck
} from 'lucide-react';

export default function ChallengeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { challenges, role } = useApp();

  const [isTeamModalOpen, setIsTeamModalOpen] = useState<boolean>(false);
  const [isCollabModalOpen, setIsCollabModalOpen] = useState<boolean>(false);

  const challengeId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const challenge = challenges.find((c) => c.id === challengeId) || challenges[0];

  if (!challenge) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Challenge Not Found</h2>
        <Link href="/challenges" className="text-indigo-600 font-bold text-sm">
          ← Return to Marketplace
        </Link>
      </div>
    );
  }

  const primaryUniv = challenge.university_matches[0];
  const primaryInd = challenge.industry_matches[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back Button */}
      <Link
        href="/challenges"
        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-600 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Marketplace
      </Link>

      {/* 11. TOP: PHOTO + CHALLENGE TITLE BANNER */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
          <img
            src={challenge.image || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80'}
            alt={challenge.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <PriorityScoreBadge score={challenge.priority_score} severity={challenge.severity} size="lg" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
                {challenge.category}
              </span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-lg border border-emerald-800">
                Status: {challenge.status}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">{challenge.title}</h1>
            <p className="text-sm text-indigo-300 font-semibold flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-indigo-400" /> {challenge.location}
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Narrative, Impact & Journey */}
          <div className="lg:col-span-7 space-y-6">
            {/* THE PROBLEM */}
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">The Problem</h3>
              <p className="text-sm text-slate-800 leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-200 font-medium">
                {challenge.description}
              </p>
            </div>

            {/* COMMUNITY IMPACT */}
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Community Impact</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Affected Population</span>
                  <span className="text-xl font-black text-slate-900">~{challenge.affected_population.toLocaleString()}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Citizen Reports</span>
                  <span className="text-xl font-black text-slate-900">{challenge.similar_report_count}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Location Zone</span>
                  <span className="text-sm font-extrabold text-slate-900 truncate block mt-1">{challenge.district}</span>
                </div>
              </div>
            </div>

            {/* WHY IT MATTERS */}
            <div className="bg-indigo-50/70 p-5 rounded-2xl border border-indigo-100 space-y-1 text-xs text-indigo-950">
              <span className="font-extrabold block text-indigo-900">Why It Matters:</span>
              <p className="leading-relaxed text-indigo-900">
                Solving water quality and public infrastructure bottlenecks in {challenge.district} district directly improves health outcomes for school children and community livelihoods while creating replicable open-source technology templates.
              </p>
            </div>

            {/* PROJECT JOURNEY */}
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Project Journey</h3>
              <ProjectPipeline currentStatus={challenge.status} />
            </div>
          </div>

          {/* Right Column: AI Insights, Solution Network & Prominent Action CTAs */}
          <div className="lg:col-span-5 space-y-6">
            {/* AI INSIGHTS */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-600">Required Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {challenge.required_skills.map((skill) => (
                  <span key={skill} className="bg-white text-indigo-700 font-bold px-3 py-1 rounded-xl text-xs border border-indigo-200 shadow-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* SOLUTION NETWORK */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-5 rounded-2xl border border-slate-800 space-y-4 shadow-lg">
              <span className="text-xs font-bold uppercase text-indigo-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-400" /> Recommended Solution Network
              </span>

              <div className="bg-slate-900/90 p-3.5 rounded-xl border border-indigo-500/30 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1">
                    <GraduationCap className="w-4 h-4 text-indigo-400" /> {primaryUniv?.name || 'BIT Jharkhand'}
                  </span>
                  <span className="text-[11px] font-black text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                    {primaryUniv?.match || 96}% Match
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{primaryUniv?.reason || 'IoT sensing lab & water research'}</p>
              </div>

              <div className="bg-slate-900/90 p-3.5 rounded-xl border border-amber-500/30 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1">
                    <Briefcase className="w-4 h-4 text-amber-400" /> {primaryInd?.name || 'AquaTech Solutions'}
                  </span>
                  <span className="text-[11px] font-black text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                    {primaryInd?.match || 91}% Match
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{primaryInd?.support || 'Sensors + ₹3,00,000 funding'}</p>
              </div>
            </div>

            {/* Assigned Partner Info if active */}
            {challenge.assigned_university && (
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-2">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Assigned University Team
                </div>
                <p>University: <strong>{challenge.assigned_university}</strong></p>
                {challenge.assigned_team && (
                  <p className="text-emerald-800">
                    Lead: {challenge.assigned_team.lead} | Mentor: {challenge.assigned_team.mentor}
                  </p>
                )}
              </div>
            )}

            {/* PROMINENT ACTION CTAS MATCHING SECTION 11 */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => setIsTeamModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-indigo-600/20 transition-all"
              >
                <GraduationCap className="w-4 h-4" /> University: Accept Challenge & Build Team
              </button>

              <button
                onClick={() => setIsCollabModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs sm:text-sm font-extrabold shadow-md shadow-amber-500/20 transition-all"
              >
                <Briefcase className="w-4 h-4" /> Industry: Support Solution (Pledge ₹3L)
              </button>

              <button
                onClick={() => router.push('/government')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold border border-slate-700 transition-colors"
              >
                <Building2 className="w-4 h-4" /> Government: View Command Center Progress
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TeamBuilderModal
        challenge={challenge}
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
      />

      <CollaborationModal
        challenge={challenge}
        isOpen={isCollabModalOpen}
        onClose={() => setIsCollabModalOpen(false)}
      />
    </div>
  );
}
