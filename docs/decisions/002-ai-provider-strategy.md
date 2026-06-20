# ADR-002: AI Provider Strategy — Free + Paid Pluggable

## Status

Accepted

## Context

Resume optimization requires AI/LLM capabilities. Users should not be forced to pay for API keys to use the core product. At the same time, premium models (Claude, GPT-4) provide better results.

## Decision

- Define an `AIProvider` interface that all model integrations implement
- Free tier: open-source models via Ollama (Llama, Mistral) — runs locally or on free infrastructure
- Paid tier: Claude API, OpenAI API — plugged in via same interface
- User selects their provider in settings (or app defaults to free)

## Consequences

- Core product is fully functional without any paid dependencies
- Premium experience available for those willing to pay
- Adding a new AI provider = implementing one interface (no core code changes)
- Must design prompts that work reasonably well across model quality levels
