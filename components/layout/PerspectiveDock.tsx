'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/lib/types';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Landmark, 
  PlusCircle, 
  FilePlus, 
  DollarSign, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  Activity, 
  ArrowRight,
  Send,
  X,
  FileText,
  SlidersHorizontal
} from 'lucide-react';

export const PerspectiveDock: React.FC = () => {
  const pathname = usePathname();
  const { role, setRole, user, stats, showToast, addToast } = useApp();
  const notify = showToast || addToast || ((msg: string) => console.log(msg));

  // Modal State for perspective actions
  const [activeModal, setActiveModal] = useState<'csr_pledge' | 'gov_emergency' | 'univ_proposal' | 'citizen_upvote' | null>(null);
  const [pledgeAmount, setPledgeAmount] = useState<string>('500000');
  const [govBudget, setGovBudget] = useState<string>('2500000');
  const [actionDone, setActionDone] = useState<boolean>(false);

  // Hide on login page
  if (pathname === '/login') return null;

  const roleConfigs: Record<UserRole, {
    label: string;
    badge: string;
    icon: React.ReactNode;
    colorBg: string;
    border: string;
    textColor: string;
    primaryStat: string;
    statValue: string;
    actions: { label: string; icon: React.ReactNode; onClick: () => void; isPrimary?: boolean; href?: string }[];
  }> = {
    citizen: {
      label: 'Citizen Perspective',
      badge: 'COMMUNITY VOICE',
      icon: <User className="w-4 h-4 text-emerald-400" />,
      colorBg: 'bg-emerald-950/70',
      border: 'border-emerald-800/80',
      textColor: 'text-emerald-400',
      primaryStat: 'Reported Issues Impacted',
      statValue: '17 Reports Verified',
      actions: [
        { label: 'Report Civic Issue 📢', icon: <FilePlus className="w-3.5 h-3.5" />, href: '/report', isPrimary: true },
        { label: 'Browse Challenges', icon: <Sparkles className="w-3.5 h-3.5" />, href: '/challenges' },
        { label: 'Upvote District Priorities', icon: <CheckCircle2 className="w-3.5 h-3.5" />, onClick: () => setActiveModal('citizen_upvote') }
      ]
    },
    university: {
      label: 'University Lab Perspective',
      badge: 'BIT JHARKHAND R&D LAB',
      icon: <GraduationCap className="w-4 h-4 text-indigo-400" />,
      colorBg: 'bg-indigo-950/70',
      border: 'border-indigo-800/80',
      textColor: 'text-indigo-400',
      primaryStat: 'Active Lab Prototypes',
      statValue: '12 Projects (₹48L CSR)',
      actions: [
        { label: 'Submit Research Proposal 🧪', icon: <PlusCircle className="w-3.5 h-3.5" />, onClick: () => setActiveModal('univ_proposal'), isPrimary: true },
        { label: 'University Hub', icon: <GraduationCap className="w-3.5 h-3.5" />, href: '/university' },
        { label: 'Request Mentorship', icon: <User className="w-3.5 h-3.5" />, href: '/mentors' }
      ]
    },
    industry: {
      label: 'Corporate CSR & R&D Perspective',
      badge: 'TATA STEEL & COAL INDIA CSR',
      icon: <Briefcase className="w-4 h-4 text-amber-400" />,
      colorBg: 'bg-amber-950/70',
      border: 'border-amber-800/80',
      textColor: 'text-amber-400',
      primaryStat: 'Pledged CSR Fund Pool',
      statValue: `₹${stats.csrPledgePoolLakhs.toFixed(2)} Lakhs Total`,
      actions: [
        { label: 'Pledge CSR Support Pool 💰', icon: <DollarSign className="w-3.5 h-3.5" />, onClick: () => setActiveModal('csr_pledge'), isPrimary: true },
        { label: 'Live Support Stream 📈', icon: <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />, href: '/live-support' },
        { label: 'Senior Mentors Hub', icon: <Briefcase className="w-3.5 h-3.5" />, href: '/mentors' }
      ]
    },
    government: {
      label: 'Gov Command Perspective',
      badge: 'STATE NODAL COMMANDER',
      icon: <Landmark className="w-4 h-4 text-blue-400" />,
      colorBg: 'bg-blue-950/70',
      border: 'border-blue-800/80',
      textColor: 'text-blue-400',
      primaryStat: '24 Districts SLAs',
      statValue: '96.4% Resolution Speed',
      actions: [
        { label: 'Allocate Emergency Fund 🏛️', icon: <ShieldAlert className="w-3.5 h-3.5" />, onClick: () => setActiveModal('gov_emergency'), isPrimary: true },
        { label: 'Gov Command Dashboard', icon: <Landmark className="w-3.5 h-3.5" />, href: '/government' },
        { label: 'Issue Policy Directive', icon: <FileText className="w-3.5 h-3.5" />, onClick: () => notify('📋 State Policy Directive issued to all 24 District Magistrates.') }
      ]
    }
  };

  const currentConfig = roleConfigs[role] || roleConfigs.citizen;

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActionDone(true);

    if (activeModal === 'csr_pledge') {
      notify(`💰 Successfully pledged ₹${(Number(pledgeAmount) / 100000).toFixed(2)} Lakh CSR funds to university prototypes!`);
    } else if (activeModal === 'gov_emergency') {
      notify(`🏛️ Emergency Civic Relief Fund of ₹${(Number(govBudget) / 100000).toFixed(2)} Lakh released to District Nodal Officers.`);
    } else if (activeModal === 'univ_proposal') {
      notify('🧪 New Research Prototype Proposal submitted to Jharkhand Innovation Council.');
    } else if (activeModal === 'citizen_upvote') {
      notify('👍 Citizen Upvote recorded for Dumka Water Purification Priority Project.');
    }

    setTimeout(() => {
      setActiveModal(null);
      setActionDone(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-2">
      {/* Rectangular Perspective Dock Bar */}
      <div className={`w-full rounded-xl border ${currentConfig.border} ${currentConfig.colorBg} backdrop-blur-md p-3 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xl transition-all duration-300`}>
        
        {/* Left: Active Role Indicator */}
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl ${currentConfig.colorBg} border ${currentConfig.border} flex items-center justify-center shrink-0 shadow-inner`}>
            {currentConfig.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white">{currentConfig.label}</span>
              <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${currentConfig.border} ${currentConfig.textColor}`}>
                {currentConfig.badge}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
              <span>{currentConfig.primaryStat}:</span>
              <strong className={currentConfig.textColor}>{currentConfig.statValue}</strong>
            </div>
          </div>
        </div>

        {/* Center/Right: Perspective Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 hidden lg:inline mr-1">
            {role.toUpperCase()} PERSPECTIVE TOOLS:
          </span>

          {currentConfig.actions.map((act, idx) => {
            if (act.href) {
              return (
                <Link
                  key={idx}
                  href={act.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    act.isPrimary 
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md border border-indigo-400/50' 
                      : 'bg-[#060A14] hover:bg-slate-800 text-slate-200 border border-slate-700/80'
                  }`}
                >
                  {act.icon}
                  <span>{act.label}</span>
                </Link>
              );
            }

            return (
              <button
                key={idx}
                onClick={act.onClick}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  act.isPrimary 
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-md' 
                    : 'bg-[#060A14] hover:bg-slate-800 text-slate-200 border border-slate-700/80'
                }`}
              >
                {act.icon}
                <span>{act.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* INTERACTIVE PERSPECTIVE ACTION MODAL */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-slate-800 w-full max-w-md rounded-2xl p-6 relative space-y-4 shadow-2xl animate-in fade-in">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {actionDone ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-lg font-black text-white">Action Executed Successfully!</h3>
                <p className="text-xs text-slate-300">Perspective parameters updated live across platform dashboards.</p>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  {currentConfig.icon}
                  <h3 className="text-base font-black text-white">
                    {activeModal === 'csr_pledge' ? 'Pledge Corporate CSR Support' :
                     activeModal === 'gov_emergency' ? 'Allocate Emergency Civic Fund' :
                     activeModal === 'univ_proposal' ? 'Submit University Research Proposal' : 'Citizen Priority Upvote'}
                  </h3>
                </div>

                {activeModal === 'csr_pledge' && (
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-300">Pledge Amount (₹)</label>
                    <input 
                      type="number"
                      value={pledgeAmount}
                      onChange={(e) => setPledgeAmount(e.target.value)}
                      className="w-full bg-[#182238] border border-slate-700 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-amber-400"
                    />
                    <p className="text-[11px] text-slate-400">Funds will be added to the live Pledged Support Pool for university lab grants.</p>
                  </div>
                )}

                {activeModal === 'gov_emergency' && (
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-300">Emergency Relief Budget (₹)</label>
                    <input 
                      type="number"
                      value={govBudget}
                      onChange={(e) => setGovBudget(e.target.value)}
                      className="w-full bg-[#182238] border border-slate-700 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-blue-400"
                    />
                    <p className="text-[11px] text-slate-400">Instant release to District Nodal Officers for critical civic repairs.</p>
                  </div>
                )}

                {activeModal === 'univ_proposal' && (
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-300">Research Prototype Title</label>
                    <input 
                      type="text"
                      defaultValue="AI-Powered Rural Water Filtration Controller"
                      className="w-full bg-[#182238] border border-slate-700 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-indigo-400"
                    />
                  </div>
                )}

                {activeModal === 'citizen_upvote' && (
                  <div className="space-y-3 text-xs text-slate-300">
                    <p>Upvote <strong>"Unsafe Drinking Water in Dumka"</strong> to increase priority score and trigger fast-track government review.</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Execute {role.toUpperCase()} Action</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
