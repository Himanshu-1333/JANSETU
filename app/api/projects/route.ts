import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'JanSetu Persistent Projects API Active' });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const projectId = `p-${Date.now()}`;
    return NextResponse.json({ success: true, projectId, project: body });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
