# EveryGSM Git Scope Guide

Use this guide when selecting branch names, commit scopes, PR title scopes, and logical commit groups.

## Runtime Discovery

Prefer the changed files over guesses:

```bash
bash "${CLAUDE_SKILL_DIR}/scripts/discover-changed-areas.sh" auto
```

Use `staged` when the user specifically asks about staged changes:

```bash
bash "${CLAUDE_SKILL_DIR}/scripts/discover-changed-areas.sh" staged
```

## Scope Priority

Choose the most specific meaningful scope:

1. Feature/domain area such as `project`, `auth`, `admin`, `mypage`, or `register`
2. FSD layer such as `features`, `entities`, `widgets`, or `shared`
3. Cross-cutting scope such as `harness`, `docs`, `ci`, `config`, or `global`

## Common Scope Mapping

| Changed Area                                     | Preferred Scope | When to Use                                                    |
| ------------------------------------------------ | --------------- | -------------------------------------------------------------- |
| `src/features/register-project`                  | `register`      | Project registration form, upload, schema, or mutation changes |
| `src/features/oauth-sign-in`                     | `auth`          | OAuth sign-in flow                                             |
| `src/features/like-project`                      | `project`       | Like/unlike behavior                                           |
| `src/entities/project`                           | `project`       | Project types, API, hooks, cards, detail modal                 |
| `src/entities/user`                              | `user`          | User info type/API/query changes                               |
| `src/views/admin`, `src/app/admin`               | `admin`         | Admin pages, guards, request detail                            |
| `src/views/mypage`, `src/app/mypage`             | `mypage`        | My page and my request detail                                  |
| `.claude/**`                                     | `harness`       | Agent, skill, rule, hook, or settings changes                  |
| `.github/**`                                     | `ci`            | Workflow or PR template changes                                |
| `docs/**`, `README.md`, `CLAUDE.md`, `AGENTS.md` | `docs`          | Documentation-only changes                                     |
| Tooling config                                   | `config`        | TypeScript, ESLint, Prettier, Next, package config             |

## Commit Type Selection

| Type       | Use For                                              |
| ---------- | ---------------------------------------------------- |
| `feat`     | User-visible capability or new app behavior          |
| `fix`      | Bug fix or regression fix                            |
| `refactor` | Internal restructuring without behavior change       |
| `style`    | Visual styling or formatting-only UI changes         |
| `chore`    | Harness, tooling, dependency, or maintenance changes |
| `docs`     | Documentation-only changes                           |
| `test`     | Test-only changes                                    |
| `ci`       | GitHub Actions or CI changes                         |

## Examples

```text
chore(harness): add Git workflow resources
fix(register): align form defaults with schema
feat(project): add status filter
docs: update setup instructions
```
