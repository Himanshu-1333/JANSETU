"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Sparkles, Lock, User, Eye, EyeOff, ArrowRight, AlertCircle, KeyRound, CheckSquare, Square } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginUser } = useApp();

  const [username, setUsername] = useState<string>('admin');
  const [password, setPassword] = useState<string>('admin1234');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const success = loginUser(username, password, rememberMe);
      if (success) {
        router.push('/');
      } else {
        setErrorMessage('Invalid admin credentials.');
        setIsLoading(false);
      }
    }, 400);
  };

  const fillAdminCredentials = () => {
    setUsername('admin');
    setPassword('admin1234');
    setErrorMessage(null);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8 text-white min-h-[85vh] flex flex-col justify-center">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-500 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 text-indigo-100" />
          </div>
        </div>
        <h1 className="text-3xl font-black text-white">Admin Sign In</h1>
        <p className="text-xs text-slate-400">Admin access to JanSetu Command Dashboard.</p>
      </div>

      <div className="bg-[#131B2E] p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="bg-indigo-950/70 border border-indigo-800/80 p-3.5 rounded-2xl flex items-center justify-between text-xs text-indigo-200">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-indigo-400 shrink-0" />
            <div>
              <span className="font-extrabold text-white block">Admin Login Credentials:</span>
              <span className="font-mono text-[11px] text-indigo-300">User: <strong>admin</strong> | Pass: <strong>admin1234</strong></span>
            </div>
          </div>
          <button type="button" onClick={fillAdminCredentials} className="text-[10px] font-black uppercase bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-1 rounded-lg transition-colors shrink-0">Auto Fill</button>
        </div>

        {errorMessage && (
          <div className="bg-rose-950/80 border border-rose-800 text-rose-200 p-3.5 rounded-2xl text-xs flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Username / Login ID</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter admin username" required className="w-full pl-10 pr-4 py-3 bg-[#0B1020] border border-slate-800 rounded-xl text-xs font-bold text-white outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required className="w-full pl-10 pr-10 py-3 bg-[#0B1020] border border-slate-800 rounded-xl text-xs font-bold text-white outline-none focus:ring-2 focus:ring-indigo-500" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
            </div>
          </div>

          <div className="pt-2">
            <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50">
              {isLoading ? <span>Authenticating Session...</span> : <><span>Sign In as Admin</span><ArrowRight className="w-4 h-4" /></>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
