---
name: everygsm-orchestrator
description: 'Coordinate the EveryGSM-client-v2 agent team for frontend features, bug fixes, refactors, UI work, API/data work, QA, routing, forms, TanStack Query, Zod, Axios, and FSD architecture. Use this skill for EveryGSM implementation tasks, reviews, reruns, updates, revisions, partial reruns, follow-up fixes, and requests to improve previous results. Simple one-off questions may be answered directly.'
---

# EveryGSM Orchestrator

Coordinate the EveryGSM-client-v2 harness. This skill routes work to the right specialists and keeps the implementation small, verifiable, and aligned with the repository.

## Execution Mode

Use agent team mode by default.

Team members:

| Agent                        | Type   | Role                              | Skill                            | Primary Output                                             |
| ---------------------------- | ------ | --------------------------------- | -------------------------------- | ---------------------------------------------------------- |
| `frontend-architect`         | custom | FSD planning and scope control    | `everygsm-frontend-architecture` | `_workspace/{phase}_frontend-architect_plan.md`            |
| `ui-implementation-engineer` | custom | React and Tailwind implementation | `everygsm-ui-implementation`     | `_workspace/{phase}_ui-implementation-engineer_changes.md` |
| `api-data-integrator`        | custom | API, hooks, schemas, and types    | `everygsm-api-data-flow`         | `_workspace/{phase}_api-data-integrator_data-flow.md`      |
| `qa-inspector`               | custom | Cross-boundary verification       | `everygsm-quality-gate`          | `_workspace/{phase}_qa-inspector_report.md`                |

When invoking agents in a Claude harness that supports model selection, use `model: "opus"` for every agent.

## Phase 0: Context Check

Before starting work:

1. Check whether `_workspace/` exists.
2. Choose the run mode:
   - No `_workspace/`: initial run.
   - `_workspace/` exists and the user asks for a narrow correction: partial rerun. Read the relevant previous artifacts and update only the affected area.
   - `_workspace/` exists and the user provides a new broad request: fresh run. Preserve the old workspace by moving it to `_workspace_{YYYYMMDD_HHMMSS}/`, then create a new `_workspace/`.
3. Read `CLAUDE.md`, `AGENTS.md`, `package.json`, and the relevant source files before assigning work.

## Phase 1: Classify the Task

Classify the request into one or more tracks:

- Architecture or routing: assign `frontend-architect`.
- UI, forms, modals, or layout: assign `ui-implementation-engineer`.
- API calls, server fetches, queries, mutations, schemas, or response types: assign `api-data-integrator`.
- Review, regression, or final acceptance: assign `qa-inspector`.

For small tasks, use only the needed agents. For cross-layer tasks, use the full team.

## Phase 2: Assign Work

Use a supervisor plus producer-reviewer workflow:

1. `frontend-architect` defines scope, layers, and file ownership.
2. `ui-implementation-engineer` and `api-data-integrator` implement only their owned areas.
3. `qa-inspector` verifies after each meaningful module boundary, not only at the end.
4. The orchestrator integrates findings and keeps the final response concise.

Expected task shape:

```text
TeamCreate(
  team_name: "everygsm-frontend-team",
  members: [
    { name: "frontend-architect", agent_type: "frontend-architect", model: "opus" },
    { name: "ui-implementation-engineer", agent_type: "ui-implementation-engineer", model: "opus" },
    { name: "api-data-integrator", agent_type: "api-data-integrator", model: "opus" },
    { name: "qa-inspector", agent_type: "qa-inspector", model: "opus" }
  ]
)
```

## Data Flow

Use `_workspace/` for intermediate artifacts:

- `_workspace/00_input_request.md`
- `_workspace/01_frontend-architect_plan.md`
- `_workspace/02_ui-implementation-engineer_changes.md`
- `_workspace/02_api-data-integrator_data-flow.md`
- `_workspace/03_qa-inspector_report.md`

Preserve `_workspace/` after completion for audit and follow-up work.

## Error Handling

| Situation                                 | Strategy                                                                                                  |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| One agent fails or stalls                 | Retry once with the same narrowed task. If it fails again, continue with a clear gap in the final report. |
| Most agents fail                          | Stop and ask the user whether to continue with partial results.                                           |
| Conflicting findings                      | Keep both claims with file evidence, then inspect the source directly before deciding.                    |
| Validation command fails from environment | Report the environment cause separately from code issues and continue static checks.                      |
| Scope expands unexpectedly                | Return to `frontend-architect` to reduce scope before implementation continues.                           |

## Quality Gate

Before final delivery, run or request:

- `pnpm format:check`
- `pnpm lint`
- `pnpm build`

If a command cannot run, explain the blocker and list the static checks that were completed.

## Test Scenarios

Normal flow:

1. User asks for a feature that touches UI and data.
2. Architect defines affected layers and ownership.
3. UI and API agents implement their portions.
4. QA compares route, API, hook, type, schema, and UI boundaries.
5. Final response reports changed behavior and validation results.

Partial rerun flow:

1. User asks to revise only a previous UI behavior.
2. Orchestrator reads `_workspace/` artifacts.
3. Only `ui-implementation-engineer` and `qa-inspector` are assigned.
4. The relevant artifact is updated and validation is rerun for the affected area.
