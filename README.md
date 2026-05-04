

https://github.com/user-attachments/assets/675a432a-d1a1-4f5e-b681-a8261fc50be8

# WhatsApp AI Automation

WhatsApp AI Automation is a portfolio-grade customer service assistant for WhatsApp. It combines a Baileys WhatsApp client, an Express API, a Prisma/PostgreSQL data layer, Groq LLM responses, and a Next.js dashboard shell.

> Status: active MVP. The backend message loop, AI pipeline, Prisma schema, seed data, and dashboard foundation are implemented. Some admin dashboard features are still planned.

## Features

- WhatsApp message ingestion with Baileys QR login
- AI responses through Groq Llama models
- RAG-lite FAQ retrieval from PostgreSQL
- Human handoff detection with configurable keywords
- Conversation and message persistence with Prisma
- Multi-business data model foundation
- Next.js dashboard foundation with Clerk authentication

## Tech Stack

| Layer | Technology |
| --- | --- |
| API | Node.js, Express, TypeScript |
| WhatsApp | Baileys |
| AI | Groq SDK, Llama 3.1 |
| Database | PostgreSQL, Supabase, Prisma |
| Web | Next.js 14, Tailwind CSS, Clerk |
| Quality | Node test runner, TypeScript, GitHub Actions |

## Repository Structure

```text
apps/
  api/        Express API, WhatsApp client, AI pipeline, Prisma schema
  web/        Next.js dashboard
packages/
  shared-types/
docs/         Architecture notes, roadmap, interview explanations
```

## Prerequisites

- Node.js 18 or newer
- PostgreSQL database, local or Supabase
- Groq API key
- WhatsApp account for QR pairing

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Fill the required values:

```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/whatsapp_ai"
GROQ_API_KEY="your_groq_key_here"
```

4. Generate Prisma Client:

```bash
npm run prisma:generate
```

5. Apply your database schema and seed demo data:

```bash
npm run seed
```

6. Start the API:

```bash
npm run dev --workspace=@wa-automation/api
```

7. Scan the QR code shown in the terminal to connect WhatsApp.

8. Start the web dashboard in another terminal:

```bash
npm run dev --workspace=@wa-automation/web
```

## Demo Data

The seed script creates:

- A default demo business with ID `default`
- AI settings for Groq
- FAQ examples for opening hours, location, and menu recommendations
- A sample conversation with inbound and outbound messages

This matches the current API code path, which uses `businessId = "default"` for incoming WhatsApp messages.

## Useful Commands

```bash
npm run typecheck
npm test
npm run build
npm run prisma:generate
npm run seed
```

## Security Notes

Do not commit `.env`, WhatsApp session folders, QR screenshots, phone numbers, or real customer conversations.

Baileys stores WhatsApp credentials locally. This repo ignores `.wa-auth/`, `auth/`, and `auth_info_baileys/`. If a session file was committed before, remove it from Git tracking and reconnect WhatsApp to generate a fresh session.

## Roadmap

- Admin API endpoints for conversation and FAQ management
- Dashboard integration with live API data
- FAQ CRUD UI
- Analytics for message volume, handoff rate, and FAQ usage
- Queue-based message processing for production workloads
- Optional pgvector retrieval for larger knowledge bases
- Deployment guide for Railway, Vercel, and Supabase

## License

MIT
