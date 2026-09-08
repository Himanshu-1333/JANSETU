import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { description = '', district = 'Dumka' } = body;

    // Simulated short delay for AI model execution animation if called direct
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Dynamic keyword matching for realistic fallback responses if user enters custom text
    let title = 'Unsafe Drinking Water';
    let category = 'Water & Sanitation';
    let sub_category = 'Drinking Water Quality';
    let priority_score = 91;
    let severity = 'High';
    let affected_population = 1240;
    let similar_reports = 17;
    let required_skills = ['IoT', 'Environmental Engineering', 'Data Science'];
    let university_matches = [
      { name: 'BIT Jharkhand', match: 96, reason: 'IoT research lab & environmental sensing team' },
      { name: 'Ranchi University', match: 84, reason: 'Water quality research department' }
    ];
    let industry_matches = [
      { name: 'AquaTech Solutions', match: 91, support: 'Sensor hardware + ₹3,00,000 prototype funding' },
      { name: 'Jharkhand Hydro Corp', match: 82, support: 'Field engineering mentor support' }
    ];

    const descLower = description.toLowerCase();

    if (descLower.includes('waste') || descLower.includes('garbage') || descLower.includes('drain')) {
      title = 'Smart Waste Collection & Drainage';
      category = 'Urban Infrastructure';
      sub_category = 'Solid Waste Management';
      priority_score = 81;
      affected_population = 4800;
      similar_reports = 24;
      required_skills = ['IoT', 'Logistics', 'AI'];
      university_matches = [{ name: 'Ranchi University', match: 92, reason: 'Smart City logistics lab' }];
      industry_matches = [{ name: 'CleanCity Tech', match: 88, support: 'Smart bins & cloud dashboard' }];
    } else if (descLower.includes('school') || descLower.includes('student') || descLower.includes('attendance')) {
      title = 'School Attendance & Dropout Prevention';
      category = 'Education & Skill';
      sub_category = 'Primary Education';
      priority_score = 78;
      severity = 'Medium';
      affected_population = 2100;
      similar_reports = 9;
      required_skills = ['Web', 'Data', 'Education'];
      university_matches = [{ name: 'Vinoba Bhave University', match: 90, reason: 'Mobile app development lab' }];
      industry_matches = [{ name: 'EduReach Foundation', match: 85, support: 'Tablets & cloud software' }];
    } else if (descLower.includes('health') || descLower.includes('hospital') || descLower.includes('doctor')) {
      title = 'Rural Healthcare & Tele-triage System';
      category = 'Healthcare';
      sub_category = 'Tele-medicine';
      priority_score = 88;
      affected_population = 6400;
      similar_reports = 31;
      required_skills = ['HealthTech', 'Mobile', 'Data Science'];
      university_matches = [{ name: 'IIT (ISM) Dhanbad', match: 94, reason: 'HealthTech innovation cell' }];
      industry_matches = [{ name: 'HealthFirst CSR', match: 90, support: 'Diagnostic kits & telemetry' }];
    }

    return NextResponse.json({
      title,
      category,
      sub_category,
      district,
      severity,
      priority_score,
      affected_population,
      similar_reports,
      required_skills,
      university_matches,
      industry_matches,
      summary: `AI classified submission from ${district} as ${category}. Recommended immediate university innovation partnership.`
    });
  } catch (error) {
    return NextResponse.json({ error: 'AI analysis failed' }, { status: 500 });
  }
}
