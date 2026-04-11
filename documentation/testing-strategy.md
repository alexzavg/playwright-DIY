# Testing Strategy

**Application Under Test:** Kolsquare Notes Feature  
**Original Task:** https://www.notion.so/kolsquare/Kolsquare-QA-Engineering-Project-33ec57389c758126b4a6cff925cfd0c6?pvs=11
**Application Requirements:** https://www.notion.so/kolsquare/Notes-Project-33ec57389c758127be7dd059efeec9bf
**Figma Design:** https://www.figma.com/design/ktCuTXQG9MmJXEES0fNfYR/3ae55c24-054b-41f9-b767-a17fccb71ccc?node-id=0-1&t=csv7XTnT14q9gcMe-1
**Application URL:** https://kolsquare-qa.fly.dev/

---

## Table of Contents

1. [Scope](#1-scope)
2. [Approach](#2-approach)
3. [Environment](#3-environment)
4. [Test Suite](#4-test-suite)
5. [Defect Management](#5-defect-management)
6. [Future QA Approach and Automation Strategy](#6-future-qa-approach-and-automation-strategy)

---

## 1. Scope

### In Scope

| Area | Description |
|------|-------------|
| Functional | CRUD operations for notes and replies; thread collapse/expand |
| API | REST endpoints: `GET`, `POST`, `PATCH`, `DELETE` on `/api/notes` and `/api/notes/:id/reply` |
| Input validation | Empty text, boundary lengths, special characters, XSS/SQLi payloads |
| UI/UX | Modal dialogs, hover states, date formatting, empty states |
| Responsive | Mobile (375px), tablet (768px), desktop (1280px+) |
| Security | XSS, SQL injection, error information leakage |

### Out of Scope

- Load/performance testing (shared environment, not meaningful for metrics)
- Database-level testing (no direct access)

---

## 2. Approach

### Exploratory Testing

Session-based exploratory testing which consists of 5 parts:

1. **Happy path** - Create, read, edit, delete notes and replies
2. **Input boundaries** - Empty, max-length, special characters, Unicode
3. **API** - Request/response validation, status codes, error formats
4. **UI/UX consistency** - Layout, responsiveness, dialogs, date formatting
5. **Security surface** - Injections, error disclosure

Exploratory testing was chosen because the feature is small and well-scoped, no existing test suite exists, and the primary goal at this stage is to identify defects rather than prevent regression.

### API Testing

All REST endpoints are to be tested independently of the UI via direct HTTP calls. This isolates backend validation from the frontend and reveals discrepancies between the two, if such exist.

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/api/notes` | Retrieve all notes with replies |
| `POST` | `/api/notes` | Create a new note |
| `PATCH` | `/api/notes/:id` | Edit a note |
| `DELETE` | `/api/notes/:id` | Delete a note and cascade-delete replies |
| `POST` | `/api/notes/:id/reply` | Add a reply to a note |

**Validation focus:** Status codes, response body structure, input validation (empty/null/oversized/malformed), error response format (JSON vs. HTML), and edge cases (non-existent IDs, unsupported methods).

---

## 3. Environment

| Component | Detail |
|-----------|--------|
| URL | https://kolsquare-qa.fly.dev/ |
| Backend | PHP 8.5.4 / Symfony |
| Frontend | Vue 3 SPA |
| Database | PostgreSQL |
| Browser | Chrome latest |
| Viewports | 375x667 (mobile), 768x1024 (tablet), 1280x720 (desktop) |

**Note:** Feature runs on a shared testing environment - other people may test concurrently.

---

## 4. Test Suite

33 test cases documented in [test-cases.md](test-cases.md), organized into 5 sections:

| Section | Coverage | TCs |
|---------|----------|-----|
| Happy Path | CRUD operations, replies, thread collapse, cancel, empty state | TC-01 – TC-10 |
| Input Validation & Edge Cases | Empty text, long text, XSS, SQLi, Unicode, missing/extra fields | TC-11 – TC-20 |
| UI/UX | Dialog state, date format, editing, deletion | TC-21 – TC-26 |
| Responsive & Mobile | Mobile layout, dialog viewport fit, touch accessibility | TC-27 – TC-29 |
| API | Response structure, `updatedAt` mutation, JSON error format | TC-30 – TC-33 |

---

## 5. Defect Management

Each defect is documented as an individual file in `bug-report` directory.

---

## 6. Future QA Approach and Automation Strategy

See [future-qa-approach.md](future-qa-approach.md) for recommendations on improving QA practices for future development and a high-level automation strategy.
