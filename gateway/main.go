package main

import (
	"context"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	chiMiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/ishanjayman/civic-authority/gateway/config"
	"github.com/ishanjayman/civic-authority/gateway/db"
	"github.com/ishanjayman/civic-authority/gateway/handlers"
	"github.com/ishanjayman/civic-authority/gateway/middleware"
)

func main() {
	cfg := config.Load()

	pool, err := db.Connect(context.Background(), cfg.DBURL)
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}
	defer pool.Close()
	log.Println("database connected")

	// Instantiate handlers — dependency injection via constructor
	authH := handlers.NewAuthHandler(pool, cfg.JWTSecret)
	issuesH := handlers.NewIssuesHandler(pool)
	commentsH := handlers.NewCommentsHandler(pool)
	profileH := handlers.NewProfileHandler(pool)

	r := chi.NewRouter()

	// Built-in chi middleware
	r.Use(chiMiddleware.Logger)    // logs every request: method, path, status, latency
	r.Use(chiMiddleware.Recoverer) // catches panics, returns 500 instead of crashing

	// CORS — allows the React dev server (localhost:3000) to call this API
	r.Use(corsMiddleware)

	// Public routes (no auth required)
	r.Post("/api/auth/register", authH.Register)
	r.Post("/api/auth/login", authH.Login)
	r.Get("/api/issues", issuesH.List)
	r.Get("/api/issues/{id}", issuesH.Get)

	// Protected routes (JWT required)
	r.Group(func(r chi.Router) {
		r.Use(middleware.RequireAuth(cfg.JWTSecret))

		r.Post("/api/issues", issuesH.Create)
		r.Patch("/api/issues/{id}/status", issuesH.UpdateStatus)
		r.Post("/api/issues/{id}/vote", issuesH.Vote)
		r.Post("/api/issues/{id}/comments", commentsH.Create)
		r.Get("/api/profile", profileH.Get)
	})

	log.Printf("gateway listening on :%s", cfg.Port)
	if err := http.ListenAndServe(":"+cfg.Port, r); err != nil {
		log.Fatalf("server error: %v", err)
	}
}

// corsMiddleware adds CORS headers so the React frontend can call the API.
// In production you would lock this down to your actual frontend domain.
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}
