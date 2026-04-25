'use client'
import { useEffect, useState } from 'react'
import StudioShell from '@/components/ui/StudioShell'
import { supabase } from '@/lib/supabase'

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('mailing_list').select('*').order('created_at', { ascending: false })
    setSubscribers(data ?? [])
    setLoading(false)
  }

  async function toggleActive(id: string, current: boolean) {
    await supabase.from('mailing_list').update({ active: !current }).eq('id', id)
    setSubscribers(prev => prev.map(s => s.id === id ? { ...s, active: !current } : s))
  }

  function exportCSV() {
    const active = subscribers.filter(s => s.active)
    const csv = ['email,source,subscribed'].concat(
      active.map(s => `${s.email},${s.source},${new Date(s.created_at).toLocaleDateString('en-CA')}`)
    ).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `artefakt-subscribers-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const filtered = filter ? subscribers.filter(s => s.email.toLowerCase().includes(filter.toLowerCase())) : subscribers
  const activeCount = subscribers.filter(s => s.active).length

  return (
    <StudioShell>
      <div style={{ padding: '32px 48px', maxWidth: 800 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5a5550', marginBottom: 6 }}>Artefakt Foundation</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, color: '#f2ede6' }}>Mailing List</h1>
          </div>
          <button onClick={exportCSV} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', background: '#c0392b', border: 'none', color: '#f2ede6', padding: '10px 20px', cursor: 'pointer' }}>Export CSV →</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
          {[
            { label: 'Active', value: activeCount },
            { label: 'Total', value: subscribers.length },
            { label: 'Unsubscribed', value: subscribers.length - activeCount },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#1a1814', border: '1px solid #2a2520', padding: '16px 18px' }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#5a5550', marginBottom: 6 }}>{stat.label}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, color: '#f2ede6' }}>{loading ? '—' : stat.value}</div>
            </div>
          ))}
        </div>

        <input placeholder="Filter by email…" value={filter} onChange={e => setFilter(e.target.value)}
          style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, background: 'rgba(242,237,230,0.05)', border: '1px solid #2a2520', color: '#f2ede6', padding: '8px 12px', outline: 'none', width: 280, marginBottom: 16 }} />

        <div style={{ border: '1px solid #2a2520' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 80px 80px', padding: '8px 16px', borderBottom: '1px solid #2a2520', fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3a3530' }}>
            <span>Email</span><span>Subscribed</span><span>Source</span><span>Active</span>
          </div>
          {loading ? (
            <div style={{ padding: '20px 16px', fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: '#3a3530' }}>Loading…</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '20px 16px', fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: '#3a3530' }}>No subscribers yet.</div>
          ) : filtered.map((s: any) => (
            <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 80px 80px', padding: '10px 16px', borderBottom: '1px solid #1e1c18', alignItems: 'center' }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: s.active ? '#f2ede6' : '#3a3530' }}>{s.email}</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: '#5a5550' }}>{new Date(s.created_at).toLocaleDateString('en-CA')}</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: '#3a3530' }}>{s.source}</span>
              <button onClick={() => toggleActive(s.id, s.active)} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'transparent', border: `1px solid ${s.active ? '#2a4030' : '#3a1a16'}`, color: s.active ? '#6aaa70' : '#5a2a28', padding: '3px 8px', cursor: 'pointer' }}>
                {s.active ? 'Active' : 'Off'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </StudioShell>
  )
}
