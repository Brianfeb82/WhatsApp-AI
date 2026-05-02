export class HandoffDetector {
  check(message: string, keywords: string[]): boolean {
    const text = message.toLowerCase()
    return keywords.some(k => text.includes(k.toLowerCase()))
  }
}
