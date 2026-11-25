# Meetings with AI

A meeting scheduling platform built as a learning vehicle and public portfolio piece. Owner: Fretex (Freddy Barragán), 9 years of experience (NestJS, React, TypeScript, PostgreSQL), preparing for senior full stack interviews. Target role profile: senior/lead full stack on integration-heavy SaaS (webhooks, OAuth, sync, public APIs, booking/routing, AI features).

The project covers: webhook intake, OAuth connections (e.g. calendars), rate-limited sync, slot booking without double-booking, a public API, and an AI feature that explains why a meeting was routed to a person (structured outputs, tool calling, RAG with pgvector, evals, guarded agent loop).

The full 16-week plan is in `docs/PLAN.md`. Read it at the start of a session to know the current week and what is in scope.

## Stack

- Backend: NestJS + TypeScript in `apps/api`
- DB: PostgreSQL via Docker Compose (`pgvector/pgvector:pg16`, container `mwai-postgres`), TypeORM
- Second stack (from Week 2 onward): Python + FastAPI in `services/` (sync worker, AI service)
- Messaging: NATS JetStream (retries, dead-letter queue)
- Tooling: oxlint + Prettier, Jest, GitHub Actions, Coveralls, k6 or Locust for load tests
- Verify exact npm scripts in `apps/api/package.json` before assuming names (expected: `lint`, `typecheck`, `test`, `start:dev`)

## Repo layout

- `apps/api/`: NestJS app (`package.json` lives here, so CI uses `working-directory: apps/api`)
- `services/`: Python services (empty for now, keep a `.gitkeep`)
- `.github/workflows/`: CI
- `docker-compose.yml` (root): Postgres
- `docs/`: `PLAN.md` (the plan), `RESULTS.md` (measured numbers, create it when the first measurement exists)
- `AGENTS.md`: project instructions for Cursor (this file)
- `.cursor/rules/`: focused Cursor rules that reinforce working agreements

## Design decisions already made (do not re-litigate without a reason)

Webhook intake
- Endpoint: `POST /webhooks/:provider`, returns 200 fast. In the request, only validate and insert. Business processing happens later, asynchronously.
- Raw body is enabled in `main.ts` (`rawBody: true`) because HMAC verification needs the exact bytes.
- Table `webhook_events` with `UNIQUE (provider, event_id)`. Insert with `INSERT ... ON CONFLICT DO NOTHING RETURNING id`; an empty result means duplicate. The unique constraint is the source of truth, not an "if exists" check in code (race condition).
- Duplicates return 200 (an error would make the provider keep retrying). Missing or empty event id returns 400.
- Keep one source of truth for the schema (`db/init.sql` or TypeORM migrations, not both). Do not enable TypeORM `synchronize`.

Identity vs authenticity
- Identity = one URL per integration (it tells us which tenant and which secret to load).
- Authenticity = HMAC signature over the raw body with that integration's secret.
- HMAC: recompute from raw bytes, compare with `crypto.timingSafeEqual` (check equal lengths first), reject stale timestamps (replay protection), verify before parsing or processing.
- Signing secrets are per endpoint, stored encrypted at rest (not hashed, because HMAC needs the real secret), shown once, support rotation with an overlap window, never logged.
- HTTPS gives confidentiality; HMAC gives authenticity and integrity. They are different problems.

Retries and failures
- Retry only transient failures (timeouts, network errors, 5xx, 429). Do not retry 400/401/404.
- Exponential backoff with jitter, capped wait, capped attempts. Respect `Retry-After`.
- After max attempts: dead-letter queue with the error context, an alert, and a replay path. Replay is only safe because processing is idempotent.
- With NATS JetStream: `max_deliver` for attempts, consumer backoff, a separate subject or stream for dead letters.

Architecture style
- Hexagonal architecture / ports and adapters where it helps (the owner knows it well). Domain logic must not import from infrastructure.

## Working agreements

- Work in small steps on feature branches; never push directly to `main`. A PR must have green CI before merge.
- Every behavior gets a test. Prove idempotency and concurrency with integration tests against real Postgres, not mocked DB calls.
- Stay inside the current week's scope. If something belongs to a later week (HMAC, retries, DLQ, OAuth), mention it but do not build it early.
- No secrets in git. `.env` is ignored; keep `.env.example` current with placeholder values.
- Explain the "why" of each design choice in a few sentences. This is interview preparation, so the owner needs to be able to defend every decision.
- Be direct about mistakes or risks, including in earlier suggestions. Do not agree just to be agreeable.
- Numbers must be real. Measure load, latency, and coverage on this project and record them in `docs/RESULTS.md`, labeled as measured on this project (never as production claims).
- If a command or script name is uncertain, check the repo instead of guessing.

## Known fixes to apply (from the first review)

1. `docker-compose.yml` healthcheck uses `-U postgres` but the default DB user is `mwai`. Use `pg_isready -U ${POSTGRES_USER:-mwai} -d ${POSTGRES_DB:-mwai}` and add `start_period: 10s`.
2. Pin the pgvector image to a specific tag instead of the floating `pg16`.
3. `services/` is empty, so Git does not track it. Add `.gitkeep`.
4. CI workflow must set `working-directory: apps/api` (and `cache-dependency-path` for the lockfile) and run oxlint, a `typecheck` script (`tsc --noEmit`), and tests.
5. Enable the pgvector extension (`CREATE EXTENSION IF NOT EXISTS vector;`) only in Week 6, in the migration that creates the embeddings table.

## Current status

Week 1 (see `docs/PLAN.md` for the full row). Update this section when the week changes.

Week 1 build goals
- [ ] Postgres up via Docker Compose and healthy
- [ ] `webhook_events` table with `UNIQUE (provider, event_id)`
- [ ] `POST /webhooks/:provider` inserts with `ON CONFLICT DO NOTHING`, returns 200 for new and duplicate events, 400 for a missing event id
- [ ] Unit tests (new event, duplicate, missing id); integration test sending the same event 5 times stores 1 row
- [ ] GitHub Actions workflow (lint, typecheck, tests) green on a PR
- [ ] Branch protection on `main` requiring the CI check
- [ ] README with how to run and one curl example
