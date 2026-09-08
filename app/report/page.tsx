'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Sparkles, 
  MapPin, 
  Camera, 
  Mic, 
  ShieldCheck,
  Info
} from 'lucide-react';

export default function ReportPage() {
  const router = useRouter();
  const { submitReport } = useApp();

  const [title, setTitle] = useState<string>('Unsafe Drinking Water');
  const [description, setDescription] = useState<string>(
    'Our village drinking water is contaminated with heavy sediment and industrial runoff, causing recurring waterborne illness among school children and households in Dumka district.'
  );
  const [district, setDistrict] = useState<string>('Dumka');
  const [category, setCategory] = useState<string>('Water & Sanitation');
  const [photoPreview, setPhotoPreview] = useState<string>(
    'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80'
  );
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const challenge = await submitReport({
        title,
        description,
        district,
        category,
        photo: photoPreview
      });

      sessionStorage.setItem(
        'jansetu_last_report',
        JSON.stringify({
          title,
          description,
          district,
          category,
          photo: photoPreview,
          challengeId: challenge.id
        })
      );

      router.push('/analyze');
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-white">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-extrabold shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Simple 1-Minute Reporting • No Paperwork Required</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">What problem are you facing?</h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
          Tell us in your own words. JanSetu AI will help structure your report, calculate priority, and match academic researchers & industry sponsors.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-[#131B2E] p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Problem Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Unsafe Drinking Water"
              required
              className="w-full p-3 bg-[#0B1020] border border-slate-800 rounded-xl text-xs font-bold text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider">
                Describe the problem in your own words
              </label>
              <button
                type="button"
                onClick={handleVoiceToggle}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border transition-all ${
                  isRecording
                    ? 'bg-red-950 text-red-300 border-red-800 animate-pulse'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <Mic className="w-3.5 h-3.5 text-indigo-400" />
                <span>{isRecording ? 'Listening... Speak now' : '🎙 Speak instead'}</span>
              </button>
            </div>

            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Example: Our village handpump water has become unsafe..."
              required
              className="w-full p-4 bg-[#0B1020] border border-slate-800 rounded-2xl text-xs text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none leading-relaxed transition-all placeholder:text-slate-500 font-medium"
            />
          </div>
        </div>

        {/* Row Attachments */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-[#0B1020] p-3.5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-xs font-bold uppercase text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" /> District Location
            </span>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="Dumka">Dumka District</option>
              <option value="Ranchi">Ranchi Municipal Area</option>
              <option value="Giridih">Giridih Rural Block</option>
              <option value="Bokaro">Bokaro PHC Zone</option>
              <option value="Dhanbad">Dhanbad Urban Hub</option>
            </select>
          </div>

          <div className="bg-[#0B1020] p-3.5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-xs font-bold uppercase text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Category
            </span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="Water & Sanitation">Water & Sanitation</option>
              <option value="Urban Infrastructure">Urban Infrastructure</option>
              <option value="Education & Skill">Education & Skill</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Public Safety">Public Safety</option>
            </select>
          </div>

          <div className="bg-[#0B1020] p-3.5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-xs font-bold uppercase text-slate-400 flex items-center gap-1">
              <Camera className="w-3.5 h-3.5 text-indigo-400" /> Photo Attachment
            </span>
            {photoPreview ? (
              <div className="relative rounded-xl overflow-hidden h-8 border border-slate-800 flex items-center justify-between px-2 bg-slate-900">
                <span className="text-[10px] text-slate-300 truncate max-w-[130px]">📷 Evidence.jpg</span>
                <button
                  type="button"
                  onClick={() => setPhotoPreview('')}
                  className="text-[9px] font-bold text-rose-400 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setPhotoPreview('https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80')}
                className="w-full py-1.5 px-2 bg-slate-900 border border-slate-800 rounded-xl text-[11px] font-semibold text-indigo-400 hover:bg-slate-800 transition-colors text-left"
              >
                + Add Photo
              </button>
            )}
          </div>
        </div>

        <div className="bg-indigo-950/60 border border-indigo-800/80 p-4 rounded-2xl flex items-start gap-3">
          <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div className="text-xs text-indigo-200 space-y-0.5">
            <span className="font-extrabold block text-white">AI Classification & Public Transparency</span>
            <p className="text-indigo-300 leading-relaxed">
              Your report will be reviewed and converted into a structured challenge. Personal contact details remain private.
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-base font-extrabold shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
        >
          {loading ? (
            <span>Analyzing & Saving Problem Report...</span>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-indigo-200" />
              <span>Analyze & Submit Problem →</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
