'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ChallengeCard } from '@/components/challenges/ChallengeCard';
import { PriorityScoreBadge } from '@/components/ui/PriorityScoreBadge';
import { 
  Sparkles, 
  ArrowRight, 
  Users, 
  GraduationCap, 
  Briefcase, 
  Landmark, 
  Play, 
  MapPin, 
  FileText, 
  CheckCircle2, 
  TrendingUp, 
  Cpu, 
  ShieldCheck,
  Layers
} from 'lucide-react';

export default function LandingPage() {
  const { challenges, stats } = useApp();
  const featuredChallenges = challenges.slice(0, 4);

  return (
    <div className="space-y-16 pb-20 bg-[#0B1020] text-slate-100">
      {/* 2. PURE DARK HERO SECTION WITH AMBIENT NEON GLOWS */}
      <section className="relative bg-gradient-to-b from-[#05070F] via-[#0B1020] to-[#0B1020] overflow-hidden pt-10 pb-16 border-b border-slate-800/80">
        {/* Ambient Neon Backlights */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
          {/* Eyebrow Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs font-extrabold shadow-sm">
              <Landmark className="w-3.5 h-3.5 text-emerald-400" />
              <span>Government of Jharkhand</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800/80 text-indigo-300 text-xs font-extrabold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>AI-Powered Civic Innovation Platform</span>
            </div>
          </div>

          {/* Hero Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Headlines & CTAs */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                  Turning Community Problems Into{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">
                    Real Solutions.
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-xl">
                  A collaborative platform connecting citizens, universities, industry and government to solve real-world challenges in Jharkhand using the power of AI and innovation.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/report"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
                >
                  <Sparkles className="w-4 h-4 text-indigo-200" /> Report a Problem →
                </Link>
                <Link
                  href="/challenges"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#131B2E] hover:bg-slate-800 text-slate-200 text-xs sm:text-sm font-extrabold border border-slate-800 transition-all"
                >
                  <Layers className="w-4 h-4 text-indigo-400" /> Explore Challenges
                </Link>
              </div>

              {/* Compact Dark Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4">
                <div className="bg-[#131B2E]/90 p-3 rounded-2xl border border-slate-800 text-white shadow-xl">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                    <FileText className="w-3.5 h-3.5 text-indigo-400" /> Logged
                  </div>
                  <div className="text-lg font-black text-white mt-0.5">{stats.totalChallenges.toLocaleString()}</div>
                  <span className="text-[10px] text-slate-500 block">Challenges</span>
                </div>

                <div className="bg-[#131B2E]/90 p-3 rounded-2xl border border-slate-800 text-white shadow-xl">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Verified
                  </div>
                  <div className="text-lg font-black text-emerald-400 mt-0.5">{stats.verifiedChallenges.toLocaleString()}</div>
                  <span className="text-[10px] text-slate-500 block">AI Structured</span>
                </div>

                <div className="bg-[#131B2E]/90 p-3 rounded-2xl border border-slate-800 text-white shadow-xl">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-400" /> Projects
                  </div>
                  <div className="text-lg font-black text-indigo-400 mt-0.5">{stats.activeProjects}</div>
                  <span className="text-[10px] text-slate-500 block">Active Labs</span>
                </div>

                <div className="bg-[#131B2E]/90 p-3 rounded-2xl border border-slate-800 text-white shadow-xl">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                    <Users className="w-3.5 h-3.5 text-amber-400" /> Impacted
                  </div>
                  <div className="text-lg font-black text-amber-400 mt-0.5">{stats.citizensImpacted.toLocaleString()}</div>
                  <span className="text-[10px] text-slate-500 block">Citizens</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual with Glowing District Map Overlay */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl h-[420px] group bg-slate-950">
                <img
                  src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80"
                  alt="Jharkhand Landscape"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-transparent to-transparent"></div>

                {/* Jharkhand District Map Node Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                  <div className="text-right">
                    <span className="text-2xl font-serif italic text-white/90 drop-shadow-md">
                      Stronger Jharkhand Together
                    </span>
                  </div>

                  {/* Node Pins */}
                  <div className="relative w-full h-48 my-auto">
                    <div className="absolute top-6 right-16 flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
                      <span className="text-xs font-bold text-white drop-shadow">Dumka</span>
                    </div>

                    <div className="absolute bottom-8 left-16 flex items-center gap-1">
                      <span className="w-3.5 h-3.5 rounded-full bg-indigo-400 animate-pulse"></span>
                      <span className="text-xs font-bold text-white drop-shadow">Ranchi</span>
                    </div>

                    <div className="absolute top-16 right-36 flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                      <span className="text-xs font-bold text-white drop-shadow">Dhanbad</span>
                    </div>

                    <div className="absolute bottom-16 right-48 flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                      <span className="text-xs font-bold text-white drop-shadow">Bokaro</span>
                    </div>

                    <div className="absolute top-4 left-36 flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                      <span className="text-xs font-bold text-white drop-shadow">Giridih</span>
                    </div>

                    <div className="absolute bottom-4 right-12 flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                      <span className="text-xs font-bold text-white drop-shadow">Jamshedpur</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-serif italic text-slate-400">Innovate for a Better Tomorrow</span>
                  </div>
                </div>

                {/* Floating Top Right Impact Card */}
                <div className="absolute top-4 right-4 bg-[#131B2E]/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800 text-white shadow-2xl max-w-[200px] pointer-events-auto">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className="p-1.5 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-800">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-sm font-black block">4.8 Lakh+</span>
                        <span className="text-[10px] text-slate-400 font-bold block">Lives Touched</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                      +62%
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 block mt-1.5 border-t border-slate-800 pt-1 font-mono">
                    — From Problems to Progress
                  </span>
                </div>

                {/* Floating Bottom Left Quote Card */}
                <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 text-white shadow-2xl max-w-xs pointer-events-auto space-y-1">
                  <p className="text-xs italic text-slate-200 leading-snug">
                    “Real change happens when people, knowledge and resources work together.”
                  </p>
                  <span className="text-[10px] font-bold text-emerald-400 block">— JanSetu Platform</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW JANSETU WORKS (THE VALUE CHAIN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 bg-indigo-950 px-2.5 py-1 rounded-md border border-indigo-800">
              THE VALUE CHAIN
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">How JanSetu Works</h2>
            <p className="text-xs sm:text-sm text-slate-400">A simple journey from a local problem to real-world impact</p>
          </div>
          <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#131B2E] hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-bold shadow-sm">
            <Play className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" /> Watch 2 Min Demo
          </button>
        </div>

        {/* 5 Horizontal Connected Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-5 gap-2.5">
            <div className="bg-[#131B2E]/90 p-4 rounded-2xl border border-slate-800 shadow-xl space-y-2 relative">
              <div className="w-8 h-8 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800 flex items-center justify-center font-extrabold text-xs">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-extrabold text-white">1. Report</h3>
              <p className="text-[11px] text-slate-400 leading-snug">Citizens submit real local problems.</p>
            </div>

            <div className="bg-[#131B2E]/90 p-4 rounded-2xl border border-slate-800 shadow-xl space-y-2 relative">
              <div className="w-8 h-8 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800 flex items-center justify-center font-extrabold text-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-extrabold text-white">2. AI Intelligence</h3>
              <p className="text-[11px] text-slate-400 leading-snug">AI analyzes, prioritizes and matches experts.</p>
            </div>

            <div className="bg-[#131B2E]/90 p-4 rounded-2xl border border-slate-800 shadow-xl space-y-2 relative">
              <div className="w-8 h-8 rounded-xl bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center font-extrabold text-xs">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-extrabold text-white">3. Collaborate</h3>
              <p className="text-[11px] text-slate-400 leading-snug">Universities & industry work on solutions.</p>
            </div>

            <div className="bg-[#131B2E]/90 p-4 rounded-2xl border border-slate-800 shadow-xl space-y-2 relative">
              <div className="w-8 h-8 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center font-extrabold text-xs">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-extrabold text-white">4. Implement</h3>
              <p className="text-[11px] text-slate-400 leading-snug">Pilot and deploy in the real world.</p>
            </div>

            <div className="bg-[#131B2E]/90 p-4 rounded-2xl border border-slate-800 shadow-xl space-y-2 relative">
              <div className="w-8 h-8 rounded-xl bg-blue-950 text-blue-400 border border-blue-800 flex items-center justify-center font-extrabold text-xs">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-extrabold text-white">5. Impact</h3>
              <p className="text-[11px] text-slate-400 leading-snug">Measurable change for communities.</p>
            </div>
          </div>

          {/* Right Card: Regional Mission */}
          <div className="lg:col-span-3 bg-gradient-to-br from-indigo-950 to-slate-900 text-white p-5 rounded-2xl border border-indigo-800/80 shadow-xl flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Regional Mission</span>
              <h4 className="text-sm font-extrabold">Real Problems. Real People. Real Impact.</h4>
              <p className="text-[11px] text-slate-300">Building a smarter, stronger Jharkhand together.</p>
            </div>
            <div className="text-[10px] text-emerald-400 font-bold bg-emerald-950/90 px-2.5 py-1 rounded-lg border border-emerald-800">
              Statewide Civic Innovation Network
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CHALLENGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              🔥 Featured Challenges
            </h2>
            <p className="text-xs text-slate-400">Verified community challenges that need innovative solutions</p>
          </div>
          <Link
            href="/challenges"
            className="text-xs font-extrabold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            View All Challenges →
          </Link>
        </div>

        {/* 4 Dark Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </section>

      {/* HUMAN IMPACT STORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
            alt="Jharkhand Community Impact"
            className="absolute inset-0 w-full h-full object-cover opacity-15"
          />
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
              REAL PEOPLE • REAL IMPACT
            </span>
            <h2 className="text-3xl font-black text-white">Technology matters when it reaches the people who need it.</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              JanSetu connects unstructured citizen grievances with academic research talent and corporate CSR funding to transform local problems into field-verified pilot solutions across Jharkhand.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div>
                <span className="text-2xl font-black text-emerald-400">4.8 Lakh+</span>
                <p className="text-xs text-slate-400">Lives Touched</p>
              </div>
              <div>
                <span className="text-2xl font-black text-indigo-400">318</span>
                <p className="text-xs text-slate-400">Active Lab Projects</p>
              </div>
              <div>
                <span className="text-2xl font-black text-amber-400">127</span>
                <p className="text-xs text-slate-400">Implemented Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
