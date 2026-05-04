export type Intent = 'FAQ' | 'ORDER' | 'COMPLAINT' | 'GREETING' | 'UNKNOWN'

const INTENT_PATTERNS: Record<Intent, RegExp[]> = {
  GREETING:  [/^(halo|hi|hey|selamat|assalam|pagi|siang|sore|malam)/i],
  COMPLAINT: [/(komplain|masalah|rusak|salah|kecewa|marah|kesal|tidak puas|ga puas)/i],
  FAQ:       [/(jam|buka|tutup|harga|menu|lokasi|alamat|nomor|berapa|apa|gimana|bagaimana)/i],
  ORDER:     [/(pesan|order|beli|mau|minta|booking|reservasi)/i],
  UNKNOWN:   []
}

export class IntentDetector {
  detect(message: string): Intent {
    for (const [intent, patterns] of Object.entries(INTENT_PATTERNS) as [Intent, RegExp[]][]) {
      if (intent === 'UNKNOWN') continue
      if (patterns.some(p => p.test(message))) return intent
    }
    return 'UNKNOWN'
  }
}
