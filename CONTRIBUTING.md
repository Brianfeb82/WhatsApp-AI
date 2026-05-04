# Contributing

Thanks for taking a look at this project.

## Local Setup

1. Install Node.js 18 or newer.
2. Copy `.env.example` to `.env`.
3. Fill `DATABASE_URL` and `GROQ_API_KEY`.
4. Install dependencies with `npm install`.
5. Generate Prisma Client:

```bash
npm run prisma:generate
```

6. Seed demo data:

```bash
npm run seed
```

7. Start development servers:

```bash
npm run dev
```

## Before Opening a Pull Request

Run:

```bash
npm run typecheck
npm test
npm run build
```

## Project Standards

- Do not commit secrets, WhatsApp session files, or real customer data.
- Keep changes focused and easy to review.
- Update README or docs when behavior changes.
- Prefer small, testable modules for AI, retrieval, and handoff logic.
