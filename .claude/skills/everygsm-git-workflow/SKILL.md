---
name: everygsm-git-workflow
description: 'Generate EveryGSM branch names, commit messages, logical commit splits, staged-change summaries, PR titles, and PR bodies from actual git state. Use for branch naming, commit recommendations, staged changes, PR drafts, release notes, and Git workflow questions.'
---

# EveryGSM Git Workflow

Use this skill for branch, commit, and PR tasks.

## Branch Names

Format:

```text
<type>/<kebab-case-description>
```

Use the same type as the likely commit when possible:

- `feat`
- `fix`
- `refactor`
- `style`
- `chore`
- `docs`
- `test`
- `ci`

## Commit Messages

Inspect the actual requested scope:

- Staged changes: `git diff --staged --stat` and `git diff --staged --name-status`.
- Unstaged changes: `git status` and `git diff --stat`.

Format:

```text
<type>: <description>
```

Use a scope only when it adds clarity:

```text
feat(project): add request status filter
```

Recommend one best message first.

## Logical Splitting

Suggest separate commits when changes represent different logical units:

- App source behavior
- Styling-only changes
- Harness or documentation changes
- CI/config changes

Do not split when files are part of one inseparable requested change.

## PR Drafts

Read `.github/PULL_REQUEST_TEMPLATE.md` before drafting PR content. Include:

- Purpose
- Work summary
- Validation commands
- Screenshots or video note for UI changes
- Known limitations or skipped checks
