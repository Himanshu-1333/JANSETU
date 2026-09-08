'use client';

import React, { useState } from 'react';
import { Challenge } from '@/lib/types';
import { useApp } from '@/context/AppContext';
import { X, GraduationCap, Check } from 'lucide-react';

interface TeamBuilderModalProps {
  challenge: Challenge;
  isOpen: boolean;
  onClose: () => void;
}

export const TeamBuilderModal: React.FC<TeamBuilderModalProps> = ({
  challenge,
  isOpen,
  onClose,
}) => {
  const { acceptChallenge } = useApp();

  const [universityName, setUniversityName] = useState<string>('BIT Jharkhand');
  const [lead, setLead] = useState<string>('Prof. S. K. Roy (Project Director)');
  const [facultyMentor, setFacultyMentor] = useState<string>('Dr. Ananya Mishra (Dept. of Environmental Eng)');
  const [student1, setStudent1] = useState<string>('Aarav Sharma (IoT & Embedded Sensors)');
  const [student2, setStudent2] = useState<string>('Meera Nair (Data Science & Analytics)');
  const [student3, setStudent3] = useState<string>('Rohan Gupta (Fullstack & Cloud Web)');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const members = [student1, student2, student3].filter(Boolean);
    acceptChallenge(challenge.id, universityName, {
      lead,
      mentor: facultyMentor,
      members,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#131B2E] rounded-3xl border border-slate-800 shadow-2xl max-w-xl w-full overflow-hidden space-y-0 text-white">
        <div className="bg-slate-900 p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">University Team Builder</h3>
              <p className="text-xs text-indigo-400 font-medium">Assign faculty mentor & student researchers</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-indigo-950/70 p-4 rounded-2xl border border-indigo-800/80 text-xs text-indigo-200 space-y-1">
            <span className="font-extrabold block text-white">Selected Challenge: {challenge.title}</span>
            <p className="text-indigo-300">Required Expertise: {challenge.required_skills.join(' • ')}</p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">University Institution</label>
            <select
              value={universityName}
              onChange={(e) => setUniversityName(e.target.value)}
              className="w-full bg-[#0B1020] border border-slate-800 rounded-xl p-3 text-xs font-extrabold text-white outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="BIT Jharkhand">BIT Jharkhand (Ranchi / Dumka)</option>
              <option value="Ranchi University">Ranchi University</option>
              <option value="IIT (ISM) Dhanbad">IIT (ISM) Dhanbad</option>
              <option value="Vinoba Bhave University">Vinoba Bhave University</option>
              <option value="BIT Sindri">BIT Sindri</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Project Lead</label>
              <input
                type="text"
                value={lead}
                onChange={(e) => setLead(e.target.value)}
                required
                className="w-full bg-[#0B1020] border border-slate-800 rounded-xl p-3 text-xs font-semibold text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Faculty Mentor</label>
              <input
                type="text"
                value={facultyMentor}
                onChange={(e) => setFacultyMentor(e.target.value)}
                required
                className="w-full bg-[#0B1020] border border-slate-800 rounded-xl p-3 text-xs font-semibold text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Student Team Members (by Skill)</label>
            <div className="space-y-2">
              <input
                type="text"
                value={student1}
                onChange={(e) => setStudent1(e.target.value)}
                placeholder="Student 1 (e.g., IoT Lead)"
                className="w-full bg-[#0B1020] border border-slate-800 rounded-xl p-2.5 text-xs font-medium text-white outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                value={student2}
                onChange={(e) => setStudent2(e.target.value)}
                placeholder="Student 2 (e.g., Data Engineer)"
                className="w-full bg-[#0B1020] border border-slate-800 rounded-xl p-2.5 text-xs font-medium text-white outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                value={student3}
                onChange={(e) => setStudent3(e.target.value)}
                placeholder="Student 3 (e.g., UI/UX & Web)"
                className="w-full bg-[#0B1020] border border-slate-800 rounded-xl p-2.5 text-xs font-medium text-white outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Check className="w-4 h-4" /> Start Project Workspace
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
