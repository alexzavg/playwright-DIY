# BUG-008: Mobile layout - button overlaps subtitle

**Severity:** S3 - Minor  
**Priority:** P2 - Medium

## Summary

On mobile viewports (375px), the "Create a new Note" button crowds against the multi-line subtitle text.

## Environment

- URL: https://kolsquare-qa.fly.dev/
- Viewport: 375x667 (iPhone SE, toggle device toolbar in browser)

## Steps to Reproduce

1. Open the app at 375px viewport width.
2. Observe the header area.

## Actual Result

Flex layout forces button and subtitle side-by-side. Subtitle wraps to multiple lines and the button overlaps/crowds the text.

## Expected Result

On mobile, header stacks vertically: title/subtitle above, button below.

## Additional Info

Desktop layout (1280px) renders correctly. Fixable with a CSS media query or `flex-wrap`.
