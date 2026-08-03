import { NextResponse } from 'next/server';
import { createStoredDemo } from '@/lib/demo-store';
import type { DemoPayload, DemoTemplateId } from '@/lib/demo-payload';

export const runtime = 'nodejs';

const TEMPLATE_IDS: DemoTemplateId[] = [
  'construction',
  'construction-2',
  'realtor',
  'cafe',
];

function isDemoPayload(value: unknown): value is DemoPayload {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.templateId === 'string' &&
    TEMPLATE_IDS.includes(v.templateId as DemoTemplateId) &&
    typeof v.businessName === 'string' &&
    typeof v.phone === 'string' &&
    typeof v.address === 'string' &&
    typeof v.description === 'string' &&
    typeof v.tagline === 'string' &&
    Array.isArray(v.images) &&
    v.images.every((img) => typeof img === 'string')
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!isDemoPayload(body)) {
      return NextResponse.json({ error: 'Invalid demo payload.' }, { status: 400 });
    }

    if (!body.businessName.trim() || !body.phone.trim() || !body.address.trim()) {
      return NextResponse.json(
        { error: 'Business name, phone, and address are required.' },
        { status: 400 },
      );
    }

    if (body.images.length > 5) {
      return NextResponse.json(
        { error: 'A maximum of 5 images is allowed.' },
        { status: 400 },
      );
    }

    const id = await createStoredDemo({
      templateId: body.templateId,
      businessName: body.businessName.trim(),
      phone: body.phone.trim(),
      address: body.address.trim(),
      description: body.description.trim(),
      tagline: body.tagline.trim(),
      images: body.images,
    });

    return NextResponse.json({ id });
  } catch (error) {
    console.error('Failed to create demo', error);
    return NextResponse.json(
      { error: 'Could not create shareable demo.' },
      { status: 500 },
    );
  }
}
