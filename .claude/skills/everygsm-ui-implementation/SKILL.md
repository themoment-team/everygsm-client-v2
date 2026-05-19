---
name: everygsm-ui-implementation
description: 'Implement EveryGSM-client-v2 UI with React function components, Tailwind CSS 4, existing assets, modals, forms, responsive layouts, and current visual conventions. Use for pages, widgets, feature UI, form fields, loading and error states, and visual fixes.'
---

# EveryGSM UI Implementation

Use this skill when building or changing user-facing UI.

## Component Rules

- Use TypeScript React function components.
- Prefer arrow functions, destructured props, and `default export` when matching local component style.
- Keep component-local variables and hooks near the top.
- Put handlers before effects.
- Keep `useEffect` close to the return block when following the local convention.
- Use existing shared assets and UI utilities before adding new ones.

## Styling Rules

- Use Tailwind CSS classes and the existing `cn()` utility for conditional class names.
- Match nearby spacing, color, radius, typography, and hover behavior.
- Keep class strings stable and readable.
- Do not add decorative layouts or explanatory in-app text unless the user asked for it.
- Ensure text fits within buttons, cards, forms, and responsive containers.
- Avoid nested cards unless the existing screen already uses that pattern.

## Form Rules

- Keep React Hook Form defaults aligned with the Zod schema.
- Validate rendered fields against schema fields.
- Preserve existing error message components and toast patterns.
- Keep file upload, crop, and modal state explicit.
- Handle disabled and pending states when a mutation or upload is in progress.

## Interaction Rules

- Use existing modal store patterns for modals.
- Use Next.js `Link` for navigation where possible.
- Use router navigation only when behavior requires imperative routing.
- Keep client-only browser APIs inside client components.

## Verification

For UI work, inspect:

- Desktop and narrow viewport behavior when layout changes.
- Button and form disabled states.
- Empty, loading, error, and success states when data is involved.
- Route links introduced or changed by the UI.

Record any visual assumptions in the implementation artifact.
