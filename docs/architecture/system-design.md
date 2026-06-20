# System Architecture

## Overview

Waypoint is a two-service architecture with semantic search capabilities:

1. **Next.js App** — UI, API routes, database access
2. **Python Workers** — scraping, AI processing, embeddings

Communication via HTTP. Shared PostgreSQL database with pgvector for embeddings.

## Service Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│  Browser                                                        │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│  Next.js App (Vercel)                                           │
│  ├── UI Layer (React + Tailwind + shadcn/ui)                    │
│  ├── API Routes (thin controllers)                              │
│  ├── Service Layer (business logic)                             │
│  ├── Repository Layer (Prisma — data access)                    │
│  └── Cache Layer (in-memory → Redis)                            │
└───────────────┬─────────────────────┬───────────────────────────┘
                │                     │
       DB read/write           HTTP (JSON)
                │                     │
┌───────────────▼────────┐  ┌─────────▼───────────────────────────┐
│  PostgreSQL + pgvector  │  │  Python Workers (FastAPI)           │
│  (Railway)              │  │  (Railway)                          │
│                         │  │                                     │
│  • jobs                 │  │  ├── Scraper Service                │
│  • job_embeddings       │  │  │   ├── Adapter: LinkedIn          │
│  • users                │  │  │   ├── Adapter: Greenhouse        │
│  • resumes              │  │  │   └── (pluggable)                │
│  • analyses             │  │  ├── AI Service                     │
│  │                      │  │  │   ├── Provider: Ollama (free)    │
│  │                      │  │  │   ├── Provider: Claude (paid)    │
│  │                      │  │  │   └── (pluggable)                │
│  │                      │  │  ├── Embedding Service              │
│  │                      │  │  │   └── sentence-transformers      │
│  │                      │  │  ├── Cache (in-memory → Redis)      │
│  │                      │  │  ├── Rate Limiter (in-memory → Redis)│
│  │                      │  │  └── Queue (in-memory → Redis)      │
└─────────────────────────┘  └─────────────────────────────────────┘
```

## Data Flows

### Job Discovery (Scraping)
```
Cron trigger → Next.js /api/cron/scrape → Python POST /scrape
  → Scraper adapter fetches jobs from portal
  → Embeds each job description (sentence-transformers)
  → Stores job + embedding in PostgreSQL (pgvector)
  → Returns summary
```

### Job Matching (Semantic Search)
```
User opens Radar → Next.js calls Python POST /match
  → Python loads user's resume embedding
  → Cosine similarity against all job embeddings (pgvector)
  → Returns jobs ranked by relevance score
  → Next.js renders ranked feed
```

### Resume Analysis
```
User uploads resume → Next.js /api/resume/analyze
  → Sends resume + JD to Python POST /analyze
  → AI provider compares and generates suggestions
  → Returns: match score, missing keywords, reword suggestions
  → Stored in DB, rendered on frontend
```

## API Contract (Python Workers)

### POST /scrape
```json
{ "sources": ["linkedin", "greenhouse"] }
→ { "jobs_found": 12, "jobs_new": 5, "errors": [] }
```

### POST /match
```json
{ "resume_embedding": [...], "limit": 20, "filters": {} }
→ { "jobs": [{ "id": 1, "score": 0.89, ... }] }
```

### POST /analyze
```json
{ "resume_text": "...", "job_description": "...", "provider": "ollama" }
→ { "match_score": 72, "missing_keywords": [...], "suggestions": [...] }
```

### POST /embed
```json
{ "text": "..." }
→ { "embedding": [0.023, -0.041, ...] }
```

### GET /health
```json
{ "status": "ok", "ai_provider": "ollama" }
```

## Design Patterns Applied

| Pattern | Where | Why |
|---------|-------|-----|
| Strategy | AI providers, scrapers | Swap implementations without touching core |
| Repository | Data access (Prisma) | Isolate DB queries from business logic |
| Factory | Provider/adapter creation | Config-driven instantiation |
| Observer | Notifications (future) | Add channels without core changes |
| Circuit Breaker | External API calls | Graceful failure + recovery |
| Rate Limiter | Scraper requests | Respect portals, avoid bans |
| Cache | Frequent reads | In-memory now, Redis later |

## Scaling Path

| Now (MVP) | Later (Scale) |
|-----------|---------------|
| In-memory cache | Redis |
| In-memory queue | BullMQ + Redis |
| In-memory rate limiter | Redis sliding window |
| Single Python worker | Multiple workers + load balancer |
| Vercel cron | Dedicated scheduler service |
| pgvector | Qdrant / Pinecone (if needed) |
