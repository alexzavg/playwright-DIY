import { Page } from '@playwright/test';

export class NotesPageLocators {
  constructor(protected page: Page) {}

  get pageTitle() {
    return this.page.locator('header h1').describe('Page Title');
  }

  get createNoteButton() {
    return this.page.locator('button', { hasText: 'Create a new Note' }).describe('Create a new Note Button');
  }

  get dialog() {
    return this.page.locator('[role="dialog"]').describe('Dialog');
  }

  get dialogTitle() {
    return this.dialog.locator('h2').describe('Dialog Title');
  }

  get dialogTextarea() {
    return this.dialog.locator('textarea').describe('Dialog Textarea');
  }

  get dialogSubmitButton() {
    return this.dialog.locator('button[type="submit"]').describe('Dialog Submit Button');
  }

  get dialogCancelButton() {
    return this.dialog.locator('button[type="button"]', { hasText: 'Cancel' }).describe('Dialog Cancel Button');
  }

  get dialogCloseButton() {
    return this.dialog.locator('button[aria-label="Close"]').describe('Dialog Close Button');
  }

  get deleteConfirmButton() {
    return this.dialog.locator('button[data-type="danger"]').describe('Delete Confirm Button');
  }

  get noteCards() {
    return this.page.locator('.note').describe('Note Cards');
  }

  get emptyStateMessage() {
    return this.page.locator('text=No Notes were found').describe('Empty State Message');
  }

  noteCardByText(noteText: string) {
    return this.noteCards.filter({ hasText: noteText }).describe(`Note Card with text "${noteText}"`);
  }

  noteText(noteText: string) {
    return this.noteCardByText(noteText).locator('.whitespace-pre-wrap').first().describe('Note Text');
  }

  noteAuthorName(noteText: string) {
    return this.noteCardByText(noteText).locator('p.font-medium').first().describe('Note Author Name');
  }

  noteControls(noteText: string) {
    return this.noteCardByText(noteText).locator('.controls').first().describe('Note Controls');
  }

  noteEditButton(noteText: string) {
    return this.noteCardByText(noteText).locator('.controls button', { hasText: 'Edit' }).first().describe('Edit Button');
  }

  noteDeleteButton(noteText: string) {
    return this.noteCardByText(noteText).locator('.controls button', { hasText: 'Delete' }).first().describe('Delete Button');
  }

  noteReplyButton(noteText: string) {
    return this.noteCardByText(noteText).locator('button', { hasText: 'Reply' }).describe('Reply Button');
  }

  showMoreRepliesButton(noteText: string) {
    return this.noteCardByText(noteText).locator('button', { hasText: /Show \d+ more replies/ }).describe('Show More Replies Button');
  }

  replyTexts(noteText: string) {
    return this.noteCardByText(noteText).locator('.whitespace-pre-wrap').describe('Reply Text Elements');
  }
}
