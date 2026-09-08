"use client";

import React from 'react';
import { useApp } from '@/context/AppContext';

export default function ProfilePage() {
  const { user, reports } = useApp();

  const myReports = reports.filter((r) => r.createdBy && typeof r.createdBy === 'string' ? r.createdBy.includes(user.name) : false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-[#0B1020] rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-indigo-950 flex items-center justify-center text-white font-black text-xl">{user.avatar || 'U'}</div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">{user.name}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{user.email || user.organization}</p>
            <p className="text-xs text-slate-400 mt-1">Role: <strong className="text-indigo-600 dark:text-indigo-300">{user.role}</strong></p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">My Reports</h3>
          {myReports.length === 0 ? (
            <p className="text-sm text-slate-500 mt-2">You haven't submitted any reports yet.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {myReports.map((r) => (
                <li key={r.id} className="p-3 bg-slate-50 dark:bg-[#071021] rounded-md border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-100">{r.title}</div>
                      <div className="text-xs text-slate-500">{r.district} • {r.category}</div>
                    </div>
                    <div className="text-sm text-slate-500">Priority: <strong>{r.priorityScore}</strong></div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
