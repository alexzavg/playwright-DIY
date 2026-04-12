import { test } from '../../../src/fixtures/main-fixture';
import { tags } from '../../../src/test-data/test-tags';

const noteText = `TC-08 thread note ${Date.now()}`;
const replyTexts = [
  `Reply 1 ${Date.now()}`,
  `Reply 2 ${Date.now()}`,
  `Reply 3 ${Date.now()}`,
];

let noteId: number;

test.describe('TC-08: Expand collapsed thread', () => {
  test.afterEach(async ({ api, addCleanup }) => {
    addCleanup(async () => {
      await api.notes.deleteNote(noteId);
    });
  });

  test(
    'User can expand reply thread',
    { tag: [tags.e2e] },
    async ({ anonUser, api }) => {
      await test.step('Create a note with 3 replies via API', async () => {
        const res = await api.notes.createNote(noteText);
        noteId = (res.data as { id: number }).id;

        for (const text of replyTexts) {
          await api.notes.createReply(noteId, text);
        }
      });

      await test.step('Open the Notes page', async () => {
        await anonUser.notesPage.open();
      });

      await test.step('Verify thread is collapsed with "Show more replies" button', async () => {
        await anonUser.notesPage.waitForShowMoreRepliesVisible(noteText);
      });

      await test.step('Click "Show more replies" to expand', async () => {
        await anonUser.notesPage.expandThread(noteText);
      });

      await test.step('Verify all replies are now visible', async () => {
        for (const text of replyTexts) {
          await anonUser.notesPage.waitForReplyVisible(noteText, text);
        }
      });
    },
  );
});