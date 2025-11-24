import { Page } from '@playwright/test';

export class IkeaMainPageLocators {
  constructor(protected page: Page) {}

  get cookiesPopup() {
    return this.page.locator('#onetrust-group-container').describe('Cookies Popup');
  }

}
