---
applyTo: "src/**/*.{js,ts,py,java,go}"
---
When writing or editing source code:

- Function and variable names must be self-explanatory; avoid comments that
  restate what the code already says. Only comment on *why*, not *what*.
- Validate all external input (API responses, file reads, CLI args) before
  use. Never assume a field exists — check and handle its absence.
- Never hardcode secrets, API keys, tokens, or credentials. Read them from
  environment variables and document the expected variable name in
  requirements.md or a README, never inline.
- Prefer small, pure functions over large multi-purpose ones. If you notice
  duplicated logic across two or more places, extract a shared function.
- Every new function must have a corresponding test in the same PR.