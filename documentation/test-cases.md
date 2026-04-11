# Test Cases: Notes Feature

---

## Table of Contents

1. [Legend](#legend)
2. [Happy Path](#happy-path)
3. [Input Validation & Edge Cases](#input-validation--edge-cases)
4. [UI/UX](#uiux)
5. [Mobile & Responsive](#mobile--responsive)
6. [API](#api)

---

## Legend

| Abbreviation | Meaning |
|-------------|---------|
| TC | Test Case |
| P1 | Priority High - must work for release |
| P2 | Priority Medium - important but not blocking |
| P3 | Priority Low - nice-to-have or future scope |
| ✅ | Test passed |
| ❌ | Test failed |

**Base URL:** `https://kolsquare-qa.fly.dev/`  
**API Base URL:** `https://kolsquare-qa.fly.dev/api/`

---

## Happy Path

| ID | Test Case | Preconditions | Steps | Expected Result | Priority | Status |
|----|-----------|--------------|-------|-----------------|----------|--------|
| TC-01 | Create a note | Application loaded, no dialog open | 1. Click "Create a new Note." 2. Enter "Hello World." 3. Click "Create Note" | Dialog closes. Note appears in list with entered text, random author, and current date. API returns 200. | P1 | ✅ |
| TC-02 | Read notes on page load | At least one note exists | 1. Navigate to base URL | All notes displayed with avatar, name, date, text, and replies. `GET /api/notes` returns 200. | P1 | ✅ |
| TC-03 | Edit a note | At least one note exists | 1. Hover over note → click "Edit." 2. Change text. 3. Click "Save Note" | Note text updated in list. `PATCH /api/notes/:id` returns 200. `updatedAt` is updated. | P1 | ❌ [BUG-002](bug-report/BUG-002-updated-at-not-updated-on-edit.md) |
| TC-04 | Delete a note | At least one note exists | 1. Hover over note → click "Delete." 2. Confirm in dialog | Note removed from list. `DELETE /api/notes/:id` returns 200/204. | P1 | ✅ |
| TC-05 | Delete note with replies (cascade) | Note with at least one reply exists | 1. Hover over parent note → click "Delete." 2. Confirm | Parent note and all replies removed. | P1 | ✅ |
| TC-06 | Reply to a note | At least one note exists | 1. Click "Reply." 2. Enter reply text. 3. Click "Create Reply" | Reply appears under parent note. `POST /api/notes/:id/reply` returns 200. | P1 | ✅ |
| TC-07 | Thread collapse at 3+ replies | Note has 3+ replies | 1. Observe note with 3+ replies | Only the most recent reply visible. "Show X more replies" link displayed. | P1 | ✅ |
| TC-08 | Expand collapsed thread | Note with collapsed replies | 1. Click "Show X more replies" | All replies visible in chronological order. | P1 | ✅ |
| TC-09 | Cancel dialog dismissal | Dialog open (Create or Edit) | 1. Open dialog. 2. Optionally enter text. 3. Click "Cancel" | Dialog closes. No changes made. No API call sent. | P1 | ✅ |
| TC-10 | Empty state display | No notes in DB | 1. Delete all notes. 2. Reload page | "No Notes were found" message displayed. Create button still functional. | P2 | ✅ |

---

## Input Validation & Edge Cases

| ID | Test Case | Preconditions | Steps | Expected Result | Priority | Status |
|----|-----------|--------------|-------|-----------------|----------|--------|
| TC-11 | Empty note via UI | Create dialog open | 1. Leave textarea empty. 2. Click "Create Note" | Frontend validation blocks submission. Browser validation tooltip shown. No API call. | P1 | ✅ |
| TC-12 | Empty text via API (all write endpoints) | At least one note exists | 1. `POST /api/notes` with `{"text": ""}`. 2. `POST /api/notes/:id/reply` with `{"text": ""}`. 3. `PATCH /api/notes/:id` with `{"text": ""}` | All three return 422 with JSON error. No empty content persisted. | P1 | ❌ [BUG-001](bug-report/BUG-001-api-accepts-empty-text.md) |
| TC-13 | Very long text (10,000+ chars) | N/A | 1. `POST /api/notes` with 10,000-char text | API returns 422 with max-length error. Server does NOT return 500. | P1 | ❌ [BUG-004](bug-report/BUG-004-server-500-on-long-text.md) |
| TC-14 | XSS payload | N/A | 1. Create note with `<script>alert('XSS')</script>` | Script tag displayed as plain text. No script execution. | P1 | ✅ |
| TC-15 | SQL injection payload | N/A | 1. Create note with `'; DROP TABLE notes; --` | Literal text saved. Database unaffected. | P1 | ✅ |
| TC-16 | Special characters and Unicode | N/A | 1. Create note with `Hello\nWorld` emoji, umlauts, CJK characters | All characters preserved and displayed correctly. | P2 | ✅ |
| TC-17 | Whitespace-only text | Create dialog open | 1. Enter only spaces/tabs. 2. Submit | Frontend blocks submission (treated as empty), OR API returns 422. | P2 | ❌ [BUG-001](bug-report/BUG-001-api-accepts-empty-text.md) |
| TC-18 | Non-existent note ID | N/A | 1. `PATCH /api/notes/999999`. 2. `DELETE /api/notes/999999` | Both return 404 with JSON error response. | P2 | ❌ [BUG-006](bug-report/BUG-006-api-errors-return-html.md) |
| TC-19 | Missing required field | N/A | 1. `POST /api/notes` with body `{}` | API returns 422 with JSON error indicating `text` is required. | P2 | ❌ [BUG-006](bug-report/BUG-006-api-errors-return-html.md) |
| TC-20 | Extra/unexpected fields | N/A | 1. `POST /api/notes` with `{"text": "hi", "admin": true}` | Extra fields ignored. Note created normally with random author. | P2 | ✅ |

---

## UI/UX

| ID | Test Case | Preconditions | Steps | Expected Result | Priority | Status |
|----|-----------|--------------|-------|-----------------|----------|--------|
| TC-21 | Dialog textarea cleared on reopen | Application loaded | 1. Click "Create a new Note." 2. Type text. 3. Cancel. 4. Reopen dialog | Textarea is empty - no residual text from previous interaction. | P1 | ❌ [BUG-005](bug-report/BUG-005-dialog-not-cleared-after-cancel.md) |
| TC-22 | Edit dialog pre-fills current text | Note exists | 1. Hover → click "Edit" | Edit dialog opens with textarea pre-filled with the note's current text. | P1 | ✅ |
| TC-23 | User-friendly date format | Note exists | 1. Observe date under author name | Localized format (e.g., "Apr 11, 2026, 10:41 AM"). Not raw GMT string. | P2 | ❌ [BUG-007](bug-report/BUG-007-date-format-raw-gmt.md) |
| TC-24 | "Last edited" indicator | Note has been edited | 1. Create note. 2. Edit note. 3. Observe UI | "(edited)" label or "Last edited" timestamp shown when `updatedAt` differs from `createdAt`. | P1 | ❌ [BUG-003](bug-report/BUG-003-last-edited-date-not-displayed.md) |
| TC-25 | Delete confirmation dialog | Note exists | 1. Hover → click "Delete" | Confirmation dialog with warning text and Cancel/Delete buttons. | P2 | ✅ |
| TC-26 | Hover reveals controls on parent note only | Note with replies exists | 1. Hover over parent note | Edit/Delete visible for parent. Replies do NOT show Edit/Delete. | P2 | ✅ |

---

## Mobile & Responsive

| ID | Test Case | Preconditions | Steps | Expected Result | Priority | Status |
|----|-----------|--------------|-------|-----------------|----------|--------|
| TC-27 | Mobile layout (375px) | N/A | 1. Open application at 375x667 viewport | No horizontal scrollbar. Content readable. Create button accessible. Header elements do not overlap. | P2 | ❌ [BUG-008](bug-report/BUG-008-mobile-header-overlap.md) |
| TC-28 | Mobile dialog fits viewport | 375px viewport, dialog open | 1. Open any dialog on mobile | Dialog fully visible. Textarea usable. Buttons tappable. No overflow. | P2 | ✅ |
| TC-29 | Touch device access to Edit/Delete | Touch device or simulation | 1. Tap a note card | Edit/Delete controls accessible without hover (via tap, long-press, or always-visible on touch). | P2 | ❌ [BUG-009](bug-report/BUG-009-hover-controls-inaccessible-on-touch.md) |

---

## API

| ID | Test Case | Preconditions | Steps | Expected Result | Priority | Status |
|----|-----------|--------------|-------|-----------------|----------|--------|
| TC-30 | GET response structure | Note with replies exists | 1. `GET /api/notes` | JSON array. Each note: `id` (int), `text` (string), `author` (object), `replies` (array), `createdAt`, `updatedAt`. Each reply: `id`, `text`, `author`, `createdAt`. | P1 | ✅ |
| TC-31 | POST response structure | N/A | 1. `POST /api/notes` with `{"text": "test"}` | 200/201. JSON note object with `id`, `text` matching input, random `author`, empty `replies`, `createdAt`, `updatedAt`. | P1 | ✅ |
| TC-32 | PATCH updates `updatedAt` | Note exists | 1. Record `updatedAt`. 2. `PATCH /api/notes/:id` with new text. 3. Compare | `updatedAt` is newer than before. `createdAt` unchanged. | P1 | ❌ [BUG-002](bug-report/BUG-002-updated-at-not-updated-on-edit.md) |
| TC-33 | Error responses return JSON | N/A | 1. `POST /api/notes` with `{}`. 2. `DELETE /api/notes/999999` | All errors return `Content-Type: application/json` with JSON body. No HTML error pages. | P1 | ❌ [BUG-006](bug-report/BUG-006-api-errors-return-html.md) |
