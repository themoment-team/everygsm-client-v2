---
name: everygsm-code-review
description: 'Review EveryGSM-client-v2 changed files using dynamically discovered .claude/rules, FSD layering, UI conventions, API/data coherence, form/schema alignment, route/link checks, security basics, and validation results. Use for code review requests, staged diff review, pre-PR review, and after multi-file implementation.'
---

# EveryGSM Code Review

Use this skill for structured review of changed EveryGSM frontend code or harness files.

## Step 1: Load Rules

Discover rules dynamically:

```bash
find .claude/rules -name "*.md" 2>/dev/null
```

Read every returned file. Rules in `CLAUDE.md` and `AGENTS.md` still apply; if rules conflict, use this priority:

```text
AGENTS.md > CLAUDE.md > .claude/rules/** > nearby source patterns
```

For multi-file reviews or pre-PR checks, also read `${CLAUDE_SKILL_DIR}/references/review-checklist.md`.

## Step 2: Determine Review Scope

Use the user's requested scope:

- Staged review: `git diff --staged`
- Working tree review: `git diff`
- Branch review: compare with `develop` when available
- File-specific review: inspect the named files and direct dependencies

## Step 3: Review Checklist

Check only what is relevant to the changed files. Use the reference checklist for detailed prompts, and keep the final report focused on actual findings:

- FSD layer direction and ownership.
- Client/server component boundaries.
- API URL, API function, hook, response type, and UI consumer coherence.
- React Hook Form defaults, Zod schema, rendered fields, and mutation payload coherence.
- App Router paths versus changed links, redirects, and router pushes.
- UI empty/loading/error/pending/success states.
- Secret, OAuth, and API host handling.
- Validation commands and unverified risk.

## Report Format

Lead with findings:

```markdown
## Findings

- [High|Medium|Low] `path:line` — issue, impact, and suggested fix.

## Open Questions

- Only include real blockers or assumptions.

## Checks

- Commands and static checks performed.
```

If no issues are found, state that clearly and mention remaining test gaps.
