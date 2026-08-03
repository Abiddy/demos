import { randomBytes } from 'crypto';
import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';
import type { DemoPayload } from '@/lib/demo-payload';

const DEMO_TTL_MS = 1000 * 60 * 60 * 24 * 14; // 14 days
const STORE_DIR = path.join(os.tmpdir(), 'demo-studio-payloads');

type StoredDemo = {
  id: string;
  createdAt: number;
  payload: DemoPayload;
};

function isValidId(id: string): boolean {
  return /^[A-Za-z0-9_-]{8,32}$/.test(id);
}

async function ensureStoreDir(): Promise<void> {
  await fs.mkdir(STORE_DIR, { recursive: true });
}

function filePath(id: string): string {
  return path.join(STORE_DIR, `${id}.json`);
}

async function pruneExpired(): Promise<void> {
  try {
    const files = await fs.readdir(STORE_DIR);
    const now = Date.now();

    await Promise.all(
      files.map(async (file) => {
        if (!file.endsWith('.json')) return;
        const fullPath = path.join(STORE_DIR, file);
        try {
          const raw = await fs.readFile(fullPath, 'utf8');
          const stored = JSON.parse(raw) as StoredDemo;
          if (!stored.createdAt || now - stored.createdAt > DEMO_TTL_MS) {
            await fs.unlink(fullPath);
          }
        } catch {
          // ignore unreadable files
        }
      }),
    );
  } catch {
    // store dir may not exist yet
  }
}

export async function createStoredDemo(payload: DemoPayload): Promise<string> {
  await ensureStoreDir();
  await pruneExpired();

  const id = randomBytes(9).toString('base64url');
  const stored: StoredDemo = {
    id,
    createdAt: Date.now(),
    payload,
  };

  await fs.writeFile(filePath(id), JSON.stringify(stored), 'utf8');
  return id;
}

export async function readStoredDemo(id: string): Promise<DemoPayload | null> {
  if (!isValidId(id)) return null;

  try {
    const raw = await fs.readFile(filePath(id), 'utf8');
    const stored = JSON.parse(raw) as StoredDemo;

    if (!stored?.payload?.templateId) return null;

    if (Date.now() - stored.createdAt > DEMO_TTL_MS) {
      await fs.unlink(filePath(id)).catch(() => {});
      return null;
    }

    return stored.payload;
  } catch {
    return null;
  }
}
