---
name: api-data-flow
description: 'Implement and review EveryGSM-client-v2 API/data flow: apiUrls, server apiFetcher, Axios client, TanStack Query hooks, query keys, Zod schemas, response types, initialData hydration, auth cookies, and client/server data boundaries. Use whenever a task touches backend contracts, requests, mutations, forms, or domain data.'
---

# EveryGSM API Data Flow

Use this skill for any work that touches data contracts, requests, mutations, validation, or query state.

## Standard Paths

- API URL constants: `src/shared/api/apiUrls.ts`
- Server fetches: `src/shared/api/fetcher.ts`
- Client Axios instance: `src/shared/lib/axios.ts`
- Query keys: `src/shared/api/queryKeys.ts`
- Domain API functions: `src/entities/*/api`
- Domain query hooks and types: `src/entities/*/model`
- Feature mutation hooks and schemas: `src/features/*/model`

## Server Fetch Rules

- Use `apiFetcher` for server-side requests.
- Include an explicit `context` and `errorMessage`.
- Keep cache behavior intentional.
- Read auth from cookies only on the server through the existing fetcher.
- Return `undefined` on handled fetch failures unless the local pattern requires error body access.

## Client Request Rules

- Use `axiosInstance` for browser requests.
- Rely on the request interceptor for access-token injection.
- Preserve 401 handling behavior unless the task is specifically about auth.
- Keep API functions thin: URL, payload, and typed response.

## Query Rules

- Use method-based hook names such as `useGetProjects` and `usePostProjectRegistration`.
- Keep query keys stable and centralized.
- Pass `initialData` from server-fetched data when available.
- Use mutation invalidation only for data that can be stale after the mutation.

## Schema and Type Rules

- Keep Zod schemas aligned with rendered form fields and API payload types.
- Use `z.infer<typeof schema>` for form request types.
- Compare API response wrappers with UI consumption. A compile pass is not enough if a hook casts an incompatible shape.
- Preserve nullable fields from domain types unless the backend contract changes.

## Integration Review

For every data-flow change, map:

```text
apiUrls -> API function -> query/mutation hook -> component consumer -> UI state
```

If one link is missing or mismatched, treat it as a bug to resolve or explicitly report.
