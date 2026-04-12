# BUG-010: Textarea out of viewport when resized

**Severity:** S3 - Minor  
**Priority:** P3 - Low

## Summary

When resizing the textarea - it goes out of viewport and is not fully visible. The page doesn't scroll to make the textarea visible.

## Environment

- URL: https://kolsquare-qa.fly.dev/

## Steps to Reproduce

1. Open the app
2. Add new note / add new reply to an existing note
3. Click on the note/reply to expand it
4. Resize the textarea
5. Observe the textarea / page

## Actual Result

The textarea goes out of viewport and is not fully visible. The page doesn't scroll to make the textarea visible.
<img width="957" height="890" alt="Monosnap Notes 2026-04-12 12-44-57" src="https://github.com/user-attachments/assets/3aa402ef-ac8f-4313-954e-d9f996271b28" />

https://github.com/user-attachments/assets/3cb2f3fb-266d-4854-852f-c4492bffe73d

## Expected Result

The page should scroll to make the textarea visible.
