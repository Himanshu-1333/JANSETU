'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { MapPin, Sparkles, Activity, Users, ArrowUpRight } from 'lucide-react';

interface DistrictMapProps {
  onDistrictSelect?: (district: string) => void;
}

export const DistrictMap: React.FC<DistrictMapProps> = ({ onDistrictSelect }) => {
  const [activeDistrict, setActiveDistrict] = useState<string>('Dumka');

  const districtData: Record<string, { title: string; challengeCount: number; activeProjects: number; impacted: number; topIssue: string; status: string; coords: { x: number; y: number } }> = {
    Dumka: {
      title: 'Dumka District Hub',
      challengeCount: 183,
      activeProjects: 29,
      impacted: 42100,
      topIssue: 'Unsafe Drinking Water & Sediment',
      status: 'High Priority (91/100)',
      coords: { x: 70, y: 35 }
    },
    Ranchi: {
      title: 'Ranchi Municipal Hub',
      challengeCount: 342,
      activeProjects: 67,
      impacted: 125000,
      topIssue: 'Smart Waste Collection & Drainage',
      status: 'Active Innovation Hub',
      coords: { x: 42, y: 62 }
    },
    Giridih: {
      title: 'Giridih Rural Hub',
      challengeCount: 98,
      activeProjects: 12,
      impacted: 28400,
      topIssue: 'School Attendance Tracking',
      status: 'Medium Priority (78/100)',
      coords: { x: 60, y: 42 }
    },
    Bokaro: {
      title: 'Bokaro Industrial Hub',
      challengeCount: 184,
      activeProjects: 26,
      impacted: 64000,
      topIssue: 'Rural Healthcare Access & Tele-triage',
      status: 'High Priority (88/100)',
      coords: { x: 65, y: 58 }
    },
    Dhanbad: {
      title: 'Dhanbad Urban Hub',
      challengeCount: 220,
      activeProjects: 34,
      impacted: 89000,
      topIssue: 'Street Light Reliability & Fault Alerts',
      status: 'Implemented Phase',
      coords: { x: 75, y: 55 }
    }
  };

  const handleSelect = (dist: string) => {
    setActiveDistrict(dist);
    if (onDistrictSelect) onDistrictSelect(dist);
  };

  const selected = districtData[activeDistrict] || districtData['Dumka'];

  const { role } = useApp();

  return (
    <div className="bg-[#131B2E] text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-indigo-400" />
            Jharkhand District Innovation Network Map
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Interactive telemetry map displaying real-time challenge distribution & university deployment nodes.
          </p>
        </div>
        <span className="text-xs bg-indigo-950 text-indigo-300 border border-indigo-800 px-3 py-1 rounded-full font-bold">
          Live Command Telemetry
        </span>
      </div>

      {/* Map & Telemetry Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Stylized SVG Map Container */}
        <div className="lg:col-span-7 bg-[#0B1020] p-6 rounded-2xl border border-slate-800 relative h-72 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#6366f1_1.5px,transparent_1.5px)] [background-size:18px_18px]"></div>

          <svg className="w-full h-full max-h-60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 20,40 Q 30,20 60,25 Q 85,20 90,45 Q 95,70 75,85 Q 50,90 30,80 Q 10,70 20,40 Z"
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
            <line x1="42" y1="62" x2="70" y2="35" stroke="#6366f1" strokeWidth="1" opacity="0.6" strokeDasharray="2 2" />
            <line x1="42" y1="62" x2="65" y2="58" stroke="#6366f1" strokeWidth="1" opacity="0.6" strokeDasharray="2 2" />
            <line x1="65" y1="58" x2="75" y2="55" stroke="#6366f1" strokeWidth="1" opacity="0.6" strokeDasharray="2 2" />
            <line x1="60" y1="42" x2="70" y2="35" stroke="#6366f1" strokeWidth="1" opacity="0.6" strokeDasharray="2 2" />

            {Object.entries(districtData).map(([name, info]) => {
              const isSelected = activeDistrict === name;
              return (
                <g key={name} className="cursor-pointer" onClick={() => handleSelect(name)}>
                  {isSelected && (
                    <circle cx={info.coords.x} cy={info.coords.y} r="9" fill="#6366f1" opacity="0.4" className="animate-ping" />
                  )}
                  <circle
                    cx={info.coords.x}
                    cy={info.coords.y}
                    r={isSelected ? "5" : "3.5"}
                    fill={isSelected ? "#818cf8" : "#10b981"}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <text
                    x={info.coords.x}
                    y={info.coords.y - 7}
                    textAnchor="middle"
                    fill={isSelected ? "#ffffff" : "#94a3b8"}
                    fontSize="4.5"
                    fontWeight={isSelected ? "900" : "normal"}
                  >
                    {name}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-2 left-3 text-[10px] text-slate-500 font-mono">
            Click map pins to inspect district telemetry
          </div>
        </div>

        {/* Selected District Telemetry Info */}
        <div className="lg:col-span-5 space-y-4 bg-[#0B1020] p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Selected Node</span>
              <h4 className="text-lg font-black text-white">{selected.title}</h4>
            </div>
            {/* Show status only to admin/government users */}
            {role === 'government' ? (
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                {selected.status}
              </span>
            ) : (
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-bold">Citizen View</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Challenges Logged</span>
              <span className="text-xl font-black text-white">{selected.challengeCount}</span>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Active Lab Projects</span>
              <span className="text-xl font-black text-indigo-400">{selected.activeProjects}</span>
            </div>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
            <span className="text-slate-400 text-[11px] block">Primary Focus Challenge</span>
            <div className="font-bold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>{selected.topIssue}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1 font-medium">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              Citizens Impacted: <strong className="text-white font-extrabold">{selected.impacted.toLocaleString()}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
