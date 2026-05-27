package handlers

import (
	"net/http"

	"github.com/ishanjayman/civic-authority/gateway/db/queries"
	"github.com/ishanjayman/civic-authority/gateway/middleware"
	"github.com/jackc/pgx/v5/pgxpool"
)

type ProfileHandler struct {
	pool *pgxpool.Pool
}

func NewProfileHandler(pool *pgxpool.Pool) *ProfileHandler {
	return &ProfileHandler{pool: pool}
}

// GET /api/profile  [auth required]
func (h *ProfileHandler) Get(w http.ResponseWriter, r *http.Request) {
	userID := middleware.UserIDFromCtx(r.Context())

	user, err := queries.GetUserByID(r.Context(), h.pool, userID)
	if err != nil {
		writeError(w, "user not found", http.StatusNotFound)
		return
	}

	stats, err := queries.GetProfileStats(r.Context(), h.pool, userID)
	if err != nil {
		writeError(w, "internal error", http.StatusInternalServerError)
		return
	}

	writeJSON(w, map[string]any{
		"user":  user,
		"stats": stats,
	}, http.StatusOK)
}
