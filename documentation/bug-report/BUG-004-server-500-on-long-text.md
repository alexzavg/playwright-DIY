# BUG-004: Server returns 500 on long text - no length validation

**Severity:** S2 - Major  
**Priority:** P1 - High

## Summary

Sending a note with 10,000+ characters causes a 500 Internal Server Error. Neither the backend nor the frontend enforces a character limit - the server crashes instead of returning a validation error, and the textarea has no `maxlength` attribute or character counter.

## Environment

- URL: https://kolsquare-qa.fly.dev/api/notes

## Test Data

10,000 repetitions of character `A`.

## Steps to Reproduce

1. Send `POST /api/notes` with `{"text": "AAAA..."}` (10,000 characters).

## Actual Result

HTTP 500 Internal Server Error. Response is an HTML error page. The frontend textarea has no `maxlength`, no counter, and no warning.

## Expected Result

- **Backend:** Returns HTTP 422 with JSON error indicating text exceeds maximum length.
- **Frontend:** Textarea has `maxlength` attribute and displays a character counter.
