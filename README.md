# The Civic Authority

A civic issue reporting platform — citizens submit, track, and vote on local infrastructure problems.

Built as a portfolio showcase demonstrating **React + Go microservices + gRPC + PostgreSQL**.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, TypeScript, Tailwind CSS |
| API Gateway | Go 1.23, chi, pgx/v5 |
| Microservices | Go + gRPC (M3+) |
| Database | PostgreSQL 16 |
| Auth | JWT + bcrypt |
| Comms | REST (external) → gRPC (internal, M3+) |

## Repository Structure

```
civic_authority/
├── .github/workflows/    CI/CD (GitHub Actions)
├── frontend/             React prototype
├── gateway/              REST API Gateway (Go)
├── services/
│   ├── issue-service/    gRPC service — issue CRUD (M3)
│   └── analytics-service/ gRPC service — stats (M4)
├── proto/                Protobuf source definitions
├── pb/                   Compiled Go stubs (generated, do not edit)
├── migrations/           PostgreSQL SQL migrations
└── docker-compose.yml    Local dev infrastructure
```

## Getting Started

**Prerequisites:** Docker Desktop, Go 1.23+, Node 20+, [golang-migrate](https://github.com/golang-migrate/migrate)

```bash
# 1. Clone and configure
git clone <repo-url> && cd civic_authority
cp .env.example .env   # edit with your values

# 2. Start database
docker compose up -d

# 3. Run migrations
migrate -path migrations \
        -database "postgres://postgres:postgres@localhost:5432/civic_authority?sslmode=disable" \
        up

# 4. Start API gateway
cd gateway && go run main.go

# 5. Start frontend (new terminal)
cd frontend && npm install && npm run dev
```

Frontend → http://localhost:3000  
API Gateway → http://localhost:8080  
pgAdmin → http://localhost:5050 (admin@admin.com / admin)

## Milestones

| # | Name | Status |
|---|------|--------|
| M0 | Frontend prototype | ✅ Done |
| M1 | Foundation (Docker + PostgreSQL + JWT auth) | ✅ Done |
| M2 | REST API (full CRUD, React connected) | 🚧 In progress |
| M3 | gRPC layer (protobuf + issue-service) | ⏳ Planned |
| M4 | Analytics service | ⏳ Planned |

## API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | — | Create account |
| POST | `/api/auth/login` | — | Login, returns JWT |
| GET | `/api/issues` | — | List issues (`?category=&status=&search=`) |
| POST | `/api/issues` | ✓ | Submit new issue |
| GET | `/api/issues/:id` | — | Issue detail + comments |
| PATCH | `/api/issues/:id/status` | ✓ | Update status |
| POST | `/api/issues/:id/vote` | ✓ | Upvote |
| POST | `/api/issues/:id/comments` | ✓ | Add comment |
| GET | `/api/profile` | ✓ | My profile + stats |
