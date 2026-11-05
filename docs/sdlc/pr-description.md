# PR: Add Todo Due Dates And Overdue Visibility

## Summary

This change adds optional due dates and overdue visibility to Daymark so users
can identify work requiring immediate attention. It preserves the application's
local-first model while safely handling legacy and malformed persisted data.

Source: `docs/sdlc/requirements.md`. Verification:
`docs/sdlc/verification-report.md`. Approval: `docs/sdlc/approval-log.md`.

## Changes Made

- `index.html` adds an optional due-date field, an Overdue filter, and an
  accessible persistence-error region.
- `src/todos.js` adds due-date validation, local-date overdue evaluation,
  compatibility filtering, and safe storage-write results.
- `src/app.js` renders due-date metadata, overdue status, filter empty states,
  and non-blocking persistence errors.
- `styles.css` adds responsive due-date, overdue, error, and reduced-motion
  presentation.
- `test/todos.test.js` verifies date boundaries, compatibility, malformed data,
  filtering, and storage failures.
- `test/browser/due-dates.spec.js`, `playwright.config.js`, and
  `scripts/serve.js` provide browser-level coverage for the feature flow.
- `package.json` and `package-lock.json` add Playwright and repeatable unit,
  browser, and combined test commands.
- `README.md` documents due-date behavior and test commands.
- `docs/sdlc/` records the human-gated requirements, architecture, review,
  plan, verification, and release evidence.

## Test Evidence

```text
npm run test:all

Node unit tests: 14 passed, 0 failed, 0 skipped
Playwright browser tests: 4 passed, 0 failed
npm audit: 0 vulnerabilities
```

## Known Limitations

- Confluence content could not be retrieved automatically because the source
  page requires an authenticated Atlassian session; the approved URL and human
  confirmation are recorded in the approval log.
- Notifications, reminders, recurring tasks, user accounts, sharing, and
  server-side persistence are out of scope.
- Existing Todos can display a due date but cannot yet edit it after creation.
- SDLC documents use level-one top-level headings instead of the local Markdown
  instruction's preferred level-two headings; this is non-blocking.
- T8 is not listed in the plan's suggested execution order; its completed
  review-remediation status is recorded in the task table.

## Reviewer Checklist

- [ ] Requirements match the implemented due-date and overdue behavior.
- [ ] No secrets or credentials are present in the diff.
- [ ] Empty, invalid, malformed, and storage-failure paths are handled.
- [ ] Unit and browser tests cover happy paths and edge cases.
- [ ] Shared Todo logic has no unnecessary duplication.
- [ ] Dependencies have no known vulnerabilities.
- [ ] SDLC documentation matches the final code and test evidence.

## Proposed CHANGELOG Entry

```markdown
## [Unreleased]

### Added
- Optional Todo due dates, overdue status, and an Overdue filter.
- Browser-level Playwright coverage for Todo due-date flows.

### Changed
- Local Todo persistence now tolerates malformed data and reports write failures.
```
