import type { PrismaClient } from '@prisma/client'

export class KnowledgeRetriever {
  constructor(private db: PrismaClient) {}

  async retrieve(businessId: string, query: string, limit = 3) {
    const queryWords = query.toLowerCase().split(/\s+/).filter((w: any) => w.length > 2)

    // Simple keyword overlap scoring — no vector DB needed for MVP
    const faqs = await this.db.fAQ.findMany({
      where: { businessId, isActive: true },
      select: { id: true, question: true, answer: true, keywords: true }
    })

    const scored = faqs
      .map((faq: any) => {
        const text = `${faq.question} ${faq.keywords.join(' ')}`.toLowerCase()
        const score = queryWords.filter((w: any) => text.includes(w)).length
        return { ...faq, score }
      })
      .filter((f: any) => f.score > 0)
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, limit)

    // Track which FAQs are being used
    if (scored.length > 0) {
      await this.db.fAQ.updateMany({
        where: { id: { in: scored.map((f: any) => f.id) } },
        data: { usageCount: { increment: 1 } }
      })
    }

    return scored
  }
}
