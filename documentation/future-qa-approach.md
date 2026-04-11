# Future QA Approach

---

## 1. Shift-Left

QA should be integrated from the requirements phase, not just at the end of development.

- **Requirements review:** QA reviews the spec before development begins. In this assessment, ambiguities around max text length, error response format, and date display all became production defects that could have been caught at the spec stage.
- **API review:** QA reviews endpoint definitions, request/response schemas, and status codes before backend implementation. This prevents the class of bugs found here - HTML error responses, missing server-side validation, inconsistent status codes.
- **Definition of Done:** Every feature includes: API tests pass, E2E happy path passes, no severe open defects, input validation.

---

## 2. Test Automation Strategy

### API / Integration Tests

Validate the relationship between frontend and backend:

- Success and error status codes for every endpoint
- Response body structure and data types
- Input validation (empty, null, over max size)
- All error responses return JSON with `Content-Type: application/json`

### E2E Tests (Playwright)

Automate critical user journeys:

1. Create a note and verify it appears in the list
2. Edit a note and verify content updates
3. Delete a note and verify it disappears with all replies tied to it
4. Reply to a note and verify the reply appears in the thread
5. Thread collapse: verify 3+ replies collapse by default and expand on click

### Visual Regression

Use Playwright's native `toHaveScreenshot()` or tools like Applitools/Percy for visual diffs - catches layout regressions without brittle CSS selector assertions.

Visual regression requires static page component/element states to be consistent across runs.

---

## 3. CI/CD Integration

```
[Dev Build] - [API Tests] - [E2E Tests] - [Deploy Stage] - [Smoke Tests] - [Deploy Prod]
```

| Stage | Gate |
|-------|------|
| API Tests | Must pass; blocks merge |
| E2E | Must pass; blocks deploy to staging |
| Smoke | Must pass; blocks deploy to production |

**Environment:** 
- Ideally, use a Dockerized Playwright container for CI.
- HTML reports with failure screenshots, videos & traces as CI artifacts.
- Ideally, retain HTML reports with artifacts for at least 7 days (e.g. host on Amazon S3 or similar service)

---

## 4. Key Recommendations

| Priority | Recommendation |
|----------|---------------|
| P1 | Add input error validation (empty text, max length) to match frontend |
| P1 | Fix `updatedAt` field to update on note edit |
| P1 | Return JSON error responses from all `/api/*` endpoints |
| P2 | Add API tests to CI pipeline (Playwright) |
| P2 | Implement E2E suite for critical user journeys (Playwright) |
| P3 | Localize date display format (currently raw GMT) |
