# ADR-005: Design Patterns for Scalability

## Status

Accepted

## Context

The project must be easy to scale later (Redis, queues, multiple workers) without rewriting business logic. Every infrastructure dependency should be swappable via interface.

## Decision

Apply these patterns throughout:

- **Strategy Pattern** — AI providers, scraper adapters (swap implementations via config)
- **Repository Pattern** — Data access isolated behind interfaces
- **Factory Pattern** — Create providers/adapters from configuration
- **Observer Pattern** — Notification channels (add new ones without touching core)
- **Circuit Breaker** — Graceful failure when external services are down
- **Rate Limiter** — Abstract interface; in-memory now, Redis later
- **Cache Layer** — Abstract interface; in-memory now, Redis later
- **Queue Abstraction** — In-memory now, BullMQ/Redis later

## Key Principle

Every infrastructure dependency (cache, queue, rate limiter) is coded against an abstract interface. Swapping from in-memory to Redis = change one line in config/DI container.

## Consequences

- Slightly more files/interfaces upfront
- Zero-friction scaling when the time comes
- Clean separation of concerns from day one
- Easy to test (mock any layer)
