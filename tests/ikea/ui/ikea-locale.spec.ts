import { test } from '../../../src/fixtures/main-fixture';
import { tags } from '../../../src/test-data/test-tags';
import { IkeaMainPageLocators } from '../../../src/ui/locators/ikea-main-page-locators';
import { scrapeTextsFromSelectors } from '../../../src/utils/web-scraper';
import { pageTexts } from '../../../src/test-data/locale-data';
import { expect } from '../../../src/utils/wrapped-expect';

let ikeaMainPageLocators: IkeaMainPageLocators;

test.describe(`IKEA locale test group`, () => {
  test.beforeEach(async ({ page }) => {
    ikeaMainPageLocators = new IkeaMainPageLocators(page);
  });

  const localeData = [
    {
      language: 'ENGLISH',
      url: `${process.env.BASE_URL}/en`,
      pageTexts: pageTexts.cookiesPopup.en,
    },
    {
      language: 'SPANISH',
      url: `${process.env.BASE_URL}/es`,
      pageTexts: pageTexts.cookiesPopup.es,
    },
    {
      language: 'CATALAN',
      url: `${process.env.BASE_URL}/ca`,
      pageTexts: pageTexts.cookiesPopup.ca,
    },
    {
      language: 'EUSKAR',
      url: `${process.env.BASE_URL}/eu`,
      pageTexts: pageTexts.cookiesPopup.eu,
    },
    {
      language: 'GALICIAN',
      url: `${process.env.BASE_URL}/gl`,
      pageTexts: pageTexts.cookiesPopup.gl,
    }
  ]

  for (const locale of localeData) {
    test(`IKEA ${locale.language} locale test`,
      {
        tag: [tags.locale, tags.e2e],
      },
      async ({ anonUser, page }) => {
        await test.step(`Check page texts`, async () => {
          await anonUser.ikeaMainPage.open(locale.url);
          const texts = await scrapeTextsFromSelectors(
            page,
            [
              ikeaMainPageLocators.cookiesPopupContainer,
            ]
          );
          console.log(texts);
          expect(texts).toEqual(locale.pageTexts);
        });
      }
    );
  }
});
