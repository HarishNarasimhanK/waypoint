# Waypoint — Documentation

This directory provides full context for both AI assistants and human contributors.

## Structure

```
docs/
├── concepts/         # First-principles explanations of core concepts
├── context/          # Project vision, problem statement, brainstorming notes
├── development/      # Current increment: requirements, design, tasks
├── architecture/     # System design, tech stack decisions, data models
└── decisions/        # ADRs (Architecture Decision Records) for key choices
```

## How to use

- **AI assistants**: Start with `context/` for project vision, then `development/` for current work scope.
- **Humans**: Start with `concepts/` to understand the fundamentals. Check `development/` to see what's in progress. Check `decisions/` to understand why things are built a certain way.

## Concepts (learn the fundamentals)

- [Authentication from First Principles](concepts/auth-from-first-principles.md) — Hashing, sessions, JWT, OAuth, CSRF, and how it all fits together
