# BUG-009: User missing avatar

**Severity:** S2 - Moderate  
**Priority:** P2 - Medium

## Summary

Sometimes when adding a reply or a note - a random user/author is selected without an avatar. This is a flaky issue.

## Environment

- URL: https://kolsquare-qa.fly.dev/

## Steps to Reproduce

1. Open the app
2. Add new note / add new reply to an existing note
3. Observe note/reply author avatar

## Actual Result

There is a chance that a newly added random author will not have an avatar displayed (404 err is returned for an avatar img resource, e.g. https://kolsquare-qa.fly.dev/examples/max-mustermann.jpeg) 
<img width="1711" height="890" alt="missing avatar bug" src="https://github.com/user-attachments/assets/f8f949a9-105e-4d3a-95d6-d786ff1a2984" />

## Expected Result

All authors have avatars. If a user doesn't have an avatar - an "empty avatar template" is displayed (e.g. with a person silhouette) 
