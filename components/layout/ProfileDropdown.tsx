"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { LogOut, User, FileText, Settings } from 'lucide-react';

export const ProfileDropdown: React.FC = () => {
  const { user, role, signOutUser } = useApp();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const handleLogout = () => {
    signOutUser();
    router.push('/login');
  };

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="w-8 h-8 rounded-xl bg-indigo-950 border border-indigo-500/40 flex items-center justify-center text-xs font-extrabold text-indigo-300 shadow-inner" title={user.name}>
        {user.avatar || 'U'}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-52 bg-white dark:bg-[#0F172A] rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg p-2 z-50">
          <div className="p-3 border-b border-slate-100 dark:border-slate-800">
            <div className="text-sm font-bold text-slate-900 dark:text-slate-100">{user.name}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{user.email || user.organization || role}</div>
          </div>

          <div className="p-2">
            <Link href="/profile" className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900">
              <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              <span className="text-sm">Profile</span>
            </Link>

            <Link href="/reports" className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900">
              <FileText className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              <span className="text-sm">My Reports</span>
            </Link>

            <Link href="/preferences" className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900">
              <Settings className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              <span className="text-sm">Preferences</span>
            </Link>
          </div>

          <div className="p-2 border-t border-slate-100 dark:border-slate-800">
            <button onClick={handleLogout} className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900">
              <LogOut className="w-4 h-4 text-rose-500" />
              <span className="text-sm text-rose-600">Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
