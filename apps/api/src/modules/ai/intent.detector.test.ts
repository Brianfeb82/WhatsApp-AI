import assert from 'node:assert/strict'
import test from 'node:test'
import { IntentDetector } from './intent.detector'

test('detects greetings before general FAQ language', () => {
  const detector = new IntentDetector()

  assert.equal(detector.detect('Halo, mau tanya menu'), 'GREETING')
})

test('detects order and complaint intents', () => {
  const detector = new IntentDetector()

  assert.equal(detector.detect('Saya mau pesan kopi susu'), 'ORDER')
  assert.equal(detector.detect('Pesanan saya salah dan saya kecewa'), 'COMPLAINT')
})

test('returns UNKNOWN when no pattern matches', () => {
  const detector = new IntentDetector()

  assert.equal(detector.detect('lorem ipsum dolor'), 'UNKNOWN')
})
