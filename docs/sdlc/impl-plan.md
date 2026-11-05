# TODO-001 Implementation Plan

## Task List

| ID | Task | Depends On | Priority | Status |
|---|---|---|---|---|
| T1 | Extend the Todo domain with optional due-date validation, local-date overdue evaluation, and overdue filtering. | None | P0 | Done |
| T2 | Make local-storage writes report failure without discarding in-memory Todos. | T1 | P0 | Done |
| T3 | Update the form, filter controls, rendering, accessibility text, and empty states for due dates and overdue tasks. | T1, T2 | P0 | Done |
| T4 | Add responsive visual treatment for due-date metadata, overdue state, and persistence errors. | T3 | P1 | Done |
| T5 | Add unit tests for date validation, overdue boundaries, filtering, data compatibility, and storage failures. | T1, T2 | P0 | Done |
| T6 | Add browser-level tests for due-date creation, overdue filtering, completion, and empty state. | T3, T4 | P1 | Done |
| T7 | Update the README with due-date behavior, local-storage scope, and test commands. | T3, T5, T6 | P2 | Done |
| T8 | Resolve code-review findings for invalid persisted dates and invalid stored entries. | T1, T3, T5, T6 | P0 | Done |

Source: `docs/sdlc/architecture.md` and `docs/sdlc/design-review.md`. Approval:
`docs/sdlc/approval-log.md`.

## Dependency Notes

T1 establishes the date model and pure logic that all later work uses. T2 adds
the persistence contract before the UI consumes it. T3 uses both contracts to
deliver the user-visible feature. T4 and T6 depend on the UI behavior being
stable. T5 may run after T2 in parallel with T3. T7 is last so documentation
matches the final behavior and verification commands.

## Blocked Tasks

| Task | Blocking Reason | Unblocked By |
|---|---|---|
| T2 | Needs the Todo model and date helpers. | T1 marked Done |
| T3 | Needs domain date rules and save-failure result. | T1 and T2 marked Done |
| T4 | Needs rendered due-date and error elements. | T3 marked Done |
| T5 | Needs stable date and persistence behavior. | T1 and T2 marked Done |
| T6 | Needs stable UI and visual behavior. | T3 and T4 marked Done |
| T7 | Must describe verified final behavior. | T3, T5, and T6 marked Done |

## Suggested Execution Order

1. Implement and test T1.
2. Implement and test T2.
3. Implement and test T3.
4. Implement T4 and T5; these may proceed in parallel after T3 where practical.
5. Implement and run T6.
6. Complete T7 after implementation tests are passing.
