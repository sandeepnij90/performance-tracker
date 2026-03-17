# Energy Tracker

A daily check-in app for tracking mental and physical energy levels. Built with Next.js, Prisma, and PostgreSQL.

## Prerequisites

- Node.js 20+
- PostgreSQL database (e.g. [Railway](https://railway.app))

## Setup

1. Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd performance-tracker
npm install
```

2. Create a `.env` file from the example:

```bash
cp .env.example .env
```

3. Set your `DATABASE_URL` in `.env` pointing to your PostgreSQL instance.

4. Generate the Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

5. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use the app.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:test` | Test database connectivity |
| `npm run db:studio` | Open Prisma Studio |
