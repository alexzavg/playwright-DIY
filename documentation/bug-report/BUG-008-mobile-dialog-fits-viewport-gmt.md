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
2. Toggle Chrome DevTools device toolbar to Iphone SE (375x667).
3. Open any dialog (e.g. click "Create a new note" button).

## Actual Result

Dialog doesn't fit viewport and is cut off at the sides.
<img width="696" height="756" alt="mob1" src="https://github.com/user-attachments/assets/610861b7-a3aa-407c-9ad6-9d1bda30f1d3" />
<img width="641" height="772" alt="mob2" src="https://github.com/user-attachments/assets/d97bdb24-bd3b-4871-bc2b-ba32c5f87f18" />

## Expected Result

Dialog should fit within the viewport and be fully visible.
