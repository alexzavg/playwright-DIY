# BUG-009: Edit/Delete controls inaccessible on touch devices

**Severity:** S3 - Minor  
**Priority:** P2 - Medium

## Summary

Edit and Delete buttons are revealed only via CSS `:hover` on the note card. On touch devices there is no hover state, making these controls inaccessible.

## Environment

- URL: https://kolsquare-qa.fly.dev/
- Viewport: 375x667 (iPhone SE, toggle device toolbar in browser)

## Steps to Reproduce

1. Open the app on a touch device (or touch simulation).
2. Tap on a note card.
3. Attempt to find Edit/Delete controls.

## Actual Result

Controls remain hidden. No alternative interaction (tap, long-press, visible menu) exists for touch users.

## Expected Result

On touch devices, controls accessible via always-visible icons, tap-to-reveal, or a three-dot menu. CSS fix: `@media (hover: none)` to show controls by default.
