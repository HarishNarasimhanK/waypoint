# Brainstorming Notes

## Initial Discussion (June 2026)

### User Flow (agreed)

1. User opens Waypoint → lands on **Radar** tab
2. Sees a feed of job cards (company, role, freshness, relevance score)
3. Clicks a job → opens **Job Detail Page** with full JD, qualifications, everything from the portal
4. Two actions available:
   - **"Apply Now"** → opens the original job portal link (auto-marks as "Applied")
   - **"Optimize Resume"** → opens the resume optimizer for this specific job
5. Resume Optimizer:
   - Upload resume (PDF/DOCX)
   - AI analyzes resume vs. this job's description
   - Shows: match score, keywords to add, bullets to reword, what to keep
   - Suggestions are subtle tweaks, not nuclear rewrites

### Key Decisions

- **Web app (PWA)** — works on phone like native app, one codebase
- **Radar is a tab** — the app will have more tabs/features in the future
- **AI is pluggable** — interface-based design; swap between open-source (free) and paid models
- **Pricing is pluggable** — free tier uses OSS models, paid tier uses premium APIs. Design for both from day one.
- **Design decisions deferred** — UI/UX specifics (tab vs sidebar, card layout) to be decided during implementation

### Future Modules (not in MVP)

- Auto-apply engine (form filler for ATS platforms)
- Interview prep (company-specific questions, mock interviews)
- Analytics dashboard (funnel: discovered → applied → interview → offer)
- Notifications (push/Telegram/email when high-match jobs appear)

### Differentiators from existing tools

1. Real-time scraping (every 5-15 min vs once daily)
2. Per-job resume optimization in the same flow (not a separate tool)
3. End-to-end in one place (discover + optimize + apply + track)
4. Privacy-first, self-hostable
5. Free tier with open-source AI (no forced paid subscription)
