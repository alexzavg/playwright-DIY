import { test } from '../../../src/fixtures/main-fixture';
import { expect } from '../../../src/utils/wrapped-expect';
import { tags } from '../../../src/test-data/test-tags';
import { Note } from '../../../src/api/requests/notes/notes-api';

const noteText = `TC-01 test note ${Date.now()}`;

let createdNote: Note;

test.describe('TC-01: Create a note', () => {
  test.beforeEach(async ({ anonUser }) => {
    await test.step('Open the Notes page', async () => {
      await anonUser.notesPage.open();
    });
  });

  test.afterEach(async ({ api, addCleanup }) => {
    addCleanup(async () => {
      await api.notes.deleteNote(createdNote.id);
    });
  });
  
  test(
    'User can create a note via the UI',
    { tag: [tags.e2e] },
    async ({ anonUser }) => {
      await test.step('Create a new note and capture API response', async () => {
        const responsePromise = anonUser.notesPage.waitForCreateNoteResponse();
        await anonUser.notesPage.createNote(noteText);
        createdNote = await responsePromise;
      });

      await test.step('Verify the note appears in the list', async () => {
        await anonUser.notesPage.waitForNoteVisible(noteText);
      });

      await test.step('Verify note has a random author assigned', async () => {
        await expect(anonUser.notesPage.locators.noteAuthorName(noteText)).not.toBeEmpty();
      });

      await test.step('Verify API response has correct structure', async () => {
        expect(createdNote.id).toBeDefined();
        expect(createdNote.text).toBe(noteText);
        expect(createdNote.author).toBeDefined();
        expect(createdNote.replies).toEqual([]);
      });
    },
  );
});
