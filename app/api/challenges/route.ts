import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'JanSetu Persistent Challenge API Active' });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const challengeId = `ch-${Date.now()}`;
    return NextResponse.json({ success: true, challengeId, data: body });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create challenge' }, { status: 500 });
  }
}
