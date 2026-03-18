# Energy Tracker

A daily check-in app for tracking mental and physical energy levels. Built with Next.js, Prisma, and PostgreSQL. Sign-in via Google OAuth.

## Prerequisites

- Node.js 20+
- PostgreSQL database (e.g. [Railway](https://railway.app))
- Google OAuth credentials ([Google Cloud Console](https://console.developers.google.com/apis/credentials))

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

4. **Set up Google OAuth:**

   - Go to [Google Cloud Console](https://console.developers.google.com/apis/credentials)
   - Create a new OAuth 2.0 Client ID (Application type: Web application)
   - Add `http://localhost:3000` to **Authorized JavaScript origins**
   - Add `http://localhost:3000/api/auth/callback/google` to **Authorized redirect URIs**
   - Copy the Client ID and Client Secret into `.env`

5. **Generate `AUTH_SECRET`:**

```bash
openssl rand -base64 32
```

Copy the output into `.env` as `AUTH_SECRET`.

6. Your `.env` should look like:

```
DATABASE_URL="postgresql://..."

AUTH_SECRET="<generated above>"
AUTH_GOOGLE_ID="<from Google Console>"
AUTH_GOOGLE_SECRET="<from Google Console>"
AUTH_URL="http://localhost:3000"
```

7. Generate the Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate deploy
```

8. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to sign in with Google.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:test` | Test database connectivity |
| `npm run db:studio` | Open Prisma Studio |
