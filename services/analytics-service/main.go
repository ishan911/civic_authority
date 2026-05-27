// analytics-service is a read-only gRPC microservice that serves aggregate stats.
//
// M4 roadmap:
//  1. Add grpc-go + pgx dependencies
//  2. Import compiled pb stubs from /pb
//  3. Implement AnalyticsService.GetSummary from /proto/analytics.proto
//  4. Query: COUNT issues by category, COUNT by status, recent activity
//  5. Listen on :50052 (separate port from issue-service on :50051)
//
// The gateway will call this from GET /api/analytics/summary.
package main

import (
	"log"
)

func main() {
	// TODO (M4): Start gRPC server on :50052
	log.Println("analytics-service: not yet implemented — coming in M4")
}
