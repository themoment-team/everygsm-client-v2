#!/usr/bin/env bash

set -euo pipefail

REPO="${1:?Error: repo is required. Usage: reply-review-comment.sh <owner/repo> <pr-number> <comment-id> <body>}"
PR_NUMBER="${2:?Error: PR number is required. Usage: reply-review-comment.sh <owner/repo> <pr-number> <comment-id> <body>}"
COMMENT_ID="${3:?Error: comment id is required. Usage: reply-review-comment.sh <owner/repo> <pr-number> <comment-id> <body>}"
BODY="${4:?Error: reply body is required. Usage: reply-review-comment.sh <owner/repo> <pr-number> <comment-id> <body>}"

if [[ ! "$REPO" =~ ^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$ ]]; then
  echo "ERROR: Invalid repo format: $REPO" >&2
  exit 1
fi

if [[ ! "$PR_NUMBER" =~ ^[0-9]+$ ]]; then
  echo "ERROR: Invalid PR number: $PR_NUMBER" >&2
  exit 1
fi

if [[ ! "$COMMENT_ID" =~ ^[0-9]+$ ]]; then
  echo "ERROR: Invalid comment id: $COMMENT_ID" >&2
  exit 1
fi

gh api "repos/$REPO/pulls/$PR_NUMBER/comments/$COMMENT_ID/replies" -f body="$BODY"
