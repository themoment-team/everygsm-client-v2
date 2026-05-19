---
description: 'Root-cause debugging, boundary tracing, and fix discipline rules for EveryGSM bugs, validation failures, and scripts.'
paths:
  - 'src/**/*'
  - '.claude/**/*.sh'
  - '.claude/skills/everygsm-systematic-debugging/**/*'
---

# Debugging Rules

Use these rules for bugs, test failures, build failures, and unexpected behavior.

## Root Cause First

Do not patch symptoms before identifying the likely root cause.

Before changing code:

1. Read the full error output.
2. Reproduce the issue or identify why it cannot be reproduced.
3. Check recent diffs and relevant call sites.
4. Compare the broken path with a working local pattern.
5. State one specific hypothesis before editing.

## Boundary Tracing

For frontend integration issues, trace data through the full boundary:

```text
route -> server fetch -> API function -> query hook -> component -> rendered state
```

For form issues, trace:

```text
defaultValues -> rendered fields -> event handlers -> Zod schema -> mutation payload
```

For navigation issues, trace:

```text
src/app route file -> href/router.push/redirect -> dynamic params -> guard/layout behavior
```

## Fix Discipline

- Make one root-cause fix at a time.
- Do not bundle cleanup with a bug fix.
- If two fix attempts fail, stop and re-evaluate the hypothesis.
- If the failure depends on environment variables or external services, separate environment evidence from code evidence.
