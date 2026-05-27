package queries

import (
	"context"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type User struct {
	ID           string    `json:"id"`
	Email        string    `json:"email"`
	PasswordHash string    `json:"-"` // never sent to client
	Name         string    `json:"name"`
	AvatarURL    *string   `json:"avatar_url,omitempty"`
	CreatedAt    time.Time `json:"created_at"`
}

func InsertUser(ctx context.Context, pool *pgxpool.Pool, email, passwordHash, name string) (User, error) {
	var u User
	row := pool.QueryRow(ctx, `
		INSERT INTO users (email, password_hash, name)
		VALUES ($1, $2, $3)
		RETURNING id, email, password_hash, name, avatar_url, created_at
	`, email, passwordHash, name)
	if err := row.Scan(&u.ID, &u.Email, &u.PasswordHash, &u.Name, &u.AvatarURL, &u.CreatedAt); err != nil {
		return User{}, fmt.Errorf("queries.InsertUser: %w", err)
	}
	return u, nil
}

func GetUserByEmail(ctx context.Context, pool *pgxpool.Pool, email string) (User, error) {
	var u User
	row := pool.QueryRow(ctx, `
		SELECT id, email, password_hash, name, avatar_url, created_at
		FROM users WHERE email = $1
	`, email)
	if err := row.Scan(&u.ID, &u.Email, &u.PasswordHash, &u.Name, &u.AvatarURL, &u.CreatedAt); err != nil {
		return User{}, fmt.Errorf("queries.GetUserByEmail: %w", err)
	}
	return u, nil
}

func GetUserByID(ctx context.Context, pool *pgxpool.Pool, id string) (User, error) {
	var u User
	row := pool.QueryRow(ctx, `
		SELECT id, email, password_hash, name, avatar_url, created_at
		FROM users WHERE id = $1
	`, id)
	if err := row.Scan(&u.ID, &u.Email, &u.PasswordHash, &u.Name, &u.AvatarURL, &u.CreatedAt); err != nil {
		return User{}, fmt.Errorf("queries.GetUserByID: %w", err)
	}
	return u, nil
}
