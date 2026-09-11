# LearnFlex

**Live Demo:** [https://learn-flex-yw72.vercel.app/HomePage](https://learn-flex-yw72.vercel.app/HomePage?utm_source=chatgpt.com)

A full-stack, real-time competitive exam learning platform for **JEE, NEET, UPSC**, and other foundation competitive exams. LearnFlex unifies personalized practice, scheduled mock tests, deterministic daily challenges, and live 1v1 peer quiz battles into a single adaptive, gamified platform.

## ✨ Key Features

* **Multi-Exam Support with Custom Marking Rules** — JEE/NEET use `+4 / -1` scoring, UPSC uses `+1 / -0.33` or `+2 / -0.66`, all enforced dynamically at runtime via an `Exam_Marking` table.

* **Deterministic Daily Challenge** — A seeded Linear Congruential Generator (LCG) produces identical daily question sets for every user of a given exam, with zero manual pre-allocation.

* **Real-Time 1v1 Quiz Battles** — Low-latency WebSocket matchmaking (Socket.io) with synchronized rooms, live question distribution, and instant comparative grading.

* **Relational Analytics & Leaderboards** — Real-time rankings via SQL CTEs and window functions (`RANK() OVER (...)`), plus an activity heatmap for study streaks.

* **Weekly Mock Tests** — Scheduled, transactional quiz submissions with atomic batch inserts.

* **Secure Auth** — JWT sessions in HttpOnly cookies, BCrypt password hashing, and a database-backed sliding-window OTP rate limiter.

## 🏗️ Architecture

LearnFlex follows a decoupled 3-tier client-server architecture, augmented with an asynchronous real-time/event-driven layer:

```text
┌─────────────────────────────────────────────────────────┐
│ TIER 1: Presentation Layer (Frontend SPA)               │
│ React 19 · Vite 7 · Tailwind CSS 4 · React Router 7     │
│ Socket.io-client (1v1 Battle) · Activity Heatmap        │
└─────────────────────────────────────────────────────────┘

                    │ HTTPS (JWT HttpOnly) │ WebSockets
                    ▼                     ▼

┌─────────────────────────────────────────────────────────┐
│ TIER 2: Application & Real-Time Engine                  │
│ Node.js · Express 5 · JWT Auth · Sliding-Window Rate    │
│ Limiter · Socket.io Server · node-cron (Daily LCG Gen)  │
└─────────────────────────────────────────────────────────┘

        │ postgres.js (tagged SQL)   │ Static CDN
        ▼                            ▼

┌────────────────────────────┐  ┌───────────────────────┐
│ TIER 3A: Relational Store  │  │ TIER 3B: Object Store │
│ PostgreSQL on Neon         │  │ Cloudinary / CDN      │
│ Serverless — 15+ tables    │  │ Diagrams & figures    │
└────────────────────────────┘  └───────────────────────┘
```

## 🧰 Tech Stack

| Layer           | Technology                                                                               |
| --------------- | ---------------------------------------------------------------------------------------- |
| Frontend        | React 19, Vite 7, Tailwind CSS 4, React Router 7, Socket.io-client                       |
| Backend         | Node.js (v18+), Express 5                                                                |
| Database        | PostgreSQL (Neon Serverless) via `postgres.js` with connection pooling                   |
| Real-time       | Socket.io (1v1 battle engine)                                                            |
| Scheduling      | node-cron (midnight `Asia/Kolkata` daily challenge generation)                           |
| Auth & Security | JWT + HttpOnly cookies, BCrypt (Blowfish-based hashing), SQL sliding-window rate limiter |
| Email           | Nodemailer (OTP delivery)                                                                |
| Object Storage  | Cloudinary / CDN (question diagrams, circuits, formulas)                                 |

## 🗄️ Database Design

* **15+ relational tables** covering `User`, `User_Profile`, `Exam`, `Subject`, `Exam_Marking`, `Questions`, `Weekly_Test` (+ bridge table), `DailyChallenge` (+ bridge table), submission/answer header-detail tables, and audit/logging tables (`OTPRateLimit`, `submission_log`).

* Normalized to **3NF/BCNF**, with deliberate, documented denormalization in `User_Profile` (`total_solved`, `rating`) for O(1) dashboard reads.

* All multi-row writes (quiz/practice submissions) are wrapped in PostgreSQL transactions (`sql.begin(...)`) for full ACID guarantees.

* Leaderboards and analytics are computed with CTEs, conditional aggregation, and window ranking functions rather than application-level loops.

## 🔑 Core Algorithms

* **Daily Challenge Generation (LCG):** `X(n+1) = (a·X(n) + c) mod m`, seeded from the date, exam, and subject — deterministic and storage-free.

* **Practice Deduplication:** `DISTINCT ON` combined with regex-normalized question text (`REGEXP_REPLACE`) to catch near-duplicate scraped questions.

* **Answer Normalization:** Strips formatting noise (spacing, parentheses, casing) and falls back to numeric equivalence checks before grading.

* **Sliding-Window Rate Limiting:** Rolling 1-hour window over an `OTPRateLimit` table (rather than fixed-window buckets) to prevent OTP spam/enumeration.

## 🔒 Security

* Passwords hashed with BCrypt (Blowfish cipher, salted, configurable work factor).

* JWTs issued and stored in `HttpOnly`, `Secure`, `SameSite=None` cookies — inaccessible to client-side JS, mitigating XSS-based token theft.

* Parameterized queries via `postgres.js` tagged templates — SQL injection-safe by design.

* Database-backed sliding-window rate limiting on OTP/password-reset endpoints.

## 🔌 Real-Time 1v1 Battle Flow

1. Client connects to `/1v1` and emits `find_match` with an `exam_id`.

2. Server matches two players from an in-memory queue and creates a room (`room_${uuidv4()}`).

3. 10 random questions for the exam are fetched and broadcast via `match_found`.

4. Players submit answers; once both results are in, the server emits the final comparative result to both.

5. Disconnects are handled gracefully — the queue/room is cleaned up and the remaining player is notified via `opponent_left`.

## 🚀 Scalability Notes

* Built on Neon's serverless Postgres (storage/compute separation, scale-to-zero) with pooled connections via `postgres.js` to avoid exhausting `max_connections` in ephemeral environments.

* Roadmap: Redis caching for leaderboards, `@socket.io/redis-adapter` for horizontal WebSocket scaling, and a message queue (Kafka/SQS) to smooth write spikes during mass mock tests.
