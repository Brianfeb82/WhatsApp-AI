export enum Direction {
  INBOUND = 'INBOUND',
  OUTBOUND = 'OUTBOUND'
}

export enum ContentType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
  DOCUMENT = 'DOCUMENT'
}

export interface Message {
  id: string;
  conversationId: string;
  direction: Direction;
  content: string;
  contentType: ContentType;
  sentByAI: boolean;
  confidence?: number;
  createdAt: Date;
}
