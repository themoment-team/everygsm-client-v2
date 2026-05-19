---
description: 'Branch, commit, PR text, and change grouping conventions for EveryGSM Git workflow and GitHub metadata.'
paths:
  - '.github/**/*'
  - '.claude/skills/everygsm-commit/**/*'
  - '.claude/skills/everygsm-write-pr/**/*'
  - '.claude/skills/everygsm-review-pr/**/*'
  - '.claude/rules/git-workflow.md'
---

# Git Workflow Rules

Use these rules for branch names, commits, PR text, and change grouping.

## Branch Names

Use:

```text
<type>/<kebab-case-description>
```

Recommended types:

- `feat`
- `fix`
- `refactor`
- `style`
- `chore`
- `docs`
- `test`
- `ci`

Examples:

- `feat/add-project-filter`
- `fix/register-form-validation`
- `chore/setup-claude-harness`

## Commit Messages

Use short Conventional Commit-style messages:

```text
<type>: <description>
```

Add a scope only when it improves clarity:

```text
feat(project): add pending request filter
```

Keep each commit focused on one logical change. Do not mix source changes, formatting churn, and harness configuration unless they are part of the same requested task.

## Pull Requests

- Follow `.github/PULL_REQUEST_TEMPLATE.md`.
- Describe purpose, summarize work, link related issues, and attach screenshots or videos for UI changes.
- Mention validation commands and any checks that could not be run.
