import { Page } from '@playwright/test';

export class IkeaMainPageLocators {
  constructor(protected page: Page) {}

  get cookiesPopupContainer() {
    return this.page.locator('[id="onetrust-banner-sdk"]').describe('Cookies Popup Container');
  }

}
