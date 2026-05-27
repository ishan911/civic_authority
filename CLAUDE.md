# The Civic Authority — CLAUDE.md

## Project

Civic issue reporting platform. Showcase/portfolio project demonstrating Go + gRPC + React.
Users submit reports of civic problems (broken streetlights, potholes, etc.), track status, vote, and comment.

## Stack

- **Frontend**: React 19, Vite, TypeScript, Tailwind CSS (`frontend/`)
- **Backend**: Go 1.26, chi router, pgx/v5, grpc-go (`gateway/`, `services/`)
- **Database**: PostgreSQL 16 (local: docker-compose, production: Neon.tech or Supabase)
- **Auth**: JWT (`golang-jwt/jwt`) + bcrypt
- **Migrations**: golang-migrate (SQL files in `migrations/`)
- **gRPC**: grpc-go + protoc (M3+)

## Dev Commands

```bash
make            # start all containers (alias for make up)
make reset      # nuke volumes + restart — fixes "database does not exist" errors
make migrate    # run SQL migrations (requires: brew install golang-migrate)
make migrate-down  # rollback migrations
make logs       # tail gateway logs

# Frontend (native — not in Docker)
cd frontend && npm run dev
```

## Environment

Copy `.env.example` to `.env` in the project root and fill in values.
The gateway reads `.env` automatically via godotenv.

## Monorepo Structure

```
civic_authority/
├── frontend/        React prototype (Vite + TypeScript + Tailwind)
├── gateway/         REST API Gateway — M1/M2: direct DB, M3+: REST→gRPC translator
├── services/
│   ├── issue-service/      gRPC microservice for issues (M3)
│   └── analytics-service/  gRPC microservice for analytics (M4)
├── proto/           Protobuf source definitions (.proto files) — M3+
├── pb/              Compiled Go stubs from protoc (never edit manually) — M3+
├── migrations/      SQL migration files (golang-migrate format)
├── docker-compose.yml
└── CLAUDE.md
```

## Milestone Status

- [x] M0: Frontend prototype (React + TypeScript + Tailwind, mock localStorage data)
- [ ] M1: Foundation (docker-compose + PostgreSQL + migrations + JWT auth)
- [ ] M2: REST API (full CRUD for issues/comments/votes, React connected to real API)
- [ ] M3: gRPC layer (protobuf schema + issue-service + gateway becomes REST→gRPC)
- [ ] M4: Analytics service (second gRPC microservice for stats/metrics)

## API Overview

```
POST  /api/auth/register
POST  /api/auth/login
GET   /api/issues              ?category=&status=&search=
POST  /api/issues              [auth]
GET   /api/issues/:id
PATCH /api/issues/:id/status   [auth]
POST  /api/issues/:id/vote     [auth]
POST  /api/issues/:id/comments [auth]
GET   /api/profile             [auth]
GET   /api/analytics/summary   (M4)
```

## Go Conventions

- No ORM — raw SQL via `pgx/v5`. Write real queries, no magic.
- Errors always wrapped: `fmt.Errorf("funcName: %w", err)`
- Context passed as first argument to every DB call
- JWT claims use a custom `Claims` struct (not `MapClaims`)
- Handler pattern: parse input → call query func → write JSON response
- DB query funcs live in `gateway/db/queries/` — one file per domain
- No global state — pool passed via dependency injection through handlers

## Database Schema (summary)

```
users        id, email, password_hash, name, avatar_url, created_at
issues       id, title, description, category, status, lat, lng, district, user_id, created_at, updated_at
milestones   id, issue_id, title, status, created_at
comments     id, issue_id, user_id, text, is_official, upvotes, created_at
votes        id, issue_id, user_id  [UNIQUE(issue_id, user_id)]
```
