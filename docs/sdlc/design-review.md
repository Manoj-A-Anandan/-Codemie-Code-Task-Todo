# TODO-001 Design Review

## Review Summary

The proposed client-side, date-only design is appropriate for Daymark's local
single-user scope and maps all approved requirements. Two implementation risks
need an explicit human disposition before planning: safe handling of failed
local-storage writes and a deterministic boundary for local-date comparisons.

Source: `docs/sdlc/architecture.md` and `docs/sdlc/requirements.md`. Approval:
`docs/sdlc/approval-log.md`.

## Findings

| Severity | Area | Finding | Recommendation |
|---|---|---|---|
| Major | Reliability | `saveTodos` currently allows a browser storage exception to interrupt the UI flow. The approved architecture requires a non-blocking visible error. | Make persistence report success or failure to the app layer, retain in-memory state on failure, and render an accessible error message. |
| Major | Correctness | Comparing date strings is safe only when all values are valid normalized ISO date-only strings. Legacy malformed values could otherwise produce incorrect overdue status. | Add date validation and use a pure helper that accepts an explicit local-date value in tests. Invalid values must behave as no due date. |
| Minor | Accessibility | A visible overdue label alone may not announce status with the task name consistently. | Include programmatic overdue text in the task's accessible label or status text. |
| Minor | Testability | The current test suite does not exercise DOM rendering or the browser date-input integration. | Add a lightweight browser-level test harness or document this as a verification gap if dependency-free browser automation is unavailable. |
| Suggestion | UX | A date display format should be consistent and readable without ambiguous numeric ordering. | Use `Intl.DateTimeFormat` with the user's locale for display while persisting ISO date-only values. |

## Proposed Design Decisions

| Decision | Status | Rationale |
|---|---|---|
| Retain vanilla JavaScript and browser local storage | Proposed | It preserves the approved scope and avoids unnecessary dependencies. |
| Normalize due dates as ISO `YYYY-MM-DD` strings | Proposed | It models a calendar date without an implicit time zone. |
| Treat missing or invalid persisted due dates as absent | Proposed | It protects existing local data from a breaking load failure. |
| Show an accessible, non-blocking persistence error | Proposed | It satisfies the reliability requirement without discarding in-memory changes. |
| Add browser-level coverage for the visible flow | Proposed | It validates form, filter, status, and empty-state integration. |

## Action Items

1. Human: approve or revise the proposed decisions and findings.
2. Architect: after approval, revise `docs/sdlc/architecture.md` to make the
   storage-error boundary and overdue-helper contract explicit.
3. Planner: do not create an implementation plan until the architecture revision
   is approved.
