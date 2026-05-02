export type Role = 'system' | 'user' | 'assistant';

export interface Message {
  role: Role;
  content: string;
}

export interface GenerateInput {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  messages: Message[];
}

export interface AIProvider {
  generate(input: GenerateInput): Promise<string>;
}
