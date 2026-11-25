# 16-week plan: Meetings with AI

Goal: become a competitive senior full stack candidate (system design, integrations, reliability, applied AI) while building one portfolio project and posting about it on LinkedIn.

Split: about 80% fundamentals, about 20% applied AI. Four fundamentals days and one AI day (Friday) per week. Algorithms (in Python), behavioral prep, and the Python and scale-numbers track come out of the fundamentals time. Weekly budget is about 10 hours: build and design ~3.5 h, algorithms ~2.5 h, Python and load testing ~2 h, AI day ~2 h.

Dates are a guide, not a contract. Order matters more than dates. If behind, drop one post per week, not the building.

## Weekly table

| Wk | Start | Tue post (fundamentals) | Thu post (build) | Algorithms topic (3 sessions, Python) | Problems | Behavioral / interviews | Python + scale numbers | AI day (Fri) | CI/CD + testing |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Nov 3 | Webhooks: at-least-once delivery, why duplicates happen | Build: NestJS receiver with idempotency keys + dedup table | Big-O + arrays and hashing | 5 | List 8 career moments from your CV (conflict, leadership, failure, ambiguity) | Python refresher; define metrics: throughput, p50/p95/p99 latency, error rate | Set up repo + LLM account; Pydantic basics | Repo structure (monorepo), lint/format, first GitHub Actions workflow: lint + typecheck + unit tests on every PR; branch protection on main |
| 2 | Nov 10 | HMAC signature verification and replay protection | Build: retries with backoff + jitter, dead-letter queue (NATS JetStream) | Two pointers, sliding window | 5 | Write 2 stories in STAR format (Scandinavia, tech lead) | FastAPI basics; set up Locust or k6; baseline load test of the receiver | Structured outputs with Pydantic in FastAPI | Unit tests for HMAC and idempotency logic; connect Coveralls, add badge, set coverage gate (start at 70%) |
| 3 | Nov 17 | OAuth 2.0 authorization code flow, one diagram | Build: "Connect Google Calendar" (token exchange, storage, refresh) | Stacks and queues | 5 | Write 2 more stories | async/await, httpx, SQLAlchemy async; measure the effect of indexes on the dedup table | Structured outputs: invalid-output handling, retries, fallbacks | Integration tests against real Postgres (service container in CI); mock the OAuth provider (msw/nock) |
| 4 | Nov 24 | What breaks in OAuth in production (revoked access, expired refresh tokens) | Build: token rotation and a "reconnect needed" state | Binary search | 5 | Write the remaining stories; record yourself telling one | Alembic migrations, pytest, Pydantic settings | Tool calling: let the model call a function (e.g. look up a routing rule) | Contract tests for webhook signatures and token-expiry cases; enable Dependabot |
| 5 | Dec 1 | Rate-limited APIs: backoff, queues, per-tenant throttling | Build: sync worker under a mock API's rate limit | Linked lists | 5 | Prepare your 2-minute "tell me about yourself" | Build the sync worker in Python (asyncio); measure records per minute under the rate limit | AI post: structured outputs + tool calling, what I learned | Python job in the same pipeline (ruff, mypy, pytest); dependency caching; measure pipeline duration |
| 6 | Dec 8 | Eventual consistency: why two systems never fully agree | Build: reconciliation job for your sync | Trees (DFS, BFS, BST) | 6 | Start applying. Adapt your CV and add your repo link | Reconciliation throughput on ~100k records | RAG: embeddings and pgvector setup in Postgres | Multi-stage Dockerfiles, build images in CI and push to GitHub Container Registry; Trivy image scan |
| 7 | Dec 15 | Postgres concurrency: transactions, locks, unique constraints | Build: slot booking with a test that tries to double-book | Graphs (BFS/DFS, connected components) | 6 | Rehearse stories out loud | Concurrency test: hundreds of parallel booking attempts, check 0 double-bookings, record p95 | RAG: chunking and retrieval over routing rules/docs | Run the concurrency test in CI; flaky-test policy (quarantine, fix within a week); raise coverage gate to 80% |
| 8 | Dec 22 | Background jobs and queues: design choices | Light week (holidays): recap of what you've built so far, including the pipeline | Heaps and priority queues | 5 | First mock coding interview (a friend or a platform) | Measure queue depth and processing lag (light week) | RAG: retrieval quality, top-k tuning | Light: review pipeline speed (parallel jobs, caching); write down pipeline duration and coverage so far |
| 9 | Dec 29 | Observability: logs, metrics, tracing for a sync pipeline | Build: add dashboards/alerts to the project | Intervals and scheduling (merge, overlap, meeting rooms) | 6 | Review the weak spots from the mock | Prometheus + Grafana or OpenTelemetry; find a real bottleneck with a load test | AI post: simple RAG with pgvector, step by step | Auto-deploy to staging on merge to main (Fly.io or Render); health endpoint; post-deploy smoke test |
| 10 | Jan 5 | Designing public APIs: auth, pagination, versioning, error format | Build: public API + API keys for your project | Backtracking | 5 | Mock behavioral round | Load-test the public API: pagination, rate limits, p95 | Evals: build a test set of routing cases with expected explanations | k6 smoke test in CI with thresholds (fail if p95 exceeds your target); OpenAPI-based API tests (Schemathesis for FastAPI) |
| 11 | Jan 12 | Enterprise identity: SSO, SAML, SCIM at a conceptual level | Build or sketch: SSO login flow (OIDC is fine) | Dynamic programming, 1D | 5 | Second mock coding interview | Optimize (indexes, Redis cache) and record before/after numbers | Evals: automated scoring (exact checks + LLM-as-judge, with caveats) | Playwright E2E tests for the booking UI (3-5 critical paths only); enable CodeQL |
| 12 | Jan 19 | System design practice: booking and routing system | Write-up with diagram of your own design | Dynamic programming 2D and greedy | 5 | First mock system design (booking/routing) | Back-of-envelope estimation (QPS, storage, queue size) inside the design | Evals: run, compare prompt versions, track regressions | Deploy to AWS (e.g. ECS Fargate or a small EC2) with basic Terraform; manual approval gate for production |
| 13 | Jan 26 | System design practice: webhook delivery platform | Write-up with diagram | Tries and union-find (light), then timed mixed sets | 6 | Mock system design (webhook platform) | Test at 10x the baseline load; note where it breaks | AI post: how I know my AI feature works (evals) | Rollback strategy: test an automated rollback after a failed smoke test; document blue/green or canary as the next step |
| 14 | Feb 2 | System design practice: CRM sync pipeline | Write-up with diagram | Timed mixed sets: 2 problems in 45 minutes | 6 | Mock system design (CRM sync) | Failure injection: kill a worker, measure recovery time and data loss | Agent loop: read-only investigation tools, step limits | Mutation testing on one core module (Stryker or mutmut) to show that tests catch real bugs |
| 15 | Feb 9 | Reliability story from your real work (Scandinavia: what you'd improve) | Project demo: "explain why this meeting was routed" in Meetings with AI | Re-solve your hardest 10 problems | 10 | Full mock loop: coding + design + behavioral | Final benchmark report (one table of all results) | Guardrails: permissions, input validation, timeouts, cost caps; measure AI p95 latency and cost per request | Run the AI eval set in CI on every PR (fail if the pass rate drops); record final delivery metrics |
| 16 | Feb 16 | Lessons from 16 weeks of building in public | AI post: agent loops with guardrails | Light review, no new topics | 4 | Final polish of stories and CV; keep applying | Update CV and README with measured numbers | Final polish: README, demo video, diagrams | README with badges (build, coverage), pipeline diagram, CONTRIBUTING guide; post: "How my pipeline catches bugs before production" |

## The one project

Everything lives in this repo. The AI feature, "explain why this meeting was routed", grows in this order: structured outputs (explanation as validated JSON), tool calling (fetch the lead and the matching rule), RAG with pgvector (retrieve relevant routing rules), evals (a test set that proves explanations are correct), then an agent loop with guardrails (investigates routing problems with read-only tools).

## Algorithm practice (Python)

Use a curated list (NeetCode 150 or Blind 75). Five or six problems a week. For each: 20-25 minutes alone, then read a solution if stuck, then re-solve from scratch the next day. Log the pattern, not just the answer. Say the reasoning out loud.

## Behavioral stories to prepare (from real work, STAR format)

1. Leading the 3-person team and a disagreement you resolved
2. The Scandinavia design decision (hexagonal + separate schemas) and its tradeoffs
3. A production problem debugged to its root cause
4. A time you changed your mind or had to learn something quickly
5. Mentoring or code review that improved quality
6. Something that failed and what you changed afterwards

## Numbers to collect (record in docs/RESULTS.md)

- Webhook receiver: requests per second, p95 latency, duplicate rate handled
- Sync worker: records per minute under the rate limit, retry counts
- Booking: parallel attempts, double-bookings (target 0), p95
- Postgres: query time before and after indexing
- Recovery: time to resume after a worker crash
- AI feature: p95 latency, tokens and cost per request, eval pass rate
- Delivery: pipeline duration, coverage, tests by layer, deploys per week, rollback time, mutation score

Label them as measured on this project, separate from any production numbers from the owner's job.

## Checkpoints

- Week 6: start applying, with the repo and posts linked.
- Week 8: quick check on posts and repo progress. If behind, drop one post per week.
- Early May 2027 (about 6 months): look at 10-15 postings for target roles and see how often AI is required vs nice to have. If growing, move toward 70/30. If not, stay at 80/20.

## Week 1 detail

Goal: working webhook receiver with idempotency, green CI, 2 posts published, 5 algorithm problems, behavioral list written.

| Day | Tasks |
|---|---|
| Mon | Repo, monorepo structure, README stub, `.gitignore`, lint and format setup; read about webhook delivery and idempotency |
| Tue | Post: "Webhooks aren't just HTTP POSTs". Algorithms session 1 (Big-O, Two Sum, Contains Duplicate) |
| Wed | Build part 1: Docker Compose Postgres, `webhook_events` table with unique constraint, `POST /webhooks/:provider`, first GitHub Actions workflow, branch protection |
| Thu | Build part 2: tests (same event 5 times stored once, malformed payloads); algorithms session 2 (Valid Anagram, Group Anagrams); build post |
| Fri | AI day: LLM account, API key in env vars, Pydantic `RoutingExplanation` model validating one real model response; algorithms session 3 (Top K Frequent Elements) |
| Sat | Behavioral list of 8 career moments; Python refresher; define metrics |
| Sun | Buffer and 15-minute review |

Definition of done
- [ ] Repo is public with a README stating the project goal
- [ ] Receiver stores duplicate events once, with tests that prove it
- [ ] GitHub Actions is green on main, branch protection on
- [ ] 2 posts published
- [ ] 5 algorithm problems solved and re-solved
- [ ] Pydantic model validates an LLM response
- [ ] List of 8 career moments written
- [ ] Metrics defined in a results file

If behind, drop in this order: Sunday review, problem 5 and the Python refresher, the Pydantic API call (keep the model). Never drop the receiver, its tests, or the two posts.
