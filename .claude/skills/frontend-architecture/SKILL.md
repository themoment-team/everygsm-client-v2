---
name: frontend-architecture
description: 'Plan and review EveryGSM-client-v2 architecture, Feature-Sliced Design layering, route ownership, public exports, import direction, client/server boundaries, and minimal implementation scope. Use for any EveryGSM feature, refactor, routing, dependency, or architecture decision.'
---

# EveryGSM Frontend Architecture

Use this skill to keep changes aligned with the repository's layered structure and to prevent unnecessary refactors.

## Repository Shape

EveryGSM-client-v2 is a Next.js App Router frontend using:

- Next.js 16, React 19, TypeScript
- Tailwind CSS 4
- Axios and TanStack Query
- React Hook Form and Zod
- Zustand for lightweight UI state only

Layer order:

```text
app -> views -> widgets -> features -> entities -> shared
```

Imports must move downward through this stack. Do not add same-layer imports.

## Planning Workflow

1. Identify the user-visible behavior.
2. Locate the route entrypoint in `src/app`.
3. Locate page composition in `src/views`.
4. Locate reusable sections in `src/widgets`.
5. Locate user actions in `src/features`.
6. Locate domain types, hooks, and entity UI in `src/entities`.
7. Locate shared infrastructure in `src/shared`.
8. Choose the smallest layer that should own the change.

## Ownership Rules

- `app`: route files, layouts, metadata, guards, and server entrypoints.
- `views`: page-level composition.
- `widgets`: reusable page sections.
- `features`: user actions such as registration, sign-in, liking, and filters.
- `entities`: project and user domain models, API calls, query hooks, and domain UI.
- `shared`: reusable clients, hooks, stores, utilities, styles, constants, and assets.

## Decision Rules

- Add a new abstraction only when it removes repeated complexity or matches an existing pattern.
- Prefer existing exports over direct deep imports when a public index exists.
- Do not move files only to make the structure look cleaner.
- Keep server data out of Zustand.
- When a server component fetches data, pass it as `initialData` to the relevant client query if the existing pattern supports it.

## Output

Write a short plan that includes:

- Required layer changes
- Files likely to change
- Boundary risks
- Assumptions
- Validation steps

Avoid long file inventories unless the task spans many modules.
