package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/ishanjayman/civic-authority/gateway/db/queries"
	"github.com/ishanjayman/civic-authority/gateway/middleware"
	"github.com/jackc/pgx/v5/pgxpool"
)

type IssuesHandler struct {
	pool *pgxpool.Pool
}

func NewIssuesHandler(pool *pgxpool.Pool) *IssuesHandler {
	return &IssuesHandler{pool: pool}
}

// GET /api/issues?category=&status=&search=
func (h *IssuesHandler) List(w http.ResponseWriter, r *http.Request) {
	category := r.URL.Query().Get("category")
	status := r.URL.Query().Get("status")
	search := r.URL.Query().Get("search")

	issues, err := queries.ListIssues(r.Context(), h.pool, category, status, search)
	if err != nil {
		writeError(w, "internal error", http.StatusInternalServerError)
		return
	}
	// Return empty array, not null, when no issues exist
	if issues == nil {
		issues = []queries.Issue{}
	}
	writeJSON(w, issues, http.StatusOK)
}

// POST /api/issues  [auth required]
// Body: {"title":"...","description":"...","category":"...","latitude":0,"longitude":0,"district":"..."}
func (h *IssuesHandler) Create(w http.ResponseWriter, r *http.Request) {
	userID := middleware.UserIDFromCtx(r.Context())

	var body struct {
		Title       string  `json:"title"`
		Description string  `json:"description"`
		Category    string  `json:"category"`
		Latitude    float64 `json:"latitude"`
		Longitude   float64 `json:"longitude"`
		District    string  `json:"district"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeError(w, "invalid JSON", http.StatusBadRequest)
		return
	}
	if body.Title == "" || body.Description == "" || body.Category == "" || body.District == "" {
		writeError(w, "title, description, category, and district are required", http.StatusBadRequest)
		return
	}

	issue, err := queries.InsertIssue(r.Context(), h.pool, body.Title, body.Description, body.Category, body.District, body.Latitude, body.Longitude, userID)
	if err != nil {
		writeError(w, "internal error", http.StatusInternalServerError)
		return
	}
	writeJSON(w, issue, http.StatusCreated)
}

// GET /api/issues/:id
func (h *IssuesHandler) Get(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	detail, err := queries.GetIssueDetail(r.Context(), h.pool, id)
	if err != nil {
		writeError(w, "issue not found", http.StatusNotFound)
		return
	}
	writeJSON(w, detail, http.StatusOK)
}

// PATCH /api/issues/:id/status  [auth required]
// Body: {"status":"in_progress"}
func (h *IssuesHandler) UpdateStatus(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	var body struct {
		Status string `json:"status"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil || body.Status == "" {
		writeError(w, "status is required", http.StatusBadRequest)
		return
	}

	issue, err := queries.UpdateIssueStatus(r.Context(), h.pool, id, body.Status)
	if err != nil {
		writeError(w, "issue not found or invalid status", http.StatusBadRequest)
		return
	}
	writeJSON(w, issue, http.StatusOK)
}

// POST /api/issues/:id/vote  [auth required]
func (h *IssuesHandler) Vote(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	userID := middleware.UserIDFromCtx(r.Context())

	if err := queries.UpsertVote(r.Context(), h.pool, id, userID); err != nil {
		writeError(w, "internal error", http.StatusInternalServerError)
		return
	}
	writeJSON(w, map[string]string{"status": "ok"}, http.StatusOK)
}
