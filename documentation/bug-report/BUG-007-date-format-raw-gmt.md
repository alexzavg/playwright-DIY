# BUG-007: Dates displayed in raw GMT format

**Severity:** S3 - Minor  
**Priority:** P2 - Medium

## Summary

Note creation dates are displayed as raw UTC/GMT strings instead of a user-friendly localized format.

## Environment

- URL: https://kolsquare-qa.fly.dev/
- Browser: Chrome latest

## Steps to Reproduce

1. Navigate to the app.
2. Observe the date under any note's author name.

## Actual Result

`Sat, 11 Apr 2026 08:03:15 GMT`

## Expected Result

User-friendly format, e.g., "Apr 11, 2026, 10:03 AM" (localized) or "2 hours ago" (relative).

## Additional Info

The API returns ISO 8601 (correct for an API). The frontend likely uses `toUTCString()`. Fix: use `Intl.DateTimeFormat` or `dayjs`.
