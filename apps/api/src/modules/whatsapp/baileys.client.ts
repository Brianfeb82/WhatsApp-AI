import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} from '@whiskeysockets/baileys'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const qrcode = require('qrcode-terminal') as { generate: (qr: string, opts: { small: boolean }) => void }
import { Boom } from '@hapi/boom'
import { logger } from '../../shared/logger/logger'
import path from 'path'

type MessageHandler = (from: string, text: string) => Promise<void>

export class BaileysClient {
  private socket: ReturnType<typeof makeWASocket> | null = null
  private onMessage: MessageHandler

  constructor(onMessage: MessageHandler) {
    this.onMessage = onMessage
  }

  async connect() {
    const authDir = path.join(process.cwd(), '.wa-auth')
    const { state, saveCreds } = await useMultiFileAuthState(authDir)
    const { version } = await fetchLatestBaileysVersion()

    this.socket = makeWASocket({
      version,
      auth: state,
      printQRInTerminal: false,  // We'll handle it manually
      logger: logger.child({ module: 'baileys' }) as any
    })

    this.socket.ev.on('creds.update', saveCreds)

    this.socket.ev.on('connection.update', ({ connection, lastDisconnect, qr }) => {
      if (qr) {
        qrcode.generate(qr, { small: true })
      }
      
      if (connection === 'close') {
        const shouldReconnect =
          (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut

        logger.info('Connection closed', { shouldReconnect })
        if (shouldReconnect) setTimeout(() => this.connect(), 3000)
      }
      if (connection === 'open') {
        logger.info('WhatsApp connected successfully')
      }
    })

    this.socket.ev.on('messages.upsert', async ({ messages, type }) => {
      if (type !== 'notify') return

      for (const msg of messages) {
        const isTest = msg.message?.conversation?.toLowerCase().includes('test')
        if (msg.key.fromMe && !isTest) continue
        
        if (!msg.message) continue

        const from = msg.key.remoteJid!
        const text =
          msg.message.conversation ||
          msg.message.extendedTextMessage?.text ||
          ''

        if (text) {
          await this.onMessage(from, text)
        }
      }
    })
  }

  async sendMessage(to: string, text: string) {
    if (!this.socket) throw new Error('WhatsApp not connected')
    await this.socket.sendMessage(to, { text })
  }
}
