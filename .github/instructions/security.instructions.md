---
applyTo: "**/*.{env,yml,yaml,json,config}"
---
When writing or editing configuration files:

- Never write real secret values — use placeholders like
  `${API_KEY}` or `<set-in-ci-secrets>`.
- Flag any dependency version that is known-vulnerable (check against
  common CVE knowledge) and suggest the patched version instead.
- `.env` files must never be committed with real values — only
  `.env.example` with placeholder keys is allowed.