# Frontend Architecture Rules

Use these rules as the authoritative EveryGSM frontend architecture checklist.

## Layering

Follow this dependency direction:

```text
app -> views -> widgets -> features -> entities -> shared
```

- Higher layers may import lower layers.
- Lower layers must not import higher layers.
- Same-layer imports are not allowed.
- Prefer each slice's public `index.ts` or `index.server.ts` export when it exists.

## Ownership

- `src/app`: route entrypoints, layouts, metadata, and route-level guards.
- `src/views`: page composition.
- `src/widgets`: reusable page sections.
- `src/features`: user actions.
- `src/entities`: domain types, API functions, query hooks, and entity UI.
- `src/shared`: reusable clients, hooks, stores, styles, constants, assets, and utilities.

## Change Scope

- Make the smallest change that satisfies the user request.
- Do not refactor adjacent code unless the current change makes it necessary.
- Add abstractions only when they remove real duplication or match an existing local pattern.
- Do not move files just to make the structure look cleaner.

## Client and Server Boundaries

- Use server components for route-level data loading when practical.
- Mark components with `use client` only when they need hooks, browser APIs, event handlers, or client state.
- Do not import `server-only` modules into client components.
- Use `apiFetcher` for server-side fetches and `axiosInstance` for client requests.
