import { Challenge, University, IndustryPartner, Project, UserAccount, ProblemReport } from './types';

export const SEEDED_ACCOUNTS: Record<string, UserAccount> = {
  citizen: {
    id: 'usr-1',
    name: 'Ananya Roy',
    email: 'citizen@jansetu.app',
    role: 'citizen',
    district: 'Dumka',
    avatar: 'AR'
  },
  university: {
    id: 'usr-2',
    name: 'Prof. S. K. Roy',
    email: 'university@jansetu.app',
    role: 'university',
    organization: 'BIT Jharkhand',
    district: 'Ranchi',
    avatar: 'BIT'
  },
  industry: {
    id: 'usr-3',
    name: 'Rajesh Verma',
    email: 'industry@jansetu.app',
    role: 'industry',
    organization: 'AquaTech Solutions',
    district: 'Jamshedpur',
    avatar: 'AT'
  },
  government: {
    id: 'usr-4',
    name: 'Nodal Officer',
    email: 'government@jansetu.app',
    role: 'government',
    organization: 'Department of Higher Education & Innovation',
    district: 'Ranchi',
    avatar: 'GOV'
  }
};

export const INITIAL_REPORTS: ProblemReport[] = [
  {
    id: 'rep-1',
    title: 'Unsafe Drinking Water',
    description: 'Our village drinking water is contaminated with heavy sediment and industrial runoff, causing recurring waterborne illness among school children and households in Dumka district.',
    district: 'Dumka',
    block: 'Dumka Rural Block 4',
    category: 'Water & Sanitation',
    location: 'Dumka Rural Block 4, Jharkhand',
    photo: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
    status: 'Verified',
    priorityScore: 91,
    severity: 'High',
    affectedPopulation: 1240,
    createdBy: 'Ananya Roy (Gram Sabha)',
    createdAt: '2026-09-02T10:30:00Z',
    updatedAt: '2026-09-03T11:00:00Z',
    similarReportsCount: 17
  },
  {
    id: 'rep-2',
    title: 'Smart Waste Collection System',
    description: 'Overflowing community bins in commercial hubs causing severe health risks and drain blockages during monsoon season in central Ranchi.',
    district: 'Ranchi',
    block: 'Main Road Ward 12',
    category: 'Urban Infrastructure',
    location: 'Main Road Market, Ranchi, Jharkhand',
    photo: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    status: 'Matched',
    priorityScore: 81,
    severity: 'High',
    affectedPopulation: 4800,
    createdBy: 'Ranchi Citizen Forum',
    createdAt: '2026-08-28T14:15:00Z',
    updatedAt: '2026-08-30T09:20:00Z',
    similarReportsCount: 24
  }
];

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'ch-1',
    title: 'Unsafe Drinking Water',
    description: 'Our village drinking water is contaminated with heavy sediment and industrial runoff, causing recurring waterborne illness among school children and households in Dumka district.',
    category: 'Water & Sanitation',
    sub_category: 'Drinking Water Quality',
    district: 'Dumka',
    location: 'Dumka Rural Block 4, Jharkhand',
    priority_score: 91,
    severity: 'High',
    affected_population: 1240,
    similar_report_count: 17,
    required_skills: ['IoT', 'Environmental', 'Data Science'],
    status: 'Verified',
    created_at: '2026-09-02T10:30:00Z',
    created_by: 'Gram Sabha Representative',
    university_matches: [
      { name: 'BIT Jharkhand', match: 96, reason: 'Strong IoT research lab & water quality sensing projects' },
      { name: 'Ranchi University', match: 84, reason: 'Environmental science faculty expertise' }
    ],
    industry_matches: [
      { name: 'AquaTech Solutions', match: 91, support: 'Sensor hardware + ₹3,00,000 funding pledge' },
      { name: 'Jharkhand Hydro Corp', match: 83, support: 'Technical mentorship & field installation' }
    ],
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ch-2',
    title: 'Smart Waste Collection System',
    description: 'Overflowing community bins in commercial hubs causing severe health risks and drain blockages during monsoon season in central Ranchi.',
    category: 'Urban Infrastructure',
    sub_category: 'Solid Waste Management',
    district: 'Ranchi',
    location: 'Main Road Market, Ranchi, Jharkhand',
    priority_score: 81,
    severity: 'High',
    affected_population: 4800,
    similar_report_count: 24,
    required_skills: ['IoT', 'Logistics', 'AI'],
    status: 'Matched',
    created_at: '2026-08-28T14:15:00Z',
    created_by: 'Ranchi Citizen Forum',
    university_matches: [
      { name: 'Ranchi University', match: 92, reason: 'Logistics optimization & smart city research lab' }
    ],
    industry_matches: [
      { name: 'CleanCity Tech', match: 88, support: 'Smart bin hardware & cloud dashboard' }
    ],
    assigned_university: 'Ranchi University',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ch-3',
    title: 'School Attendance Monitoring',
    description: 'High dropout rate and irregular student attendance in primary schools across remote rural pockets of Giridih district due to lack of real-time tracking.',
    category: 'Education & Skill',
    sub_category: 'Primary Education',
    district: 'Giridih',
    location: 'Tisri Block Schools, Giridih',
    priority_score: 78,
    severity: 'Medium',
    affected_population: 2100,
    similar_report_count: 9,
    required_skills: ['Web', 'Data', 'Education'],
    status: 'Active',
    created_at: '2026-08-20T09:00:00Z',
    created_by: 'Headmaster Association Giridih',
    university_matches: [
      { name: 'Vinoba Bhave University', match: 90, reason: 'Computer science department mobile app lab' }
    ],
    industry_matches: [
      { name: 'EduReach Foundation', match: 85, support: 'Tablet devices & cloud deployment' }
    ],
    assigned_university: 'Vinoba Bhave University',
    assigned_team: {
      lead: 'Prof. S. K. Roy',
      mentor: 'Dr. Anita Sharma',
      members: ['Rahul Kumar (Fullstack)', 'Priya Das (UI/UX)', 'Amit Verma (Data Analysis)']
    },
    industry_collaboration: {
      partner: 'EduReach Foundation',
      funding: '₹1,50,000',
      support_type: 'Software & Hardware Tablets',
      status: 'Active'
    },
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ch-4',
    title: 'Street Light Reliability & Fault Alerts',
    description: 'Frequent power outages and delayed repair of public streetlights on key arterial roads in Dhanbad leading to safety concerns.',
    category: 'Public Safety',
    sub_category: 'Municipal Infrastructure',
    district: 'Dhanbad',
    location: 'Jharia Main Corridor, Dhanbad',
    priority_score: 73,
    severity: 'Medium',
    affected_population: 3700,
    similar_report_count: 14,
    required_skills: ['IoT', 'Energy', 'Civic Tech'],
    status: 'Implemented',
    created_at: '2026-07-15T08:20:00Z',
    created_by: 'Dhanbad Safety Group',
    university_matches: [
      { name: 'IIT (ISM) Dhanbad', match: 88, reason: 'Power systems & IoT automation unit' }
    ],
    industry_matches: [
      { name: 'PowerGrid Solutions', match: 87, support: 'Smart switches & maintenance support' }
    ],
    assigned_university: 'IIT (ISM) Dhanbad',
    assigned_team: {
      lead: 'Dr. K. N. Singh',
      mentor: 'Prof. R. P. Gupta',
      members: ['Vikas Singh (Hardware)', 'Neha Kumari (Cloud Integration)']
    },
    industry_collaboration: {
      partner: 'PowerGrid Solutions',
      funding: '₹2,00,000',
      support_type: 'Hardware & Maintenance',
      status: 'Implemented'
    },
    image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ch-5',
    title: 'Rural Healthcare Access & Tele-triage',
    description: 'Lack of immediate medical advice and specialist consultation in remote primary health centers in Bokaro district.',
    category: 'Healthcare',
    sub_category: 'Tele-medicine',
    district: 'Bokaro',
    location: 'Chas Rural PHC, Bokaro',
    priority_score: 88,
    severity: 'High',
    affected_population: 6400,
    similar_report_count: 31,
    required_skills: ['HealthTech', 'Mobile', 'Data Science'],
    status: 'Verified',
    created_at: '2026-08-25T11:45:00Z',
    created_by: 'Bokaro District Health Worker',
    university_matches: [
      { name: 'BIT Sindri', match: 94, reason: 'HealthTech Innovation Cell & mobile diagnostics' }
    ],
    industry_matches: [
      { name: 'HealthFirst CSR', match: 90, support: 'Telemedicine kit & doctor network support' }
    ],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ch-6',
    title: 'Solar Cold Storage for Perishable Crops',
    description: 'Smallholder vegetable farmers face up to 40% post-harvest spoilage in Ichak block due to non-existent cold chains during peak summer months.',
    category: 'Water & Sanitation',
    sub_category: 'CleanTech & Agriculture',
    district: 'Giridih',
    location: 'Ichak Farmers Cooperative, Hazaribagh / Giridih',
    priority_score: 89,
    severity: 'High',
    affected_population: 5400,
    similar_report_count: 28,
    required_skills: ['Solar Power', 'IoT Thermal Sensing', 'CleanTech'],
    status: 'Verified',
    created_at: '2026-08-27T08:15:00Z',
    created_by: 'Krishi Vikas Kendra Nodal',
    university_matches: [
      { name: 'Vinoba Bhave University', match: 93, reason: 'Solar thermal lab & rural innovation cell' }
    ],
    industry_matches: [
      { name: 'CleanCity Tech', match: 89, support: 'Solar battery array & ₹2,50,000 grant' }
    ],
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ch-7',
    title: 'Maternal Tele-triage & Portable Ultrasound Unit',
    description: 'Pregnant women in Sarath sub-district must travel over 45 km over unpaved roads for basic maternal checkups and fetal health screenings.',
    category: 'Healthcare',
    sub_category: 'Maternal Care Tele-health',
    district: 'Dumka',
    location: 'Sarath Sub-District PHC, Dumka Network',
    priority_score: 94,
    severity: 'Critical',
    affected_population: 7200,
    similar_report_count: 35,
    required_skills: ['HealthTech', 'AI Tele-triage', 'Mobile Systems'],
    status: 'Verified',
    created_at: '2026-09-01T14:20:00Z',
    created_by: 'District Nodal Health Officer',
    university_matches: [
      { name: 'BIT Jharkhand', match: 95, reason: 'Biomedical signal processing & IoT telemetry lab' }
    ],
    industry_matches: [
      { name: 'HealthFirst CSR', match: 92, support: 'Handheld diagnostic probes & doctor network' }
    ],
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ch-8',
    title: 'Smart Drainage & Flood Alert Sensor Grid',
    description: 'Low-lying residential and market areas experience sudden flash waterlogging during heavy monsoon downpours, damaging local micro-enterprises.',
    category: 'Urban Infrastructure',
    sub_category: 'Stormwater Telemetry',
    district: 'Ranchi',
    location: 'Mango & Low-Lying Corridor, Ranchi Zone',
    priority_score: 92,
    severity: 'High',
    affected_population: 12800,
    similar_report_count: 42,
    required_skills: ['Civic Tech', 'IoT Water Level Sensors', 'GIS Analytics'],
    status: 'Active',
    created_at: '2026-08-19T10:00:00Z',
    created_by: 'Ranchi Urban Resilience Forum',
    university_matches: [
      { name: 'Ranchi University', match: 94, reason: 'Urban GIS and environmental drainage modeling team' }
    ],
    industry_matches: [
      { name: 'CleanCity Tech', match: 90, support: 'Ultrasonic depth sensors + ₹3,50,000 pledge' }
    ],
    assigned_university: 'Ranchi University',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ch-9',
    title: 'Digital Artisans Marketplace & Authenticity Track',
    description: 'Traditional Sohrai art and handicraft artisans lack direct digital market access, losing profits to middleman commissions.',
    category: 'Education & Skill',
    sub_category: 'Livelihood & Handicrafts',
    district: 'Ranchi',
    location: 'Khunti Artisan Collective, Ranchi Corridor',
    priority_score: 79,
    severity: 'Medium',
    affected_population: 3100,
    similar_report_count: 18,
    required_skills: ['Web App', 'E-Commerce', 'Digital Marketing'],
    status: 'Verified',
    created_at: '2026-08-30T16:30:00Z',
    created_by: 'Jharkhand Artisans Cooperative',
    university_matches: [
      { name: 'Ranchi University', match: 89, reason: 'Fullstack web development student research cell' }
    ],
    industry_matches: [
      { name: 'EduReach Foundation', match: 86, support: 'Cloud hosting & seller onboarding grant' }
    ],
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ch-10',
    title: 'Heavy Metal Mine Runoff Filtration Pilot',
    description: 'Runoff from coal washeries enters local groundwater streams, causing heavy metal contamination in community drinking wells.',
    category: 'Water & Sanitation',
    sub_category: 'Industrial Runoff Filtration',
    district: 'Dhanbad',
    location: 'Jharia Coalfield PHC Water Intake, Dhanbad',
    priority_score: 96,
    severity: 'Critical',
    affected_population: 9600,
    similar_report_count: 51,
    required_skills: ['Chemical Sensing', 'Filtration Tech', 'IoT Telemetry'],
    status: 'Active',
    created_at: '2026-08-14T09:10:00Z',
    created_by: 'Environmental Watchdog Dhanbad',
    university_matches: [
      { name: 'IIT (ISM) Dhanbad', match: 98, reason: 'Leading mining environment research lab & sensor development' }
    ],
    industry_matches: [
      { name: 'AquaTech Solutions', match: 94, support: 'Heavy metal sensing probes & ₹4,00,000 grant' }
    ],
    assigned_university: 'IIT (ISM) Dhanbad',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_UNIVERSITIES: University[] = [
  {
    id: 'u-1',
    name: 'BIT Jharkhand',
    departments: ['Computer Science & Eng', 'Environmental Eng', 'Electrical Eng'],
    skills: ['IoT', 'Environmental', 'Data Science', 'Embedded Systems'],
    location: 'Ranchi / Dumka Campus',
    active_projects: 12,
    matched_challenges: 38,
    completed_projects: 7,
    students_count: 146
  },
  {
    id: 'u-2',
    name: 'Ranchi University',
    departments: ['Information Technology', 'Civil Engineering', 'Biotechnology'],
    skills: ['IoT', 'Logistics', 'AI', 'Urban Planning'],
    location: 'Ranchi',
    active_projects: 8,
    matched_challenges: 24,
    completed_projects: 5,
    students_count: 98
  },
  {
    id: 'u-3',
    name: 'IIT (ISM) Dhanbad',
    departments: ['Computer Science', 'Electronics & Comm', 'Health Technology'],
    skills: ['HealthTech', 'Energy', 'Data Science', 'Civic Tech'],
    location: 'Dhanbad',
    active_projects: 15,
    matched_challenges: 45,
    completed_projects: 11,
    students_count: 210
  },
  {
    id: 'u-4',
    name: 'Vinoba Bhave University',
    departments: ['Computer Applications', 'Social Sciences'],
    skills: ['Web', 'Data', 'Education', 'Mobile Apps'],
    location: 'Hazaribagh / Giridih',
    active_projects: 6,
    matched_challenges: 19,
    completed_projects: 3,
    students_count: 72
  }
];

export const INITIAL_INDUSTRIES: IndustryPartner[] = [
  {
    id: 'i-1',
    name: 'AquaTech Solutions',
    support_types: ['Funding', 'Hardware', 'Mentorship', 'Pilot'],
    skills: ['IoT Water Sensors', 'Filtration Tech', 'Environmental Data'],
    location: 'Jamshedpur / Ranchi'
  },
  {
    id: 'i-2',
    name: 'CleanCity Tech',
    support_types: ['Hardware', 'Software', 'CSR'],
    skills: ['Smart Sensors', 'Logistics AI', 'Waste Analytics'],
    location: 'Ranchi'
  },
  {
    id: 'i-3',
    name: 'HealthFirst CSR',
    support_types: ['Funding', 'Mentorship', 'Internship'],
    skills: ['Telemedicine Devices', 'Clinical Workflows'],
    location: 'Bokaro'
  },
  {
    id: 'i-4',
    name: 'EduReach Foundation',
    support_types: ['Software', 'Hardware', 'CSR'],
    skills: ['Educational Software', 'Student Tracking'],
    location: 'Dhanbad'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p-1',
    challenge_id: 'ch-3',
    challenge_title: 'School Attendance Monitoring',
    category: 'Education & Skill',
    district: 'Giridih',
    university_name: 'Vinoba Bhave University',
    industry_partner: 'EduReach Foundation',
    status: 'Active',
    progress: 65,
    impact_population: 2100,
    team: {
      lead: 'Prof. S. K. Roy',
      mentor: 'Dr. Anita Sharma',
      members: ['Rahul Kumar (Fullstack)', 'Priya Das (UI/UX)', 'Amit Verma (Data Analysis)']
    },
    milestones: [
      { id: 'm-1', title: 'Problem Validation & Requirements', status: 'completed', completed_date: '2026-08-22' },
      { id: 'm-2', title: 'Prototype Development & Mobile App', status: 'completed', completed_date: '2026-09-01' },
      { id: 'm-3', title: 'Field Pilot in 5 Tisri Schools', status: 'in_progress' },
      { id: 'm-4', title: 'Government District Rollout', status: 'pending' }
    ],
    funding_amount: '₹1,50,000',
    resources_provided: ['30 Android Tablets', 'Cloud Hosting', 'Monthly Mentor Sessions'],
    created_at: '2026-08-21T10:00:00Z'
  },
  {
    id: 'p-2',
    challenge_id: 'ch-4',
    challenge_title: 'Street Light Reliability & Fault Alerts',
    category: 'Public Safety',
    district: 'Dhanbad',
    university_name: 'IIT (ISM) Dhanbad',
    industry_partner: 'PowerGrid Solutions',
    status: 'Implemented',
    progress: 100,
    impact_population: 3700,
    team: {
      lead: 'Dr. K. N. Singh',
      mentor: 'Prof. R. P. Gupta',
      members: ['Vikas Singh (Hardware)', 'Neha Kumari (Cloud Integration)']
    },
    milestones: [
      { id: 'm-10', title: 'IoT Switch Design', status: 'completed', completed_date: '2026-07-20' },
      { id: 'm-11', title: 'Corridor Testing in Jharia', status: 'completed', completed_date: '2026-08-05' },
      { id: 'm-12', title: 'Full Municipal Handover', status: 'completed', completed_date: '2026-08-30' }
    ],
    funding_amount: '₹2,00,000',
    resources_provided: ['150 Smart Relay Sensors', 'Municipal Command API Integration'],
    created_at: '2026-07-18T11:00:00Z'
  }
];

export const PLATFORM_STATS = {
  totalChallenges: 2481,
  verifiedChallenges: 1742,
  activeProjects: 318,
  implementedProjects: 127,
  citizensImpacted: 482000
};
