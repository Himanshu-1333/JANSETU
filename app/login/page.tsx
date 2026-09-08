'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  Sparkles, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle,
  KeyRound,
  CheckSquare,
  Square
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { loginUser } = useApp();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [roleOption, setRoleOption] = useState<string>('citizen');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      // If no explicit username provided, use selected role quick-login mapping
      const loginId = username.trim() === '' ? roleOption : username;
      const success = loginUser(loginId, password, rememberMe);
      if (success) {
        router.push('/');
      } else {
        setErrorMessage('Invalid credentials. For demo users try: citizen, university, industry, or admin (admin1234)');
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
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-500 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 text-indigo-100" />
          </div>
        </div>
        <h1 className="text-3xl font-black text-white">JanSetu Portal Sign In</h1>
        <p className="text-xs text-slate-400">
          Sign in required to access JanSetu Civic Platform. Choose your role for demo access.
        </p>
      </div>

      {/* Main Glass Card Form */}
      <div className="bg-[#131B2E] p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Role selector for demo users */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-400">Role</label>
          <select value={roleOption} onChange={(e) => setRoleOption(e.target.value)} className="bg-[#0B1020] border border-slate-800 text-white rounded-lg px-3 py-2 text-sm">
            <option value="citizen">Citizen</option>
            <option value="university">University</option>
            <option value="industry">Industry</option>
            <option value="government">Government (Admin)</option>
          </select>
          <div className="text-xs text-slate-400">Leave username empty to quick-login as selected role.</div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="bg-rose-950/80 border border-rose-800 text-rose-200 p-3.5 rounded-2xl text-xs flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
              Username / Login ID
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter login username (e.g. admin)"
                required
                className="w-full pl-10 pr-4 py-3 bg-[#0B1020] border border-slate-800 rounded-xl text-xs font-bold text-white outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (e.g. admin1234)"
                required
                className="w-full pl-10 pr-10 py-3 bg-[#0B1020] border border-slate-800 rounded-xl text-xs font-bold text-white outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between pt-1">
            <label 
              onClick={() => setRememberMe(!rememberMe)}
              className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-300 font-semibold"
            >
              {rememberMe ? (
                <CheckSquare className="w-4 h-4 text-indigo-400" />
              ) : (
                <Square className="w-4 h-4 text-slate-600" />
              )}
              <span>Remember me on this browser</span>
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating Session...</span>
              ) : (
                <>
                  <span>Sign In to Platform</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
