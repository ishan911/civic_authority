# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM golang:1.23-alpine AS builder

WORKDIR /app

COPY go.mod go.sum* ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o analytics-service .

# ── Stage 2: Runtime ──────────────────────────────────────────────────────────
FROM scratch

WORKDIR /app
COPY --from=builder /app/analytics-service .

EXPOSE 50052

ENTRYPOINT ["./analytics-service"]
