# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Printvertise is a Next.js 15 (App Router) + TypeScript + TailwindCSS + Prisma + PostgreSQL landing page system for "Werbetechnik" (advertising technology) services across German cities. Each city gets a unique SEO-optimized landing page at `/werbetechnik/[slug]`.

### Prerequisites

- **Node.js 22+** (available via nvm)
- **PostgreSQL 16** must be running: `sudo pg_ctlcluster 16 main start`
- Database credentials configured in `.env` (copy from `.env.example`)

### Key commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Generate Prisma client | `npx prisma generate` |
| Run migrations | `npx prisma migrate dev` |
| Seed database | `npx prisma db seed` |
| Dev server | `npm run dev` (port 3000) |
| Lint | `npx next lint` |
| Build | `npm run build` |

### Gotchas

- PostgreSQL must be started manually: `sudo pg_ctlcluster 16 main start`. It does not auto-start.
- After `npm install`, always run `npx prisma generate` to regenerate the Prisma client.
- The admin API uses Basic Auth (credentials in `.env`: `ADMIN_USER` / `ADMIN_PASSWORD`).
- Slug changes create a `SlugRedirect` record for 308 permanent redirects — this is handled automatically by the PATCH `/api/cities/[id]` endpoint.
- Content variation is deterministic (hash-based) — no randomness, so pages are stable across builds.
