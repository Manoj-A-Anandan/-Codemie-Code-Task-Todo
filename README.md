# Daymark

A lightweight, local-first Todo application. Create, complete, filter, and
delete tasks; items are stored in browser local storage.

## Due Dates And Overdue Tasks

Each new task can have an optional due date. Incomplete tasks with a date before
the current local calendar date are marked as overdue. Use the `Overdue` filter
to focus on those tasks; completed tasks are never overdue. Existing saved tasks
without a due date continue to work unchanged.

## Run locally

Open `index.html` in a modern browser, or serve the directory with any static
file server.

## Test

```bash
npm test
```

Run the Playwright browser suite:

```bash
npm run test:browser
```

Run all checks:

```bash
npm run test:all
```

## Technology

Vanilla HTML, CSS, and JavaScript with Node's built-in test runner and
Playwright for browser tests.
