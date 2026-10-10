# CLIuno Vue template

Vue 3 + Vite + TypeScript SPA implementing the CLIuno demo app (auth incl. OTP, users,
todos, posts+comments, follows) against the shared CLIuno REST contract.

## Commands

```bash
pnpm dev          # vite on :5001
pnpm build        # type-check (vue-tsc) + vite build
pnpm type-check   # vue-tsc --build
pnpm lint         # oxlint
pnpm format       # oxfmt src/
pnpm test:unit    # vitest
pnpm test:e2e     # playwright
```

## Structure

- `src/apis/` — the API layer: one module per resource (`auth-api`, `user-api`, `todo-api`,
  `post-api`, `follow-api`) built on `http.ts` (axios). Base URL comes from
  `VITE_BACKEND_URL` (default `http://localhost:3000/api/v1`); a request interceptor adds
  `Authorization: Bearer <token>` from localStorage; a response interceptor redirects to
  `/login` on 401.
- `src/stores/` — Pinia stores (`auth` owns token/refreshToken/user).
- `src/views/` — pages (auth, app, user-profile); `src/components/`, `src/layouts/`.
- `src/router/` — vue-router with auth guards.

## The API contract (what backends guarantee)

Login sends `{usernameOrEmail, password}` and reads `data.token`. Responses are
`{status, message, data}` and views destructure exact keys: `data.users/user/todos/todo/`
`posts/post/followers/following/isFollowing`. Any CLIuno backend template (Express, Nest,
Django, FastAPI, Laravel, Rails) serves this contract — point `VITE_BACKEND_URL` at it.
If you add an endpoint call here, the backend must implement it; keep the API layer as
the single place URLs live.

## Conventions

- oxc tooling: `oxlint` + `oxfmt` (`semi: false`, single quotes); prettier only for
  css/md/html; no eslint.
- Conventional commits (commitlint + husky pre-commit runs type-check, lint, lint-staged).
- Tailwind v4 (no prefix) + shadcn-vue (reka-ui primitives) in `src/components/ui/`;
  `cn` util in `src/lib/utils.ts`; icons from `@lucide/vue`. Add components with
  `npx shadcn-vue@latest add <name>`. Dark mode = `.dark` class on `<html>` +
  `localStorage('theme')` (see `ThemeToggle.vue`).

## AI agents (Claude Code and friends)

- **Check the CLIuno skills first**: `npx cliuno@latest skills status` — if any is
  `missing`/`outdated`, run `npx cliuno@latest skills install` (adds `.claude/skills/cliuno-*`:
  the generator workflow, the scaffold guide, and the shared REST contract).
- **Generate resources, don't hand-write them**:
  `npx cliuno@latest make:resource Product --fields name:string,price:number,inStock:boolean`
  creates `src/apis/product-api.ts`, `src/views/app/ProductsView.vue`, `src/views/app/ProductDetailView.vue` and registers it in `src/apis/index.ts`, `src/router/index.ts`, following this
  template's conventions and the `{status, message, data}` contract. `--dry-run` previews,
  re-running never duplicates registrations, `--force` overwrites.
- Single pieces: `make:api`, `make:page`, `make:store`, `make:component` (→ `npx shadcn-vue@latest add`). `npx cliuno@latest make` lists them.
- Then edit fields/business logic only, and run the gates above.
