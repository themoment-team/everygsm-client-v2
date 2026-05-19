# UI Conventions

Use these rules when reviewing or implementing EveryGSM UI.

## Components

- Use TypeScript React function components.
- Match nearby component style before introducing a new pattern.
- Prefer `PascalCase` for components and `camelCase` for helpers.
- Keep props typed with `interface` unless a local pattern uses `type`.
- Keep exports consistent with the local directory.

## Styling

- Use Tailwind CSS 4 and the existing `cn()` helper for conditional class names.
- Preserve existing visual language unless the request explicitly asks for a redesign.
- Keep text inside fixed-size UI elements from overflowing at common mobile and desktop widths.
- Avoid adding explanatory in-app text about implementation details or shortcuts.
- Do not create nested cards or decorative page sections unless the existing screen already uses that pattern.

## Forms and Interaction

- Keep React Hook Form defaults aligned with Zod schemas.
- Render errors through existing field error patterns when available.
- Include pending and disabled states for upload and mutation flows.
- Use `Link` for navigation unless imperative routing is required.
- Clean up browser resources such as object URLs when file upload previews are used.
