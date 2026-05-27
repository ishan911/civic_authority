.PHONY: up down reset migrate migrate-down logs

DB_URL=postgres://postgres:postgres@localhost:5433/civic_authority?sslmode=disable

up:
	docker compose up -d --build

down:
	docker compose down

reset:
	docker compose down -v
	docker compose up -d --build

migrate:
	@docker compose ps postgres | grep -q "healthy" || (echo "ERROR: postgres not running. Run 'make up' first." && exit 1)
	@docker compose exec -T postgres psql -U postgres -d civic_authority -c "SELECT 1" > /dev/null 2>&1 || (echo "ERROR: civic_authority database not ready yet. Wait a moment and retry." && exit 1)
	docker run --rm \
		--network civic_authority_default \
		-v $(PWD)/migrations:/migrations \
		migrate/migrate \
		-path /migrations \
		-database "postgres://postgres:postgres@postgres:5432/civic_authority?sslmode=disable" \
		up

migrate-down:
	docker run --rm \
		--network civic_authority_default \
		-v $(PWD)/migrations:/migrations \
		migrate/migrate \
		-path /migrations \
		-database "postgres://postgres:postgres@postgres:5432/civic_authority?sslmode=disable" \
		down

logs:
	docker compose logs -f gateway

.DEFAULT_GOAL := up
