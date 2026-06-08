# EveryGSM Root-Cause Tracing

Use this reference when a failure crosses more than one file or layer.

## API and Query Failures

Trace in this order:

```text
apiUrls -> API function -> query/mutation hook -> component consumer -> rendered state
```

Check:

- The endpoint path and method.
- The request payload shape.
- The response wrapper and TypeScript type.
- Query key and invalidation behavior.
- Component assumptions about nullable or missing fields.

## Form Failures

Trace in this order:

```text
defaultValues -> rendered field -> event handler -> Zod schema -> submit payload -> mutation
```

Check:

- Every schema field has a matching default and input path.
- Value transforms such as number parsing are intentional.
- Array field add/remove/update handlers validate after mutation.
- File upload state is reset when upload fails or file is removed.

## Routing Failures

Trace in this order:

```text
src/app route file -> Link/router.push/redirect -> layout/guard -> target view
```

Check:

- The URL path exists under `src/app`.
- Dynamic params are present and parsed consistently.
- Client redirects do not fight server guards or layouts.
- Auth/admin guard behavior matches the target route.

## Build and Lint Failures

Trace in this order:

```text
first reported error -> owning file -> import/type chain -> recent diff -> local working example
```

Check:

- The first error before fixing later cascading errors.
- Whether generated or cached files are involved.
- Whether the failure depends on environment variables.
- The closest working file with the same pattern.

## Stop Conditions

Stop and re-evaluate when:

- Two attempted fixes fail.
- The hypothesis no longer explains the evidence.
- A fix would require broad architecture changes unrelated to the request.
