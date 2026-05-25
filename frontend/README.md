# 🏛️ The Civic Authority — Frontend Client

An editorial-grade, responsive, and performance-tuned civic reporting and community action web platform built with **React 19**, **Vite**, **TypeScript**, and the brand-new **Tailwind CSS v4 engine**.

This interface connects modern citizens with municipal progress by offering a high-contrast theme-switchable UI, a zero-clutter fullscreen map tracking system, issue-detailed forums, and data-dense analytical charts detailing community reports.

---

## 🎨 Visual Philosophy & Craft

Every block of visual elements in The Civic Authority is carefully selected, discarding generic design presets in favor of high-level aesthetic pairings:

*   **Display Typography (Headings):** **Manrope** — bold, geometric, and distinctively authoritative.
*   **Body & UI Text:** **Inter** — clean, highly legible, and spacious.
*   **Status & Metric Accents:** **JetBrains Mono** — tech-forward, high-contrast, designed to make figures, dates, and sector indexes look razor-sharp.
*   **Palette Integrity:** Transitioning elegantly between a crisp, high-contrast Slate light theme and an eye-safe Slate-950 midnight dark canvas. It respects user intent without flashing or theme conflicts during transition.
*   **Purposed Motion:** Controlled micro-interactions and staggered entry animations powered by `motion` keep attention directed to vital action grids.

---

## 🚀 Key Functional Modules

### 1. Unified Explore View
*   **Smart Query Engine:** Multi-param filtering across titles, descriptions, and category tags.
*   **Interactive Services Rail:** Quick access to reporting shortcuts, municipal announcements, and city assistance categories.
*   **Live Analytics Panel (Issue Summary):**
    *   **Metric Grid:** Real-time metrics analyzing total reports, issues undergoing active maintenance, resolved cases, and cumulative community votes.
    *   **Categories Ratio Bar:** A dynamic multi-segment stacked progress bar conveying relative ratio shares of categories dynamically.
    *   **District Density Index:** A layout showing active sectors ranked sorted by report counts, backed by horizontal comparison bars.

### 2. Zero-Border Maps (Map View)
*   **Full-Width Fluidity:** A zero-margin, edge-to-edge interactive canvas maximizing visual focus for geographical report tracking.
*   **Geo-markers & Filtering:** Toggle map categories between Satellites, Street, and Civic filters. Pins update to match issue tags (Infrastructure, Sanitation, Parks, Water, etc.).

### 3. Wizard-based Incident Reporting
*   **Multi-step Wizard Flow:** Progress bars guiding citizens through location coordinate assignments, image reference loading, and severity indexing.
*   **Offline Fallbacks:** Graceful form inputs with validated type checking before payload generation.

---

## 🛠️ Stack & Dependencies

The client application works independently on a robust local pipeline:

*   **Runtime Framework:** [React 19](https://react.dev) (Functional components with rigid hook memoization, preventing unnecessary re-render loops).
*   **Styling Compiler:** [Tailwind CSS v4](https://tailwindcss.com) (leveraging dynamic `@variant dark (&:where(.dark, .dark *))` configuration).
*   **Icons:** [Lucide React](https://lucide.dev) (fully vector, high-contrast crisp SVGs).
*   **Animations:** [motion](https://motion.dev) (staggered transitions, hover scales).
*   **Bundler Engine:** [Vite 6](https://vite.dev) (extremely fast Hot-Reload-like cold starts).

---

## 🏗️ Future Scope: The Microservice Bridge

Designed as a frontend baseline, this client is prepared to transition to a compiled multi-tiered microservice container:

1.  **Transport Layer:** Standard browser fetch requests target a unified **Go REST API Gateway**.
2.  **Internal Fabric (gRPC):** The translation gateway converts raw JSON parameters to binary **gRPC Protocol Buffers** (`pb/`), requesting backend services in sub-millisecond timelines.
3.  **Data Persistence:** Storage moves from volatile client local arrays directly to a production **PostgreSQL** database utilizing coordinate maps indexing for ultra-fast distance search queries.

*For complete details on configuring the backend servers, refer to the [ARCHITECTURE.md](./ARCHITECTURE.md) blueprint.*

---

## 🖥️ Local Development

### Prerequisites
Make sure you have Node.js (v18+) and npm installed.

### Execution
1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Start Development Client:**
    ```bash
    npm run dev
    ```
    *Build is preconfigured to bind on port `3000` under host `0.0.0.0`.*

3.  **Produce Production Bundle:**
    ```bash
    npm run build
    ```
    Outputs clean, optimized asset bundles to `/dist` target path.

4.  **Static Checking / Linter:**
    ```bash
    npm run lint
    ```
    Runs rigid type checks via the TypeScript compiler.
