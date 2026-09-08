export type UserRole = 'citizen' | 'university' | 'industry' | 'government';

export type ReportStatus = 
  | 'Submitted' 
  | 'Under Review' 
  | 'Verified' 
  | 'Matched' 
  | 'In Progress' 
  | 'Field Pilot' 
  | 'Resolved';

export type ChallengeStatus = 'Reported' | 'Verified' | 'Matched' | 'Active' | 'Implemented';

export type Severity = 'Low' | 'Medium' | 'High' | 'Critical';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  district?: string;
  organization?: string;
  avatar?: string;
}

export interface PartnerMatch {
  name: string;
  match: number;
  reason?: string;
  support?: string;
}

export interface ProblemReport {
  id: string;
  title: string;
  description: string;
  district: string;
  block?: string;
  category: string;
  location: string;
  photo?: string;
  status: ReportStatus;
  priorityScore: number;
  severity: Severity;
  affectedPopulation: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  similarReportsCount: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  sub_category?: string;
  district: string;
  location: string;
  priority_score: number;
  severity: Severity;
  affected_population: number;
  similar_report_count: number;
  required_skills: string[];
  status: ChallengeStatus;
  created_at: string;
  created_by: string;
  university_matches: PartnerMatch[];
  industry_matches: PartnerMatch[];
  assigned_university?: string;
  assigned_team?: {
    lead: string;
    mentor: string;
    members: string[];
  };
  isNew?: boolean;
  justResolved?: boolean;
  industry_collaboration?: {
    partner: string;
    funding?: string;
    support_type?: string;
    status: string;
  };
  image?: string;
}

export interface University {
  id: string;
  name: string;
  departments: string[];
  skills: string[];
  location: string;
  active_projects: number;
  matched_challenges: number;
  completed_projects: number;
  students_count: number;
}

export interface IndustryPartner {
  id: string;
  name: string;
  support_types: string[];
  skills: string[];
  location: string;
}

export interface Milestone {
  id: string;
  title: string;
  status: 'completed' | 'in_progress' | 'pending';
  evidence?: string;
  completed_date?: string;
}

export interface Project {
  id: string;
  challenge_id: string;
  challenge_title: string;
  category: string;
  district: string;
  university_name: string;
  industry_partner?: string;
  status: ChallengeStatus;
  progress: number;
  impact_population: number;
  team: {
    lead: string;
    mentor: string;
    members: string[];
  };
  milestones: Milestone[];
  funding_amount?: string;
  resources_provided?: string[];
  created_at: string;
}

export interface AppNotification {
  id: string;
  recipientRole: UserRole;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  userRole: UserRole;
  userName: string;
  action: string;
  details: string;
}

export interface AIAnalysisRequest {
  description: string;
  district?: string;
  image?: string;
}

export interface AIAnalysisResult {
  title: string;
  category: string;
  sub_category: string;
  district: string;
  severity: Severity;
  priority_score: number;
  affected_population: number;
  similar_reports: number;
  required_skills: string[];
  university_matches: PartnerMatch[];
  industry_matches: PartnerMatch[];
  summary: string;
}
