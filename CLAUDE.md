# EveryGSM-client-v2

## Project Overview

EveryGSM-client-v2 is a Next.js App Router frontend for GSM project information. It uses a layered structure inspired by Feature-Sliced Design.

## Tech Stack

- Framework: Next.js 16, React 19, TypeScript
- UI: Tailwind CSS 4
- Data: Axios, TanStack Query
- Forms: React Hook Form, Zod
- Client state: Zustand

## Project Structure

- `src/app`: route entrypoints, layouts, and route-level guards
- `src/views`: page composition
- `src/widgets`: reusable page sections
- `src/features`: user actions
- `src/entities`: domain types, API hooks, and entity UI
- `src/shared`: common clients, hooks, stores, styles, assets, and utilities

Keep dependencies simple: `app` and `views` compose screens, `features` handle actions, `entities` own domain behavior, and `shared` contains reusable infrastructure.
Import only downward layers, and do not import laterally within the same layer.

Detailed conventions are split into `.claude/rules/*.md` and injected by path where possible.

## Harness: EveryGSM Frontend

**Goal:** Coordinate focused EveryGSM-client-v2 frontend work through reusable agents, skills, and rules for architecture, UI implementation, API/data flow, debugging, code review, executable Git workflow, and QA.

**Trigger:** For EveryGSM frontend implementation, review, refactor, bugfix, debugging, branch, commit, PR creation, PR review comments, UI, API/data, form, routing, QA, rerun, update, revision, partial rerun, or previous-result improvement requests, use the `orchestrator` skill. Simple questions may be answered directly.

Detailed harness changes are tracked in `.claude/CHANGELOG.md`.
