---
applyTo: "**/*.{test,spec}.{js,ts,py}"
---
When writing tests:

- Every test file must cover at minimum three cases per function/endpoint:
  1. Happy path (valid input, expected output)
  2. "Not Found" / missing-field / empty-input edge case
  3. Failure case (exception, timeout, malformed input)
- Use descriptive test names in the form:
  "should <expected behavior> when <condition>"
- Do not mock away the exact logic under test — only mock external
  dependencies (network, filesystem, time).
- If a test is skipped or pending, it must include a comment explaining why
  and a tracking reference (task ID from impl-plan.md).