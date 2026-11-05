# Agentic SDLC Instructions

`sdlc-orchestrator` is the sole manually invocable entry point. It alone may
invoke phase workers. Workers must never invoke another worker, skip a phase,
or continue after producing their assigned artifact.

The workflow is requirements analyst, architect, design reviewer, architect
revision if approved, planner, implementer, code reviewer, verifier, and PR
writer. Stop after every phase and wait for explicit human approval recorded in
`docs/sdlc/approval-log.md`. Silence or vague feedback is not approval.

Use durable files under `docs/sdlc/`, not chat context, to exchange work. Read
approved upstream artifacts before working. Unknown facts must be written as
`Not Found`; never fabricate them. Do not include secrets, credentials, or
tokens in source, artifacts, prompts, or output.

The shared artifact contract is `approval-log.md`, `requirements-questions.md`,
`requirements.md`, `architecture.md`, `design-review.md`, `impl-plan.md`,
`code-review-findings.md`, `verification-report.md`, and `pr-description.md`.
