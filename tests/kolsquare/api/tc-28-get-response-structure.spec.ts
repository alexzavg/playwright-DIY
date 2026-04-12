import { test } from '../../../src/fixtures/main-fixture';
import { expect } from '@playwright/test';
import { tags } from '../../../src/test-data/test-tags';
import { Note } from '../../../src/api/requests/notes/notes-api';

const replyText = `TC-28 reply ${Date.now()}`;

let noteId: number;

test.describe('TC-28: GET /api/notes response structure', () => {
  test.beforeEach(async ({ api, anonUser }) => {
    await test.step('Create a note with a reply via API (setup)', async () => {
      const noteRes = await api.notes.createNote('TC-28 structure test');
      noteId = (noteRes.data as { id: number }).id;
      await api.notes.createReply(noteId, replyText);
    });

    await test.step('Open the Notes page', async () => {
      await anonUser.notesPage.open();
    });
  });

  test.afterEach(async ({ api, addCleanup }) => {
    addCleanup(async () => {
      await api.notes.deleteNote(noteId);
    });
  });

  test(
    'GET /api/notes returns a valid JSON array with correct note structure',
    { tag: [tags.api] },
    async ({ api }) => {
      await test.step('GET /api/notes and validate structure', async () => {
        const res = await api.notes.getAllNotes();

        expect(res.status).toBe(200);

        const notes = res.data as Note[];
        expect(Array.isArray(notes)).toBe(true);
        expect(notes.length).toBeGreaterThan(0);

        const note = notes.find((n) => n.id === noteId)!;
        expect(note).toBeDefined();
        expect(typeof note.id).toBe('number');
        expect(typeof note.text).toBe('string');
        expect(note.author).toBeDefined();
        expect(typeof note.author.id).toBe('number');
        expect(typeof note.author.avatar).toBe('string');
        expect(typeof note.author.firstName).toBe('string');
        expect(typeof note.author.lastName).toBe('string');
        expect(Array.isArray(note.replies)).toBe(true);
        expect(typeof note.createdAt).toBe('string');
        expect(typeof note.updatedAt).toBe('string');

        const reply = note.replies[0];
        expect(reply).toBeDefined();
        expect(typeof reply.id).toBe('number');
        expect(typeof reply.text).toBe('string');
        expect(reply.author).toBeDefined();
        expect(typeof reply.createdAt).toBe('string');
      });
    },
  );
});
