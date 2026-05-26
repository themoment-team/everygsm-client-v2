---
name: quality-gate
description: 'Verify EveryGSM-client-v2 changes with pnpm format:check, pnpm lint, pnpm build, FSD import review, route/link coherence, API-hook-type coherence, form/schema alignment, and client/server boundary checks. Use after implementation, during reviews, for reruns, and whenever a task risks regressions.'
---

# EveryGSM Quality Gate

Use this skill to verify changes before final delivery.

## Rule Loading

Discover and read project harness rules before static review:

```bash
find .claude/rules -name "*.md" 2>/dev/null
```

Use these files together with `CLAUDE.md`, `AGENTS.md`, and nearby source patterns.

## Minimum Commands

Run these when feasible:

```bash
pnpm format:check
pnpm lint
pnpm build
```

If a command fails, inspect whether the failure is caused by the current change, the environment, or pre-existing repository state.

## Static Review Checklist

Check the boundaries affected by the task:

- FSD imports follow `app -> views -> widgets -> features -> entities -> shared`.
- Same-layer imports were not introduced.
- Public exports are updated when a new module is meant to be imported externally.
- Route paths in `src/app` match any changed `href`, `router.push`, or redirects.
- Client components are marked with `use client` when they use hooks, browser APIs, or event handlers.
- Server-only utilities are not imported into client components.

## Data Coherence Checklist

For data changes, compare both sides:

- API URL constants match API functions.
- API functions match query or mutation hooks.
- Hook response types match UI field usage.
- Server `initialData` shape matches the client query's expected shape.
- Form defaults match the Zod schema and rendered fields.
- Nullable fields are handled where rendered.

## UI Checklist

For UI changes, check:

- Empty, loading, pending, success, and error states when relevant.
- Responsive behavior for narrow and desktop widths.
- Text wrapping inside fixed-size controls.
- Modal open, close, and cleanup behavior.
- Toast behavior for user-visible success and failure paths.

## Reporting Format

Report findings in this order:

1. Blocking issues
2. Non-blocking risks
3. Commands run
4. Residual risk

If no issues are found, say so directly and still list the checks that were run.
