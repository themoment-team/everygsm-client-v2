# EveryGSM Review Checklist

Use this checklist after loading `.claude/rules/*.md`, `CLAUDE.md`, and `AGENTS.md`.

## Architecture

- Changed imports preserve `app -> views -> widgets -> features -> entities -> shared`.
- No same-layer imports were introduced.
- New exports are added only when another layer needs the module.
- State ownership is correct: server data stays in TanStack Query, lightweight UI state may use Zustand.
- Client/server boundaries are explicit and valid.

## UI

- Components follow nearby React and Tailwind patterns.
- UI states cover empty, loading, pending, success, and error paths when relevant.
- Text does not overflow common button, card, input, and modal containers.
- Modals clean up resources and close predictably.
- Visual changes remain scoped to the requested behavior.

## API and Data

- API URL constants, API functions, query/mutation hooks, response types, and component consumers agree.
- Server-fetched data and client `initialData` use the same response shape.
- Query invalidation targets only affected data.
- Nullable fields are handled at render boundaries.
- Auth-sensitive code respects existing cookie and Axios interceptor behavior.

## Forms

- React Hook Form `defaultValues`, rendered fields, Zod schema, and mutation payload are aligned.
- Field-level and collection-level errors are displayed through existing patterns.
- Upload and submit buttons handle pending and disabled states.
- Browser resources such as object URLs are cleaned up.

## Routing

- `Link`, `router.push`, and redirects point to actual App Router paths.
- Dynamic route params are provided and converted consistently.
- Route-level guards are not bypassed.

## Security and Configuration

- No secrets, OAuth client values, or API hosts are hardcoded.
- Environment variables are read through existing configuration patterns.
- User-controlled URLs and file uploads retain validation.

## Validation

- `pnpm format:check`, `pnpm lint`, and `pnpm build` are run when feasible.
- If a check is skipped, the blocker and residual risk are reported.
