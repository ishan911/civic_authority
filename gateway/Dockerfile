# ── Stage 1: Build ────────────────────────────────────────────────────────────
# We use the full Go image to compile the binary.
FROM golang:1.26-alpine AS builder

WORKDIR /app

# Copy dependency files first — Docker caches this layer so `go mod download`
# only re-runs when go.mod or go.sum change, not on every source change.
COPY go.mod go.sum ./
RUN go mod download

# Now copy the rest of the source and build a static binary.
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o gateway .

# ── Stage 2: Runtime ──────────────────────────────────────────────────────────
# scratch is an empty image — no shell, no OS utilities, just the binary.
# This keeps the final image tiny (~10MB) and reduces the attack surface.
FROM scratch

WORKDIR /app
COPY --from=builder /app/gateway .

EXPOSE 8080

ENTRYPOINT ["./gateway"]
