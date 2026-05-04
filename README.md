

https://github.com/user-attachments/assets/675a432a-d1a1-4f5e-b681-a8261fc50be8

# WhatsApp AI Automation

Professional WhatsApp AI assistant designed for customer service automation. Built with a modern service-oriented architecture using Node.js, Next.js, Groq LLM, and Supabase.

---

## Key Features

- **Smart AI Responses**: Integrated with Groq (Llama 3.1) for high-performance natural language processing.
- **Knowledge Base (RAG-Lite)**: Automated retrieval of business-specific data from PostgreSQL to provide accurate context-aware responses.
- **Human Handoff Detection**: Intelligent intent detection to pause AI responses when human intervention is required.
- **Multi-Tenant Architecture**: Support for multiple business profiles within a single database instance.
- **Persistent Logging**: Comprehensive audit logs for conversation tracking and performance monitoring.

---

## Technical Architecture

The system implements a robust processing pipeline:

1.  **Ingress**: Message capture via Baileys WebSocket implementation.
2.  **Intent Detection**: Analysis of inbound messages for specific triggers and handoff requests.
3.  **Context Retrieval**: Querying business logic and FAQs via Prisma ORM from Supabase.
4.  **AI Pipeline**: Dynamic prompt construction combining system instructions, retrieved context, and conversation history.
5.  **Persistence**: State management for all conversations and messages in PostgreSQL.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Core** | Node.js, TypeScript, Express |
| **Frontend** | Next.js 14, TailwindCSS |
| **Database** | PostgreSQL (Supabase), Prisma ORM |
| **AI Engine** | Groq SDK (Llama 3.1 8B / 70B) |
| **WhatsApp API** | Baileys |

---

## Setup and Installation

### 1. Prerequisites
- Node.js (v18+)
- Supabase account (Postgres)
- Groq API Key

### 2. Environment Configuration
Copy `.env.example` to `.env` and configure your credentials:
```bash
DATABASE_URL="postgresql://postgres.xxx:password@xxx.pooler.supabase.com:6543/postgres?pgbouncer=true"
GROQ_API_KEY="gsk_xxx"
```

### 3. Deployment
```bash
npm install
npx prisma generate --schema apps/api/prisma/schema.prisma
```

### 4. Development Mode
```bash
npm run dev --workspace=@wa-automation/api
```

---

## Technical Highlights

- **Database Synchronization**: Synchronized Prisma schema with a production Supabase instance using connection pooling and direct connection protocols.
- **State Management**: Implemented conversation flow control with defined states (BOT_ACTIVE, HUMAN_TAKEOVER).
- **AI Pipeline Resilience**: Built a fault-tolerant pipeline with graceful degradation and error handling.
- **Indonesian Localization**: Specialized prompt engineering for high-quality natural language output in Bahasa Indonesia.

---

## Author
**Brianfeb82**
- GitHub: [github.com/Brianfeb82](https://github.com/Brianfeb82)

---
*Technical demonstration for AI-driven enterprise automation.*
