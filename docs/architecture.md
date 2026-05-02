# Architecture Decisions & Interview Points

When discussing this project, highlight these key design decisions:

## 1. Why Groq instead of OpenAI?
Groq gives free inference on open-source models. For a portfolio project, it proves I can evaluate AI infrastructure options, not just copy the obvious choice.

## 2. Why keyword retrieval instead of vector search?
Vector search requires either a paid service or significant infrastructure. Keyword scoring is a legitimate approach for small knowledge bases, and the code is structured so you can swap in pgvector later without changing the pipeline interface. That's the real engineering decision — design for replaceability.

## 3. Why did you separate the API server from the Next.js app?
The WhatsApp webhook needs to receive raw body buffers for signature verification and needs to respond within 200ms before doing any async work. Next.js API routes add overhead and don't give you the same control over middleware ordering. Separation also means you can scale them independently.

## 4. What would you change if this were a real business product?
- Move to Meta official API
- Add pgvector for semantic search
- Add proper multitenancy
- Add a message queue (BullMQ) instead of processing inline
