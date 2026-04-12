# BUG-001: API accepts empty text on all write endpoints

**Severity:** S2 - Major  
**Priority:** P1 - High

## Summary

`POST /api/notes`, `POST /api/notes/:id/reply`, and `PATCH /api/notes/:id` all accept an empty string `""` as valid text. The frontend has validation, but the backend lacks server-side validation - empty content can be created via direct API calls.

## Environment

- URL: https://kolsquare-qa.fly.dev/api/notes

## Steps to Reproduce

1. Send `POST /api/notes` with body `{"text": ""}`
2. Send `POST /api/notes/:id/reply` with body `{"text": ""}`
3. Send `PATCH /api/notes/:id` with body `{"text": ""}`

## Actual Result

All three return HTTP 200 with objects containing empty text. Empty notes/replies are persisted and displayed as blank cards. 
<img width="1002" height="797" alt="empty text" src="https://github.com/user-attachments/assets/d42cb3db-fcfe-44cc-b7c2-9b943e2bcbce" />

## Expected Result

All three return HTTP 422 with a JSON error message. No empty content created.
