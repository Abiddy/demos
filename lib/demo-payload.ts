export type DemoTemplateId =
  | 'construction'
  | 'construction-2'
  | 'realtor'
  | 'realtor-2'
  | 'yani'
  | 'lesli'
  | 'nummy'
  | 'bakery'
  | 'lomelis'
  | 'cafe';

export type DemoPayload = {
  templateId: DemoTemplateId;
  businessName: string;
  phone: string;
  address: string;
  description: string;
  tagline: string;
  images: string[];
};

export const DEMO_STORAGE_KEY = 'demoPayload';

export const DEMO_TEMPLATES: {
  id: DemoTemplateId;
  label: string;
  path: string;
  /** When true, generator opens the static template only (no shareable fill). */
  staticOnly?: boolean;
}[] = [
  { id: 'realtor', label: 'Realtor', path: '/realtor' },
  { id: 'realtor-2', label: 'Realtor 2', path: '/', staticOnly: true },
  { id: 'yani', label: 'Yani', path: '/yani', staticOnly: true },
  { id: 'lesli', label: 'Lesli Koontz', path: '/lesli', staticOnly: true },
  { id: 'nummy', label: 'Nummy Yummy', path: '/nummy', staticOnly: true },
  {
    id: 'bakery',
    label: 'Bakery Facilities',
    path: '/bakery',
    staticOnly: true,
  },
  { id: 'lomelis', label: "Lomeli's", path: '/lomelis', staticOnly: true },
  { id: 'cafe', label: 'Cafe', path: '/cafe' },
  { id: 'construction', label: 'Construction', path: '/fjc' },
  { id: 'construction-2', label: 'Construction 2', path: '/jr' },
];

export function getTemplatePath(templateId: DemoTemplateId): string {
  return (
    DEMO_TEMPLATES.find((template) => template.id === templateId)?.path ?? '/'
  );
}

export function buildDemoSharePath(
  templateId: DemoTemplateId,
  demoId: string,
): string {
  return `${getTemplatePath(templateId)}?demo=${encodeURIComponent(demoId)}`;
}

export async function createShareableDemo(
  payload: DemoPayload,
): Promise<{ id: string; path: string }> {
  const res = await fetch('/api/demo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error || 'Could not create shareable demo.');
  }

  const data = (await res.json()) as { id: string };
  return {
    id: data.id,
    path: buildDemoSharePath(payload.templateId, data.id),
  };
}

export function saveDemoPayload(payload: DemoPayload): void {
  const raw = JSON.stringify(payload);
  // sessionStorage is cloned into script-opened tabs in most browsers;
  // localStorage is a fallback when that clone does not happen.
  sessionStorage.setItem(DEMO_STORAGE_KEY, raw);
  localStorage.setItem(DEMO_STORAGE_KEY, raw);
}

export function readDemoPayload(): DemoPayload | null {
  try {
    const raw =
      sessionStorage.getItem(DEMO_STORAGE_KEY) ??
      localStorage.getItem(DEMO_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DemoPayload;
    if (!parsed?.templateId) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearDemoPayload(): void {
  sessionStorage.removeItem(DEMO_STORAGE_KEY);
  localStorage.removeItem(DEMO_STORAGE_KEY);
}

export function digitsOnlyPhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

export function toTelHref(phone: string): string {
  const digits = digitsOnlyPhone(phone);
  return digits ? `tel:+1${digits}` : '#';
}

export function toMapQuery(address: string): string {
  return encodeURIComponent(address).replace(/%20/g, '+');
}

export function splitTagline(
  tagline: string,
  fallback: { line1: string; line2: string },
): { line1: string; line2: string } {
  const trimmed = tagline.trim();
  if (!trimmed) return fallback;

  if (trimmed.includes('\n')) {
    const [line1 = fallback.line1, ...rest] = trimmed
      .split('\n')
      .map((part) => part.trim())
      .filter(Boolean);
    return { line1, line2: rest.join(' ') || fallback.line2 };
  }

  if (trimmed.includes('|')) {
    const [line1 = fallback.line1, ...rest] = trimmed
      .split('|')
      .map((part) => part.trim())
      .filter(Boolean);
    return { line1, line2: rest.join(' ') || fallback.line2 };
  }

  const sentenceBreak = trimmed.match(/^(.+?[.!?])\s+(.+)$/);
  if (sentenceBreak) {
    return { line1: sentenceBreak[1], line2: sentenceBreak[2] };
  }

  return { line1: trimmed, line2: '' };
}

const MAX_IMAGE_DIMENSION = 1600;
const JPEG_QUALITY = 0.78;

export function compressImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const scale = Math.min(
        1,
        MAX_IMAGE_DIMENSION / Math.max(img.width, img.height),
      );
      const width = Math.max(1, Math.round(img.width * scale));
      const height = Math.max(1, Math.round(img.height * scale));

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not create canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', JPEG_QUALITY));
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error(`Failed to load image: ${file.name}`));
    };

    img.src = objectUrl;
  });
}

export async function compressImageFiles(files: File[]): Promise<string[]> {
  const results: string[] = [];
  for (const file of files) {
    results.push(await compressImageFile(file));
  }
  return results;
}
