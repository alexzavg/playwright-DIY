import { test, BrowserContext, Browser } from '@playwright/test';
import { PageManager } from '../ui/page-manager';

type TestContext = {
  page: Awaited<ReturnType<BrowserContext['newPage']>>;
  anonUser: PageManager;
  context: BrowserContext;
};

type ParallelTestFn = (ctx: TestContext) => Promise<void>;

type ParallelTest = {
  name: string;
  fn: ParallelTestFn;
};

/**
 * Runs multiple test functions in parallel within a single Playwright test/worker.
 * Each test gets its own page instance from the shared browser context.
 * 
 * @example
 * test('parallel locale tests', async ({ context }) => {
 *   await runInParallel(context, [
 *     { name: 'EN test', fn: async ({ page, anonUser }) => { ... } },
 *     { name: 'ES test', fn: async ({ page, anonUser }) => { ... } },
 *   ]);
 * });
 */
export async function runInParallel(
  context: BrowserContext,
  tests: ParallelTest[]
): Promise<void> {
  const results = await Promise.allSettled(
    tests.map(async (t) => {
      const page = await context.newPage();
      const anonUser = new PageManager(page);
      
      try {
        await test.step(t.name, async () => {
          await t.fn({ page, anonUser, context });
        });
      } finally {
        await page.close();
      }
    })
  );

  // Collect failures
  const failures = results
    .map((r, i) => ({ result: r, test: tests[i] }))
    .filter((x) => x.result.status === 'rejected')
    .map((x) => ({
      name: x.test.name,
      error: (x.result as PromiseRejectedResult).reason,
    }));

  if (failures.length > 0) {
    const summary = failures.map((f) => `[${f.name}]: ${f.error}`).join('\n');
    throw new Error(`${failures.length}/${tests.length} parallel tests failed:\n${summary}`);
  }
}

/**
 * Helper to create parallel test entries from data array (data-driven pattern)
 */
export function createParallelTests<T>(
  data: T[],
  nameFn: (item: T) => string,
  testFn: (item: T, ctx: TestContext) => Promise<void>
): ParallelTest[] {
  return data.map((item) => ({
    name: nameFn(item),
    fn: (ctx) => testFn(item, ctx),
  }));
}
