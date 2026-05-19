# API and Data Flow Conventions

Use these rules for API, query, schema, and domain data changes.

## Standard Locations

- API URL constants belong in `src/shared/api/apiUrls.ts`.
- Server-side requests use `src/shared/api/fetcher.ts`.
- Browser requests use `src/shared/lib/axios.ts`.
- Query keys belong in `src/shared/api/queryKeys.ts`.
- Domain API functions and hooks belong under `src/entities/*`.
- Feature-specific mutations and schemas belong under `src/features/*`.

## Query and Mutation Rules

- Use method-based TanStack Query hook names: `useGet*`, `usePost*`, `usePatch*`, `usePut*`, and `useDelete*`.
- Keep server data in TanStack Query, not Zustand.
- Pass server-fetched `initialData` into client queries when the route already fetches the same data.
- Invalidate only the query keys affected by a mutation.

## Type and Schema Rules

- Keep API response wrappers aligned with the UI consumer.
- Compare API function return types with hook generic types and component field usage.
- Use `z.infer<typeof schema>` for schema-derived form request types.
- Keep form default values, rendered fields, and Zod schema fields in sync.
- Preserve nullable fields from backend contracts unless the contract changes.
