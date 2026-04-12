# BUG-003: "Last Edited Date" not displayed in the UI

**Severity:** S3 - Minor  
**Priority:** P2 - Medium

## Summary

The UI does not indicate when a note was last edited. Per the requirements, each note should show a "Last Edited Date." The frontend only displays the creation date - no "edited" label or separate timestamp exists.

## Environment

- URL: https://kolsquare-qa.fly.dev/
- Browser: Chrome latest

## Steps to Reproduce

1. Create a note.
2. Edit the note.
3. Observe the note card in the UI.

## Actual Result

Only the creation date is shown. No visual distinction between new and edited notes.
Video to showcase the issue: https://github.com/user-attachments/assets/4db1fb4d-3de3-4370-88ae-27c83407116b

## Expected Result

An "(edited)" label or "Last edited" timestamp when `updatedAt` differs from `createdAt`.

## Additional Info

Partially blocked by BUG-002 (`updatedAt` not updated by backend), but even with a backend fix, the frontend does not render this field. The API includes `updatedAt` - the frontend ignores it.
