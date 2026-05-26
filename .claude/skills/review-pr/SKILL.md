---
name: review-pr
description: 'Collect EveryGSM GitHub PR review comments, assess each comment against project rules, apply valid fixes when safe, optionally commit and push fixes, and post Korean replies with gh api. Use only when the user explicitly asks to address PR review comments or reply to review comments.'
allowed-tools: Bash(bash *get-pr-data.sh:*), Bash(bash *reply-review-comment.sh:*), Bash(gh api:*), Bash(gh pr view:*), Bash(gh repo view:*), Bash(git add:*), Bash(git commit:*), Bash(git log:*), Bash(git push:*), Bash(git rev-parse:*), Bash(rm:*), Edit, Read
---

# EveryGSM Review PR

Use this skill only when the user explicitly asks to address PR review comments or post review replies.

## Step 1: Collect PR Data

```bash
bash "${CLAUDE_SKILL_DIR}/scripts/get-pr-data.sh"
```

Output files:

- `.pr-tmp/pr_comments.json`
- `.pr-tmp/pr_changed_files.txt`
- `.pr-tmp/pr_commits.txt`
- `.pr-tmp/pr_diff.txt`
- `.pr-tmp/pr_meta.env`

## Step 2: Load Rules

Read:

```bash
find .claude/rules -name "*.md" 2>/dev/null
```

Rule priority:

```text
AGENTS.md > CLAUDE.md > .claude/rules/** > nearby source patterns
```

## Step 3: Assess Comments

For each comment:

- `VALID`: reviewer is correct. Apply the smallest safe fix.
- `INVALID`: reviewer is incorrect or conflicts with project rules. Do not edit code.
- `PARTIAL`: intent may be valid but scope or implementation is ambiguous. Ask the user before editing.

Cite the source used for each judgment.

## Step 4: Commit and Push Valid Fixes

If valid fixes were made:

```bash
git add <changed-files>
git commit -m "<message>"
git rev-parse --short=7 HEAD
git push
```

Do not include unrelated changes or `.example/`.

## Step 5: Post Replies

Read `${CLAUDE_SKILL_DIR}/references/reply-formats.md`.

For each comment that should receive a reply:

```bash
bash "${CLAUDE_SKILL_DIR}/scripts/reply-review-comment.sh" "<repo>" "<pr_number>" "<comment_id>" "<reply_body>"
```

Use Korean replies.

## Step 6: Report and Cleanup

Print a summary table:

```text
comment | verdict | action | commit/reply
```

Clean up only temporary PR files:

```bash
rm -rf .pr-tmp
```
