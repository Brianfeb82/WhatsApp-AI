# Development Roadmap

## Week 1 — Foundation
- Monorepo setup with pnpm, TypeScript, ESLint
- Prisma schema + Supabase connection
- Basic Express server with health endpoint
- Logger setup (winston)
- .env.example and validation

## Week 2 — WhatsApp
- Baileys integration, QR scan, message receive
- Message stored in DB
- Basic echo bot (reply with the same message)
- Confirm the full loop works end-to-end

## Week 3 — AI Pipeline
- Groq provider integration
- Intent detector (keyword-based)
- Knowledge retriever (keyword scoring)
- Full pipeline: message → intent → context → Groq → reply
- Test with real WhatsApp messages

## Week 4 — Handoff + Admin API
- Handoff detector and HUMAN_TAKEOVER state
- REST API endpoints (conversations, FAQ CRUD)
- Clerk auth middleware on admin routes
- Postman/Thunder Client collection for all endpoints

## Week 5 — Dashboard
- Next.js + Clerk setup
- Conversation list page with status filters
- Conversation detail with message thread
- FAQ manager (create, edit, delete, toggle)
- AI on/off toggle per business

## Week 6 — Polish + Deploy
- Analytics page (message count, handoff rate, top FAQs)
- Deploy API to Railway, web to Vercel
- Seed script with demo data
- Write full README and docs
- Record a demo video
