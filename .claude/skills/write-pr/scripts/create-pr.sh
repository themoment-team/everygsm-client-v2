#!/usr/bin/env bash

set -euo pipefail

TITLE="${1:?Error: PR title is required. Usage: create-pr.sh <title> <body-file> [label1,label2,...]}"
BODY_FILE="${2:?Error: Body file is required. Usage: create-pr.sh <title> <body-file> [label1,label2,...]}"
LABELS="${3:-}"

if [ ! -f "$BODY_FILE" ]; then
  echo "ERROR: Body file not found: $BODY_FILE" >&2
  exit 1
fi

CURRENT_BRANCH=$(git branch --show-current)
BASE=$(gh pr view --json baseRefName -q .baseRefName 2>/dev/null || true)

if [ -z "$BASE" ]; then
  case "$CURRENT_BRANCH" in
    main | master)
      BASE="main"
      ;;
    develop)
      BASE="main"
      ;;
    *)
      BASE="develop"
      ;;
  esac
fi

ARGS=(gh pr create --title "$TITLE" --body-file "$BODY_FILE" --base "$BASE")

if [ -n "$LABELS" ]; then
  IFS=',' read -ra LABEL_ARRAY <<< "$LABELS"
  for label in "${LABEL_ARRAY[@]}"; do
    trimmed=$(echo "$label" | xargs)
    [ -n "$trimmed" ] && ARGS+=(--label "$trimmed")
  done
fi

echo "Creating PR..."
echo "  Title : $TITLE"
echo "  Base  : $BASE"
[ -n "$LABELS" ] && echo "  Labels: $LABELS"
echo ""

"${ARGS[@]}"
