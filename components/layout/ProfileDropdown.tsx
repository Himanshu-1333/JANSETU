"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { LogOut, User, FileText, Settings, X } from 'lucide-react';

import ReactDOM from 'react-dom';

export const ProfileDropdown: React.FC = () => {
  const { user, role, signOutUser } = useApp();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showPrefsModal, setShowPrefsModal] = useState(false);
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
            <button onClick={() => { setOpen(false); setShowProfileModal(true); }} className="w-full text-left flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900">
              <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              <span className="text-sm">Profile</span>
            </button>

            <button onClick={() => { setOpen(false); setShowReportsModal(true); }} className="w-full text-left flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900">
              <FileText className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              <span className="text-sm">My Reports</span>
            </button>

            <button onClick={() => { setOpen(false); setShowPrefsModal(true); }} className="w-full text-left flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900">
              <Settings className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              <span className="text-sm">Preferences</span>
            </button>
          </div>

          <div className="p-2 border-t border-slate-100 dark:border-slate-800">
            <button onClick={handleLogout} className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900">
              <LogOut className="w-4 h-4 text-rose-500" />
              <span className="text-sm text-rose-600">Log out</span>
            </button>
          </div>
        </div>
      )}

      {/* Modals rendered via portal */}
      {showProfileModal && typeof document !== 'undefined' && ReactDOM.createPortal(
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowProfileModal(false)} />
          <div className="relative bg-white dark:bg-[#071021] rounded-xl max-w-2xl w-full p-6 border border-slate-200 dark:border-slate-800 z-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Profile</h3>
              <button onClick={() => setShowProfileModal(false)} className="p-1 rounded-md text-slate-600 dark:text-slate-300"><X className="w-4 h-4" /></button>
            </div>
            <div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-indigo-950 flex items-center justify-center text-white font-black">{user.avatar || 'U'}</div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">{user.name}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{user.email || user.organization}</div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-slate-600 dark:text-slate-300">Role: <strong className="text-indigo-600 dark:text-indigo-300">{role}</strong></p>
              </div>
            </div>
          </div>
        </div>, document.body)
      }

      {showReportsModal && typeof document !== 'undefined' && ReactDOM.createPortal(
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowReportsModal(false)} />
          <div className="relative bg-white dark:bg-[#071021] rounded-xl max-w-3xl w-full p-6 border border-slate-200 dark:border-slate-800 z-50 overflow-y-auto max-h-[80vh]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">My Reports</h3>
              <button onClick={() => setShowReportsModal(false)} className="p-1 rounded-md text-slate-600 dark:text-slate-300"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-2">
              {/** Reuse reports from context */}
              {/** show all if admin, else only own reports */}
              {/** We'll compute visible list here */}
              {(() => {
                const visible = role === 'government' ? [] : [];
                // simple render: link to /reports page for details
                return (
                  <div className="text-sm text-slate-500">Open full reports page for details: <button onClick={() => { setShowReportsModal(false); router.push('/reports'); }} className="text-indigo-600">View Reports</button></div>
                );
              })()}
            </div>
          </div>
        </div>, document.body)
      }

      {showPrefsModal && typeof document !== 'undefined' && ReactDOM.createPortal(
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowPrefsModal(false)} />
          <div className="relative bg-white dark:bg-[#071021] rounded-xl max-w-xl w-full p-6 border border-slate-200 dark:border-slate-800 z-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Preferences</h3>
              <button onClick={() => setShowPrefsModal(false)} className="p-1 rounded-md text-slate-600 dark:text-slate-300"><X className="w-4 h-4" /></button>
            </div>
            <div>
              <p className="text-sm text-slate-500">Open full preferences page for more options.</p>
              <div className="mt-4"><button onClick={() => { setShowPrefsModal(false); router.push('/preferences'); }} className="px-3 py-2 bg-indigo-600 text-white rounded-md">Open Preferences</button></div>
            </div>
          </div>
        </div>, document.body)
      }
    </div>
  );
};
