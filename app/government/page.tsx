'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { StatCard } from '@/components/dashboards/StatCard';
import { DistrictMap } from '@/components/dashboards/DistrictMap';
import { PriorityScoreBadge } from '@/components/ui/PriorityScoreBadge';
import { 
  Landmark, 
  MapPin, 
  Users, 
  CheckCircle2, 
  TrendingUp, 
  Activity, 
  Award, 
  ShieldAlert, 
  Sparkles,
  ArrowUpRight,
  FileText,
  Send,
  X,
  Building2,
  DollarSign,
  PieChart as PieIcon,
  Download,
  SlidersHorizontal,
  Clock,
  Flame,
  Check
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface Department {
  id: string;
  name: string;
  activeChallenges: number;
  slaSpeed: string;
  assignedLabs: number;
  budgetAllocated: string;
}

const DEPARTMENTS_DATA: Department[] = [
  { id: 'water', name: 'Water Resources & Sanitation', activeChallenges: 48, slaSpeed: '94.6%', assignedLabs: 8, budgetAllocated: '₹85.00 Lakh' },
  { id: 'energy', name: 'Renewable Energy & Power Grid', activeChallenges: 36, slaSpeed: '97.2%', assignedLabs: 6, budgetAllocated: '₹1.20 Crore' },
  { id: 'mining', name: 'Mining & Environmental Safety', activeChallenges: 52, slaSpeed: '91.8%', assignedLabs: 7, budgetAllocated: '₹1.45 Crore' },
  { id: 'urban', name: 'Urban Infrastructure & Traffic AI', activeChallenges: 29, slaSpeed: '96.5%', assignedLabs: 5, budgetAllocated: '₹60.00 Lakh' },
  { id: 'health', name: 'Rural Health & Telemedicine', activeChallenges: 22, slaSpeed: '98.1%', assignedLabs: 4, budgetAllocated: '₹45.00 Lakh' },
];

export default function GovernmentPage() {
  const { stats, challenges, addToast, role } = useApp();

  const [selectedDistrictFilter, setSelectedDistrictFilter] = useState<string>('Dumka');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  
  // Modals state
  const [isDirectiveModalOpen, setIsDirectiveModalOpen] = useState<boolean>(false);
  const [directiveDistrict, setDirectiveDistrict] = useState<string>('Dumka');
  const [directiveTitle, setDirectiveTitle] = useState<string>('High-Priority Flood Sensor Telemetry Repair');
  const [directiveBudget, setDirectiveBudget] = useState<string>('1500000');
  const [directiveSent, setDirectiveSent] = useState<boolean>(false);

  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  const districtChartData = [
    { district: 'Ranchi', challenges: 342, active: 67, implemented: 18, sla: 98.2 },
    { district: 'Dhanbad', challenges: 220, active: 34, implemented: 14, sla: 91.8 },
    { district: 'Bokaro', challenges: 184, active: 26, implemented: 12, sla: 93.5 },
    { district: 'Dumka', challenges: 183, active: 29, implemented: 11, sla: 94.6 },
    { district: 'Giridih', challenges: 98, active: 12, implemented: 5, sla: 96.1 },
  ];

  const beforeAfterMetrics = [
    { district: 'Dumka', title: 'Unsafe Drinking Water Pilot', before: '42 illness cases / month', after: '4 cases / month (Solar Filtration)', reached: '1,240 citizens' },
    { district: 'Dhanbad', title: 'Street Light Fault Alerts', before: '14 Days Repair Latency', after: '4 Hours (Smart Relays)', reached: '3,700 citizens' },
    { district: 'Giridih', title: 'Primary School Tablet Tracking', before: '62% Attendance Logging', after: '99.4% Realtime Tablet', reached: '2,100 students' },
  ];

  const handleDispatchDirective = (e: React.FormEvent) => {
    e.preventDefault();
    setDirectiveSent(true);
    addToast(`🚨 Emergency Policy Directive broadcasted to ${directiveDistrict} District Magistrate & Nodal Officer!`);
    setTimeout(() => {
      setIsDirectiveModalOpen(false);
      setDirectiveSent(false);
    }, 1600);
  };

  const filteredDepartments = selectedDepartment === 'All' 
    ? DEPARTMENTS_DATA 
    : DEPARTMENTS_DATA.filter(d => d.id === selectedDepartment);

  if (role !== 'government') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-black text-slate-900">Access denied</h2>
        <p className="text-sm text-slate-500 mt-2">This section is for government users only.</p>
        <div className="mt-4">
          <Link href="/" className="text-indigo-600 font-bold">Go to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 font-sans pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* 1. GOVERNMENT COMMAND CENTER EXECUTIVE HEADER */}
        <div className="bg-[#0F172A] border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-300 text-xs font-extrabold">
                  <Landmark className="w-4 h-4 text-blue-400" />
                  <span>State of Jharkhand Executive Command</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-black tracking-widest uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  24 DISTRICTS LIVE
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                Jharkhand Innovation Command Center
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                Statewide real-time monitoring of civic challenges, SLA resolution compliance, university research pilots, and CSR matching budgets.
              </p>
            </div>

            {/* Top Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsDirectiveModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs flex items-center gap-2 transition-all shadow-lg shadow-red-900/40"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Broadcast Emergency Directive 🚨</span>
              </button>

              <button
                onClick={() => setIsReportModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-[#1A243B] hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Executive AI Audit Report 📊</span>
              </button>

              <div className="bg-[#040711] p-3.5 rounded-2xl border border-slate-800 text-right shrink-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Citizens Impacted</span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">
                  {stats.citizensImpacted.toLocaleString()}
                </div>
                <span className="text-[9px] text-emerald-400 font-semibold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-900">
                  Verified Field Impact
                </span>
              </div>
            </div>
          </div>

          {/* Top KPIs Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#040711] p-4 rounded-2xl border border-slate-800 space-y-1 relative group hover:border-indigo-500/40 transition-all">
              <span className="text-xs text-slate-400 font-bold uppercase">Total Challenges Logged</span>
              <div className="text-2xl font-black text-white">{stats.totalChallenges.toLocaleString()}</div>
              <span className="text-[10px] text-slate-400 font-medium">Citizen Submissions across 24 Districts</span>
            </div>

            <div className="bg-[#040711] p-4 rounded-2xl border border-slate-800 space-y-1 relative group hover:border-indigo-500/40 transition-all">
              <span className="text-xs text-slate-400 font-bold uppercase">AI Verified & Structured</span>
              <div className="text-2xl font-black text-indigo-400">{stats.verifiedChallenges.toLocaleString()}</div>
              <span className="text-[10px] text-indigo-400/80 font-medium">Structured Opportunities</span>
            </div>

            <div className="bg-[#040711] p-4 rounded-2xl border border-slate-800 space-y-1 relative group hover:border-emerald-500/40 transition-all">
              <span className="text-xs text-slate-400 font-bold uppercase">Active Field Projects</span>
              <div className="text-2xl font-black text-emerald-400">{stats.activeProjects.toLocaleString()}</div>
              <span className="text-[10px] text-emerald-400/80 font-medium">Univ + Industry Teams</span>
            </div>

            <div className="bg-[#040711] p-4 rounded-2xl border border-slate-800 space-y-1 relative group hover:border-purple-500/40 transition-all">
              <span className="text-xs text-slate-400 font-bold uppercase">Implemented & Resolved</span>
              <div className="text-2xl font-black text-purple-400">{stats.implementedProjects.toLocaleString()}</div>
              <span className="text-[10px] text-purple-400/80 font-medium">Field Deployed Solved</span>
            </div>
          </div>

        </div>

        {/* 2. STATE DEPARTMENTAL OVERSIGHT & SLA PERFORMANCE */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-400" />
                State Departmental Oversight & Resolution Speeds
              </h2>
              <p className="text-xs text-slate-400">Department-wise active challenges, assigned university labs, and SLA response speed</p>
            </div>

            {/* Department Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <button
                onClick={() => setSelectedDepartment('All')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedDepartment === 'All' ? 'bg-indigo-600 text-white font-black' : 'bg-[#182238] text-slate-300 border border-slate-700'
                }`}
              >
                All Departments
              </button>
              {DEPARTMENTS_DATA.map((dep) => (
                <button
                  key={dep.id}
                  onClick={() => setSelectedDepartment(dep.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    selectedDepartment === dep.id ? 'bg-indigo-600 text-white font-black' : 'bg-[#182238] text-slate-300 border border-slate-700'
                  }`}
                >
                  {dep.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDepartments.map((dep) => (
              <div key={dep.id} className="bg-[#040711] border border-slate-800 rounded-2xl p-4 space-y-3 hover:border-indigo-500/40 transition-all">
                <div className="flex justify-between items-start">
                  <h3 className="text-xs font-bold text-slate-200">{dep.name}</h3>
                  <span className="text-[10px] font-black text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded">
                    SLA {dep.slaSpeed}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Active</span>
                    <strong className="text-white font-black">{dep.activeChallenges} Issues</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Assigned</span>
                    <strong className="text-indigo-400 font-black">{dep.assignedLabs} Labs</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Grant Pool</span>
                    <strong className="text-amber-400 font-black">{dep.budgetAllocated}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. INTERACTIVE JHARKHAND DISTRICT TELEMETRY MAP */}
        <DistrictMap onDistrictSelect={(d) => setSelectedDistrictFilter(d)} />

        {/* 4. DISTRICT ANALYTICS & LIVE PIPELINE FEED */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT 7 COLUMNS: RECHARTS DISTRICT COMPARISON */}
          <div className="lg:col-span-7 bg-[#0F172A] border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-400" />
                  District Challenge & SLA Resolution Analytics
                </h3>
                <p className="text-xs text-slate-400">Comparison of logged challenges vs active and implemented projects across key hubs</p>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-300 bg-indigo-950 border border-indigo-800 px-2.5 py-1 rounded-lg">
                5 Major District Hubs
              </span>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={districtChartData}>
                  <XAxis dataKey="district" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#070b14', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  />
                  <Bar dataKey="challenges" name="Challenges Logged" fill="#6366f1" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="active" name="Active Projects" fill="#10b981" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="implemented" name="Implemented" fill="#a855f7" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RIGHT 5 COLUMNS: LIVE PROJECT PIPELINE FEED */}
          <div className="lg:col-span-5 bg-[#0F172A] border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
                Live State Project Pipeline Feed
              </h3>
              <span className="text-[9px] text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded font-bold">
                LIVE TELEMETRY
              </span>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {challenges.slice(0, 6).map((c) => (
                <div key={c.id} className="p-3 rounded-2xl bg-[#040711] border border-slate-800 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white truncate max-w-[200px]">{c.title}</span>
                    <span className="text-[9px] font-black uppercase text-indigo-400 bg-indigo-950 border border-indigo-800 px-2 py-0.5 rounded">
                      {c.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1 font-semibold text-amber-400">
                      <MapPin className="w-3 h-3" /> {c.district}
                    </span>
                    <span>Affected: ~{c.affected_population.toLocaleString()} citizens</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 5. BEFORE VS AFTER VERIFIED FIELD IMPACT */}
        <div className="bg-[#0F172A] border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                Verified Before-vs-After Field Pilot Outcomes
              </h3>
              <p className="text-xs text-slate-400">Empirical measurement of university prototype deployments across Jharkhand districts</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {beforeAfterMetrics.map((item, idx) => (
              <div key={idx} className="bg-[#040711] border border-slate-800 p-5 rounded-2xl space-y-4 hover:border-amber-500/40 transition-all">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-black text-amber-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {item.district}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded">
                    VERIFIED
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white">{item.title}</h4>

                <div className="space-y-2 text-xs">
                  <div className="bg-red-950/40 border border-red-900/60 p-2.5 rounded-xl">
                    <span className="text-[10px] text-red-400 uppercase font-bold block">Baseline Before:</span>
                    <span className="text-slate-300 font-semibold">{item.before}</span>
                  </div>
                  <div className="bg-emerald-950/40 border border-emerald-900/60 p-2.5 rounded-xl">
                    <span className="text-[10px] text-emerald-400 uppercase font-bold block">Outcome After:</span>
                    <span className="text-emerald-200 font-bold">{item.after}</span>
                  </div>
                </div>

                <div className="text-[11px] text-indigo-300 font-semibold pt-1 border-t border-slate-800">
                  Total Reached: {item.reached}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* DISPATCH EMERGENCY DIRECTIVE MODAL */}
      {isDirectiveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-slate-800 w-full max-w-lg rounded-2xl p-6 relative space-y-5 shadow-2xl animate-in fade-in">
            <button 
              onClick={() => setIsDirectiveModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {directiveSent ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-xl font-black text-white">Emergency Directive Broadcasted!</h3>
                <p className="text-xs text-slate-300 max-w-xs mx-auto">
                  District Nodal Officers and university research teams in {directiveDistrict} have received live WebSocket priority alerts.
                </p>
              </div>
            ) : (
              <form onSubmit={handleDispatchDirective} className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <ShieldAlert className="w-5 h-5 text-red-500" />
                  <h3 className="text-base font-black text-white">State Emergency Policy Directive Dispatch</h3>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Select District</label>
                  <select 
                    value={directiveDistrict}
                    onChange={(e) => setDirectiveDistrict(e.target.value)}
                    className="w-full bg-[#182238] border border-slate-700 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-red-400"
                  >
                    <option>Dumka</option>
                    <option>Dhanbad</option>
                    <option>Bokaro</option>
                    <option>Ranchi</option>
                    <option>Giridih</option>
                    <option>Hazaribagh</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Directive Title</label>
                  <input 
                    type="text"
                    required
                    value={directiveTitle}
                    onChange={(e) => setDirectiveTitle(e.target.value)}
                    className="w-full bg-[#182238] border border-slate-700 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-red-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Emergency Budget Allocation (₹)</label>
                  <input 
                    type="number"
                    value={directiveBudget}
                    onChange={(e) => setDirectiveBudget(e.target.value)}
                    className="w-full bg-[#182238] border border-slate-700 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-red-400"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-red-900/40"
                >
                  <Send className="w-4 h-4" />
                  <span>Broadcast Directive to {directiveDistrict} Nodal Officer</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* EXECUTIVE AI AUDIT REPORT MODAL */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-slate-800 w-full max-w-2xl rounded-2xl p-6 relative space-y-5 shadow-2xl animate-in fade-in max-h-[85vh] overflow-y-auto">
            <button 
              onClick={() => setIsReportModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-black text-white">State Executive Audit Report Q3-2026</h3>
              </div>
              <span className="text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded font-mono font-bold">
                CONFIDENTIAL • OFFICIAL
              </span>
            </div>

            <div className="space-y-4 text-xs text-slate-300 font-mono">
              <div className="bg-[#040711] p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold block">1. STATEWIDE IMPACT SUMMARY</span>
                <p>Total Citizens Benefited: 488,451 across 24 Districts. SLA Resolution compliance average stands at 95.8% across 5 major university innovation hubs.</p>
              </div>

              <div className="bg-[#040711] p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold block">2. CAPITAL & CSR MATCHING ALLOCATION</span>
                <p>State Innovation Fund: ₹2.45 Crore matched with Corporate CSR Pool of ₹1.80 Crore (Tata Steel, Coal India, Vedanta, Adani Green).</p>
              </div>

              <div className="bg-[#040711] p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-indigo-400 font-bold block">3. TOP UNIVERSITY FIELD PILOT OUTCOMES</span>
                <p>Dumka Solar Water Filter Pilot: 90.4% reduction in waterborne illness cases. Dhanbad Smart Relay Pilot: Latency cut from 14 days to 4 hours.</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-800 pt-4">
              <button 
                onClick={() => {
                  addToast('📄 Executive Audit Report PDF downloaded successfully.');
                  setIsReportModalOpen(false);
                }}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Download Official PDF Report</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
