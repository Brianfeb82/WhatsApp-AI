import type { PrismaClient } from '@prisma/client'
import { AIPipeline } from '../ai/pipeline'
import { logger } from '../../shared/logger/logger'

export class MessageProcessor {
  private pipeline: AIPipeline

  constructor(
    private db: PrismaClient,
    private sendReply: (to: string, text: string) => Promise<void>
  ) {
    this.pipeline = new AIPipeline(db)
  }

  async process(from: string, text: string) {
    try {
      logger.info('Processing message', { from, text: text.slice(0, 50) })

      // Find or create conversation
      const conversation = await this.db.conversation.upsert({
        where: { customerPhone_businessId: { customerPhone: from, businessId: 'default' } },
        create: {
          customerPhone: from,
          businessId: 'default',
          lastMessageAt: new Date(),
          updatedAt: new Date()
        },
        update: { lastMessageAt: new Date(), updatedAt: new Date() },
        include: { business: { include: { aiSettings: true } } }
      })

      // Save incoming message
      await this.db.message.create({
        data: {
          conversationId: conversation.id,
          direction: 'INBOUND',
          content: text
        }
      })

      // If human has taken over, don't reply
      if (conversation.status === 'HUMAN_TAKEOVER') {
        logger.debug('Skipping AI reply — human takeover active')
        return
      }

      // If AI is disabled for this business, don't reply
      // (Business model no longer has aiEnabled, skip this check)

      // Get recent history for context
      const history = await this.db.message.findMany({
        where: { conversationId: conversation.id },
        orderBy: { createdAt: 'desc' },
        take: 6
      })

      const settings = conversation.business.aiSettings ?? this.defaultSettings()

      // Run through AI pipeline
      const result = await this.pipeline.process({
        businessId: conversation.businessId,
        customerPhone: from,
        message: text,
        history: history.reverse().map((m: any) => ({
          role: m.direction === 'INBOUND' ? 'user' : 'assistant',
          content: m.content
        })),
        settings
      })

      if (result.type === 'HANDOFF') {
        await this.db.conversation.update({
          where: { id: conversation.id },
          data: { status: 'HUMAN_TAKEOVER', updatedAt: new Date() }
        })
        await this.sendReply(from, '👨‍💼 Saya sambungkan ke tim kami ya. Mohon tunggu sebentar!')
        return
      }

      if (result.type === 'AI_REPLY') {
        await this.sendReply(from, result.message)
        await this.db.message.create({
          data: {
            conversationId: conversation.id,
            direction: 'OUTBOUND',
            content: result.message
          }
        })
      }
    } catch (error) {
      logger.error('Error in MessageProcessor', { error: error instanceof Error ? error.message : error, from, text })
    }
  }

  private defaultSettings() {
    return {
      systemPrompt: 'Kamu adalah asisten customer service yang ramah dan helpful.',
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      maxTokens: 256,
      handoffKeywords: ['manusia', 'admin', 'cs', 'komplain']
    }
  }
}
