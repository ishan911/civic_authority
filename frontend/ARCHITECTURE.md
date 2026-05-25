# Architectural Blueprint & Development Roadmap
## Civic Authority Platform

This document serves as your guide and production roadmap for graduating **The Civic Authority** from a frontend prototype in Google AI Studio into a production-grade, highly-scalable, multi-service platform. Pushing this to GitHub first is **the absolute best way to start**, securing a functional baseline before evolving your stack.

---

## 1. The Strategy: Is publishing to GitHub first a good idea?

**Yes, absolutely.** This is the correct industry best practice. 

Here is why:
1. **Preserve Your Working Baseline:** You have a fully functional React frontend with real-time UI interactions, navigation, dynamic issue summary dashboards, and interactive coordinates map widgets. Having this safely versioned on GitHub allows you to experiment with Go backend integrations without fear of losing a stable prototype.
2. **Incremental Migration:** You can run your Go backend locally, integrate PostgreSQL, and slowly replace client-side mock storage arrays (`localStorage`) with real HTTP/fetch calls to your backend API gateway.
3. **Clear Git History:** Future recruiters will see your entire journey from "Single-page React client prototype" to a "Fully fledged Go microservices platform with high-perf RPC links and migrations." This tells an incredible story of engineering capabilities.

---

## 2. Infrastructure Strategy: AWS vs. GCP (The Free-Tier Battle)

For a self-funded learning playground intended to show recruiter-level scalability, we want to stay **strictly $0/month** while avoiding accidental bills.

### The Hosting Platform Choice:
*   **Google Cloud Engine (GCP) Free Tier:**
    *   **Pros:** Generous e2-micro VM free instance (always free in US regions), Cloud Run (fully managed serverless, first 2 million requests free per month).
    *   **Cons:** Serverless can have slight cold starts on free tiers. Cloud Run services scale down to `0` instances when idle.
*   **AWS Free Tier:**
    *   **Pros:** Industry standard, highly valued by recruiters. t2/t3.micro EC2 free for the first 12 months.
    *   **Cons:** **Not always free** (expires after 12 months). Direct RDS instances can run up small bills if you forget to turn them off.

### Proposed Architecture for $0/month:
1.  **Frontend Static Host:** Keep React on **Vercel**, **Netlify**, or **GitHub Pages** (100% free, fast global CDN, simple pull request previews).
2.  **Go Services (REST/gRPC Gateway):** Deploy inside lightweight Docker containers to **Render**, **Railway**, or **Fly.io** (excellent free tiers for hobby containers, scaling down automatically when not in use).
3.  **Database (PostgreSQL):** Avoid hosting PostgreSQL directly on raw VMs to save CPU and configuration time. Instead, use a managed serverless platform:
    *   **Neon.tech** or **Supabase**: Both offer extremely fast, production-ready serverless PostgreSQL instances on a permanent, generous free tier. They handle connection pooling and migration pipelines easily.

---

## 3. High-Performance Tech Stack Selection

To showcase advanced professional backend expertise:

*   **Go (Golang):** Industry standard for microservices due to its low CPU/memory footprint, compiled execution speed, and brilliant concurrency primitives (goroutines).
*   **gRPC:** Used for internal, ultra-low latency service-to-service communication. Protocol Buffers (`.proto`) act as a single source of truth for your API structures, with auto-generated code.
*   **REST API Gateway:** Since standard web browsers cannot naturally talk pure gRPC over HTTP/2 protocol frames, you will implement an **API Gateway** in Go that uses the **gRPC-Gateway** library. This translates incoming JSON REST requests from your React client into blazing-fast internal gRPC binary calls.
*   **PostgreSQL:** Relational powerhouse. Perfect for geo-spatial indexing (via `PostGIS` extension) for tracking report coordinate coordinates.

---

## 4. Recommended Repository Structure (Monorepo)

To minimize the friction of managing multiple GitHub repositories, containerize everything inside a unified, industry-compliant **Monorepo**.

```text
/the-civic-authority
│
├── .github/workflows/          # CI/CD pipelines (GitHub Actions)
│
├── frontend/                   # This exact React application
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
│
├── gateway/                    # REST API Gateway (Go)
│   ├── main.go                 # Translates React REST to internal gRPC
│   ├── Dockerfile
│   └── go.mod
│
├── pb/                         # Compiled Protocol Buffer outputs (Go structures)
│   └── issue.pb.go
│
├── proto/                      # Protobuf schema definitions (Source of truth)
│   └── issue.proto
│
├── services/                   # Internal microservices (Dockerized)
│   │
│   ├── issue-service/          # Service managing report updates & SQL writes
│   │   ├── main.go
│   │   ├── handler.go          # Implements internal issue gRPC interfaces
│   │   ├── Dockerfile
│   │   └── go.mod
│   │
│   └── analytics-service/      # Consumer service analyzing stats & metric timelines
│       ├── main.go
│       └── Dockerfile
│
├── migrations/                 # PostgreSQL SQL schema migrations
│   ├── 000001_init_schema.up.sql
│   └── 000001_init_schema.down.sql
│
├── docker-compose.yml          # Spins up local PG database & Go services
└── README.md
```

---

## 5. Step-by-Step Pathway: Your Development Roadmap

### Step 1: Push Prototype to GitHub
1. Create a clean repository on GitHub (e.g., `the-civic-authority`).
2. Download your current project directory (Vite + React) from AI Studio.
3. Commit this code as the `/frontend` subfolder of your repository.

### Step 2: Establish the Database Design
Create a serverless Postgres instance on **Neon.tech**. Draft your SQL table columns using standard migrations (`golang-migrate` command line tool is highly recommended).
*   `issues` table: `id`, `title`, `description`, `category` (enum), `status` (enum), `latitude`, `longitude`, `district`, `created_at`, `user_id`.
*   `comments` table: `id`, `issue_id`, `text`, `user_name`, `user_avatar`, `created_at`.

### Step 3: Write Protocol Buffers (`issue.proto`)
Define requests and replies in your proto files:
```protobuf
syntax = "proto3";
package issue;

service IssueService {
  rpc ReportIssue (ReportIssueRequest) returns (IssueResponse);
  rpc GetIssues (GetIssuesRequest) returns (GetIssuesReply);
}
```
Compile them using `protoc` into your `/pb` directory.

### Step 4: Implement Go Microservices & Database Logic
Write a simple `issue-service` in Go:
*   Use `sqlx` or `gorm` to query PostgreSQL.
*   Implement the gRPC server handlers on port `:50051`.
*   Test using local Docker setup.

### Step 5: Implement REST API Gateway
Develop a `gateway` service in Go:
*   Listens on standard port (e.g., `:8080`).
*   Accepts REST calls (`GET /api/issues`) from Vite/React.
*   Translates them directly into gRPC calls sent to `issue-service`.

### Step 6: Connect React Client to Real API Gateway
Swap your `App.tsx` state variables from `localStorage` mock buffers into standard real-world `fetch` statements:
```typescript
useEffect(() => {
  fetch('https://api.your-gateway.com/api/issues')
    .then(res => res.json())
    .then(data => setIssues(data));
}, []);
```

---

## Conclusion

This combination of **React Frontend**, **Go (REST + gRPC) Backend**, and **PostgreSQL** is an extremely high-fidelity showcase. It is widely respected, proves you can code both fast responsive web applications and robust distributed systems, and scales infinitely under real-world server stress.

Go ahead, commit this architecture file, push your portal to GitHub, and begin crafting!
