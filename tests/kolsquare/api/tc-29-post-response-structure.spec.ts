import { test } from '../../../src/fixtures/main-fixture';
import { expect } from '@playwright/test';
import { tags } from '../../../src/test-data/test-tags';
import { Note } from '../../../src/api/requests/notes/notes-api';

test.describe('TC-29: POST /api/notes response structure', () => {
  test(
    'POST /api/notes returns a valid note object with correct structure',
    { tag: [tags.api] },
    async ({ api, addCleanup }) => {
      const noteText = `TC-29 post test ${Date.now()}`;

      await test.step('POST /api/notes and validate response', async () => {
        const res = await api.notes.createNote(noteText);

        expect(res.status).toBe(200);

        const note = res.data as Note;
        expect(typeof note.id).toBe('number');
        expect(note.text).toBe(noteText);
        expect(note.author).toBeDefined();
        expect(typeof note.author.id).toBe('number');
        expect(typeof note.author.avatar).toBe('string');
        expect(typeof note.author.firstName).toBe('string');
        expect(typeof note.author.lastName).toBe('string');
        expect(Array.isArray(note.replies)).toBe(true);
        expect(note.replies).toHaveLength(0);
        expect(typeof note.createdAt).toBe('string');
        expect(typeof note.updatedAt).toBe('string');

        addCleanup(async ({ api }) => {
          await api.notes.deleteNote(note.id);
        });
      });
    },
  );
});
