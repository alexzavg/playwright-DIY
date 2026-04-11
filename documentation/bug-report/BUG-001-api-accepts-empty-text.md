# BUG-001: API accepts empty text on all write endpoints

**Severity:** S2 - Major  
**Priority:** P1 - High

## Summary

`POST /api/notes`, `POST /api/notes/:id/reply`, and `PATCH /api/notes/:id` all accept an empty string `""` as valid text. The frontend has HTML5 `required` validation, but the backend lacks server-side validation - empty content can be created via direct API calls.

## Environment

- URL: https://kolsquare-qa.fly.dev/api/notes

## Steps to Reproduce

1. Send `POST /api/notes` with body `{"text": ""}`
2. Send `POST /api/notes/:id/reply` with body `{"text": ""}`
3. Send `PATCH /api/notes/:id` with body `{"text": ""}`

## Actual Result

All three return HTTP 200 with objects containing empty text. Empty notes/replies are persisted and displayed as blank cards.

## Expected Result

All three return HTTP 422 with a JSON error message. No empty content created.

## Additional Info

Production data confirms empty replies already exist (e.g., reply with `"text": ""`). Server-side validation should mirror the frontend's `required` constraint.
