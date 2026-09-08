'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  Users, 
  UserCheck, 
  Activity, 
  Building2, 
  GraduationCap, 
  Award, 
  Search, 
  CheckCircle2, 
  MessageSquare, 
  Star, 
  Clock, 
  Calendar, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Send,
  X,
  Filter
} from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  companyLogoBg: string;
  experienceYears: number;
  domain: string;
  subDomains: string[];
  status: 'ONLINE NOW' | 'IN SESSION' | 'AVAILABLE FOR CSR';
  rating: number;
  sessionsCount: number;
  mentoredUniversities: string[];
  avatarUrl: string;
  bio: string;
  activeProject?: string;
}

const INITIAL_MENTORS: Mentor[] = [
  {
    id: 'm-1',
    name: 'Dr. Rajesh Kumar',
    role: 'Chief R&D Metallurgist & AI Lead',
    company: 'Tata Steel Foundation',
    companyLogoBg: 'from-amber-600 to-amber-800',
    experienceYears: 18,
    domain: 'Clean Energy & Materials',
    subDomains: ['Solar Microgrids', 'Steel Slag Recycling', 'AI Process Control'],
    status: 'ONLINE NOW',
    rating: 4.9,
    sessionsCount: 42,
    mentoredUniversities: ['BIT Mesra', 'NIT Jamshedpur'],
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    bio: 'Specializing in sustainable steelmaking technologies and AI-assisted microgrid automation for university prototypes.',
    activeProject: 'BIT Mesra Solar Microgrid AI Controller'
  },
  {
    id: 'm-2',
    name: 'Priya Sharma',
    role: 'Principal IoT & Sensor Architect',
    company: 'Coal India R&D',
    companyLogoBg: 'from-blue-600 to-indigo-800',
    experienceYears: 14,
    domain: 'Mining & Industrial IoT',
    subDomains: ['Methane Sensors', 'Subsurface Mesh Networks', 'Telemetry'],
    status: 'IN SESSION',
    rating: 4.95,
    sessionsCount: 38,
    mentoredUniversities: ['IIT (ISM) Dhanbad', 'Ranchi University'],
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    bio: 'Pioneering IoT hazard telemetry in underground mines. Passionate about empowering student hardware innovators.',
    activeProject: 'IIT Dhanbad Methane Leakage IoT Sensors'
  },
  {
    id: 'm-3',
    name: 'Ankit Verma',
    role: 'Senior Renewable Systems Lead',
    company: 'Adani Green CSR',
    companyLogoBg: 'from-emerald-600 to-teal-800',
    experienceYears: 12,
    domain: 'Clean Energy & Materials',
    subDomains: ['Wind Turbine Aero', 'Grid Sync', 'Battery Management'],
    status: 'ONLINE NOW',
    rating: 4.88,
    sessionsCount: 29,
    mentoredUniversities: ['BIT Mesra'],
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    bio: 'Helping university research labs scale renewable energy prototypes into commercial-grade hardware.',
    activeProject: 'BIT Mesra Wind Energy Turbine Prototype'
  },
  {
    id: 'm-4',
    name: 'Smita Das',
    role: 'AI Systems & Computer Vision Principal',
    company: 'Infosys Science Trust',
    companyLogoBg: 'from-indigo-600 to-purple-800',
    experienceYears: 16,
    domain: 'AI & Data Science',
    subDomains: ['Crop Pest Detection', 'Satellite Remote Sensing', 'Edge ML'],
    status: 'AVAILABLE FOR CSR',
    rating: 4.92,
    sessionsCount: 51,
    mentoredUniversities: ['Arka Jain Univ', 'Birsa Agricultural Univ'],
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    bio: 'Guiding academic research in computer vision applications for Jharkhand agricultural challenges.',
    activeProject: 'Arka Jain Smart Crop Pest Detector'
  },
  {
    id: 'm-5',
    name: 'Vikram Singh',
    role: 'Industrial Effluent & Environmental Director',
    company: 'Vedanta CSR Cell',
    companyLogoBg: 'from-amber-700 to-red-800',
    experienceYears: 20,
    domain: 'Water & Environment',
    subDomains: ['Heavy Metal Removal', 'Bio-filtration', 'Zero Liquid Discharge'],
    status: 'ONLINE NOW',
    rating: 4.87,
    sessionsCount: 33,
    mentoredUniversities: ['NIT Jamshedpur'],
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    bio: 'Expert in water purification systems and corporate environmental compliance.',
    activeProject: 'NIT Jamshedpur Industrial Effluent Water Filter'
  },
  {
    id: 'm-6',
    name: 'Meera Sengupta',
    role: 'Drone Tech & Geospatial Specialist',
    company: 'Central Coalfields Ltd',
    companyLogoBg: 'from-cyan-600 to-blue-800',
    experienceYears: 11,
    domain: 'Mining & Industrial IoT',
    subDomains: ['LiDAR Mapping', 'Soil Health Drones', 'Autonomous Flight'],
    status: 'AVAILABLE FOR CSR',
    rating: 4.91,
    sessionsCount: 26,
    mentoredUniversities: ['Birsa Agricultural Univ'],
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    bio: 'Specializing in UAV aerial telemetry for soil analysis and forest canopy monitoring.',
    activeProject: 'Birsa Ag Soil Health Drone Mapper'
  }
];

const RECENT_ACTIVITIES = [
  { text: 'Dr. Rajesh Kumar connected with BIT Mesra Solar Microgrid team', time: '2m ago', icon: <MessageSquare className="w-3.5 h-3.5 text-emerald-400" /> },
  { text: 'Priya Sharma started live code review session with IIT Dhanbad lab', time: '5m ago', icon: <Activity className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> },
  { text: 'Ankit Verma approved 50 Hours hardware testing quota for Wind Energy project', time: '12m ago', icon: <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> },
  { text: 'Smita Das scheduled 1-on-1 AI consultation with Arka Jain University', time: '18m ago', icon: <Calendar className="w-3.5 h-3.5 text-blue-400" /> },
  { text: 'Vikram Singh pledged ₹3.20L technical mentorship budget for NIT Jamshedpur', time: '24m ago', icon: <Award className="w-3.5 h-3.5 text-amber-400" /> },
];

export default function IndustryMentorsHub() {
  const { stats } = useApp();
  const [mentors, setMentors] = useState<Mentor[]>(INITIAL_MENTORS);
  const [selectedDomain, setSelectedDomain] = useState<string>('All Domains');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [liveActivities, setLiveActivities] = useState(RECENT_ACTIVITIES);
  const [activeMentorsCount, setActiveMentorsCount] = useState<number>(109);
  
  // Modal state
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [sessionNote, setSessionNote] = useState<string>('');
  const [requestSent, setRequestSent] = useState<boolean>(false);

  // Live activity ticker simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMentor = mentors[Math.floor(Math.random() * mentors.length)];
      const randomActTypes = [
        `reviewed hardware schematic for ${randomMentor.mentoredUniversities[0]} project`,
        `joined live Q&A session on ${randomMentor.domain}`,
        `approved mentorship request for sustainable tech prototype`,
        `updated CSR mentorship availability to ONLINE`
      ];
      const randomAct = randomActTypes[Math.floor(Math.random() * randomActTypes.length)];

      const newActivity = {
        text: `${randomMentor.name} (${randomMentor.company}) ${randomAct}`,
        time: 'Just now',
        icon: <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
      };

      setLiveActivities((prev) => [newActivity, ...prev.slice(0, 5)]);
      setActiveMentorsCount((prev) => (Math.random() > 0.6 ? prev + 1 : prev));
    }, 4500);

    return () => clearInterval(interval);
  }, [mentors]);

  const domains = [
    'All Domains',
    'Clean Energy & Materials',
    'Mining & Industrial IoT',
    'AI & Data Science',
    'Water & Environment'
  ];

  const filteredMentors = mentors.filter((m) => {
    const matchesDomain = selectedDomain === 'All Domains' || m.domain === selectedDomain;
    const matchesSearch = searchQuery === '' ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subDomains.some(sd => sd.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDomain && matchesSearch;
  });

  const handleOpenModal = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setRequestSent(false);
    setSessionNote('');
    setIsModalOpen(true);
  };

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSent(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 font-sans pb-16">
      
      {/* 1. HEADER SECTION */}
      <div className="bg-[#03060C] border-b border-slate-800 pt-8 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <Link href="/industry" className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1">
                ← Return to Industry Portal
              </Link>
              <span className="text-slate-600">•</span>
              <span className="px-2.5 py-0.5 rounded bg-amber-950/80 border border-amber-800/80 text-amber-400 text-[10px] font-black tracking-widest uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                LIVE MENTOR TELEMETRY
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3 mt-2">
              <Users className="w-8 h-8 text-amber-400" />
              Real-Time Industry Mentors Network
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
              Connect directly with Senior Engineers, Chief Metallurgists, AI System Architects, and Environmental CSR Directors providing live guidance to Jharkhand university research labs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-[#0F172A] border border-slate-800 p-3.5 rounded-2xl flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Active Mentors Live</span>
                <span className="text-xl font-black text-emerald-400">{activeMentorsCount} Senior Engineers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* STATS OVERVIEW CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0F172A] border border-slate-800 p-4 rounded-2xl">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Live Online Mentors</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              {mentors.filter(m => m.status === 'ONLINE NOW').length * 4 + 18} Online
            </div>
            <span className="text-[10px] text-emerald-400/80 font-medium">Available for instant session</span>
          </div>

          <div className="bg-[#0F172A] border border-slate-800 p-4 rounded-2xl">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sessions Today</span>
            <div className="text-2xl font-black text-amber-400 mt-1">34 Sessions</div>
            <span className="text-[10px] text-amber-400/80 font-medium">98.4% Satisfaction score</span>
          </div>

          <div className="bg-[#0F172A] border border-slate-800 p-4 rounded-2xl">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Supported Universities</span>
            <div className="text-2xl font-black text-indigo-400 mt-1">12 Institutions</div>
            <span className="text-[10px] text-indigo-400/80 font-medium">BIT, NIT, ISM & State Univs</span>
          </div>

          <div className="bg-[#0F172A] border border-slate-800 p-4 rounded-2xl">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avg Response Time</span>
            <div className="text-2xl font-black text-blue-400 mt-1">&lt; 14 Mins</div>
            <span className="text-[10px] text-blue-400/80 font-medium">Real-time WebSocket alerts</span>
          </div>
        </div>

        {/* CONTROLS & SEARCH */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0F172A] border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {domains.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDomain(d)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedDomain === d
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                    : 'bg-[#182238] text-slate-300 hover:bg-slate-800 border border-slate-700'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search mentor, company, topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#182238] border border-slate-700 text-xs text-white pl-9 pr-3 py-2.5 rounded-xl focus:outline-none focus:border-amber-400 w-full"
            />
          </div>
        </div>

        {/* MAIN LAYOUT: MENTORS GRID + LIVE ACTIVITY TICKER */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT 2 COLUMNS: MENTOR CARDS */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMentors.map((mentor) => (
              <div 
                key={mentor.id}
                className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-4 group shadow-xl"
              >
                <div className="space-y-4">
                  {/* Top Badge Row */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black border ${
                      mentor.status === 'ONLINE NOW' ? 'bg-emerald-950/90 text-emerald-400 border-emerald-800' :
                      mentor.status === 'IN SESSION' ? 'bg-amber-950/90 text-amber-400 border-amber-800' :
                      'bg-indigo-950/90 text-indigo-400 border-indigo-800'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        mentor.status === 'ONLINE NOW' ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'
                      }`}></span>
                      {mentor.status}
                    </span>

                    <span className="text-xs font-black text-amber-400 flex items-center gap-1 bg-amber-950/60 border border-amber-800/80 px-2 py-0.5 rounded-md">
                      <Star className="w-3 h-3 fill-amber-400" /> {mentor.rating} ({mentor.sessionsCount})
                    </span>
                  </div>

                  {/* Profile Header */}
                  <div className="flex items-start gap-3.5">
                    <img 
                      src={mentor.avatarUrl} 
                      alt={mentor.name}
                      className="w-13 h-13 rounded-2xl object-cover border-2 border-slate-700 shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <h3 className="text-base font-black text-white group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                        {mentor.name}
                        <ShieldCheck className="w-4 h-4 text-emerald-400" title="Verified Industry Mentor" />
                      </h3>
                      <p className="text-xs font-bold text-amber-400 mt-0.5">{mentor.role}</p>
                      <div className="text-[11px] text-slate-400 font-semibold flex items-center gap-1 mt-1">
                        <Building2 className="w-3 h-3 text-slate-500" /> {mentor.company}
                        <span className="text-slate-600">•</span>
                        <span>{mentor.experienceYears} yrs exp</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {mentor.bio}
                  </p>

                  {/* Sub-domain Expertise Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {mentor.subDomains.map((sd, idx) => (
                      <span key={idx} className="bg-[#182238] border border-slate-700 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {sd}
                      </span>
                    ))}
                  </div>

                  {/* Active Project Association */}
                  {mentor.activeProject && (
                    <div className="bg-[#151F33] p-2.5 rounded-xl border border-slate-800/80 text-[11px]">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Mentoring Project:</span>
                      <span className="font-bold text-indigo-300">{mentor.activeProject}</span>
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                <button
                  onClick={() => handleOpenModal(mentor)}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md mt-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Request 1-on-1 Mentorship</span>
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: LIVE MENTOR ACTIVITY FEED */}
          <div className="space-y-6">
            
            <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-xs font-black text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                  Live Mentorship Feed
                </h3>
                <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-bold">
                  REALTIME
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {liveActivities.map((act, idx) => (
                  <div key={idx} className="bg-[#162035] p-3 rounded-xl border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="flex items-center gap-1 font-bold text-emerald-400">
                        {act.icon} Live Update
                      </span>
                      <span>{act.time}</span>
                    </div>
                    <p className="text-slate-200 text-xs leading-snug">
                      {act.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* BECOME AN INDUSTRY MENTOR CARD */}
            <div className="bg-gradient-to-br from-indigo-950/80 to-slate-900 border border-indigo-800/80 rounded-2xl p-5 shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-900/80 border border-indigo-700 flex items-center justify-center text-indigo-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-white">Are you a Senior Engineer or CSR Specialist?</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Join 109+ industry veterans mentoring university research projects across Jharkhand. Offer technical guidance, review hardware prototypes, or direct CSR funds.
              </p>
              <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs transition-colors">
                Apply as Industry Mentor →
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* REQUEST MENTORSHIP MODAL */}
      {isModalOpen && selectedMentor && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-slate-800 w-full max-w-lg rounded-2xl p-6 relative space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {requestSent ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-950 border border-emerald-800 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-white">Mentorship Request Sent!</h3>
                <p className="text-xs text-slate-300 max-w-xs mx-auto">
                  {selectedMentor.name} has received your request via JanSetu WebSocket alerts and will respond within 15 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendRequest} className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <img src={selectedMentor.avatarUrl} alt="" className="w-12 h-12 rounded-xl object-cover border border-amber-500" />
                  <div>
                    <h3 className="text-base font-black text-white">{selectedMentor.name}</h3>
                    <p className="text-xs text-amber-400 font-semibold">{selectedMentor.role} • {selectedMentor.company}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Select Your Project</label>
                  <select className="w-full bg-[#182238] border border-slate-700 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-amber-400">
                    <option>BIT Mesra Solar Microgrid AI Controller</option>
                    <option>IIT Dhanbad Methane Leakage IoT Sensors</option>
                    <option>NIT Jamshedpur Industrial Effluent Water Filter</option>
                    <option>Other / University Prototype</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Mentorship Topic / Note</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Briefly describe what technical guidance or CSR hardware support you need..."
                    value={sessionNote}
                    onChange={(e) => setSessionNote(e.target.value)}
                    className="w-full bg-[#182238] border border-slate-700 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Request to {selectedMentor.name}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
