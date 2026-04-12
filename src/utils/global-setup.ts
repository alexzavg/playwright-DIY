import { request } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default async function globalSetup() {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl?.includes('kolsquare')) return;

  console.log('[Global Setup] Cleaning all notes before test run...');

  const apiContext = await request.newContext({ baseURL: baseUrl });

  const res = await apiContext.fetch('/api/notes');
  if (!res.ok()) {
    console.warn(`[Global Setup] GET /api/notes returned ${res.status()}, skipping cleanup.`);
    await apiContext.dispose();
    return;
  }

  const notes: Array<{ id: number }> = await res.json();
  console.log(`[Global Setup] Found ${notes.length} note(s) to delete.`);

  for (const note of notes) {
    await apiContext.fetch(`/api/notes/${note.id}`, { method: 'DELETE' });
  }

  console.log('[Global Setup] All notes deleted. Clean environment ready.');
  await apiContext.dispose();
}
