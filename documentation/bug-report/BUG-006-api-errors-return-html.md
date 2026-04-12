# BUG-006: API error responses return HTML instead of JSON

**Severity:** S3 - Minor  
**Priority:** P2 - Medium

## Summary

All error responses from `/api/*` endpoints return Symfony's default HTML error pages instead of JSON. A REST API consumed by a JavaScript frontend should return JSON errors.

## Environment

- URL: https://kolsquare-qa.fly.dev/api/*

## Steps to Reproduce

1. Send `POST /api/notes` with body `{}` (missing `text` field).
2. Send `DELETE /api/notes/999999` (non-existent ID).
3. Observe `Content-Type` and response body.

## Actual Result

All errors return `Content-Type: text/html` with full HTML pages. Affected codes: 404, 422.
<img width="1012" height="813" alt="err validation format" src="https://github.com/user-attachments/assets/72bec132-bb32-4d99-9d55-c28bb007acde" />

## Expected Result

All `/api/*` errors return `Content-Type: application/json` with consistent JSON (e.g., `{"error": "message"}`).
