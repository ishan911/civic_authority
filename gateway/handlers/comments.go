package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/ishanjayman/civic-authority/gateway/db/queries"
	"github.com/ishanjayman/civic-authority/gateway/middleware"
	"github.com/jackc/pgx/v5/pgxpool"
)

type CommentsHandler struct {
	pool *pgxpool.Pool
}

func NewCommentsHandler(pool *pgxpool.Pool) *CommentsHandler {
	return &CommentsHandler{pool: pool}
}

// POST /api/issues/:id/comments  [auth required]
// Body: {"text":"..."}
func (h *CommentsHandler) Create(w http.ResponseWriter, r *http.Request) {
	issueID := chi.URLParam(r, "id")
	userID := middleware.UserIDFromCtx(r.Context())

	var body struct {
		Text string `json:"text"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil || body.Text == "" {
		writeError(w, "text is required", http.StatusBadRequest)
		return
	}

	comment, err := queries.InsertComment(r.Context(), h.pool, issueID, userID, body.Text)
	if err != nil {
		writeError(w, "internal error", http.StatusInternalServerError)
		return
	}
	writeJSON(w, comment, http.StatusCreated)
}
