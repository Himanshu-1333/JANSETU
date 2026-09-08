"use client";

import React from 'react';
import { useApp } from '@/context/AppContext';

export default function ReportsPage() {
  const { reports, user, role, verifyReportByGov } = useApp();

  const visible = role === 'government' ? reports : reports.filter((r) => r.createdBy && typeof r.createdBy === 'string' ? r.createdBy.includes(user.name) : false);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">Reports</h2>
      <p className="text-sm text-slate-500 mt-1">{role === 'government' ? 'All platform reports' : 'Your submitted reports'}</p>

      <div className="mt-6 grid grid-cols-1 gap-3">
        {visible.map((r) => (
          <div key={r.id} className="p-4 bg-white dark:bg-[#071021] rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-bold text-slate-900 dark:text-slate-100">{r.title}</div>
                <div className="text-xs text-slate-500">{r.district} • {r.category}</div>
              </div>
              <div className="text-right">
                {role === 'government' ? (
                  <>
                    <div className="text-sm font-black text-indigo-600 dark:text-indigo-300">Priority {r.priorityScore}</div>
                    <div className="text-[11px] text-slate-400">Status: {r.status}</div>
                    <div className="mt-2 flex items-center gap-2 justify-end">
                      <button onClick={() => { verifyReportByGov(r.id); }} className="px-3 py-1 rounded-md bg-emerald-600 text-white text-sm font-bold">Verify</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-sm font-black text-slate-700 dark:text-slate-300">Priority Hidden</div>
                    <div className="text-[11px] text-slate-400">Status: {r.status}</div>
                  </>
                )}
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{r.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
