// handler.go will implement the IssueService gRPC interface generated from
// /proto/issue.proto once M3 begins. Each method here maps to one RPC:
//
//   ReportIssue   → INSERT into issues table
//   GetIssues     → SELECT with filters
//   GetIssue      → SELECT single issue + milestones + comments
//   UpdateStatus  → UPDATE issues SET status = ...
//
// The DB logic in gateway/db/queries/issues.go will be moved here in M3.
package main
