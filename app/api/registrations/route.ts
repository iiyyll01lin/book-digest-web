import { NextRequest, NextResponse } from 'next/server';
import { listRegistrations } from '@/lib/notion';

// GET /api/registrations?limit=10
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get('limit') || '10');
    const dbId = process.env.NOTION_DB_ID;
    const token = process.env.NOTION_TOKEN;
    if (!dbId || !token) {
      return NextResponse.json({ items: [], simulated: true }, { status: 200 });
    }
    const items = await listRegistrations(dbId, limit);
    return NextResponse.json({ items }, { status: 200 });
  } catch (err) {
    console.error('List registrations error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
