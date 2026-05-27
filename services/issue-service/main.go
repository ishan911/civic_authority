// issue-service is the internal gRPC microservice that owns all issue data.
//
// M3 roadmap:
//  1. Add grpc-go dependency:   go get google.golang.org/grpc
//  2. Add pgx dependency:       go get github.com/jackc/pgx/v5
//  3. Import compiled pb stubs from /pb
//  4. Implement the IssueService gRPC interface defined in /proto/issue.proto
//  5. Listen on :50051 and register with the gRPC server
//
// When M3 is complete, gateway/handlers/issues.go will stop querying
// PostgreSQL directly and instead call this service via gRPC.
package main

import (
	"log"
)

func main() {
	// TODO (M3): Start gRPC server on :50051
	// srv := grpc.NewServer()
	// pb.RegisterIssueServiceServer(srv, &IssueServiceHandler{})
	// lis, _ := net.Listen("tcp", ":50051")
	// srv.Serve(lis)
	log.Println("issue-service: not yet implemented — coming in M3")
}
