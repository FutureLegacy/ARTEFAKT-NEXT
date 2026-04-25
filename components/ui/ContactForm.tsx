'use client'
import { useState } from 'react'

export default function ContactForm({ source = 'website' }: { source?: string }) {
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '', inquiry_type: 'general' })

  async function handleSubmit() {
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, page_source: source }),
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) setForm({ name: '', email: '', message: '', inquiry_type: 'general' })
    } catch { setStatus('error') }
  }

  if (status === 'success') return (
    <div className="form-message success">Message received. We'll be in touch.</div>
  )

  return (
    <div className="contact-form">
      <input type="text" placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
      <input type="email" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
      <select value={form.inquiry_type} onChange={e => setForm(f => ({ ...f, inquiry_type: e.target.value }))}>
        <option value="general">General inquiry</option>
        <option value="press">Press</option>
        <option value="archive">Archive access</option>
        <option value="partnership">Partnership</option>
        <option value="fellowship">Fellowship</option>
        <option value="workshop">Workshop / Akademy</option>
        <option value="sustain">Sustain / Materials donation</option>
      </select>
      <textarea placeholder="Message" rows={4} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
      {status === 'error' && <div className="form-message error">Something went wrong. Write directly to jon@artefakt.foundation.</div>}
      <button className="btn-submit" onClick={handleSubmit} disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send →'}
      </button>
    </div>
  )
}
