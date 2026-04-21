# EveryGSM-client-v2

Always respond in Korean.

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

## Commands

- `pnpm install`: install dependencies
- `pnpm dev`: run the local development server
- `pnpm build`: create a production build
- `pnpm start`: serve the production build
- `pnpm lint`: run ESLint
- `pnpm lint:fix`: auto-fix lint issues
- `pnpm format`: format files with Prettier
- `pnpm format:check`: verify formatting without rewriting files

## Coding Conventions

- Use TypeScript and React function components.
- Prefer `PascalCase` for components, `camelCase` for functions and utilities, and `use...` for hooks.
- Follow Next.js file conventions such as `page.tsx`, `layout.tsx`, and `not-found.tsx`.
- Keep imports sorted with `simple-import-sort`.
- Follow Prettier: 2 spaces, semicolons, single quotes, trailing commas, 100-character line width.

## Architecture Notes

- Use `shared/api/fetcher.ts` for server-side fetches and `shared/lib/axios.ts` for client requests.
- Pass server-fetched `initialData` into client queries when available.
- Reserve Zustand for lightweight UI state such as global modals, not server data.

## Validation & Testing

There is no dedicated automated test framework yet. Use `pnpm lint`, `pnpm format:check`, and `pnpm build` as the minimum validation set. CI runs the same checks on pull requests targeting `main` and `develop`. If tests are added later, colocate them as `*.test.ts(x)` or `*.spec.ts(x)`.

## Commit & Pull Request Guidelines

Use short Conventional Commit-style prefixes such as `feat:`, `style:`, `refactor:`, and `chore:`. Keep each commit focused on one logical change. Follow the PR template: describe purpose, summarize work, link related issues, and attach screenshots or video for UI changes. Husky runs `pnpm lint-staged`.

## Security & Configuration

Do not hardcode secrets, OAuth values, or API hosts. Check `.gitignore` before suggesting tracked config changes. Validate `NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_IMAGE_HOST`, and the DataGSM OAuth client ID before testing auth, rewrites, or remote images.
