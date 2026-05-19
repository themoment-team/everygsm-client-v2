---
name: everygsm-systematic-debugging
description: 'Investigate EveryGSM-client-v2 bugs, build failures, lint failures, runtime errors, form issues, route issues, API/query mismatches, and unexpected behavior by finding root cause before fixes. Use whenever debugging, test failure, build failure, regression, or unclear behavior is mentioned.'
---

# EveryGSM Systematic Debugging

Use this skill before fixing bugs or validation failures.

## Rule

Find root cause before editing code. A quick patch that only hides the symptom is not a fix.

## Phase 1: Evidence

1. Read the full error, warning, stack trace, or user reproduction.
2. Identify whether the issue is reproducible.
3. Inspect recent diffs and directly related files.
4. Compare against a working local pattern.
5. State one root-cause hypothesis.

## Phase 2: Boundary Trace

Choose the relevant trace:

```text
API/query: apiUrls -> API function -> query/mutation hook -> component -> UI state
Form: defaultValues -> field -> handler -> Zod schema -> submit payload -> mutation
Route: src/app page -> Link/router.push/redirect -> layout/guard -> view
Build: first compiler error -> owning file -> imports/types -> recent diff
```

## Phase 3: Minimal Fix

- Change one thing that addresses the hypothesis.
- Do not bundle cleanup or refactors.
- Prefer adding a focused regression check if the repository has a suitable test path.
- If no test framework exists, document the smallest command or manual path that verifies the fix.

## Phase 4: Verification

Run the smallest meaningful check first, then the broader gate:

```bash
pnpm format:check
pnpm lint
pnpm build
```

If a check cannot run because of environment constraints, report the constraint separately from code risk.
