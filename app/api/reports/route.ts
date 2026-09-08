import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'JanSetu Persistent Report API Active' });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, district, category, photo } = body;

    if (!description || !district) {
      return NextResponse.json({ error: 'Description and district are required fields.' }, { status: 400 });
    }

    const reportId = `rep-${Date.now()}`;
    const reportRecord = {
      id: reportId,
      title: title || 'Community Problem Report',
      description,
      district,
      category: category || 'Water & Sanitation',
      location: `${district} Block 4, Jharkhand`,
      photo: photo || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
      status: 'Verified',
      priorityScore: 91,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({ success: true, report: reportRecord });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to process report' }, { status: 500 });
  }
}
