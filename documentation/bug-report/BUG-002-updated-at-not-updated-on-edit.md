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

Both timestamps are identical after the edit. `updatedAt` is not changed. 
<img width="3680" height="2260" alt="updatedAt bug" src="https://github.com/user-attachments/assets/9fb0d954-81f3-473b-b67f-3b2614de6413" />

Video to showcase the issue 
https://github.com/user-attachments/assets/17130c8c-f0bd-46b2-b9df-570989c76128

## Expected Result

`updatedAt` reflects the edit time, distinct from `createdAt`.
