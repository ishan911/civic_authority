package handlers

import (
	"encoding/json"
	"errors"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/ishanjayman/civic-authority/gateway/db/queries"
	"github.com/ishanjayman/civic-authority/gateway/middleware"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/crypto/bcrypt"
)

type AuthHandler struct {
	pool      *pgxpool.Pool
	jwtSecret string
}

func NewAuthHandler(pool *pgxpool.Pool, jwtSecret string) *AuthHandler {
	return &AuthHandler{pool: pool, jwtSecret: jwtSecret}
}

// POST /api/auth/register
// Body: {"email":"...","password":"...","name":"..."}
func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
		Name     string `json:"name"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil || body.Email == "" || body.Password == "" || body.Name == "" {
		writeError(w, "email, password, and name are required", http.StatusBadRequest)
		return
	}

	// bcrypt cost 12 is secure and reasonably fast
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 12)
	if err != nil {
		writeError(w, "internal error", http.StatusInternalServerError)
		return
	}

	user, err := queries.InsertUser(r.Context(), h.pool, body.Email, string(hash), body.Name)
	if err != nil {
		// Duplicate email — pgx surfaces the postgres unique violation message
		writeError(w, "email already registered", http.StatusConflict)
		return
	}

	token, err := h.signToken(user.ID)
	if err != nil {
		writeError(w, "internal error", http.StatusInternalServerError)
		return
	}

	writeJSON(w, map[string]any{"token": token, "user": user}, http.StatusCreated)
}

// POST /api/auth/login
// Body: {"email":"...","password":"..."}
func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil || body.Email == "" || body.Password == "" {
		writeError(w, "email and password are required", http.StatusBadRequest)
		return
	}

	user, err := queries.GetUserByEmail(r.Context(), h.pool, body.Email)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			writeError(w, "invalid credentials", http.StatusUnauthorized)
			return
		}
		writeError(w, "internal error", http.StatusInternalServerError)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(body.Password)); err != nil {
		writeError(w, "invalid credentials", http.StatusUnauthorized)
		return
	}

	token, err := h.signToken(user.ID)
	if err != nil {
		writeError(w, "internal error", http.StatusInternalServerError)
		return
	}

	writeJSON(w, map[string]any{"token": token, "user": user}, http.StatusOK)
}

func (h *AuthHandler) signToken(userID string) (string, error) {
	claims := middleware.Claims{
		UserID: userID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(72 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}
	return jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(h.jwtSecret))
}
