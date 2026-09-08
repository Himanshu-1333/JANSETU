'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Challenge } from '@/lib/types';
import { PriorityScoreBadge } from '@/components/ui/PriorityScoreBadge';
import { 
  Sparkles, 
  CheckCircle2, 
  Loader2, 
  ArrowRight, 
  Users, 
  FileText, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Edit3
} from 'lucide-react';

export default function AnalyzePage() {
  const router = useRouter();
  const { addChallenge } = useApp();

  const [analyzingStep, setAnalyzingStep] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [priorityCount, setPriorityCount] = useState<number>(0);

  const [reportData, setReportData] = useState<{
    description: string;
    district: string;
    photo: string;
  }>({
    description: 'Our village drinking water is contaminated with heavy sediment and industrial runoff, causing recurring waterborne illness among school children and households in Dumka district.',
    district: 'Dumka',
    photo: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
  });

  const steps = [
    'Understanding the issue',
    'Identifying the location & GPS zone',
    'Assessing community impact & population affected',
    'Finding similar reports nearby',
    'Finding the right solution partners',
  ];

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('jansetu_last_report');
      if (stored) {
        setReportData(JSON.parse(stored));
      }
    } catch (e) {}

    const interval = setInterval(() => {
      setAnalyzingStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsDone(true);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isDone) {
      let count = 0;
      const counterInterval = setInterval(() => {
        count += 3;
        if (count >= 91) {
          setPriorityCount(91);
          clearInterval(counterInterval);
        } else {
          setPriorityCount(count);
        }
      }, 25);
    }
  }, [isDone]);

  const handleRegisterAndNavigate = () => {
    const newChallengeId = `ch-${Date.now()}`;
    const newChallenge: Challenge = {
      id: newChallengeId,
      title: 'Unsafe Drinking Water',
      description: reportData.description,
      category: 'Water & Sanitation',
      sub_category: 'Drinking Water Quality',
      district: reportData.district,
      location: `${reportData.district} Rural Block 4, Jharkhand`,
      priority_score: 91,
      severity: 'High',
      affected_population: 1240,
      similar_report_count: 17,
      required_skills: ['IoT', 'Environmental', 'Data Science'],
      status: 'Verified',
      created_at: new Date().toISOString(),
      created_by: 'Citizen Report',
      university_matches: [
        { name: 'BIT Jharkhand', match: 96, reason: 'Strong IoT research lab & water quality sensing projects' },
        { name: 'Ranchi University', match: 84, reason: 'Environmental science faculty expertise' }
      ],
      industry_matches: [
        { name: 'AquaTech Solutions', match: 91, support: 'Sensor hardware + ₹3,00,000 prototype funding' }
      ],
      image: reportData.photo
    };

    addChallenge(newChallenge);
    router.push(`/challenges/${newChallengeId}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-white">
      {!isDone ? (
        <div className="bg-[#131B2E] text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl text-center space-y-8 relative overflow-hidden">
          {/* Laser scanning beam line */}
          <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-laser pointer-events-none"></div>

          <div className="w-16 h-16 rounded-2xl bg-indigo-950 text-indigo-400 border border-indigo-800 flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/30">
            <Sparkles className="w-8 h-8 text-indigo-300 animate-pulse" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-indigo-400 font-extrabold uppercase tracking-wider">JanSetu AI Engine</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">"Understanding your community's problem..."</h2>
            <p className="text-xs text-slate-400">Converting citizen narrative into a structured innovation challenge.</p>
          </div>

          <div className="max-w-md mx-auto text-left space-y-3 font-mono text-xs bg-[#0B1020] p-5 rounded-2xl border border-slate-800">
            {steps.map((stepText, idx) => {
              const stepCompleted = idx < analyzingStep;
              const stepCurrent = idx === analyzingStep;

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 transition-all duration-300 ${
                    stepCompleted
                      ? 'text-emerald-400 font-bold'
                      : stepCurrent
                      ? 'text-indigo-300 font-bold'
                      : 'text-slate-600'
                  }`}
                >
                  {stepCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : stepCurrent ? (
                    <Loader2 className="w-4 h-4 text-indigo-400 animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                  )}
                  <span>✓ {stepText}</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-[#131B2E] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden animate-fadeIn space-y-6">
          <div className="bg-[#0B1020] text-white p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider block">✓ Here's what we found</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Unsafe Drinking Water</h2>
              <p className="text-xs text-slate-400 mt-0.5">Category: Water & Sanitation • Dumka District</p>
            </div>

            <div className="bg-[#131B2E] p-4 rounded-2xl border border-slate-800 text-center min-w-[130px]">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Priority Score</span>
              <div className="text-3xl font-black text-rose-500">{priorityCount}/100</div>
              <span className="text-[10px] font-extrabold text-rose-300 uppercase bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                HIGH
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0B1020] p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-xs font-semibold flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-400" /> Community Impact
                </span>
                <span className="text-xl font-bold text-white block">~1,240 People</span>
              </div>

              <div className="bg-[#0B1020] p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-xs font-semibold flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-400" /> Similar Reports
                </span>
                <span className="text-xl font-bold text-white block">17 Nearby Reports</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Required Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {['IoT', 'Environmental Engineering', 'Data Science'].map((skill) => (
                  <span key={skill} className="bg-indigo-950 text-indigo-300 px-3 py-1 rounded-xl text-xs font-extrabold border border-indigo-800">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#0B1020] text-white p-6 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-400" /> Best Matches to Help Solve This
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#131B2E] p-4 rounded-xl border border-indigo-800/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-indigo-400" /> BIT Jharkhand
                    </span>
                    <span className="text-xs font-black text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                      96% Match
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">IoT sensing lab & water research faculty.</p>
                </div>

                <div className="bg-[#131B2E] p-4 rounded-xl border border-amber-800/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-amber-400" /> AquaTech Solutions
                    </span>
                    <span className="text-xs font-black text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                      91% Match
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">Sensors + ₹3,00,000 funding support.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <Link
                href="/report"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-extrabold border border-slate-800 transition-colors"
              >
                <Edit3 className="w-4 h-4" /> Edit Report
              </Link>
              <button
                onClick={handleRegisterAndNavigate}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
              >
                View Challenge & Publish to Marketplace <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
