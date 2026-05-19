# EveryGSM GitHub Labels Reference

Select 1-2 labels from the PR-eligible list below. Use the exact repository label names.
Do not assign workflow-state labels automatically.

## PR-Eligible Labels

| Label                    | When to Use                                                       |
| ------------------------ | ----------------------------------------------------------------- |
| `♻️ refactor - 리팩토링` | Refactoring or harness restructuring without app behavior changes |
| `✨ feat - 기능 개발`    | New user-facing feature or new harness capability                 |
| `🎨 design - UI/UX 변경` | UI/UX-only design changes                                         |
| `🐛 fix - 버그 수정`     | Bug fix                                                           |
| `💪 perf - 성능 개선`    | Performance improvement                                           |
| `📋 task - 작업`         | General task that does not fit another type                       |
| `📝 docs - 문서 작업`    | Documentation-only changes                                        |
| `🔧 chore - 기타 작업`   | Tooling, settings, maintenance, or non-feature harness changes    |

## Off-Limits Labels

| Label                                 | Reason                                                |
| ------------------------------------- | ----------------------------------------------------- |
| `✅ done - 완료`                      | Workflow state                                        |
| `🧻 ready - 작업 준비됨`              | Workflow state                                        |
| `🔁 in-progress - 진행 중`            | Workflow state                                        |
| `🚫 blocked - 막힘`                   | Workflow state                                        |
| `❌ wontfix - 수정 안함`              | Resolution state                                      |
| `🔥 priority: high - 빠른 처리 필요`  | Priority label, assign only when explicitly requested |
| `⚡ priority: medium - 일반 작업`     | Priority label, assign only when explicitly requested |
| `🌱 priority: low - 여유 있을 때`     | Priority label, assign only when explicitly requested |
| `🧨 priority: critical - 서비스 영향` | Priority label, assign only when explicitly requested |
| `🚨 bug - 오류 발생`                  | Issue state label, not a fix PR label                 |

## Quick Decision

```text
Bug fix? -> 🐛 fix - 버그 수정
Docs only? -> 📝 docs - 문서 작업
UI/UX only? -> 🎨 design - UI/UX 변경
Refactor or harness restructuring? -> ♻️ refactor - 리팩토링
Tooling or maintenance? -> 🔧 chore - 기타 작업
New capability? -> ✨ feat - 기능 개발
Unsure? -> 📋 task - 작업
```
