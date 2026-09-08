'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  TrendingUp, 
  DollarSign, 
  Activity, 
  Zap, 
  Clock, 
  ArrowUpRight, 
  Search, 
  Play, 
  Pause, 
  ShieldCheck, 
  Building2, 
  GraduationCap, 
  Flame,
  Award
} from 'lucide-react';

interface SupportTransaction {
  id: string;
  time: string;
  corporate: string;
  university: string;
  project: string;
  type: 'CSR Funding' | 'Lab Hardware' | 'Tech Mentorship' | 'Pilot Trial';
  amount: number;
  amountFormatted: string;
  status: 'EXECUTED' | 'MATCHED' | 'CONFIRMED';
  trend: 'up' | 'high';
  isNew?: boolean;
}

const INITIAL_TRANSACTIONS: SupportTransaction[] = [
  { id: 'tx-101', time: '23:36:42.110', corporate: 'Tata Steel Foundation', university: 'BIT Mesra', project: 'Solar Microgrid AI Controller', type: 'CSR Funding', amount: 500000, amountFormatted: '₹5,00,000', status: 'EXECUTED', trend: 'up' },
  { id: 'tx-102', time: '23:36:39.845', corporate: 'Coal India R&D', university: 'IIT (ISM) Dhanbad', project: 'Methane Leakage IoT Sensors', type: 'Lab Hardware', amount: 850000, amountFormatted: '₹8,50,000', status: 'MATCHED', trend: 'high' },
  { id: 'tx-103', time: '23:36:35.402', corporate: 'Vedanta CSR Cell', university: 'NIT Jamshedpur', project: 'Industrial Effluent Water Filter', type: 'CSR Funding', amount: 320000, amountFormatted: '₹3,20,000', status: 'EXECUTED', trend: 'up' },
  { id: 'tx-104', time: '23:36:30.915', corporate: 'Jindal Steel & Power', university: 'Ranchi University', project: 'Rural Cold Storage Unit', type: 'Tech Mentorship', amount: 150000, amountFormatted: '₹1,50,000', status: 'CONFIRMED', trend: 'up' },
  { id: 'tx-105', time: '23:36:26.554', corporate: 'Adani Renewables', university: 'BIT Mesra', project: 'Wind Energy Turbine Prototype', type: 'Pilot Trial', amount: 1200000, amountFormatted: '₹12,00,000', status: 'EXECUTED', trend: 'high' },
  { id: 'tx-106', time: '23:36:22.012', corporate: 'Infosys Science Trust', university: 'Arka Jain Univ', project: 'Smart Crop Pest Detector', type: 'CSR Funding', amount: 450000, amountFormatted: '₹4,50,000', status: 'MATCHED', trend: 'up' },
  { id: 'tx-107', time: '23:36:18.490', corporate: 'Central Coalfields Ltd', university: 'Birsa Agricultural Univ', project: 'Soil Health Drone Mapper', type: 'Lab Hardware', amount: 620000, amountFormatted: '₹6,20,000', status: 'EXECUTED', trend: 'up' },
];

const CORPORATES_POOL = [
  'Tata Steel CSR', 'Coal India Ltd', 'Vedanta Resources', 'Jindal Power', 'Adani Green', 
  'Infosys Foundation', 'Wipro Cares', 'Reliance CSR', 'Hindalco Industries', 'L&T Technology'
];

const UNIVERSITIES_POOL = [
  'BIT Mesra', 'NIT Jamshedpur', 'IIT (ISM) Dhanbad', 'Ranchi University', 'Birsa Agricultural Univ', 'Arka Jain Univ'
];

const PROJECTS_POOL = [
  'Hydroponic Solar Greenhouse', 'AI Disaster Warning App', 'Biomedical Waste Recycler', 
  'Low-Cost EV Battery Swapper', 'Tribal Handicrafts E-Commerce AI', 'Groundwater Recharge Well Monitor'
];

const TYPES_POOL: ('CSR Funding' | 'Lab Hardware' | 'Tech Mentorship' | 'Pilot Trial')[] = [
  'CSR Funding', 'Lab Hardware', 'Tech Mentorship', 'Pilot Trial'
];

export default function LiveSupportTerminal() {
  const { stats } = useApp();
  const [transactions, setTransactions] = useState<SupportTransaction[]>(INITIAL_TRANSACTIONS);
  const [isLiveActive, setIsLiveActive] = useState<boolean>(true);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [liveVolume, setLiveVolume] = useState<number>(4880000);
  const [ticksPerMin, setTicksPerMin] = useState<number>(42);
  const [chartData, setChartData] = useState<number[]>([32, 35, 34, 38, 41, 40, 44, 46, 48.8]);

  // Live simulation ticker
  useEffect(() => {
    if (!isLiveActive) return;

    const interval = setInterval(() => {
      const randomCorp = CORPORATES_POOL[Math.floor(Math.random() * CORPORATES_POOL.length)];
      const randomUniv = UNIVERSITIES_POOL[Math.floor(Math.random() * UNIVERSITIES_POOL.length)];
      const randomProj = PROJECTS_POOL[Math.floor(Math.random() * PROJECTS_POOL.length)];
      const randomType = TYPES_POOL[Math.floor(Math.random() * TYPES_POOL.length)];
      const randAmt = Math.floor(Math.random() * 45 + 10) * 10000; // ₹1,00,000 to ₹5,50,000

      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;

      const newTx: SupportTransaction = {
        id: `tx-${Date.now()}`,
        time: timeStr,
        corporate: randomCorp,
        university: randomUniv,
        project: randomProj,
        type: randomType,
        amount: randAmt,
        amountFormatted: `₹${(randAmt / 100000).toFixed(2)} Lakh`,
        status: Math.random() > 0.3 ? 'EXECUTED' : 'MATCHED',
        trend: randAmt > 350000 ? 'high' : 'up',
        isNew: true
      };

      setTransactions((prev) => [newTx, ...prev.slice(0, 19)]);
      setLiveVolume((prev) => prev + randAmt);
      setTicksPerMin((prev) => prev + (Math.random() > 0.5 ? 1 : 0));
      
      setChartData((prev) => {
        const lastVal = prev[prev.length - 1] || 48.8;
        const nextVal = Number((lastVal + randAmt / 1000000).toFixed(2));
        return [...prev.slice(1), nextVal];
      });
    }, 1600);

    return () => clearInterval(interval);
  }, [isLiveActive]);

  const filteredTx = transactions.filter((tx) => {
    const matchesType = selectedType === 'All' || tx.type === selectedType;
    const matchesSearch = searchQuery === '' || 
      tx.corporate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.project.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 font-sans pb-16">
      {/* 1. STOCK MARKET TOP TICKER MARQUEE */}
      <div className="bg-[#03060C] border-b border-slate-800 text-xs font-mono py-2 px-4 overflow-hidden relative flex items-center shadow-md">
        <div className="flex items-center gap-2 pr-4 border-r border-slate-800 shrink-0 text-emerald-400 font-bold z-10 bg-[#03060C]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>MARKET TICKER</span>
        </div>
        <div className="flex items-center gap-8 whitespace-nowrap overflow-x-auto no-scrollbar">
          <span className="flex items-center gap-1.5 text-slate-300">
            <strong className="text-white">TATA-CSR/BIT:</strong> ₹5.00L <span className="text-emerald-400 font-bold flex items-center"><ArrowUpRight className="w-3 h-3" />+4.2%</span>
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <strong className="text-white">COAL-IND/ISM:</strong> ₹8.50L <span className="text-emerald-400 font-bold flex items-center"><ArrowUpRight className="w-3 h-3" />+8.1%</span>
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <strong className="text-white">VEDANTA/NIT:</strong> ₹3.20L <span className="text-emerald-400 font-bold flex items-center"><ArrowUpRight className="w-3 h-3" />+2.5%</span>
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <strong className="text-white">ADANI-GRN/BIT:</strong> ₹12.00L <span className="text-emerald-400 font-bold flex items-center"><ArrowUpRight className="w-3 h-3" />+14.8%</span>
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <strong className="text-white">JINDAL/RNC:</strong> ₹1.50L <span className="text-emerald-400 font-bold flex items-center"><ArrowUpRight className="w-3 h-3" />+1.1%</span>
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <strong className="text-white">INFOSYS/ARKA:</strong> ₹4.50L <span className="text-emerald-400 font-bold flex items-center"><ArrowUpRight className="w-3 h-3" />+6.3%</span>
          </span>
        </div>
      </div>

      {/* 2. HEADER TERMINAL CONTROL BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-3">
              <Link href="/industry" className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1">
                ← Return to Industry Portal
              </Link>
              <span className="text-slate-600">•</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 text-[10px] font-black tracking-widest uppercase">
                LIVE STREAM TERMINAL
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3 mt-2">
              <Activity className="w-7 h-7 text-emerald-400 animate-pulse" />
              Real-Time Support & Grant Stream
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Live corporate funding pledges, CSR grant allocations, equipment support, and mentorship matches updated in milliseconds.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLiveActive(!isLiveActive)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                isLiveActive 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-500/30' 
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/50 hover:bg-amber-500/30'
              }`}
            >
              {isLiveActive ? (
                <>
                  <Pause className="w-4 h-4 text-emerald-400" />
                  <span>STREAMING (1.6s)</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-amber-400" />
                  <span>PAUSED</span>
                </>
              )}
            </button>

            <div className="bg-[#121B2D] border border-slate-800 px-3 py-2 rounded-xl flex items-center gap-2 text-xs text-slate-300 font-mono">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* 3. METRICS CARDS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-[#0F172A] border border-slate-800 p-4 rounded-2xl relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase tracking-wider">
              <span>Total Support Pool</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-2 tracking-tight">
              ₹{(liveVolume / 100000).toFixed(2)} Lakh
            </div>
            <div className="text-[10px] text-emerald-400/80 font-semibold mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +₹1.25L added in last 5 mins
            </div>
          </div>

          <div className="bg-[#0F172A] border border-slate-800 p-4 rounded-2xl relative overflow-hidden group hover:border-amber-500/40 transition-all">
            <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase tracking-wider">
              <span>Avg Prototype Support</span>
              <TrendingUp className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-400 mt-2 tracking-tight">
              {stats.avgPrototypeGrant || '₹3,25,000'}
            </div>
            <div className="text-[10px] text-amber-400/80 font-semibold mt-1">
              High tier: ₹12,00,000 max grant
            </div>
          </div>

          <div className="bg-[#0F172A] border border-slate-800 p-4 rounded-2xl relative overflow-hidden group hover:border-indigo-500/40 transition-all">
            <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase tracking-wider">
              <span>Stream Velocity</span>
              <Zap className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-indigo-400 mt-2 tracking-tight">
              {ticksPerMin} Pledges/min
            </div>
            <div className="text-[10px] text-indigo-400/80 font-semibold mt-1">
              Latency: 12ms WebSocket stream
            </div>
          </div>

          <div className="bg-[#0F172A] border border-slate-800 p-4 rounded-2xl relative overflow-hidden group hover:border-blue-500/40 transition-all">
            <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase tracking-wider">
              <span>Match Execution Rate</span>
              <ShieldCheck className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-blue-400 mt-2 tracking-tight">
              96.4% AI Match
            </div>
            <div className="text-[10px] text-blue-400/80 font-semibold mt-1">
              Automated CSR validation
            </div>
          </div>
        </div>

        {/* 4. MAIN TERMINAL GRID (GRAPH + LIVE ORDERBOOK FEED) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          
          {/* LEFT 2 COLUMNS: CHART & LIVE STREAM FEED */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* REAL-TIME MARKET CHART */}
            <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4 mb-4">
                <div>
                  <h3 className="text-sm font-black text-slate-200 uppercase tracking-wider flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    Funding Velocity Stream Visualizer
                  </h3>
                  <span className="text-[11px] text-slate-400">Live support capital accumulation dynamic trend (Lakhs)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-lg">
                    Latest Point: ₹{chartData[chartData.length - 1]}L
                  </span>
                </div>
              </div>

              {/* Dynamic SVG Area Graph */}
              <div className="h-44 w-full relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  <line x1="0" y1="30" x2="500" y2="30" stroke="#1E293B" strokeDasharray="4 4" />
                  <line x1="0" y1="75" x2="500" y2="75" stroke="#1E293B" strokeDasharray="4 4" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke="#1E293B" strokeDasharray="4 4" />

                  {/* Area fill */}
                  <polygon
                    fill="url(#chartGradient)"
                    points={`0,150 ${chartData.map((val, idx) => `${(idx * (500 / (chartData.length - 1)))},${140 - ((val - 30) * 4)}`).join(' ')} 500,150`}
                  />

                  {/* Polyline */}
                  <polyline
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                    points={chartData.map((val, idx) => `${(idx * (500 / (chartData.length - 1)))},${140 - ((val - 30) * 4)}`).join(' ')}
                  />

                  {/* Dynamic Glowing Latest Point */}
                  {chartData.length > 0 && (
                    <circle
                      cx={500}
                      cy={140 - ((chartData[chartData.length - 1] - 30) * 4)}
                      r="6"
                      className="fill-emerald-400 animate-ping"
                    />
                  )}
                </svg>
              </div>
            </div>

            {/* LIVE STREAM TABLE (ORDERBOOK FEED) */}
            <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              
              {/* Filter controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                  {['All', 'CSR Funding', 'Lab Hardware', 'Tech Mentorship', 'Pilot Trial'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedType(t)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                        selectedType === t
                          ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                          : 'bg-[#182238] text-slate-300 hover:bg-slate-800 border border-slate-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search company, project..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#182238] border border-slate-700 text-xs text-white pl-8 pr-3 py-1.5 rounded-xl focus:outline-none focus:border-amber-400 w-full sm:w-48"
                  />
                </div>
              </div>

              {/* Transactions Stream List */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                      <th className="py-2.5 px-3">Time</th>
                      <th className="py-2.5 px-3">Corporate Supporter</th>
                      <th className="py-2.5 px-3">Target Project</th>
                      <th className="py-2.5 px-3">Support Type</th>
                      <th className="py-2.5 px-3 text-right">Value (₹)</th>
                      <th className="py-2.5 px-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                    {filteredTx.map((tx) => (
                      <tr 
                        key={tx.id} 
                        className={`transition-all duration-500 hover:bg-slate-800/40 ${
                          tx.isNew ? 'bg-emerald-950/40 text-emerald-200' : 'text-slate-300'
                        }`}
                      >
                        <td className="py-3 px-3 text-[11px] text-slate-400 font-mono shrink-0">
                          {tx.time}
                        </td>
                        <td className="py-3 px-3 font-bold text-white flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{tx.corporate}</span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-semibold text-slate-200">{tx.project}</div>
                          <div className="text-[10px] text-indigo-400 flex items-center gap-1">
                            <GraduationCap className="w-3 h-3" /> {tx.university}
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${
                            tx.type === 'CSR Funding' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' :
                            tx.type === 'Lab Hardware' ? 'bg-indigo-950 text-indigo-400 border-indigo-800' :
                            tx.type === 'Tech Mentorship' ? 'bg-amber-950 text-amber-400 border-amber-800' :
                            'bg-blue-950 text-blue-400 border-blue-800'
                          }`}>
                            {tx.type}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right font-black text-emerald-400 text-sm">
                          {tx.amountFormatted}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold border ${
                            tx.status === 'EXECUTED' 
                              ? 'bg-emerald-900/60 text-emerald-300 border-emerald-700' 
                              : 'bg-indigo-900/60 text-indigo-300 border-indigo-700'
                          }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: CORPORATE ORDERBOOK & TOP LEADERBOARD */}
          <div className="space-y-6">
            
            {/* CORPORATE ORDERBOOK (LIVE BIDS) */}
            <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-xs font-black text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  Active Corporate Support Offers
                </h3>
                <span className="text-[10px] bg-amber-950 text-amber-400 border border-amber-800 px-2 py-0.5 rounded font-bold">
                  DEPTH: 14 BIDS
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {[
                  { company: 'Tata Steel CSR', pledge: '₹15,00,000 Pool', match: '98% Match', status: 'Ready to Grant' },
                  { company: 'Coal India Tech', pledge: '₹10,00,000 Pool', match: '94% Match', status: 'In Evaluation' },
                  { company: 'Vedanta CSR', pledge: '₹8,00,000 Pool', match: '91% Match', status: 'Pledged' },
                  { company: 'Adani Clean Tech', pledge: '₹20,00,000 Pool', match: '96% Match', status: 'Ready to Grant' },
                  { company: 'Jindal Innovation', pledge: '₹5,00,000 Pool', match: '89% Match', status: 'Pledged' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#162035] p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-white text-xs">{item.company}</div>
                      <div className="text-[10px] text-amber-400 font-semibold">{item.pledge}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded block font-bold">
                        {item.match}
                      </span>
                      <span className="text-[9px] text-slate-400 block mt-0.5">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/industry" className="w-full block text-center bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-2.5 rounded-xl text-xs transition-colors">
                Pledge Corporate Support Now →
              </Link>
            </div>

            {/* TOP RECIPIENT UNIVERSITIES */}
            <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <h3 className="text-xs font-black text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                <Award className="w-4 h-4 text-indigo-400" />
                Top Supported Academic Institutions
              </h3>

              <div className="space-y-3">
                {[
                  { rank: '#1', name: 'BIT Mesra', amount: '₹1.42 Crore', projects: '18 Projects' },
                  { rank: '#2', name: 'IIT (ISM) Dhanbad', amount: '₹1.15 Crore', projects: '14 Projects' },
                  { rank: '#3', name: 'NIT Jamshedpur', amount: '₹98.50 Lakh', projects: '12 Projects' },
                  { rank: '#4', name: 'Birsa Agricultural Univ', amount: '₹64.20 Lakh', projects: '9 Projects' },
                ].map((uni, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/40 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-amber-400">{uni.rank}</span>
                      <div>
                        <div className="font-bold text-slate-200">{uni.name}</div>
                        <div className="text-[10px] text-slate-400">{uni.projects}</div>
                      </div>
                    </div>
                    <div className="font-black text-emerald-400 text-right">{uni.amount}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
