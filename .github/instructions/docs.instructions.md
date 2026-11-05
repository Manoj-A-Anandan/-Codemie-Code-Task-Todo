---
applyTo: "**/*.md"
---
When writing an SDLC Markdown deliverable under `docs/sdlc/`:

- Always use level-2 headings (##) for top-level sections.
- Use tables for anything comparative (risks, tasks, checklist rows).
- Never leave a silent gap — if information is missing, write "Not Found"
  explicitly rather than omitting the section.
- Every "Not Found" entry must later be echoed in
  `docs/sdlc/pr-description.md` under "Known Limitations".
- Do not duplicate content already finalized in an earlier-phase document;
  reference it instead (for example, `docs/sdlc/requirements.md`).
- Add the source URL and approval-log reference to each artifact.
