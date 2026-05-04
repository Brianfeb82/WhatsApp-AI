export type Role = 'system' | 'user' | 'assistant'

export interface ChatMessage {
  role: Role
  content: string
}

export interface GenerateInput {
  model?: string
  temperature?: number
  maxTokens?: number
  messages: ChatMessage[]
}

export interface AIProvider {
  generate(input: GenerateInput): Promise<string>
}
