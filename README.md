# Playwright Automation Project — Kolsquare Notes App

End-to-end and API testing framework for the [Kolsquare Notes App](https://kolsquare-qa.fly.dev/) using **Playwright**, with custom logging, wrappers, and scalable architecture.

## Table of Contents

- [Video Walkthrough](#video-walkthrough)
- [Installation](#installation)
- [Local Setup](#local-setup)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Logging](#logging)
- [Fixtures](#fixtures)
- [Helpful Commands](#helpful-commands)
- [Documentation](#documentation)

## Video Walkthrough

Test task structure overview — click the preview to watch on YouTube:

[![Test task structure overview](https://img.youtube.com/vi/Z589E4oPfIY/maxresdefault.jpg)](https://youtu.be/Z589E4oPfIY)

## Installation

```bash
npm install
npx playwright install
```

## Local Setup

Create a `.env` file in the root:

```env
PROJECT="kolsquare"
ENVIRONMENT="prod"
PLATFORM="desktop"
```

## Running Tests

### All tests:

```bash
npm run test:kolsquare:prod:all
```

### UI tests only:

```bash
npm run test:kolsquare:prod:ui
```

### API tests only:

```bash
npm run test:kolsquare:prod:api
```

### Specific test file:

```bash
npx playwright test tests/kolsquare/ui/tc-01-create-note.spec.ts
```

### With Playwright UI (recommended for local runs):

```bash
npm run playwright:ui
```

### By tag:

```bash
PROJECT=kolsquare ENVIRONMENT=prod PLATFORM=desktop npx playwright test --project=kolsquare-prod-desktop --grep @E2E
```

## Project Structure

```
├── src/
│   ├── api/                        # API request classes (BaseRequestor, NotesApi)
│   ├── test-data/                  # Test tags, shared test data
│   ├── ui/
│   │   ├── locators/               # Locator classes per page
│   │   ├── page-objects/           # Page object classes
│   │   └── page-manager.ts         # Lazy-loaded page object registry
│   ├── utils/
│   │   ├── global-setup.ts         # Pre-run cleanup (deletes all notes)
│   │   ├── global-teardown.ts      # Post-run cleanup
│   │   ├── page-wraper.ts          # Smart step logging wrapper
│   │   └── wrapped-expect.ts       # Custom expect with logging
├── tests/
│   └── kolsquare/
│       ├── api/                    # API spec files
│       └── ui/                     # UI spec files
├── documentation/                  # Testing strategy, test cases, bug reports
├── .env
├── package.json
├── playwright.config.ts
```

## Logging

### Page Wrapper (`wrapPageWithSmartSteps`)

Automatically logs readable test steps:

```
STEP: Click on "Create a new Note Button"
STEP: Fill "Dialog Textarea"
```

### Expect Wrapper (`wrapped-expect.ts`)

```ts
import { expect } from '../../../src/utils/wrapped-expect';
```

All assertions (`.toBeVisible()`, `.toBeHidden()`, etc.) are logged automatically.

## Fixtures

Using custom fixtures from `main-fixture.ts`:

- `anonUser` — PageManager instance for anonymous user interactions
- `api` — ApiManager instance for direct API calls
- `addCleanup` — register teardown callbacks (e.g., delete created notes)

```ts
import { test } from '../../../src/fixtures/main-fixture';

test('example', async ({ anonUser, api, addCleanup }) => {
  // ...
});
```

## Helpful Commands

| Command | Description |
|---------|-------------|
| `npx playwright test` | Run tests |
| `npx playwright show-report` | View HTML report |
| `npx playwright codegen` | Generate selectors |
| `npm run prettier` | Format code |
| `npm run lint` | Lint check |

## Documentation

See the [documentation/](documentation/) folder for:
- [Testing Strategy](documentation/testing-strategy.md)
- [Test Cases](documentation/test-cases.md)
- [Bug Reports](documentation/bug-report/)
- [Future QA Approach](documentation/future-qa-approach.md)

---

[Playwright Docs](https://playwright.dev/)
