# BUG-005: Dialog textarea not cleared after Cancel

**Severity:** S3 - Minor  
**Priority:** P2 - Medium

## Summary

When a user types text in the "Create a new Note" dialog, clicks Cancel, and reopens the dialog, the textarea still contains the previously entered text.

## Environment

- URL: https://kolsquare-qa.fly.dev/
- Browser: Chrome latest

## Steps to Reproduce

1. Click "Create a new Note."
2. Type "test text" in the textarea.
3. Click "Cancel."
4. Click "Create a new Note" again.

## Actual Result

Textarea contains "test text" from step 2.

## Expected Result

Textarea is empty on each dialog open.
https://github.com/user-attachments/assets/c7261ef6-dfb2-47e4-a140-80e294c7886a
