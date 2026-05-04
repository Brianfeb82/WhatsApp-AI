# Development Roadmap

## Week 1 - Foundation

- Monorepo setup with npm workspaces, TypeScript, and shared config
- Prisma schema plus Supabase/PostgreSQL connection
- Basic Express server with health endpoint
- Logger setup with Winston
- `.env.example` and environment validation

## Week 2 - WhatsApp

- Baileys integration with QR scan
- Message receive flow
- Incoming message persistence
- Basic echo or diagnostic reply
- Confirm the full loop works end to end

## Week 3 - AI Pipeline

- Groq provider integration
- Intent detector
- Knowledge retriever with keyword scoring
- Full pipeline: message -> intent -> context -> Groq -> reply
- Test with real WhatsApp messages

## Week 4 - Handoff + Admin API

- Handoff detector and `HUMAN_TAKEOVER` state
- REST API endpoints for conversations and FAQ CRUD
- Clerk auth middleware on admin routes
- Postman or Thunder Client collection for endpoints

## Week 5 - Dashboard

- Next.js plus Clerk setup
- Conversation list page with status filters
- Conversation detail with message thread
- FAQ manager to create, edit, delete, and toggle entries
- AI on/off toggle per business

## Week 6 - Polish + Deploy

- Analytics page for message count, handoff rate, and top FAQs
- Deploy API to Railway and web to Vercel
- Seed script with demo data
- Full README and docs
- Demo video or GIF
