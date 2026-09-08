'use client';

import React, { useState, useEffect } from 'react';
import { ProfileDropdown } from '@/components/layout/ProfileDropdown';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/lib/types';
import { 
  Sparkles, 
  Search, 
  LogOut, 
  ChevronDown, 
  User, 
  GraduationCap, 
  Briefcase, 
  Landmark,
  Layers,
  Menu,
  X,
  FilePlus,
  Compass,
  Building2,
  Bell,
  LogIn,
  Activity
  ,
  Sun,
  Moon
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role, setRole, isAuthenticated, signOutUser, notifications } = useApp();
  const { theme, setTheme } = useApp();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide navigation completely on login page
  if (pathname === '/login') {
    return null;
  }

  const unreadNotifs = notifications.filter((n) => !n.read);

  const roleConfigs: { id: UserRole; label: string; icon: React.ReactNode }[] = [
    { id: 'citizen', label: 'Citizen', icon: <User className="w-4 h-4 text-emerald-400" /> },
    { id: 'university', label: 'University', icon: <GraduationCap className="w-4 h-4 text-indigo-400" /> },
    { id: 'industry', label: 'Industry', icon: <Briefcase className="w-4 h-4 text-amber-400" /> },
    { id: 'government', label: 'Government', icon: <Landmark className="w-4 h-4 text-blue-400" /> },
  ];

  const currentRoleObj = roleConfigs.find((r) => r.id === role) || roleConfigs[0];

  const navLinks = [
    { href: '/', label: 'Home', icon: <Compass className="w-3.5 h-3.5" /> },
    { href: '/report', label: 'Report Problem', icon: <FilePlus className="w-3.5 h-3.5" /> },
    { href: '/challenges', label: 'Challenges', icon: <Layers className="w-3.5 h-3.5" /> },
    { href: '/university', label: 'University Hub', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { href: '/industry', label: 'Industry Portal', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { href: '/live-support', label: 'Live Stream ⚡', icon: <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> },
    { href: '/government', label: 'Gov Command', icon: <Building2 className="w-3.5 h-3.5" /> },
  ];

  // Filter nav links by role: citizens see a simplified navigation
  const filteredNavLinks = navLinks.filter((link) => {
    if (role === 'citizen') {
      return ['/', '/report', '/challenges'].includes(link.href);
    }
    // government (admin) sees all links
    return true;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim()) {
      router.push(`/challenges?search=${encodeURIComponent(navSearch)}`);
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full px-3 sm:px-6 pt-2 pb-1">
      {/* Real Platform Status Bar - Rectangular */}
      <div className="max-w-7xl mx-auto brand-status backdrop-blur-md text-slate-400 text-[10px] py-1.5 px-4 rounded-t-xl border-x border-t border-slate-800/80 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-sm bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400"></span>
          <span className="font-bold text-slate-200">JanSetu Civic Platform</span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">State of Jharkhand Civic Innovation Network</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400">Account: <strong className="text-indigo-400 font-bold">{user.name}</strong></span>
          <button 
            onClick={signOutUser}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors font-bold"
            title="Sign Out of Session"
          >
            <LogOut className="w-3 h-3 text-slate-400" /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Header Container - Crisp Rectangular Bar */}
      <header
        className={`max-w-7xl mx-auto brand-header rounded-b-xl rounded-t-none md:rounded-b-2xl border transition-all duration-300 ${
          scrolled
            ? 'bg-site/95 border-indigo-500/40 shadow-[0_12px_35px_rgba(0,0,0,0.85),0_0_25px_rgba(99,102,241,0.25)]'
            : 'bg-surface/90 border-slate-800 shadow-2xl'
        } backdrop-blur-2xl px-5 py-2.5 flex items-center justify-between gap-4`}
      >
        {/* Brand - Rectangular Badge */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-500 flex items-center justify-center text-white font-black shadow-md shadow-indigo-600/40 group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 text-indigo-100" />
          </div>
          <div>
              <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white">JanSetu</span>
            </div>
            <span className="text-[9px] font-extrabold tracking-widest uppercase text-emerald-400 block -mt-1">
              CIVIC INNOVATION
            </span>
          </div>
        </Link>

        {/* Desktop Links - Rectangular Tabs */}
        <nav role="navigation" aria-label="Main navigation" className="hidden lg:flex items-center gap-1 bg-surface p-1.5 rounded-xl border border-slate-800/90">
          {filteredNavLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md font-extrabold border border-indigo-400/50 scale-[1.02]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Tools - Rectangular Components */}
        <div className="flex items-center gap-2.5">
          <form onSubmit={handleSearchSubmit} className="hidden xl:relative xl:block">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              placeholder="Search platform..."
              className="pl-8 pr-3 py-1.5 bg-[#040711] border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 w-36 transition-all"
            />
          </form>

          {/* Notifications Bell Button */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              aria-expanded={isNotifOpen}
              aria-label="Notifications"
              className="p-2 rounded-xl bg-surface border border-slate-800 text-slate-300 hover:text-white relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4 text-indigo-400" />
              {unreadNotifs.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-slate-950 font-black text-[9px] rounded-md flex items-center justify-center">
                  {unreadNotifs.length}
                </span>
              )}
            </button>

              {isNotifOpen && (
              <div className="absolute right-0 mt-3 w-72 bg-[#0F172A] rounded-xl border border-slate-800 shadow-2xl p-3 z-50 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-white">Notifications</span>
                  <span className="text-[10px] text-slate-400">{notifications.length} Total</span>
                </div>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1 text-xs">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2.5 bg-[#040711] rounded-lg border border-slate-800 space-y-0.5">
                      <span className="font-bold text-indigo-300 block">{n.title}</span>
                      <p className="text-[11px] text-slate-400 leading-snug">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Role switcher only visible to government (admin) users */}
          {role === 'government' && (
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                aria-expanded={isRoleDropdownOpen}
                aria-label="Switch role perspective"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface hover:bg-slate-800 border border-slate-800 text-xs font-black text-white transition-all shadow-sm"
              >
                {currentRoleObj.icon}
                <span className="hidden sm:inline font-extrabold">
                  <strong className="text-indigo-400 capitalize">{role}</strong>
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-[#0F172A] rounded-xl border border-slate-800 shadow-2xl p-2.5 z-[70] space-y-1 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 px-2">
                    <span className="text-[10px] uppercase font-black text-indigo-400">Active Role Perspective</span>
                    <span className="text-[9px] bg-indigo-950 text-indigo-300 border border-indigo-800 px-1.5 py-0.5 rounded font-bold">4 MODES</span>
                  </div>
                  {roleConfigs.map((r) => {
                    const roleSubtexts: Record<string, string> = {
                      citizen: 'Report civic issues & track local progress',
                      university: 'R&D lab proposals & CSR grants',
                      industry: 'Pledge CSR funds & mentor prototypes',
                      government: 'Command SLA center & emergency funds'
                    };

                    return (
                      <button
                        key={r.id}
                        role="menuitem"
                        onClick={() => {
                          setRole(r.id);
                          setIsRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg text-xs font-bold transition-all ${
                          role === r.id 
                            ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-black shadow-md border border-indigo-400/50' 
                            : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {r.icon}
                            <span>{r.label}</span>
                          </div>
                          {role === r.id && <span className="w-2 h-2 rounded-sm bg-emerald-400 animate-pulse"></span>}
                        </div>
                        <p className={`text-[10px] mt-0.5 font-normal ${role === r.id ? 'text-indigo-100' : 'text-slate-400'}`}>
                          {roleSubtexts[r.id]}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* User Avatar & Profile Dropdown */}
          <div>
            <ProfileDropdown />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={`Toggle theme (currently ${theme})`}
            className="p-2 rounded-xl bg-surface border border-slate-800 text-slate-200 hover:text-white focus:outline-none"
            title="Toggle theme"
          >
            {theme === 'light' ? <Sun className="w-4 h-4 text-yellow-300" /> : <Moon className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Mobile Drawer Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Open mobile menu"
            className="lg:hidden p-2 rounded-xl bg-surface border border-slate-800 text-slate-200 hover:text-white focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer - Rectangular */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-3 top-20 z-40 bg-[#0F172A]/95 backdrop-blur-2xl border border-indigo-500/30 rounded-2xl p-5 shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-extrabold uppercase text-indigo-400">JanSetu Platform</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs text-slate-400 hover:text-white font-bold"
            >
              Close ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-[#040711] text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Switch Active Role</span>
            <div className="grid grid-cols-2 gap-2">
              {roleConfigs.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setRole(r.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-1.5 p-2.5 rounded-xl text-xs font-bold border transition-all ${
                    role === r.id
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                      : 'bg-[#040711] text-slate-300 border-slate-800'
                  }`}
                >
                  {r.icon}
                  <span>{r.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
