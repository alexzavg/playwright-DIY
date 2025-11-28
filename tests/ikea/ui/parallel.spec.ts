import { test } from '@playwright/test';
import { tags } from '../../../src/test-data/test-tags';
import { IkeaMainPageLocators } from '../../../src/ui/locators/ikea-main-page-locators';
import { scrapeTextsFromSelectors } from '../../../src/utils/web-scraper';
import { pageTexts } from '../../../src/test-data/locale-data';
import { expect } from '../../../src/utils/wrapped-expect';
import { runInParallel, createParallelTests } from '../../../src/utils/parallel-runner';

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
  },
];

test.describe(`IKEA locale test group`, () => {
  test(
    `IKEA all locales - parallel`,
    { tag: [tags.locale, tags.e2e] },
    async ({ context }) => {
      // Run all 5 locale tests concurrently within this single test
      await runInParallel(
        context,
        createParallelTests(
          localeData,
          (locale) => `IKEA ${locale.language} locale test`,
          async (locale, { page, anonUser }) => {
            const locators = new IkeaMainPageLocators(page);
            await anonUser.ikeaMainPage.open(locale.url);
            const texts = await scrapeTextsFromSelectors([locators.cookiesPopupContainer]);
            console.log(`[${locale.language}]`, texts);
            expect(texts).toEqual(locale.pageTexts);
          }
        )
      );
    }
  );
});
