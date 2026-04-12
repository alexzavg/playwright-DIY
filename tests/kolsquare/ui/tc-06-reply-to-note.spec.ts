import { test } from '../../../src/fixtures/main-fixture';
import { tags } from '../../../src/test-data/test-tags';

const noteText = `TC-06 parent note ${Date.now()}`;
const replyText = `TC-06 reply ${Date.now()}`;

let noteId: number;

test.describe('TC-06: Reply to a note', () => {
  test.beforeEach(async ({ api, anonUser }) => {
    await test.step('Create a parent note via API', async () => {
      const res = await api.notes.createNote(noteText);
      noteId = (res.data as { id: number }).id;
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
    'User can reply to a note via the UI',
    { tag: [tags.e2e] },
    async ({ anonUser }) => {
      await test.step('Reply to the note', async () => {
        await anonUser.notesPage.replyToNote(noteText, replyText);
      });

      await test.step('Verify the reply appears under the parent note', async () => {
        await anonUser.notesPage.waitForReplyVisible(noteText, replyText);
      });
    },
  );
});
