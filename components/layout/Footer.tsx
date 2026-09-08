'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, MapPin, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Hide footer on login page
  if (pathname === '/login') {
    return null;
  }

  return (
    <footer className="bg-[#030712] text-slate-400 text-xs border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          {/* Col 1 */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">JanSetu</span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed text-xs">
              AI-Powered Civic Innovation Platform. "Building a smarter, stronger Jharkhand together." Connecting citizens, academic talent, industry resources, and government to turn community problems into measurable real-world impact.
            </p>
            <div className="inline-flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-950/80 border border-emerald-900/60 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>JanSetu Civic Innovation Platform • State of Jharkhand Network</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-2.5">Platform Navigation</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/report" className="hover:text-white transition-colors">Report Problem</Link></li>
              <li><Link href="/challenges" className="hover:text-white transition-colors">Challenges</Link></li>
              <li><Link href="/university" className="hover:text-white transition-colors">University Hub</Link></li>
              <li><Link href="/industry" className="hover:text-white transition-colors">Industry Portal</Link></li>
              <li><Link href="/government" className="hover:text-white transition-colors">Gov Command</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-2.5">Coverage Region</h4>
            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>State of Jharkhand, India</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Ranchi, Dumka, Dhanbad, Bokaro, Giridih, Jamshedpur.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} JanSetu Platform. Built for communities across Jharkhand.</p>
          <p className="text-slate-400">Building a smarter, stronger Jharkhand together.</p>
        </div>
      </div>
    </footer>
  );
};
