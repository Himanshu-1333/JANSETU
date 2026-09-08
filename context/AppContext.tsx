'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { 
  UserRole, 
  UserAccount, 
  ProblemReport, 
  Challenge, 
  Project, 
  University, 
  IndustryPartner, 
  ChallengeStatus,
  ReportStatus,
  AppNotification,
  ActivityLog
} from '@/lib/types';
import { 
  INITIAL_REPORTS, 
  INITIAL_CHALLENGES, 
  INITIAL_PROJECTS, 
  INITIAL_UNIVERSITIES, 
  INITIAL_INDUSTRIES, 
  PLATFORM_STATS,
  SEEDED_ACCOUNTS 
} from '@/lib/demo-data';

export interface LiveTelemetry {
  totalChallenges: number;
  verifiedChallenges: number;
  activeProjects: number;
  implementedProjects: number;
  citizensImpacted: number;
  csrPledgePoolLakhs: number;
  univActiveProjects: number;
  univChallengesMatched: number;
  univCompletedPilots: number;
  univStudentsCount: number;
  industryActiveCsr: number;
  avgPrototypeGrantAmount: number;
  avgPrototypeGrant: string;
  industryPartners: number;
  industryMentors: number;
}

interface AppContextType {
  user: UserAccount;
  role: UserRole;
  isAuthenticated: boolean;
  isAuthLoaded: boolean;
  setRole: (role: UserRole) => void;
  reports: ProblemReport[];
  challenges: Challenge[];
  projects: Project[];
  universities: University[];
  industries: IndustryPartner[];
  notifications: AppNotification[];
  activityLogs: ActivityLog[];
  stats: LiveTelemetry;
  toast: string | null;
  showToast: (msg: string) => void;
  addToast: (msg: string) => void;
  loginUser: (login: string, pass: string, rememberMe?: boolean) => boolean;
  submitReport: (report: Partial<ProblemReport>) => Promise<Challenge>;
  addChallenge: (challenge: Challenge) => void;
  verifyReportByGov: (reportId: string) => void;
  acceptChallenge: (challengeId: string, universityName: string, team: { lead: string; mentor: string; members: string[] }) => void;
  addCollaboration: (challengeId: string, partnerName: string, funding: string, supportType: string) => void;
  markNotificationRead: (id: string) => void;
  signOutUser: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('government');
  const [user, setUser] = useState<UserAccount>(SEEDED_ACCOUNTS['government']);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthLoaded, setIsAuthLoaded] = useState<boolean>(false);

  const [reports, setReports] = useState<ProblemReport[]>(INITIAL_REPORTS);
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [universities] = useState<University[]>(INITIAL_UNIVERSITIES);
  const [industries] = useState<IndustryPartner[]>(INITIAL_INDUSTRIES);

  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-1',
      recipientRole: 'citizen',
      title: 'Report Verified',
      message: 'Your report "Unsafe Drinking Water" in Dumka has been AI verified and submitted to university research labs.',
      read: false,
      createdAt: '2026-09-03T10:00:00Z'
    },
    {
      id: 'notif-2',
      recipientRole: 'university',
      title: 'New High-Priority Challenge',
      message: 'BIT Jharkhand IoT lab: A 96% match challenge "Unsafe Drinking Water" requires technical attention.',
      read: false,
      createdAt: '2026-09-03T11:30:00Z'
    }
  ]);

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      id: 'act-1',
      timestamp: '2026-09-02 10:30',
      userRole: 'citizen',
      userName: 'Ananya Roy',
      action: 'Report Submitted',
      details: 'Unsafe Drinking Water in Dumka District'
    },
    {
      id: 'act-2',
      timestamp: '2026-09-03 11:00',
      userRole: 'government',
      userName: 'Admin Nodal Officer',
      action: 'Challenge Verified',
      details: 'Converted report rep-1 into verified challenge ch-1'
    }
  ]);

  const [toast, setToast] = useState<string | null>(null);
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('jansetu_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {}
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const [liveTelemetry, setLiveTelemetry] = useState<LiveTelemetry>({
    totalChallenges: 2481,
    verifiedChallenges: 1742,
    activeProjects: 318,
    implementedProjects: 127,
    citizensImpacted: 487800,
    csrPledgePoolLakhs: 48.5,
    univActiveProjects: 12,
    univChallengesMatched: 38,
    univCompletedPilots: 7,
    univStudentsCount: 146,
    industryActiveCsr: 18,
    avgPrototypeGrantAmount: 300000,
    avgPrototypeGrant: '₹3,00,000',
    industryPartners: 12,
    industryMentors: 45,
  });

  // Fast Rupees & Telemetry Simulation Engine (ticks every 1.5 seconds for rapid financial growth)
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTelemetry((prev) => {
        const popIncrement = Math.floor(Math.random() * 14) + 3;
        const grantInc = Math.floor(Math.random() * 4 + 1) * 5000; // +5k, +10k, +15k, +20k
        const newGrantAmount = prev.avgPrototypeGrantAmount + grantInc;
        const newCsrLakhs = Math.round((prev.csrPledgePoolLakhs + 0.15) * 100) / 100;

        const roll = Math.random();
        let newTotal = prev.totalChallenges;
        let newVerified = prev.verifiedChallenges;
        let newActive = prev.activeProjects;
        let newImplemented = prev.implementedProjects;
        let newUnivProjects = prev.univActiveProjects;
        let newUnivMatches = prev.univChallengesMatched;
        let newUnivPilots = prev.univCompletedPilots;
        let newStudents = prev.univStudentsCount;
        let newCsrProjects = prev.industryActiveCsr;
        let newPartners = prev.industryPartners;
        let newMentors = prev.industryMentors;

        if (roll < 0.30) {
          newTotal += 1;
          if (Math.random() > 0.4) newVerified += 1;
        } else if (roll < 0.50) {
          newUnivMatches += 1;
        } else if (roll < 0.65) {
          newStudents += Math.floor(Math.random() * 2) + 1;
        } else if (roll < 0.80) {
          newMentors += 1;
        } else if (roll < 0.90) {
          newActive += 1;
        } else {
          newImplemented += 1;
          newUnivPilots += 1;
        }

        return {
          totalChallenges: newTotal,
          verifiedChallenges: newVerified,
          activeProjects: newActive,
          implementedProjects: newImplemented,
          citizensImpacted: prev.citizensImpacted + popIncrement,
          csrPledgePoolLakhs: newCsrLakhs,
          univActiveProjects: newUnivProjects,
          univChallengesMatched: newUnivMatches,
          univCompletedPilots: newUnivPilots,
          univStudentsCount: newStudents,
          industryActiveCsr: newCsrProjects,
          avgPrototypeGrantAmount: newGrantAmount,
          avgPrototypeGrant: `₹${newGrantAmount.toLocaleString('en-IN')}`,
          industryPartners: newPartners,
          industryMentors: newMentors,
        };
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Check auth & session persistence
  useEffect(() => {
    try {
      const remember = localStorage.getItem('jansetu_remember_me');
      const sessionAuth = sessionStorage.getItem('jansetu_session_auth');
      const savedRole = (localStorage.getItem('jansetu_app_role') as UserRole) || 'government';

      if (remember === 'true' || sessionAuth === 'true') {
        setIsAuthenticated(true);
        setRoleState(savedRole);
        if (SEEDED_ACCOUNTS[savedRole]) {
          setUser(SEEDED_ACCOUNTS[savedRole]);
        }
      } else {
        setIsAuthenticated(false);
      }

      const savedReports = localStorage.getItem('jansetu_db_reports');
      const savedChallenges = localStorage.getItem('jansetu_db_challenges');
      const savedProjects = localStorage.getItem('jansetu_db_projects');
      const savedNotifs = localStorage.getItem('jansetu_db_notifs');
      const savedLogs = localStorage.getItem('jansetu_db_logs');

      if (savedReports) setReports(JSON.parse(savedReports));
      if (savedChallenges) setChallenges(JSON.parse(savedChallenges));
      if (savedProjects) setProjects(JSON.parse(savedProjects));
      if (savedNotifs) setNotifications(JSON.parse(savedNotifs));
      if (savedLogs) setActivityLogs(JSON.parse(savedLogs));
    } catch (e) {
      console.warn('Persistence load warning:', e);
    } finally {
      setIsAuthLoaded(true);
    }
  }, []);

  // Theme persistence and html class toggling
  useEffect(() => {
    try {
      localStorage.setItem('jansetu_theme', theme);
    } catch (e) {}
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  const saveReports = (newReports: ProblemReport[]) => {
    setReports(newReports);
    try {
      localStorage.setItem('jansetu_db_reports', JSON.stringify(newReports));
    } catch (e) {}
  };

  const saveChallenges = (newChallenges: Challenge[]) => {
    setChallenges(newChallenges);
    try {
      localStorage.setItem('jansetu_db_challenges', JSON.stringify(newChallenges));
    } catch (e) {}
  };

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    try {
      localStorage.setItem('jansetu_db_projects', JSON.stringify(newProjects));
    } catch (e) {}
  };

  const saveNotifications = (newNotifs: AppNotification[]) => {
    setNotifications(newNotifs);
    try {
      localStorage.setItem('jansetu_db_notifs', JSON.stringify(newNotifs));
    } catch (e) {}
  };

  const saveLogs = (newLogs: ActivityLog[]) => {
    setActivityLogs(newLogs);
    try {
      localStorage.setItem('jansetu_db_logs', JSON.stringify(newLogs));
    } catch (e) {}
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (SEEDED_ACCOUNTS[newRole]) {
      setUser(SEEDED_ACCOUNTS[newRole]);
    }
    try {
      localStorage.setItem('jansetu_app_role', newRole);
    } catch (e) {}
    showToast(`Account Perspective: ${newRole.toUpperCase()}`);
  };

  const setTheme = (t: 'light' | 'dark') => {
    setThemeState(t);
    try { localStorage.setItem('jansetu_theme', t); } catch (e) {}
  };

  const loginUser = (login: string, pass: string, rememberMe: boolean = false): boolean => {
    const cleanLogin = login.trim().toLowerCase();
    const cleanPass = pass.trim();

    // Admin credentials (protected demo)
    if ((cleanLogin === 'admin' || cleanLogin === 'admin@jansetu.app') && cleanPass === 'admin1234') {
      setIsAuthenticated(true);
      setRoleState('government');
      setUser({
        id: 'usr-admin',
        name: 'Admin Nodal Officer',
        email: 'admin@jansetu.app',
        role: 'government',
        organization: 'Jharkhand Innovation Command Center',
        district: 'Ranchi',
        avatar: 'AD'
      });

      try {
        if (rememberMe) {
          localStorage.setItem('jansetu_remember_me', 'true');
          localStorage.setItem('jansetu_app_role', 'government');
          sessionStorage.removeItem('jansetu_session_auth');
        } else {
          sessionStorage.setItem('jansetu_session_auth', 'true');
          localStorage.removeItem('jansetu_remember_me');
        }
      } catch (e) {}

      showToast('Welcome back, Admin! Session authenticated.');
      return true;
    }

    // Demo standard user credentials
    if ((cleanLogin === 'user' || cleanLogin === 'user@jansetu.app') && cleanPass === 'user1234') {
      setIsAuthenticated(true);
      setRoleState('citizen');
      setUser(SEEDED_ACCOUNTS['citizen']);
    } else {
      return false;
    }

    try {
      if (rememberMe) {
        localStorage.setItem('jansetu_remember_me', 'true');
        localStorage.setItem('jansetu_app_role', (SEEDED_ACCOUNTS as any)[role]?.role || 'citizen');
        sessionStorage.removeItem('jansetu_session_auth');
      } else {
        sessionStorage.setItem('jansetu_session_auth', 'true');
        localStorage.removeItem('jansetu_remember_me');
      }
    } catch (e) {}

    showToast('Logged in to JanSetu.');
    return true;
  };

  const logActivity = (action: string, details: string) => {
    const newLog: ActivityLog = {
      id: `act-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      userRole: role,
      userName: user.name,
      action,
      details,
    };
    saveLogs([newLog, ...activityLogs]);
  };

  const addNotification = (recipientRole: UserRole, title: string, message: string) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      recipientRole,
      title,
      message,
      read: false,
      createdAt: new Date().toISOString(),
    };
    saveNotifications([newNotif, ...notifications]);
  };

  const submitReport = async (reportData: Partial<ProblemReport>): Promise<Challenge> => {
    const reportId = `rep-${Date.now()}`;
    const challengeId = `ch-${Date.now()}`;

    const district = reportData.district || 'Dumka';
    const title = reportData.title || 'Unsafe Drinking Water';
    const description = reportData.description || '';

    let aiPriority = 91;
    let aiSkills = ['IoT', 'Environmental', 'Data Science'];
    let category = reportData.category || 'Water & Sanitation';
    let affectedPop = 1240;

    try {
      const res = await fetch('/api/analyze-problem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, district })
      });
      if (res.ok) {
        const aiRes = await res.json();
        aiPriority = aiRes.priority_score || 91;
        aiSkills = aiRes.required_skills || ['IoT', 'Environmental', 'Data Science'];
        category = aiRes.category || category;
        affectedPop = aiRes.affected_population || 1240;
      }
    } catch (e) {}

    const newReport: ProblemReport = {
      id: reportId,
      title: title,
      description: description,
      district: district,
      block: `${district} Central Block`,
      category: category,
      location: `${district} Block 4, Jharkhand`,
      photo: reportData.photo || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
      status: 'Verified',
      priorityScore: aiPriority,
      severity: 'High',
      affectedPopulation: affectedPop,
      createdBy: user.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      similarReportsCount: 17
    };

    saveReports([newReport, ...reports]);

    const newChallenge: Challenge = {
      id: challengeId,
      title: title,
      description: description,
      category: category,
      sub_category: 'Drinking Water Quality',
      district: district,
      location: `${district} Block 4, Jharkhand`,
      priority_score: aiPriority,
      severity: 'High',
      affected_population: affectedPop,
      similar_report_count: 17,
      required_skills: aiSkills,
      status: 'Verified',
      created_at: new Date().toISOString(),
      created_by: user.name,
      university_matches: [
        { name: 'BIT Jharkhand', match: 96, reason: 'IoT sensing lab & water research team' },
        { name: 'Ranchi University', match: 84, reason: 'Environmental research department' }
      ],
      industry_matches: [
        { name: 'AquaTech Solutions', match: 91, support: 'Sensors + ₹3,00,000 funding pledge' }
      ],
      image: newReport.photo
    };

    saveChallenges([newChallenge, ...challenges]);

    logActivity('Report Submitted', `Submitted "${title}" in ${district}`);
    addNotification('university', 'New Verified Challenge', `New challenge "${title}" in ${district} matches BIT Jharkhand labs.`);
    addNotification('government', 'Challenge Verification', `Report "${title}" registered in ${district}`);

    showToast(`Report logged & AI structured into verified challenge!`);
    return newChallenge;
  };

  const verifyReportByGov = (reportId: string) => {
    const updatedReports = reports.map((r) => r.id === reportId ? { ...r, status: 'Verified' as ReportStatus } : r);
    saveReports(updatedReports);
    logActivity('Government Verification', `Verified report ${reportId}`);
    showToast(`Report ${reportId} verified by Government Nodal Officer.`);
  };

  const acceptChallenge = (challengeId: string, universityName: string, team: { lead: string; mentor: string; members: string[] }) => {
    const targetChallenge = challenges.find((c) => c.id === challengeId);
    if (!targetChallenge) return;

    const updatedChallenges = challenges.map((c) => {
      if (c.id === challengeId) {
        return {
          ...c,
          status: 'Active' as ChallengeStatus,
          assigned_university: universityName,
          assigned_team: team,
        };
      }
      return c;
    });
    saveChallenges(updatedChallenges);

    const newProject: Project = {
      id: `p-${Date.now()}`,
      challenge_id: challengeId,
      challenge_title: targetChallenge.title,
      category: targetChallenge.category,
      district: targetChallenge.district,
      university_name: universityName,
      status: 'Active',
      progress: 25,
      impact_population: targetChallenge.affected_population,
      team: team,
      milestones: [
        { id: `m-${Date.now()}-1`, title: 'Challenge Acceptance & Team Setup', status: 'completed', completed_date: new Date().toISOString().split('T')[0] },
        { id: `m-${Date.now()}-2`, title: 'Architecture & Solution Prototype', status: 'in_progress' },
        { id: `m-${Date.now()}-3`, title: 'Field Pilot & District Testing', status: 'pending' },
        { id: `m-${Date.now()}-4`, title: 'Government Implementation', status: 'pending' }
      ],
      created_at: new Date().toISOString()
    };

    saveProjects([newProject, ...projects]);

    logActivity('University Acceptance', `${universityName} accepted "${targetChallenge.title}"`);
    addNotification('industry', 'Project Support Opportunity', `${universityName} accepted "${targetChallenge.title}". Seeking CSR support.`);
    addNotification('government', 'Project Active', `Project "${targetChallenge.title}" is now Active in ${targetChallenge.district}.`);

    showToast(`Challenge accepted by ${universityName}! Project workspace initialized.`);
  };

  const addCollaboration = (challengeId: string, partnerName: string, funding: string, supportType: string) => {
    const updatedChallenges = challenges.map((c) => {
      if (c.id === challengeId) {
        return {
          ...c,
          industry_collaboration: {
            partner: partnerName,
            funding: funding,
            support_type: supportType,
            status: 'Active'
          }
        };
      }
      return c;
    });
    saveChallenges(updatedChallenges);

    const updatedProjects = projects.map((p) => {
      if (p.challenge_id === challengeId) {
        return {
          ...p,
          industry_partner: partnerName,
          funding_amount: funding,
          resources_provided: [supportType, 'Technical Mentorship']
        };
      }
      return p;
    });
    saveProjects(updatedProjects);

    logActivity('Industry Collaboration', `${partnerName} pledged ${funding} for challenge ${challengeId}`);
    addNotification('university', 'Funding Pledge Received', `${partnerName} pledged ${funding} + ${supportType}.`);
    addNotification('government', 'CSR Support Confirmed', `${partnerName} committed ${funding} for project in ${challengeId}.`);

    showToast(`Collaboration Pledge Sent ✓ (${partnerName}: ${funding})`);
  };

  const markNotificationRead = (id: string) => {
    const updatedNotifs = notifications.map((n) => n.id === id ? { ...n, read: true } : n);
    saveNotifications(updatedNotifs);
  };

  const signOutUser = () => {
    setIsAuthenticated(false);
    setRoleState('citizen');
    setUser(SEEDED_ACCOUNTS['citizen']);
    try {
      localStorage.removeItem('jansetu_remember_me');
      sessionStorage.removeItem('jansetu_session_auth');
    } catch (e) {}
    showToast('Signed out of session.');
  };

  const contextValue = useMemo(() => ({
    user,
    role,
    isAuthenticated,
    isAuthLoaded,
    setRole,
    theme,
    setTheme,
    reports,
    challenges,
    projects,
    universities,
    industries,
    notifications,
    activityLogs,
    stats: liveTelemetry,
    toast,
    showToast,
    addToast: showToast,
    loginUser,
    submitReport,
    addChallenge: (challenge: Challenge) => {
      saveChallenges([challenge, ...challenges]);
      showToast(`Challenge "${challenge.title}" published!`);
    },
    verifyReportByGov,
    acceptChallenge,
    addCollaboration,
    markNotificationRead,
    signOutUser,
  }), [
    user,
    role,
    isAuthenticated,
    isAuthLoaded,
    theme,
    reports,
    challenges,
    projects,
    universities,
    industries,
    notifications,
    activityLogs,
    liveTelemetry,
    toast,
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
