'use client';

import React, { useState } from 'react';
import { Challenge } from '@/lib/types';
import { useApp } from '@/context/AppContext';
import { X, Briefcase, DollarSign, Cpu, Users, CheckCircle2, Heart } from 'lucide-react';

interface CollaborationModalProps {
  challenge: Challenge;
  isOpen: boolean;
  onClose: () => void;
}

export const CollaborationModal: React.FC<CollaborationModalProps> = ({
  challenge,
  isOpen,
  onClose,
}) => {
  const { addCollaboration } = useApp();

  const [partnerName, setPartnerName] = useState<string>('AquaTech Solutions');
  const [funding, setFunding] = useState<string>('₹3,00,000');
  const [supportType, setSupportType] = useState<string>('Hardware IoT Sensors & Technical Mentorship');
  const [mentorName, setMentorName] = useState<string>('Dr. Rajesh Verma (Lead R&D Engineer)');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCollaboration(challenge.id, partnerName, funding, `${supportType} (Mentor: ${mentorName})`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden space-y-0">
        {/* Header matching Section 15 */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold shadow-md">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold">Industry Support Pledge</h3>
              <p className="text-xs text-amber-400 font-medium">You're helping move this idea closer to the field.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1">
            <span className="font-extrabold block text-amber-900">Target Project: {challenge.title}</span>
            <p className="text-amber-800">Location: {challenge.district} District • Affected: ~{challenge.affected_population.toLocaleString()}</p>
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1">Industry Organization / CSR</label>
            <select
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="AquaTech Solutions">AquaTech Solutions (Water IoT & Sensing)</option>
              <option value="CleanCity Tech">CleanCity Tech (Urban CleanTech)</option>
              <option value="HealthFirst CSR">HealthFirst CSR Foundation</option>
              <option value="EduReach Foundation">EduReach Foundation</option>
              <option value="PowerGrid Solutions">PowerGrid Solutions</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1">Prototype Funding Commitment</label>
              <input
                type="text"
                value={funding}
                onChange={(e) => setFunding(e.target.value)}
                placeholder="e.g. ₹3,00,000"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-extrabold text-slate-900 outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1">Technical Mentor Assigned</label>
              <input
                type="text"
                value={mentorName}
                onChange={(e) => setMentorName(e.target.value)}
                placeholder="Mentor name & role"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1">Resource Support Package</label>
            <textarea
              rows={2}
              value={supportType}
              onChange={(e) => setSupportType(e.target.value)}
              placeholder="e.g. Hardware sensors, software licenses, field testing kit..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-md shadow-amber-500/20 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" /> Confirm Collaboration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
