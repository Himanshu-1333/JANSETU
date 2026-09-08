'use client';

import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';

interface ChallengeFiltersProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (d: string) => void;
  selectedStatus: string;
  setSelectedStatus: (s: string) => void;
  resetFilters: () => void;
}

export const ChallengeFilters: React.FC<ChallengeFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedDistrict,
  setSelectedDistrict,
  selectedStatus,
  setSelectedStatus,
  resetFilters,
}) => {
  const categories = ['All Categories', 'Water & Sanitation', 'Urban Infrastructure', 'Education & Skill', 'Healthcare', 'Public Safety'];
  const districts = ['All Districts', 'Dumka', 'Ranchi', 'Giridih', 'Bokaro', 'Dhanbad'];
  const statuses = ['All Statuses', 'Reported', 'Verified', 'Matched', 'Active', 'Implemented'];

  return (
    <div className="bg-[#131B2E]/90 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search challenges by keyword, issue, or skill (e.g., IoT, Dumka, Water)..."
          className="w-full pl-11 pr-4 py-3 bg-[#0B1020] border border-slate-800 rounded-xl text-sm font-medium text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        />
      </div>

      {/* Filter Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-[#0B1020] border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="bg-[#0B1020] text-white">{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">District</label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full bg-[#0B1020] border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            {districts.map((d) => (
              <option key={d} value={d} className="bg-[#0B1020] text-white">{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-[#0B1020] border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            {statuses.map((s) => (
              <option key={s} value={s} className="bg-[#0B1020] text-white">{s}</option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={resetFilters}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-extrabold text-slate-300 bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors border border-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};
