import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const collabId = `collab-${Date.now()}`;
    return NextResponse.json({ success: true, collabId, data: body });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to record collaboration' }, { status: 500 });
  }
}
