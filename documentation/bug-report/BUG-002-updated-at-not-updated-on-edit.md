# BUG-002: `updatedAt` not updated when a note is edited

**Severity:** S2 - Major  
**Priority:** P1 - High

## Summary

When a note is edited via `PATCH /api/notes/:id`, the `updatedAt` timestamp remains identical to `createdAt`. This violates the requirement: *"Last Edited Date: Automatically updated whenever a note is modified."*

## Environment

- URL: https://kolsquare-qa.fly.dev/api/notes/:id

## Steps to Reproduce

1. Create a note via `POST /api/notes` with `{"text": "original"}`. Record `createdAt` and `updatedAt`.
2. Wait a few seconds.
3. Edit via `PATCH /api/notes/:id` with `{"text": "modified"}`.
4. Compare `createdAt` and `updatedAt` in the response.

## Actual Result

Both timestamps are identical after the edit. `updatedAt` is never mutated.

## Expected Result

`updatedAt` reflects the edit time, distinct from `createdAt`.

## Additional Info

Likely a missing Doctrine lifecycle callback (`@PreUpdate`) or a missing `$this->updatedAt = new \DateTimeImmutable()` in the entity setter.
