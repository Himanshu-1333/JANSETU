'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  FolderKanban, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Users, 
  Briefcase, 
  MapPin, 
  Award,
  Sparkles
} from 'lucide-react';

export default function UniversityProjectsPage() {
  const { projects } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back Button */}
      <Link
        href="/university"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to University Dashboard
      </Link>

      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-900">University Project Workspaces</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Active university projects, student team assignments, milestone timelines, and industry support pledges.
        </p>
      </div>

      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
            {/* Project Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                  {project.category} • {project.district} District
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-2">{project.challenge_title}</h2>
                <p className="text-xs text-slate-500">Lead University: <strong>{project.university_name}</strong></p>
              </div>

              <div className="bg-slate-900 text-white p-4 rounded-2xl text-center min-w-[140px]">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Project Progress</span>
                <div className="text-2xl font-black text-emerald-400">{project.progress}%</div>
                <span className="text-[10px] text-slate-400 block">{project.status} Phase</span>
              </div>
            </div>

            {/* Team & Industry Details Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Assigned Team */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-indigo-600" /> Student & Faculty Team
                </span>
                <div className="text-xs text-slate-700 space-y-1">
                  <p>Project Director: <strong>{project.team.lead}</strong></p>
                  <p>Faculty Mentor: <strong>{project.team.mentor}</strong></p>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">Student Researchers:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.team.members.map((m, idx) => (
                      <span key={idx} className="bg-white text-slate-800 text-[11px] px-2.5 py-0.5 rounded-lg border border-slate-200">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Industry Support */}
              <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 space-y-3">
                <span className="text-xs font-bold uppercase text-amber-900 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-amber-600" /> Industry Partner & Funding
                </span>
                <div className="text-xs text-amber-900 space-y-1">
                  <p>Partner: <strong>{project.industry_partner || 'AquaTech Solutions'}</strong></p>
                  <p>Funding Pledge: <strong>{project.funding_amount || '₹3,00,000'}</strong></p>
                </div>
                {project.resources_provided && (
                  <div className="pt-2 border-t border-amber-200/80">
                    <span className="text-[11px] font-bold text-amber-800 block mb-1">Resources Provided:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.resources_provided.map((r, idx) => (
                        <span key={idx} className="bg-white text-amber-900 text-[11px] px-2.5 py-0.5 rounded-lg border border-amber-200 font-medium">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Milestones Progression */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Project Milestone Progression</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {project.milestones.map((m) => {
                  const isDone = m.status === 'completed';
                  const isInProgress = m.status === 'in_progress';
                  return (
                    <div
                      key={m.id}
                      className={`p-3.5 rounded-2xl border text-xs space-y-1 ${
                        isDone
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : isInProgress
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-900 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : isInProgress ? (
                          <Clock className="w-4 h-4 text-indigo-600 animate-spin shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-400 shrink-0" />
                        )}
                        <span className="font-bold truncate">{m.title}</span>
                      </div>
                      <span className="text-[10px] opacity-75 block capitalize">Status: {m.status.replace('_', ' ')}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
