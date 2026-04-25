'use client'
import { useState } from 'react'

export default function SubscribeStrip() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle'|'sending'|'done'|'error'>('idle')

  async function handleSubscribe() {
    if (!email || !email.includes('@')) return
    setStatus('sending')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch { setStatus('error') }
  }

  if (status === 'done') return (
    <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--warm)', marginTop: 8 }}>
      You're on the list.
    </p>
  )

  return (
    <div className="subscribe-strip">
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
      />
      <button onClick={handleSubscribe} disabled={status === 'sending'}>
        {status === 'sending' ? '…' : 'Subscribe'}
      </button>
    </div>
  )
}
