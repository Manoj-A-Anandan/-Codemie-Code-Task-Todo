# Agentic SDLC Workflow

## Manual Entry Point

In VS Code with GitHub Copilot Agent Mode, select `sdlc-orchestrator` and provide
the Confluence story URL. Do not manually invoke a worker agent. The
orchestrator delegates each phase in order and stops after every phase for an
explicit human decision.

## Human Responses

At every gate, reply with exactly one of the following:

- `Approve`
- `Revise: <specific feedback>`
- `Stop`

Approvals, decisions, and source links are recorded in `approval-log.md`.

## Phase Outputs

| Phase | Worker | Artifact |
|---|---|---|
| Requirements | requirements-analyst | requirements-questions.md, requirements.md |
| Architecture | architect | architecture.md |
| Design review | design-reviewer | design-review.md |
| Planning | planner | impl-plan.md |
| Implementation | implementer | Source, tests, implementation-plan status |
| Code review | code-reviewer | code-review-findings.md |
| Verification | verifier | verification-report.md |
| Release | pr-writer | pr-description.md, CHANGELOG.md, pull request |
