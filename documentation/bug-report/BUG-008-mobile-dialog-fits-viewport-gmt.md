# BUG-008: Mobile dialog doesn't fit viewport

**Severity:** S3 - Minor  
**Priority:** P3 - Low

## Summary

Mobile dialog doesn't fit viewport when toggled in Chrome DevTools device toolbar mode for Iphone SE.

## Environment

- URL: https://kolsquare-qa.fly.dev/
- Browser: Chrome latest

## Steps to Reproduce

1. Navigate to the app.
2. Toggle Chrome DevTools device toolbar to Iphone SE.
3. Open any dialog (e.g. click "Create a new note" button).

## Actual Result

Dialog doesn't fit viewport and is cut off at the sides.

## Expected Result

Dialog should fit within the viewport and be fully visible.
