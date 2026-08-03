import { NextResponse } from 'next/server';
import { readStoredDemo } from '@/lib/demo-store';

export const runtime = 'nodejs';

type RouteContext = {
  params: { id: string };
};

export async function GET(_request: Request, context: RouteContext) {
  const payload = await readStoredDemo(context.params.id);

  if (!payload) {
    return NextResponse.json({ error: 'Demo not found or expired.' }, { status: 404 });
  }

  return NextResponse.json(payload);
}
