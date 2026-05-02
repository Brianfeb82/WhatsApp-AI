import Groq from 'groq-sdk'
import type { AIProvider, GenerateInput } from '../../../types'
import { logger } from '../../../shared/logger/logger'

export class GroqProvider implements AIProvider {
  private client: Groq

  constructor() {
    this.client = new Groq({ apiKey: process.env.GROQ_API_KEY })
  }

  async generate(input: GenerateInput): Promise<string> {
    const model = 'llama-3.1-8b-instant' // force known-good model
    logger.info('Calling Groq API', { model, messageCount: input.messages.length })
    try {
      const response = await this.client.chat.completions.create({
        model,
        temperature: input.temperature ?? 0.7,
        max_tokens: input.maxTokens ?? 256,
        messages: input.messages
      })
      const reply = response.choices[0]?.message?.content ?? ''
      logger.info('Groq API replied', { replyLength: reply.length })
      return reply
    } catch (err: any) {
      logger.error('Groq API FAILED', { 
        message: err?.message, 
        status: err?.status, 
        code: err?.error?.code,
        type: err?.error?.type
      })
      throw err
    }
  }
}
