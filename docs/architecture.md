# Architecture Decisions & Interview Points

When discussing this project, highlight these key design decisions.

## 1. Why Groq instead of OpenAI?

Groq gives fast hosted inference for open-source models. For a portfolio project, it proves the ability to evaluate AI infrastructure options rather than only defaulting to the most common provider.

## 2. Why keyword retrieval instead of vector search?

Vector search requires either a paid service or additional infrastructure. Keyword scoring is a legitimate approach for small knowledge bases, and the code is structured so pgvector can be added later without changing the pipeline interface. The engineering decision is to design for replaceability.

## 3. Why separate the API server from the Next.js app?

The WhatsApp client is a long-running process that needs stable WebSocket behavior, QR login, reconnection handling, and direct control over async message processing. Keeping it in an Express service makes that runtime clearer and lets the web dashboard scale separately.

## 4. What would change for a production business product?

- Move from Baileys to the official Meta WhatsApp Business Platform
- Add pgvector or another semantic retrieval layer
- Add strict tenant isolation and authorization
- Add a message queue such as BullMQ instead of processing inline
- Add observability, retry policies, and alerting
- Add data retention controls for customer conversations
