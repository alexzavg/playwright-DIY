// user-page-manager.ts
import { Page } from '@playwright/test';
import { wrapPageWithSmartSteps } from '../utils/page-wraper';
import { NotesPage } from './page-objects/notes-page';

export class PageManager {
  private _notesPage?: NotesPage;

  private page: Page;

  constructor(page: Page) {
    this.page = wrapPageWithSmartSteps(page);
  }

  get notesPage() {
    return (this._notesPage ??= new NotesPage(this.page));
  }
}
