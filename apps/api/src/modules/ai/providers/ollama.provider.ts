import type { AIProvider, GenerateInput } from '../../../types'

export class OllamaProvider implements AIProvider {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.OLLAMA_URL ?? 'http://localhost:11434'
  }

  async generate(input: GenerateInput): Promise<string> {
    const systemMessage = input.messages.find(m => m.role === 'system')?.content ?? ''
    const userMessages = input.messages.filter(m => m.role !== 'system')

    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: input.model ?? 'llama3.2',
        stream: false,
        system: systemMessage,
        messages: userMessages
      })
    })

    const data = await response.json()
    return data.message?.content ?? ''
  }
}
