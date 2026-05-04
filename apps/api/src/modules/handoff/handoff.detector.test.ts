import assert from 'node:assert/strict'
import test from 'node:test'
import { HandoffDetector } from './handoff.detector'

test('matches handoff keywords case-insensitively', () => {
  const detector = new HandoffDetector()

  assert.equal(detector.check('Bisa sambungkan ke Admin?', ['admin', 'cs']), true)
})

test('does not trigger when no keyword matches', () => {
  const detector = new HandoffDetector()

  assert.equal(detector.check('Jam buka hari ini?', ['admin', 'cs']), false)
})
