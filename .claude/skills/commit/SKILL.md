---
name: commit
description: 'Create actual EveryGSM Git commits by inspecting changed files, splitting logical units, staging the right files, and running git commit with project Conventional Commit messages. Use when the user explicitly asks to commit, make a commit, split commits, or commit staged/unstaged changes. Do not push.'
allowed-tools: Bash(git *:*), Bash(bash *discover-changed-areas.sh:*), Read
---

# EveryGSM Commit

Use this skill only when the user explicitly asks to create commits. For message recommendations without committing, inspect git state and answer directly without running `git add` or `git commit`.

## Step 1: Inspect Git State

```bash
git status --short
git diff --stat
git diff --staged --stat
```

If the user asks to commit staged changes only, use `git diff --staged` as the source of truth.

## Step 2: Determine Scope and Type

Run changed-area discovery:

```bash
bash "${CLAUDE_SKILL_DIR}/scripts/discover-changed-areas.sh" auto
```

Read `${CLAUDE_SKILL_DIR}/references/scope-guide.md` and choose the most specific useful scope. Use `chore(harness)` for `.claude/**` harness changes.

## Step 3: Split Logical Units

Split commits when changes are independent:

- App source behavior
- Styling-only UI changes
- Harness or documentation changes
- CI/config changes

Do not split files that are part of one requested change.

## Step 4: Stage and Commit

For each logical unit:

1. Stage only relevant files with `git add`.
2. Commit with:

   ```bash
   git commit -m "<type>(<scope>): <description>"
   ```

3. Verify:

   ```bash
   git log --oneline -n 3
   ```

## Rules

- Do not run `git push`.
- Do not include untracked `.example/` unless the user explicitly asks.
- Do not commit generated caches or build outputs.
- If there are unrelated user changes, leave them unstaged and report them.
