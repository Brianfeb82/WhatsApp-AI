import type { PrismaClient } from '@prisma/client'
import { IntentDetector } from './intent.detector'
import { KnowledgeRetriever } from './knowledge.retriever'
import { GroqProvider } from './providers/groq.provider'
import { HandoffDetector } from '../handoff/handoff.detector'
import { logger } from '../../shared/logger/logger'

interface PipelineInput {
  businessId: string
  customerPhone: string
  message: string
  history: Array<{ role: 'user' | 'assistant'; content: string }>
  settings: {
    systemPrompt: string
    model: string
    temperature: number
    maxTokens: number
    handoffKeywords: string[]
  }
}

type PipelineOutput =
  | { type: 'AI_REPLY'; message: string; confidence: number }
  | { type: 'HANDOFF'; reason: string }
  | { type: 'ERROR'; message: string }

export class AIPipeline {
  private intent = new IntentDetector()
  private handoff = new HandoffDetector()
  private knowledge: KnowledgeRetriever
  private ai = new GroqProvider()

  constructor(db: PrismaClient) {
    this.knowledge = new KnowledgeRetriever(db)
  }

  async process(input: PipelineInput): Promise<PipelineOutput> {
    try {
      const shouldHandoff = this.handoff.check(
        input.message,
        input.settings.handoffKeywords
      )

      if (shouldHandoff) {
        logger.info('Handoff triggered', { phone: input.customerPhone })
        return { type: 'HANDOFF', reason: 'Customer requested human agent' }
      }

      const intent = this.intent.detect(input.message)
      logger.debug('Intent detected', { intent, message: input.message })

      const context = await this.knowledge.retrieve(
        input.businessId,
        input.message
      )

      const systemPrompt = this.buildSystemPrompt(input.settings.systemPrompt, context)
      const reply = await this.ai.generate({
        model: input.settings.model,
        temperature: input.settings.temperature,
        maxTokens: input.settings.maxTokens,
        messages: [
          { role: 'system', content: systemPrompt },
          ...input.history.slice(-6),
          { role: 'user', content: input.message }
        ]
      })

      const confidence = context.length > 0 ? 0.9 : 0.6

      return { type: 'AI_REPLY', message: reply.trim(), confidence }
    } catch (err: any) {
      logger.error('Pipeline error', {
        message: err?.message,
        status: err?.status,
        error: err?.error,
        stack: err?.stack?.slice(0, 300)
      })

      return {
        type: 'AI_REPLY',
        message: 'Maaf, ada gangguan sementara. Silakan coba lagi atau hubungi kami langsung.',
        confidence: 0
      }
    }
  }

  private buildSystemPrompt(base: string, context: Array<{ question: string; answer: string }>) {
    const knowledgeBlock = context.length > 0
      ? `\n\nINFORMASI YANG RELEVAN:\n${context.map((item) => `T: ${item.question}\nJ: ${item.answer}`).join('\n\n')}`
      : ''

    return `${base}${knowledgeBlock}

ATURAN PENTING:
- Jawab hanya berdasarkan informasi di atas
- Jika tidak ada informasi relevan, katakan "Saya tidak punya info tersebut, boleh saya sambungkan ke tim kami?"
- Bahasa Indonesia natural dan ramah, seperti customer service yang baik
- Maksimal 2-3 kalimat per jawaban
- Boleh pakai emoji secukupnya`
  }
}
