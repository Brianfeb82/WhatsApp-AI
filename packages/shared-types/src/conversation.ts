export enum ConversationStatus {
  BOT_ACTIVE = 'BOT_ACTIVE',
  BOT_PAUSED = 'BOT_PAUSED',
  HUMAN_TAKEOVER = 'HUMAN_TAKEOVER',
  RESOLVED = 'RESOLVED'
}

export interface Conversation {
  id: string;
  businessId: string;
  customerPhone: string;
  status: ConversationStatus;
  metadata: Record<string, any>;
  lastMessageAt: Date;
  createdAt: Date;
}
