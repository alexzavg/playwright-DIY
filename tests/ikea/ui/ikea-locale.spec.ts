import { test } from '../../../src/fixtures/main-fixture';
import { tags } from '../../../src/test-data/test-tags';
import { IkeaMainPageLocators } from '../../../src/ui/locators/ikea-main-page-locators';

let ikeaMainPageLocators: IkeaMainPageLocators;

test.describe(`IKEA locale test group`, () => {
  test.beforeEach(async ({ page }) => {
    ikeaMainPageLocators = new IkeaMainPageLocators(page);
  });

  const localeData = [
    {
      locale: 'ENGLISH',
      url: `${process.env.BASE_URL}/en`,
    },
    {
      locale: 'SPANISH',
      url: `${process.env.BASE_URL}/es`,
    }
  ]

  for (const locale of localeData) {
    test(`IKEA ${locale.locale} locale test`,
      {
        tag: [tags.locale, tags.e2e],
      },
      async ({ anonUser }) => {
        await anonUser.ikeaMainPage.open(locale.url);
        await anonUser.ikeaMainPage.verifyElementsVisibility();
      }
    );
  }
});
