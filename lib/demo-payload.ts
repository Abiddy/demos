export type DemoTemplateId =
  | 'construction'
  | 'construction-2'
  | 'realtor'
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
  href: string;
}[] = [
  { id: 'realtor', label: 'Realtor', href: '/realtor?demo=1' },
  { id: 'cafe', label: 'Cafe', href: '/cafe?demo=1' },
  { id: 'construction', label: 'Construction', href: '/fjc?demo=1' },
  { id: 'construction-2', label: 'Construction 2', href: '/jr?demo=1' },
];

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
