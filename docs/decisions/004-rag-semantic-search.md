# ADR-004: RAG + Semantic Search for Job Matching

## Status

Accepted

## Context

Keyword search misses relevant jobs when terminology differs (e.g., "microservices" vs "distributed systems"). Users need relevance scoring that understands meaning, not just string matching.

## Decision

- Use RAG (Retrieval-Augmented Generation) for semantic job matching
- Embed job descriptions on ingest, embed user resume on upload
- Similarity search ranks jobs by relevance to user's profile
- Vector storage: pgvector (PostgreSQL extension) — no extra service
- Embedding model: sentence-transformers (all-MiniLM-L6-v2) — free, local

## Consequences

- Jobs are ranked by actual relevance, not keyword overlap
- pgvector keeps everything in one database (simpler ops)
- Can upgrade to dedicated vector DB (Qdrant, Pinecone) later if needed
- Embedding model is swappable via same provider interface pattern
