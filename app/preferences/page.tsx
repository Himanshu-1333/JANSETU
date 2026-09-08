"use client";

import React from 'react';
import { useApp } from '@/context/AppContext';

export default function PreferencesPage() {
  const { theme, setTheme, user } = useApp();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-[#0B1020] rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">Preferences</h2>
        <p className="text-sm text-slate-500 mt-1">Personalize your JanSetu experience, {user.name}.</p>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900 dark:text-slate-100">Theme</div>
              <div className="text-xs text-slate-500">Switch site-wide color scheme.</div>
            </div>
            <div>
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="px-4 py-2 bg-indigo-600 text-white rounded-md">
                Toggle Theme (current: {theme})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
