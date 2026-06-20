# ADR-001: MVP Scope — Job Radar + Resume Optimizer

## Status

Accepted

## Context

The full vision includes job scraping, resume optimization, auto-apply, interview prep, and analytics. Building everything at once would delay delivery and increase complexity.

## Decision

MVP (Increment 1) focuses on:
1. Job Radar — intelligent scraper + clean job feed + full detail view
2. Resume Optimizer — per-job AI analysis with pluggable model backend
3. Basic application status tracking

Everything else is deferred to future increments.

## Consequences

- Users get value fast (find jobs + optimize resume)
- Architecture must be designed for extension (but only MVP is built)
- Auto-apply, notifications, and analytics are explicitly out of scope for now
