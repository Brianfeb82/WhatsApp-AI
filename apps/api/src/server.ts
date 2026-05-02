import 'dotenv/config'
import express from 'express'
import { BaileysClient } from './modules/whatsapp/baileys.client'
import { MessageProcessor } from './modules/whatsapp/message.processor'
import { db } from './config/database'
import { logger } from './shared/logger/logger'

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

async function bootstrap() {
  try {
    logger.info('Starting WhatsApp AI Assistant API...')

    // 1. Initialize WhatsApp Client
    // We pass a dummy handler initially, then update it once processor is ready
    let processor: MessageProcessor;
    
    const waClient = new BaileysClient(async (from, text) => {
      if (processor) {
        await processor.process(from, text)
      }
    })

    // 2. Initialize Message Processor
    processor = new MessageProcessor(db, async (to, text) => {
      await waClient.sendMessage(to, text)
    })

    // 3. Connect to WhatsApp
    await waClient.connect()

    // 4. Start Express Server
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`)
      logger.info(`Health check available at http://localhost:${PORT}/health`)
    })

  } catch (error) {
    logger.error('Failed to start application', { error })
    process.exit(1)
  }
}

bootstrap()
