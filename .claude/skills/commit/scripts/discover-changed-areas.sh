#!/usr/bin/env bash

set -euo pipefail

MODE="${1:-auto}"

case "$MODE" in
  staged)
    FILES=$(git diff --staged --name-only --diff-filter=ACMRD)
    ;;
  unstaged)
    FILES=$(git diff --name-only --diff-filter=ACMRD)
    ;;
  auto)
    FILES=$(git diff --staged --name-only --diff-filter=ACMRD)
    if [ -z "$FILES" ]; then
      FILES=$(git diff --name-only --diff-filter=ACMRD)
    fi
    ;;
  *)
    echo "Usage: $0 [auto|staged|unstaged]" >&2
    exit 1
    ;;
esac

if [ -z "$FILES" ]; then
  echo "none"
  exit 0
fi

printf '%s\n' "$FILES" | awk '
  /^src\/app\// { print "app"; next }
  /^src\/views\// { print "views"; next }
  /^src\/widgets\// { print "widgets"; next }
  /^src\/features\// { print "features"; next }
  /^src\/entities\// { print "entities"; next }
  /^src\/shared\// { print "shared"; next }
  /^\.claude\// { print "harness"; next }
  /^\.github\// { print "ci"; next }
  /^(README|CLAUDE|AGENTS|docs\/)/ { print "docs"; next }
  /^(package\.json|pnpm-lock\.yaml|tsconfig|eslint|next\.config|postcss|\.prettier|\.editorconfig)/ { print "config"; next }
  { print "global" }
' | sort -u
