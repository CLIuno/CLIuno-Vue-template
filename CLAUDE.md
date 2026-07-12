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
- Tailwind v4 + daisyUI, classes prefixed `tw:`.
