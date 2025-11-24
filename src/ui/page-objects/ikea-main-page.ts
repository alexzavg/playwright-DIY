import { expect } from '../../utils/wrapped-expect';
import { BasePage } from './base-page';
import { IkeaMainPageLocators } from '../locators/ikea-main-page-locators';

export class IkeaMainPage extends BasePage {
  pagePath: string = '';
  private locators: IkeaMainPageLocators = new IkeaMainPageLocators(this.page);

  async verifyElementsVisibility(): Promise<void> {
    const elements = [
      this.locators.cookiesPopup,
    ];

    for (const element of elements) {
      await expect(element).toBeVisible();
    }
  }
}
