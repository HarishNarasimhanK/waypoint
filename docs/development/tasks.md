# Increment 1 — Tasks

## Current Phase: Authentication

- [x] Define problem statement and vision
- [x] Define user flow and requirements
- [x] Set up project repository with docs structure
- [x] Decide tech stack (ADR-003: Next.js + Python workers + PostgreSQL)
- [x] Scaffold project (monorepo: apps/web + apps/worker)
- [x] Set up database schema (Prisma)
- [x] Document auth concepts from first principles

### Auth Implementation

- [ ] Update Prisma schema with auth tables (VerificationToken, PasswordResetToken, Account)
- [ ] Install auth dependencies (NextAuth, bcrypt, Resend)
- [ ] Configure NextAuth (JWT strategy, providers)
- [ ] Build signup API (create user, hash password, send verification email)
- [ ] Build email verification flow (token validation, mark verified)
- [ ] Build login flow (credentials + OAuth)
- [ ] Build forgot password flow (generate token, send email)
- [ ] Build reset password flow (validate token, update password)
- [ ] Add middleware (protect routes, redirect unauthenticated users)
- [ ] Build UI pages (login, signup, verify-email, forgot-password, reset-password)
- [ ] Test auth end-to-end

### After Auth

- [ ] Design UI (Radar feed, Job detail page)
- [ ] Implement job scraper (first adapter)
- [ ] Build Job Radar feed UI
- [ ] Build Job Detail page
- [ ] Build Resume Optimizer (with free AI provider)
- [ ] Add application status tracking
- [ ] Deploy MVP

## Backlog (future increments)

- [ ] Push notifications for high-relevance jobs
- [ ] Auto-apply engine
- [ ] Interview prep module
- [ ] Analytics dashboard
- [ ] Premium AI provider integration
