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

| ID | Test Case | Preconditions | Steps | Expected Result | Priority | Status | Automated |
|----|-----------|--------------|-------|-----------------|----------|--------|-----------|
| TC-01 | Create a note | Application loaded, no dialog open | 1. Click "Create a new Note."<br>2. Enter "Hello World."<br>3. Click "Create Note" | 1. Dialog closes.<br>2. Note appears in list with entered text, random author, and current date.<br>3. API returns 200. | P1 | ✅ | ✅ |
| TC-02 | Read notes on page load | At least one note exists | 1. Navigate to base URL | 1. All notes displayed with avatar, name, date, text, and replies.<br>2. `GET /api/notes` returns 200. | P1 | ✅ | |
| TC-03 | Edit a note | At least one note exists | 1. Hover over note - click "Edit."<br>2. Change text.<br>3. Click "Save Note" | 1. Note text updated in list.<br>2. `PATCH /api/notes/:id` returns 200.<br>3. `updatedAt` is updated. | P1 | ❌ [BUG-002](bug-report/BUG-002-updated-at-not-updated-on-edit.md) | |
| TC-04 | Delete a note | At least one note exists | 1. Hover over note - click "Delete."<br>2. Confirm in dialog | 1. Note removed from list.<br>2. `DELETE /api/notes/:id` returns 200. | P1 | ✅ | ✅ |
| TC-05 | Delete note with replies | Note with at least one reply exists | 1. Hover over parent note - click "Delete."<br>2. Confirm | 1. Parent note and all replies removed. | P1 | ✅ | |
| TC-06 | Reply to a note | At least one note exists | 1. Click "Reply."<br>2. Enter reply text.<br>3. Click "Create Reply" | 1. Reply appears under parent note.<br>2. `POST /api/notes/:id/reply` returns 200. | P1 | ✅ | ✅ |
| TC-07 | Thread collapse at 3+ replies | Note has 3+ replies | 1. Observe note with 3+ replies | 1. Only the most recent reply visible.<br>2. "Show X more replies" link displayed. | P1 | ✅ | |
| TC-08 | Expand collapsed thread | Note with collapsed replies | 1. Click "Show X more replies" | 1. All replies visible in chronological order. | P1 | ✅ | ✅ |
| TC-09 | Cancel dialog dismissal | Dialog open (Create or Edit) | 1. Open dialog.<br>2. Optionally enter text.<br>3. Click "Cancel" | 1. Dialog closes.<br>2. No changes made.<br>3. No API call sent. | P1 | ✅ | |
| TC-10 | Empty state display | No notes in DB | 1. Delete all notes.<br>2. Reload page | 1. "No Notes were found" message displayed.<br>2. Create button still functional. | P2 | ✅ | |

---

## Input Validation & Edge Cases

| ID | Test Case | Preconditions | Steps | Expected Result | Priority | Status | Automated |
|----|-----------|--------------|-------|-----------------|----------|--------|-----------|
| TC-11 | Empty note via UI | Create dialog open | 1. Leave textarea empty.<br>2. Click "Create Note" | 1. Frontend validation blocks submission.<br>2. Browser validation tooltip shown.<br>3. No API call. | P1 | ✅ | |
| TC-12 | Empty text via API (all write endpoints) | At least one note exists | 1. `POST /api/notes` with `{"text": ""}`.<br>2. `POST /api/notes/:id/reply` with `{"text": ""}`.<br>3. `PATCH /api/notes/:id` with `{"text": ""}` | 1. All three return 422 with JSON error.<br>2. No empty content persisted. | P1 | ❌ [BUG-001](bug-report/BUG-001-api-accepts-empty-text.md) | |
| TC-13 | Very long text (10,000+ chars) | N/A | 1. `POST /api/notes` with 10,000-char text | 1. API returns 422 with max-length error.<br>2. Server does NOT return 500. | P1 | ❌ [BUG-004](bug-report/BUG-004-server-500-on-long-text.md) | |
| TC-14 | Special characters and Unicode | N/A | 1. Create note with text `Hello\nWorld 🎉 äöü 中文 العربية 1.` | All characters preserved and displayed correctly. | P2 | ✅ | |
| TC-15 | Whitespace-only text | Create dialog open | 1. Enter only spaces/tabs.<br>2. Submit | 1. Frontend blocks submission (treated as empty), OR API returns 422. | P2 | ❌ [BUG-001](bug-report/BUG-001-api-accepts-empty-text.md) | |
| TC-16 | Non-existent note ID | N/A | 1. `PATCH /api/notes/999999`.<br>2. `DELETE /api/notes/999999` | 1. Both return 404 with JSON error response. | P2 | ❌ [BUG-006](bug-report/BUG-006-api-errors-return-html.md) | |
| TC-17 | Missing required field | N/A | 1. `POST /api/notes` with body `{}` | 1. API returns 422 with JSON error indicating `text` is required. | P2 | ❌ [BUG-006](bug-report/BUG-006-api-errors-return-html.md) | |
| TC-18 | Extra/unexpected fields | N/A | 1. `POST /api/notes` with `{"text": "hi", "admin": true}` | 1. Extra fields ignored.<br>2. Note created normally with random author. | P2 | ✅ | |

---

## UI/UX

| ID | Test Case | Preconditions | Steps | Expected Result | Priority | Status | Automated |
|----|-----------|--------------|-------|-----------------|----------|--------|-----------|
| TC-19 | Dialog textarea cleared on reopen | Application loaded | 1. Click "Create a new Note."<br>2. Type text.<br>3. Cancel.<br>4. Reopen dialog | 1. Textarea is empty - no residual text from previous interaction. | P1 | ❌ [BUG-005](bug-report/BUG-005-dialog-not-cleared-after-cancel.md) | |
| TC-20 | Edit dialog pre-fills current text | Note exists | 1. Hover - click "Edit" | 1. Edit dialog opens with textarea pre-filled with the note's current text. | P1 | ✅ | |
| TC-21 | User-friendly date format | Note exists | 1. Observe date under author name | 1. Localized format (e.g., "Apr 11, 2026, 10:41 AM").<br>2. Not raw GMT string. | P2 | ❌ [BUG-007](bug-report/BUG-007-date-format-raw-gmt.md) | |
| TC-22 | "Last edited" indicator | Note has been edited | 1. Create note.<br>2. Edit note.<br>3. Observe UI | 1. "(edited)" label or "Last edited" timestamp shown when `updatedAt` differs from `createdAt`. | P1 | ❌ [BUG-003](bug-report/BUG-003-last-edited-date-not-displayed.md) | |
| TC-23 | Delete confirmation dialog | Note exists | 1. Hover - click "Delete" | 1. Confirmation dialog with warning text and Cancel/Delete buttons. | P2 | ✅ | |
| TC-24 | Hover reveals controls on parent note only | Note with replies exists | 1. Hover over parent note | 1. Edit/Delete visible for parent.<br>2. Replies do NOT show Edit/Delete. | P2 | ✅ | |

---

## Mobile & Responsive

| ID | Test Case | Preconditions | Steps | Expected Result | Priority | Status | Automated |
|----|-----------|--------------|-------|-----------------|----------|--------|-----------|
| TC-25 | Mobile layout (375px) | N/A | 1. Open application at 375x667 viewport | 1. No horizontal scrollbar.<br>2. Content readable.<br>3. Create button accessible.<br>4. Header elements do not overlap. | P2 | ✅ | |
| TC-26 | Mobile dialog fits viewport | 375px viewport, dialog open | 1. Open any dialog on mobile | 1. Dialog fully visible.<br>2. Textarea usable.<br>3. Buttons tappable.<br>4. No overflow. | P2 | ❌ [BUG-008](bug-report/BUG-008-mobile-dialog-viewport-fit.md) | |
| TC-27 | Touch device access to Edit/Delete | Touch device or simulation | 1. Tap a note card | 1. Edit/Delete controls accessible without hover (via tap, long-press, or always-visible on touch). | P2 | ✅ | |

---

## API

| ID | Test Case | Preconditions | Steps | Expected Result | Priority | Status | Automated |
|----|-----------|--------------|-------|-----------------|----------|--------|-----------|
| TC-28 | GET response structure | Note with replies exists | 1. `GET /api/notes` | 1. JSON array.<br>2. Each note: `id` (int), `text` (string), `author` (object), `replies` (array), `createdAt`, `updatedAt`.<br>3. Each reply: `id`, `text`, `author`, `createdAt`. | P1 | ✅ | ✅ |
| TC-29 | POST response structure | N/A | 1. `POST /api/notes` with `{"text": "test"}` | 1. Status code 200.<br>2. JSON note object with `id`, `text` matching input, random `author`, empty `replies`, `createdAt`, `updatedAt`. | P1 | ✅ | ✅ |
| TC-30 | PATCH updates `updatedAt` | Note exists | 1. Record `updatedAt`.<br>2. `PATCH /api/notes/:id` with new text.<br>3. Compare | 1. `updatedAt` is newer than before.<br>2. `createdAt` unchanged. | P1 | ❌ [BUG-002](bug-report/BUG-002-updated-at-not-updated-on-edit.md) | |
| TC-31 | Error responses return JSON | N/A | 1. `POST /api/notes` with `{}`.<br>2. `DELETE /api/notes/999999` | 1. All errors return `Content-Type: application/json` with JSON body.<br>2. No HTML error pages. | P1 | ❌ [BUG-006](bug-report/BUG-006-api-errors-return-html.md) | |
