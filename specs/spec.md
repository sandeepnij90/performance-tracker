# Energy Tracker — Project Specification

**Version:** 1.0  
**Date:** 2026-03-17  
**Stack:** Next.js · Tailwind CSS · Prisma · PostgreSQL (Railway)

---

## Overview

A full-stack Next.js application that allows a user to track their daily mental and physical energy levels. Each entry captures a score on a scale of 1–10 (excluding 7) and an optional description. Data is persisted in a PostgreSQL database via Prisma ORM, hosted on Railway.

The initial release supports a single user with no authentication. A future phase will introduce multi-user support with authentication.

---

## Goals

- Provide a simple, distraction-free daily check-in experience
- Store historical energy data for future review or visualisation
- Build a clean, maintainable codebase that can be extended to multi-user use
- Keep the architecture fully within Next.js (API routes + frontend) for simplicity

---

## Constraints & Assumptions

- Single user only in Phase 1 — no login required
- The rating scale is 1–10, with **7 explicitly excluded** from selection
- Both prompts are answered together in a single daily entry
- Descriptions are optional for each prompt
- Next.js is used as the fullstack framework (pages/app router for UI, API routes for backend)
- Database is PostgreSQL, managed via Prisma, hosted on Railway
- Styling uses Tailwind CSS

---

## Phases

---

### Phase 1 — Project Foundation & Database Setup

**Goal:** Establish the project structure, configure tooling, and connect to the database.

#### Tasks

1. Define the initial Prisma schema (see Data Model below)
2. Run the first migration to create the database tables
3. Seed the database with one test entry to verify connectivity

#### Data Model (Prisma Schema)

```prisma
model EnergyEntry {
  id              Int      @id @default(autoincrement())
  createdAt       DateTime @default(now())
  mentalEnergy    Int      // 1–10, excluding 7
  mentalNote      String?
  physicalEnergy  Int      // 1–10, excluding 7
  physicalNote    String?
}
```

#### Acceptance Criteria

- [ ] `npx prisma migrate dev` runs without errors
- [ ] A test entry can be inserted and queried from the Railway database
- [ ] `DATABASE_URL` is the only required environment variable to get the app running locally

---

### Phase 2 — API Layer

**Goal:** Build the Next.js API routes that handle reading and writing energy entries.

#### Endpoints

| Method | Route                | Description                                    |
| ------ | -------------------- | ---------------------------------------------- |
| `POST` | `/api/entries`       | Create a new energy entry                      |
| `GET`  | `/api/entries`       | Return all entries, ordered by date descending |
| `GET`  | `/api/entries/today` | Return today's entry if one exists             |

#### POST `/api/entries` — Request Body

```json
{
  "mentalEnergy": 8,
  "mentalNote": "Felt focused after a good sleep",
  "physicalEnergy": 5,
  "physicalNote": ""
}
```

#### Validation Rules

- `mentalEnergy` and `physicalEnergy` are required integers
- Both must be in the set `[1, 2, 3, 4, 5, 6, 8, 9, 10]` (7 is rejected)
- Notes are optional strings; empty strings are stored as `null`

#### Acceptance Criteria

- [ ] `POST /api/entries` with a valid body returns `201` and the created entry
- [ ] `POST /api/entries` with a score of `7` returns `400` with a descriptive error message
- [ ] `POST /api/entries` with missing required fields returns `400`
- [ ] `GET /api/entries` returns an array of all entries
- [ ] `GET /api/entries/today` returns the entry for today, or `null` if none exists

---

### Phase 3 — Entry UI (Daily Check-In)

**Goal:** Build the main check-in page where the user logs their daily energy scores.

#### Page: `/` (Home)

The home page serves as the daily check-in screen. It displays both prompts and allows the user to submit an entry.

#### UI Components

**Energy Selector**  
A row of buttons representing the values `1–6` and `8–10`. The value `7` is never rendered. The selected value is highlighted. Each button should be clearly tappable on mobile.

**Check-In Form**

- Heading: _"How is my mental energy?"_
  - Energy selector (1–6, 8–10)
  - Optional text area: _"Add a note (optional)"_
- Heading: _"How is my physical energy?"_
  - Energy selector (1–6, 8–10)
  - Optional text area: _"Add a note (optional)"_
- Submit button: _"Log today's energy"_

#### Behaviour

- If an entry already exists for today, the form is replaced with a confirmation message showing today's logged scores and notes
- On successful submission, the page updates to show the confirmation state without a full reload
- If the API returns an error, a user-friendly error message is displayed inline

#### Acceptance Criteria

- [ ] Both energy selectors render values 1–6 and 8–10; 7 is absent
- [ ] A value must be selected for both prompts before the form can be submitted
- [ ] Submitting a valid form creates an entry and transitions the UI to a confirmation view
- [ ] If today's entry already exists on page load, the form is not shown
- [ ] The page is usable and readable on mobile screen sizes

---

### Phase 4 — History View

**Goal:** Allow the user to review past entries.

#### Page: `/history`

Displays a list of all past energy entries in reverse chronological order.

#### UI

- Each entry shows:
  - Date (formatted, e.g. _Monday 17 March 2026_)
  - Mental energy score and note (if present)
  - Physical energy score and note (if present)
- A simple colour or visual indicator for high (8–10) and low (1–3) scores is recommended but not required
- A link from the home page to the history page

#### Acceptance Criteria

- [ ] All entries are displayed, most recent first
- [ ] Entries with notes show the note text beneath the score
- [ ] Entries without notes do not show an empty note field
- [ ] The history page is navigable from the home page

---

### Phase 5 — Polish & Hardening

**Goal:** Improve the overall quality and reliability of the application before considering the multi-user phase.

#### Tasks

1. Add basic loading and error states to all data-fetching operations
2. Validate all API inputs server-side (reject unexpected fields, sanitise strings)
3. Add a `favicon` and page `<title>` metadata
4. Ensure the app works correctly with JavaScript disabled for the core read path (SSR)
5. Review Tailwind styles for consistency (spacing, typography, colour palette)
6. Add a `README.md` with setup instructions for running the project locally

#### Acceptance Criteria

- [ ] Loading spinners or skeleton states are shown while data is being fetched
- [ ] All API routes return consistent error shapes `{ error: string }`
- [ ] The app has a title and favicon
- [ ] `README.md` documents how to clone, install, configure, and run the project

---

## Future Phase — Multi-User Support

> This phase is out of scope for the initial release. The following notes capture the intent so the Phase 1–5 codebase can be built in a way that does not make this harder.

#### Planned Changes

- Add a `User` model to the Prisma schema
- Add a `userId` foreign key to `EnergyEntry`
- Introduce authentication (e.g. NextAuth.js with email magic link or OAuth)
- Scope all API queries to the authenticated user
- Add a registration / login flow

#### Design Considerations for Current Phases

- Avoid hardcoding any assumption that there is only one user in the business logic layer
- Keep API route handlers thin — move Prisma queries into a `lib/db.ts` service layer so they are easy to extend with a `userId` parameter later
- Do not store user-identifying data in the schema that would conflict with a future `User` model

---

## Suggested Project Structure

```
/
├── app/
│   ├── page.tsx               # Daily check-in
│   ├── history/
│   │   └── page.tsx           # History view
│   └── api/
│       └── entries/
│           ├── route.ts        # GET all, POST new
│           └── today/
│               └── route.ts   # GET today's entry
├── components/
│   ├── EnergySelector.tsx
│   ├── CheckInForm.tsx
│   └── EntryCard.tsx
├── lib/
│   └── db.ts                  # Prisma query functions
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env.example
└── README.md
```

---

## Out of Scope (v1)

- User authentication and accounts
- Data export or reporting
- Push notifications or reminders
- Charts or trend visualisations (may be added as a Phase 6)
- Native mobile app
