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
<img width="374" height="212" alt="gmt" src="https://github.com/user-attachments/assets/8cf6eaa6-69cf-41fd-9649-e5eb4554675c" />

## Expected Result

User-friendly format, e.g., `Apr 11, 2026, 10:03 AM` (localized) or `2 hours ago` (relative).
