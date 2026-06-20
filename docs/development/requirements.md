# Increment 1 — Requirements

## Scope

Job Radar + Resume Optimizer (MVP)

## Functional Requirements

### FR-1: Job Radar Feed

- [ ] Display a list of job postings as cards
- [ ] Each card shows: company name, role title, location, time since posted, relevance score
- [ ] Jobs sorted by freshness (newest first)
- [ ] Filter by: role/keyword, company, location
- [ ] Search across all job fields
- [ ] Scraper runs periodically and populates the database with fresh jobs

### FR-2: Job Detail Page

- [ ] Full job description (as-is from the portal)
- [ ] Qualifications, responsibilities, salary (if available), location, job type
- [ ] Nothing from the original posting is missed
- [ ] "Apply Now" button — links to the original job portal
- [ ] "Optimize Resume" button — navigates to resume optimizer for this job
- [ ] Clicking "Apply Now" auto-updates job status to "Applied"

### FR-3: Resume Optimizer

- [ ] Upload resume (PDF or DOCX)
- [ ] AI analyzes resume against the specific job description
- [ ] Output: match score (percentage)
- [ ] Output: keywords/skills present in JD but missing from resume
- [ ] Output: specific bullet points to reword (with suggestions)
- [ ] Output: what's already strong (positive reinforcement)
- [ ] Suggestions are incremental tweaks, not full rewrites
- [ ] AI provider is pluggable (open-source for free, paid API for premium)

### FR-4: Application Status Tracking

- [ ] Each job has a status: New → Viewed → Applied → Interviewing → Offer/Rejected
- [ ] Status updates on user action (click "Apply" → auto-mark Applied)
- [ ] Manual status override available
- [ ] Visual indicator of status on job cards in the feed

## Non-Functional Requirements

- [ ] Page load under 2 seconds
- [ ] Mobile-responsive (PWA-installable)
- [ ] Works fully with free/open-source AI models
- [ ] Extensible: adding a new job source requires only a new adapter
- [ ] Extensible: adding a new AI provider requires only implementing an interface
