import { test } from '../../../src/fixtures/main-fixture';
import { tags } from '../../../src/test-data/test-tags';

const noteText = `TC-04 delete me ${Date.now()}`;

test.describe('TC-04: Delete a note', () => {
  test.beforeEach(async ({ api, anonUser }) => {
    await test.step('Create a note via API for setup', async () => {
      await api.notes.createNote(noteText);
    });

    await test.step('Open the Notes page', async () => {
      await anonUser.notesPage.open();
    });
  });
  
  test(
    'User can delete a note via the UI',
    { tag: [tags.e2e] },
    async ({ anonUser }) => {
      await test.step('Verify the note is visible', async () => {
        await anonUser.notesPage.waitForNoteVisible(noteText);
      });

      await test.step('Delete the note via UI', async () => {
        await anonUser.notesPage.deleteNote(noteText);
      });

      await test.step('Verify the note is no longer in the list', async () => {
        await anonUser.notesPage.waitForNoteHidden(noteText);
      });
    },
  );
});
