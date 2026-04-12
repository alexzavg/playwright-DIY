import { BasePage } from './base-page';
import { NotesPageLocators } from '../locators/notes-page-locators';
import { Note } from '../../api/requests/notes/notes-api';

export class NotesPage extends BasePage {
  pagePath: string = '/';
  readonly locators: NotesPageLocators = new NotesPageLocators(this.page);

  async verifyElementsVisibility(): Promise<void> {
    await this.locators.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
    await this.locators.createNoteButton.waitFor({ state: 'visible', timeout: 10000 });
  }

  async createNote(text: string): Promise<void> {
    await this.locators.createNoteButton.click();
    await this.locators.dialog.waitFor({ state: 'visible', timeout: 10000 });
    await this.locators.dialogTextarea.fill(text);
    await this.locators.dialogSubmitButton.click();
    await this.locators.dialog.waitFor({ state: 'hidden', timeout: 10000 });
  }

  waitForCreateNoteResponse(): Promise<Note> {
    return this.page
      .waitForResponse((res) => res.url().includes('/api/notes') && res.request().method() === 'POST')
      .then((res) => res.json());
  }

  async waitForNoteVisible(noteText: string): Promise<void> {
    await this.locators.noteCardByText(noteText).waitFor({ state: 'visible', timeout: 10000 });
  }

  async waitForReplyVisible(noteText: string, replyText: string): Promise<void> {
    await this.locators.replyTexts(noteText).filter({ hasText: replyText }).waitFor({ state: 'visible', timeout: 10000 });
  }

  async waitForNoteHidden(noteText: string): Promise<void> {
    await this.locators.noteCardByText(noteText).waitFor({ state: 'hidden', timeout: 10000 });
  }

  async deleteNote(noteText: string): Promise<void> {
    await this.locators.noteCardByText(noteText).hover();
    await this.locators.noteDeleteButton(noteText).click({ force: true });
    await this.locators.dialog.waitFor({ state: 'visible', timeout: 10000 });
    await this.locators.deleteConfirmButton.click();
    await this.locators.dialog.waitFor({ state: 'hidden', timeout: 10000 });
  }

  async replyToNote(noteText: string, replyText: string): Promise<void> {
    await this.locators.noteReplyButton(noteText).click();
    await this.locators.dialog.waitFor({ state: 'visible', timeout: 10000 });
    await this.locators.dialogTextarea.fill(replyText);
    await this.locators.dialogSubmitButton.click();
    await this.locators.dialog.waitFor({ state: 'hidden', timeout: 10000 });
  }

  async waitForShowMoreRepliesVisible(noteText: string): Promise<void> {
    await this.locators.showMoreRepliesButton(noteText).waitFor({ state: 'visible', timeout: 10000 });
  }

  async expandThread(noteText: string): Promise<void> {
    await this.locators.showMoreRepliesButton(noteText).click();
  }
}
