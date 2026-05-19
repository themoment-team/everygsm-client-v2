---
name: everygsm-write-pr
description: 'Create an actual GitHub pull request for EveryGSM from the current branch. Gathers commits and diff, generates a Korean PR title/body following the repository template, selects labels, asks for title confirmation, then runs gh pr create. Use only when the user explicitly asks to create/open/write a PR.'
allowed-tools: Bash(git *:*), Bash(gh pr *:*), Bash(gh repo *:*), Bash(bash *create-pr.sh:*), Bash(cat *:*), Bash(mkdir:*), Bash(rm:*), Read, Write
---

# EveryGSM Write PR

Use this skill only when the user explicitly asks to create or open a PR.

## Step 1: Gather Context

```bash
git branch --show-current
git log origin/develop..HEAD --oneline 2>/dev/null || git log --oneline -15
git diff origin/develop...HEAD --stat 2>/dev/null || git diff HEAD~5...HEAD --stat
git diff origin/develop...HEAD 2>/dev/null || git diff HEAD~5...HEAD
cat .github/PULL_REQUEST_TEMPLATE.md
```

## Step 2: Select Labels

Read `${CLAUDE_SKILL_DIR}/references/labels.md` and select 1-2 PR-eligible labels.

## Step 3: Generate PR Content

Title:

- Generate 3 options.
- Use `[scope] description` format.
- Keep it concise and Korean.

Body:

- Follow `.github/PULL_REQUEST_TEMPLATE.md`.
- Write Korean prose.
- Remove screenshot/video section when there is no UI change.
- Include validation commands and skipped checks.
- Create `.pr-tmp/` if needed, then write body to `.pr-tmp/PR_BODY.md`.

Show a preview and ask the user which title to use before creating the PR.

## Step 4: Create PR

After title confirmation:

```bash
bash "${CLAUDE_SKILL_DIR}/scripts/create-pr.sh" "<confirmed-title>" ".pr-tmp/PR_BODY.md" "<label1>,<label2>"
```

Report the PR URL returned by `gh`.

## Step 5: Cleanup

Remove only temporary PR body files created by this skill:

```bash
rm -f .pr-tmp/PR_BODY.md
```
