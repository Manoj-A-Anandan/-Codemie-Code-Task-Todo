# TODO-001 Requirements

## Overview

Daymark must let a user optionally attach a due date to a Todo item and make
incomplete past-due items easy to identify and filter. The feature extends the
existing local, single-user browser application without changing its existing
create, complete, filter, delete, or local-storage behavior.

Source: [approved Confluence story](https://manoj55802-1791971025854.atlassian.net/wiki/spaces/epamlearni/pages/6750209/TODO-001+Add+Due+Dates+and+Overdue+task+Visibility). Approval: `docs/sdlc/approval-log.md`.

## Functional Requirements

1. The add-task form must provide an optional due-date input.
2. A newly created task must persist its selected due date with the task data.
3. A task with a due date must display that date in the task list.
4. An incomplete task is overdue when its due date is earlier than the user's
   current local calendar date.
5. An overdue task must have a visual indicator and programmatic text that
   communicates its overdue status to assistive technology.
6. A completed task must not be identified as overdue, regardless of its due
   date.
7. The application must add an `Overdue` filter alongside `All`, `Active`, and
   `Done`.
8. The `Overdue` filter must show only incomplete overdue tasks.
9. When the selected filter has no matching tasks, the application must show a
   clear empty-state message.
10. Existing persisted tasks that do not contain a due date must load and work
    unchanged.

## Non-Functional Requirements

| Area | Requirement |
|---|---|
| Compatibility | Existing local-storage Todo data remains readable without migration failure. |
| Date handling | Overdue calculations use the user's local calendar date, not UTC time. |
| Accessibility | Due-date and overdue status are available to keyboard and screen-reader users. |
| Responsive design | The user interface works at desktop and mobile viewport sizes. |
| Security | User-entered task titles and date values are treated as data and never rendered as HTML. |
| Quality | Automated unit tests cover all acceptance criteria, including empty and missing due-date data. |

## Acceptance Criteria

### Create A Task With A Due Date

Given I am on the Daymark Todo page, when I create `Prepare sprint demo` with
tomorrow as its due date, then the task displays its due date and is not marked
overdue.

### Identify An Overdue Task

Given an incomplete task has a due date before today, when I view the task list,
then the task is visibly marked overdue and its overdue status is available to
screen readers.

### Complete An Overdue Task

Given an overdue task exists, when I mark it complete, then it is no longer
marked overdue.

### Filter Overdue Tasks

Given overdue and non-overdue tasks exist, when I select the `Overdue` filter,
then only incomplete overdue tasks are displayed.

### Empty Overdue View

Given no overdue tasks exist, when I select the `Overdue` filter, then I see a
clear empty-state message.

## Out Of Scope

- Notifications, reminders, and recurring tasks.
- User accounts, sharing, and server-side persistence.
- Editing an existing task's due date.

## Assumptions And Open Questions

| Item | Status | Resolution |
|---|---|---|
| Date format for storage | Assumption | Store the date-only value supplied by the standard HTML date input. |
| Date format for display | Assumption | Use a readable local-date format without changing the stored date-only value. |
| Confluence page retrieval | Not Found | The page requires an authenticated Atlassian session; the human-approved story content is the source of truth. |
