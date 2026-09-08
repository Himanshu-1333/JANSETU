'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ChallengeCard } from '@/components/challenges/ChallengeCard';
import { ChallengeFilters } from '@/components/challenges/ChallengeFilters';
import { Sparkles, SlidersHorizontal, Layers, GraduationCap, Briefcase } from 'lucide-react';

function ChallengeMarketplaceContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams?.get('search') || '';

  const { challenges, role } = useApp();

  const [localChallenges, setLocalChallenges] = useState<typeof challenges>(challenges);
  const [isLiveStreamActive, setIsLiveStreamActive] = useState<boolean>(true);
  const [lastLiveEvent, setLastLiveEvent] = useState<string>('⚡ Live Citizen Ticker active. Listening for new reports across Jharkhand...');

  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All Districts');
  const [selectedStatus, setSelectedStatus] = useState<string>('All Statuses');

  // Sync initial challenges
  useEffect(() => {
    if (challenges.length > 0) {
      setLocalChallenges(challenges);
    }
  }, [challenges]);

  useEffect(() => {
    if (initialSearch) {
      setSearchQuery(initialSearch);
    }
  }, [initialSearch]);

  // LIVE TICKER SIMULATION: Auto-add new citizen challenges & auto-complete existing ones
  useEffect(() => {
    if (!isLiveStreamActive) return;

    const interval = setInterval(() => {
      const isAddEvent = Math.random() > 0.35; // 65% chance to add new report, 35% to resolve existing

      if (isAddEvent) {
        // AUTO-ADD NEW CITIZEN CHALLENGE
        const newChallengePool = [
          {
            title: 'Solar Streetlight Array Failure',
            description: 'Over 35 community solar lights malfunctioning along NH-33 causing severe night transit hazards for daily commuters.',
            category: 'IoT',
            district: 'Hazaribagh',
            location: 'NH-33 Junction, Hazaribagh',
            priority_score: 93,
            severity: 'High' as const,
            affected_population: 3400,
            similar_report_count: 14,
            required_skills: ['IoT Sensors', 'Solar Microgrid', 'Hardware'],
            image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=800',
            university_matches: [{ name: 'BIT Jharkhand', match: 94 }],
            industry_matches: [{ name: 'Tata Power Renewable', match: 91 }]
          },
          {
            title: 'Coal Mining Particulate Dust Spikes',
            description: 'Severe PM10 & PM2.5 air pollution spikes near residential colonies adjacent to open-cast mining pits.',
            category: 'Environmental',
            district: 'Bokaro',
            location: 'Phusro Colliery, Bokaro',
            priority_score: 95,
            severity: 'Critical' as const,
            affected_population: 6800,
            similar_report_count: 31,
            required_skills: ['Environmental Sensing', 'Data Science', 'Air Quality'],
            image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&q=80&w=800',
            university_matches: [{ name: 'IIT (ISM) Dhanbad', match: 96 }],
            industry_matches: [{ name: 'Coal India R&D', match: 94 }]
          },
          {
            title: 'Primary Health Center Telemedicine Outage',
            description: 'Unstable rural broadband connection preventing remote doctor consultation and digital medicine inventory sync.',
            category: 'Data Science',
            district: 'Deoghar',
            location: 'Sarath PHC, Deoghar',
            priority_score: 88,
            severity: 'High' as const,
            affected_population: 2900,
            similar_report_count: 11,
            required_skills: ['Web', 'Telemetry', 'Networks'],
            image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
            university_matches: [{ name: 'Ranchi University', match: 91 }],
            industry_matches: [{ name: 'Infosys Foundation', match: 89 }]
          },
          {
            title: 'Flash Flood Early Sensor Malfunction',
            description: 'Submerged river water level sensor failing to transmit automated SMS emergency warnings during heavy monsoon rain.',
            category: 'IoT',
            district: 'East Singhbhum',
            location: 'Subarnarekha River Basin',
            priority_score: 97,
            severity: 'Critical' as const,
            affected_population: 12500,
            similar_report_count: 42,
            required_skills: ['IoT', 'Hydrology', 'Wireless Mesh'],
            image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=800',
            university_matches: [{ name: 'NIT Jamshedpur', match: 95 }],
            industry_matches: [{ name: 'Tata Steel CSR', match: 93 }]
          }
        ];

        const template = newChallengePool[Math.floor(Math.random() * newChallengePool.length)];
        const newId = `ch-auto-${Date.now()}`;

        const createdItem = {
          id: newId,
          ...template,
          status: 'Active' as const,
          created_at: new Date().toISOString(),
          created_by: 'Citizen Reporter (Verified)',
          isNew: true
        };

        setLocalChallenges((prev) => [createdItem, ...prev]);
        setLastLiveEvent(`⚡ NEW REPORT: "${createdItem.title}" in ${createdItem.district} (Just Added!)`);

      } else {
        // AUTO-COMPLETE / AUTO-RESOLVE EXISTING CHALLENGE
        setLocalChallenges((prev) => {
          const activeIndex = prev.findIndex((c) => c.status === 'Active' && !c.justResolved);
          if (activeIndex === -1) return prev;

          const updatedList = [...prev];
          const target = { ...updatedList[activeIndex] };
          target.status = 'Implemented';
          target.justResolved = true;
          target.isNew = false;
          updatedList[activeIndex] = target;

          setLastLiveEvent(`🎉 JUST RESOLVED: "${target.title}" in ${target.district} (Prototype Successfully Deployed!)`);
          return updatedList;
        });
      }
    }, 5500);

    return () => clearInterval(interval);
  }, [isLiveStreamActive]);

  const filteredChallenges = localChallenges.filter((c) => {
    const matchesSearch =
      searchQuery === '' ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.required_skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All Categories' || c.category === selectedCategory;
    const matchesDistrict = selectedDistrict === 'All Districts' || c.district === selectedDistrict;
    const matchesStatus = selectedStatus === 'All Statuses' || c.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesDistrict && matchesStatus;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedDistrict('All Districts');
    setSelectedStatus('All Statuses');
  };

  const isRolePersonalized = role === 'university' || role === 'industry';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-extrabold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Civic Innovation Marketplace</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Find a Problem Worth Solving.</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Explore verified challenges across Jharkhand and find where your expertise can create impact.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLiveStreamActive(!isLiveStreamActive)}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 border transition-all ${
              isLiveStreamActive
                ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                : 'bg-amber-950 text-amber-300 border-amber-800'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isLiveStreamActive ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></span>
            <span>{isLiveStreamActive ? 'LIVE STREAM (5.5s)' : 'PAUSED'}</span>
          </button>

          <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl border border-slate-800 flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Active Opportunities</span>
              <span className="text-lg font-black text-indigo-400">{filteredChallenges.length} Challenges</span>
            </div>
          </div>
        </div>
      </div>

      {/* LIVE EVENT BANNER */}
      <div className="bg-[#0B1020] border border-slate-800 p-3.5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-200 shadow-md">
        <div className="flex items-center gap-2 font-mono">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
          <span className="font-extrabold text-emerald-400 uppercase tracking-widest text-[10px]">LIVE FEED:</span>
          <span className="text-slate-200 font-semibold truncate max-w-2xl">{lastLiveEvent}</span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono shrink-0">Updated Real-Time • WebSocket Live</span>
      </div>

      {/* Role Personalized Highlight Banner */}
      {isRolePersonalized && (
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-5 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shrink-0">
              {role === 'university' ? <GraduationCap className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-300 block">
                {role === 'university' ? 'Recommended for BIT Jharkhand' : 'CSR Opportunities for Industry'}
              </span>
              <p className="text-xs text-slate-300">
                {role === 'university'
                  ? 'Showing challenges matching your university lab expertise (IoT, Environmental Sensing & Data Science)'
                  : 'Showing high-impact projects seeking prototype funding (₹3L+), hardware sensors, and mentors'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Minimal Filter Component */}
      <ChallengeFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        resetFilters={resetFilters}
      />

      {/* Opportunity Cards Grid */}
      {filteredChallenges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
          <SlidersHorizontal className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No challenges match your filter criteria</h3>
          <p className="text-xs text-slate-500">Try adjusting your search term or clearing district and category filters.</p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function ChallengesPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500 text-xs font-bold">
        Loading Marketplace...
      </div>
    }>
      <ChallengeMarketplaceContent />
    </Suspense>
  );
}
