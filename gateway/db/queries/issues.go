package queries

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Issue struct {
	ID          string      `json:"id"`
	Title       string      `json:"title"`
	Description string      `json:"description"`
	Category    string      `json:"category"`
	Status      string      `json:"status"`
	Latitude    float64     `json:"latitude"`
	Longitude   float64     `json:"longitude"`
	District    string      `json:"district"`
	UserID      *string     `json:"user_id,omitempty"`
	VoteCount   int         `json:"vote_count"`
	CreatedAt   time.Time   `json:"created_at"`
	UpdatedAt   time.Time   `json:"updated_at"`
}

type IssueDetail struct {
	Issue
	Milestones []Milestone `json:"milestones"`
	Comments   []Comment   `json:"comments"`
}

type Milestone struct {
	ID        string    `json:"id"`
	IssueID   string    `json:"issue_id"`
	Title     string    `json:"title"`
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
}

type Comment struct {
	ID         string    `json:"id"`
	IssueID    string    `json:"issue_id"`
	UserID     *string   `json:"user_id,omitempty"`
	UserName   string    `json:"user_name"`
	Text       string    `json:"text"`
	IsOfficial bool      `json:"is_official"`
	Upvotes    int       `json:"upvotes"`
	CreatedAt  time.Time `json:"created_at"`
}

// ListIssues returns all issues with optional filters and a vote count.
func ListIssues(ctx context.Context, pool *pgxpool.Pool, category, status, search string) ([]Issue, error) {
	where := []string{}
	args := []any{}
	idx := 1

	if category != "" {
		where = append(where, fmt.Sprintf("i.category = $%d", idx))
		args = append(args, category)
		idx++
	}
	if status != "" {
		where = append(where, fmt.Sprintf("i.status = $%d", idx))
		args = append(args, status)
		idx++
	}
	if search != "" {
		where = append(where, fmt.Sprintf("(i.title ILIKE $%d OR i.description ILIKE $%d)", idx, idx))
		args = append(args, "%"+search+"%")
		idx++
	}

	clause := ""
	if len(where) > 0 {
		clause = "WHERE " + strings.Join(where, " AND ")
	}

	q := fmt.Sprintf(`
		SELECT i.id, i.title, i.description, i.category, i.status,
		       i.latitude, i.longitude, i.district, i.user_id,
		       COUNT(v.id) AS vote_count,
		       i.created_at, i.updated_at
		FROM issues i
		LEFT JOIN votes v ON v.issue_id = i.id
		%s
		GROUP BY i.id
		ORDER BY i.created_at DESC
	`, clause)

	rows, err := pool.Query(ctx, q, args...)
	if err != nil {
		return nil, fmt.Errorf("queries.ListIssues: %w", err)
	}
	defer rows.Close()

	var issues []Issue
	for rows.Next() {
		var iss Issue
		if err := rows.Scan(
			&iss.ID, &iss.Title, &iss.Description, &iss.Category, &iss.Status,
			&iss.Latitude, &iss.Longitude, &iss.District, &iss.UserID,
			&iss.VoteCount, &iss.CreatedAt, &iss.UpdatedAt,
		); err != nil {
			return nil, fmt.Errorf("queries.ListIssues scan: %w", err)
		}
		issues = append(issues, iss)
	}
	return issues, nil
}

func InsertIssue(ctx context.Context, pool *pgxpool.Pool, title, description, category, district string, lat, lng float64, userID string) (Issue, error) {
	var iss Issue
	row := pool.QueryRow(ctx, `
		INSERT INTO issues (title, description, category, latitude, longitude, district, user_id)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		RETURNING id, title, description, category, status, latitude, longitude, district, user_id, 0, created_at, updated_at
	`, title, description, category, lat, lng, district, userID)
	if err := row.Scan(
		&iss.ID, &iss.Title, &iss.Description, &iss.Category, &iss.Status,
		&iss.Latitude, &iss.Longitude, &iss.District, &iss.UserID,
		&iss.VoteCount, &iss.CreatedAt, &iss.UpdatedAt,
	); err != nil {
		return Issue{}, fmt.Errorf("queries.InsertIssue: %w", err)
	}
	return iss, nil
}

func GetIssueDetail(ctx context.Context, pool *pgxpool.Pool, id string) (IssueDetail, error) {
	var detail IssueDetail

	// Fetch issue + vote count
	row := pool.QueryRow(ctx, `
		SELECT i.id, i.title, i.description, i.category, i.status,
		       i.latitude, i.longitude, i.district, i.user_id,
		       COUNT(v.id) AS vote_count,
		       i.created_at, i.updated_at
		FROM issues i
		LEFT JOIN votes v ON v.issue_id = i.id
		WHERE i.id = $1
		GROUP BY i.id
	`, id)
	if err := row.Scan(
		&detail.ID, &detail.Title, &detail.Description, &detail.Category, &detail.Status,
		&detail.Latitude, &detail.Longitude, &detail.District, &detail.UserID,
		&detail.VoteCount, &detail.CreatedAt, &detail.UpdatedAt,
	); err != nil {
		return IssueDetail{}, fmt.Errorf("queries.GetIssueDetail: %w", err)
	}

	// Fetch milestones
	mRows, err := pool.Query(ctx, `
		SELECT id, issue_id, title, status, created_at
		FROM milestones WHERE issue_id = $1 ORDER BY created_at ASC
	`, id)
	if err != nil {
		return IssueDetail{}, fmt.Errorf("queries.GetIssueDetail milestones: %w", err)
	}
	defer mRows.Close()
	for mRows.Next() {
		var m Milestone
		if err := mRows.Scan(&m.ID, &m.IssueID, &m.Title, &m.Status, &m.CreatedAt); err != nil {
			return IssueDetail{}, fmt.Errorf("queries.GetIssueDetail milestone scan: %w", err)
		}
		detail.Milestones = append(detail.Milestones, m)
	}

	// Fetch comments with user name
	cRows, err := pool.Query(ctx, `
		SELECT c.id, c.issue_id, c.user_id, COALESCE(u.name, 'Anonymous'),
		       c.text, c.is_official, c.upvotes, c.created_at
		FROM comments c
		LEFT JOIN users u ON u.id = c.user_id
		WHERE c.issue_id = $1 ORDER BY c.created_at ASC
	`, id)
	if err != nil {
		return IssueDetail{}, fmt.Errorf("queries.GetIssueDetail comments: %w", err)
	}
	defer cRows.Close()
	for cRows.Next() {
		var c Comment
		if err := cRows.Scan(&c.ID, &c.IssueID, &c.UserID, &c.UserName, &c.Text, &c.IsOfficial, &c.Upvotes, &c.CreatedAt); err != nil {
			return IssueDetail{}, fmt.Errorf("queries.GetIssueDetail comment scan: %w", err)
		}
		detail.Comments = append(detail.Comments, c)
	}

	return detail, nil
}

func UpdateIssueStatus(ctx context.Context, pool *pgxpool.Pool, id, status string) (Issue, error) {
	var iss Issue
	row := pool.QueryRow(ctx, `
		UPDATE issues SET status = $2
		WHERE id = $1
		RETURNING id, title, description, category, status, latitude, longitude, district, user_id, 0, created_at, updated_at
	`, id, status)
	if err := row.Scan(
		&iss.ID, &iss.Title, &iss.Description, &iss.Category, &iss.Status,
		&iss.Latitude, &iss.Longitude, &iss.District, &iss.UserID,
		&iss.VoteCount, &iss.CreatedAt, &iss.UpdatedAt,
	); err != nil {
		return Issue{}, fmt.Errorf("queries.UpdateIssueStatus: %w", err)
	}
	return iss, nil
}

// UpsertVote inserts a vote; silently ignores duplicate (one vote per user per issue).
func UpsertVote(ctx context.Context, pool *pgxpool.Pool, issueID, userID string) error {
	_, err := pool.Exec(ctx, `
		INSERT INTO votes (issue_id, user_id) VALUES ($1, $2)
		ON CONFLICT (issue_id, user_id) DO NOTHING
	`, issueID, userID)
	if err != nil {
		return fmt.Errorf("queries.UpsertVote: %w", err)
	}
	return nil
}

func InsertComment(ctx context.Context, pool *pgxpool.Pool, issueID, userID, text string) (Comment, error) {
	var c Comment
	row := pool.QueryRow(ctx, `
		INSERT INTO comments (issue_id, user_id, text)
		VALUES ($1, $2, $3)
		RETURNING id, issue_id, user_id, text, is_official, upvotes, created_at
	`, issueID, userID, text)
	if err := row.Scan(&c.ID, &c.IssueID, &c.UserID, &c.Text, &c.IsOfficial, &c.Upvotes, &c.CreatedAt); err != nil {
		return Comment{}, fmt.Errorf("queries.InsertComment: %w", err)
	}
	return c, nil
}

type ProfileStats struct {
	IssueCount int `json:"issue_count"`
	VoteCount  int `json:"vote_count"`
}

func GetProfileStats(ctx context.Context, pool *pgxpool.Pool, userID string) (ProfileStats, error) {
	var s ProfileStats
	row := pool.QueryRow(ctx, `
		SELECT
			(SELECT COUNT(*) FROM issues WHERE user_id = $1),
			(SELECT COUNT(*) FROM votes  WHERE user_id = $1)
	`, userID)
	if err := row.Scan(&s.IssueCount, &s.VoteCount); err != nil {
		return ProfileStats{}, fmt.Errorf("queries.GetProfileStats: %w", err)
	}
	return s, nil
}
