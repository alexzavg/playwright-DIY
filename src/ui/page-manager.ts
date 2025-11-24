// user-page-manager.ts
import { Page } from '@playwright/test';
import { wrapPageWithSmartSteps } from '../utils/page-wraper';
import { IkeaMainPage } from './page-objects/ikea-main-page';

export class PageManager {
  private _ikeaMainPage?: IkeaMainPage;

  private page: Page;

  constructor(page: Page) {
    this.page = wrapPageWithSmartSteps(page);
  }

  get ikeaMainPage() {
    return (this._ikeaMainPage ??= new IkeaMainPage(this.page));
  }
}
