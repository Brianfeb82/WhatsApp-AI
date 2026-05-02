# 🤖 WhatsApp AI Automation (Portfolio Edition)

> **A production-ready WhatsApp AI Bot for Indonesian Small Businesses (UMKM).**
> Built with Node.js, Next.js, Groq LLM (Llama 3.1), and Supabase.

---

## 🌟 Key Features

- **🧠 Smart AI Responses**: Powered by **Groq (Llama 3.1)** for near-instant replies in natural Indonesian.
- **📚 Knowledge Base (RAG-Lite)**: Automatically retrieves business-specific FAQs from Supabase to provide accurate info.
- **👨‍💼 Human Handoff**: Detects when a customer needs a real human and pauses the bot.
- **🔄 Multi-Business Support**: Built-in multi-tenancy to support multiple businesses on one platform.
- **📊 Real-time Monitoring**: Detailed logging for conversation tracking and AI performance.

---

## 🏗️ Technical Architecture

This isn't just a simple bot. It uses a professional **Service-Oriented Architecture**:

1.  **Incoming Message**: Captured via **Baileys** (WebSocket).
2.  **Intent Detection**: Simple logic to detect keywords and handoff requests.
3.  **Context Retrieval**: Queries **PostgreSQL (Supabase)** via **Prisma** to find relevant business data.
4.  **AI Pipeline**: Combines system prompts + context + conversation history for the Groq API.
5.  **Database Persistence**: Every message and conversation state is saved for the dashboard.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Core** | Node.js, TypeScript, Express |
| **Frontend** | Next.js 14, TailwindCSS (for Dashboard) |
| **Database** | PostgreSQL (Supabase), Prisma ORM |
| **AI Engine** | Groq SDK (Llama 3.1 8B / 70B) |
| **WhatsApp** | Baileys (Multi-device API) |
| **DevOps** | Monorepo structure, Git-safe environment |

---

## 🚀 Setup & Installation

### 1. Prerequisites
- Node.js (v18+)
- Supabase account (Postgres)
- Groq API Key (Free at [console.groq.com](https://console.groq.com))

### 2. Environment Setup
Copy `.env.example` to `.env` and fill in your keys:
```bash
DATABASE_URL="postgresql://postgres.xxx:password@xxx.pooler.supabase.com:6543/postgres?pgbouncer=true"
GROQ_API_KEY="gsk_xxx"
```

### 3. Installation
```bash
npm install
npx prisma generate --schema apps/api/prisma/schema.prisma
```

### 4. Run Development
```bash
npm run dev --workspace=@wa-automation/api
```

---

## 💡 What I Solved (Technical Highlights)

- **Database Synchronization**: Successfully introspected and synchronized a Prisma schema with a live Supabase instance using Direct and Pooler connection ports.
- **State Management**: Implemented conversation status tracking (`BOT_ACTIVE`, `HUMAN_TAKEOVER`) to ensure seamless transitions.
- **Robust AI Pipeline**: Built a resilient pipeline that handles API timeouts and fallback gracefully.
- **Indonesian Localization**: Engineered prompts specifically for high-quality natural Indonesian customer service.

---

## 👤 Author
**[Your Name/GitHub Username]**
- Portfolio: [Your Website]
- LinkedIn: [Your Profile]

---
*Created as a technical demonstration for AI-driven customer automation.*
