'use client'
import { useEffect, useState } from 'react'
import StudioShell from '@/components/ui/StudioShell'
import { supabase } from '@/lib/supabase'

const TYPE_LABELS: Record<string, string> = {
  general: 'General', press: 'Press', archive: 'Archive access',
  partnership: 'Partnership', fellowship: 'Fellowship',
  workshop: 'Workshop', sustain: 'Sustain / Materials',
}

export default function InboxPage() {
  const [submissions, setSubmissions] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)
  const [filter, setFilter] = useState<'all'|'unread'>('unread')

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false })
    setSubmissions(data ?? [])
  }

  async function select(s: any) {
    setSelected(s)
    if (!s.read) {
      await supabase.from('contact_submissions').update({ read: true }).eq('id', s.id)
      setSubmissions(prev => prev.map(x => x.id === s.id ? { ...x, read: true } : x))
    }
  }

  async function markAllRead() {
    await supabase.from('contact_submissions').update({ read: true }).eq('read', false)
    setSubmissions(prev => prev.map(x => ({ ...x, read: true })))
  }

  const displayed = filter === 'unread' ? submissions.filter(s => !s.read) : submissions
  const unreadCount = submissions.filter(s => !s.read).length

  function mailtoReply(s: any) {
    const subject = encodeURIComponent(`Re: Artefakt inquiry — ${TYPE_LABELS[s.inquiry_type] || s.inquiry_type}`)
    const body = encodeURIComponent(`Hi ${s.name},\n\nThank you for reaching out to Artefakt Foundation.\n\n`)
    return `mailto:${s.email}?subject=${subject}&body=${body}`
  }

  return (
    <StudioShell>
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <div style={{ width: 300, borderRight: '1px solid #2a2520', overflowY: 'auto', flexShrink: 0 }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #2a2520' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 400, color: '#f2ede6' }}>
                Inbox {unreadCount > 0 && <span style={{ color: '#c0392b', fontSize: 14 }}>({unreadCount})</span>}
              </span>
              {unreadCount > 0 && (
                <button onClick={markAllRead} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'transparent', border: '1px solid #2a2520', color: '#5a5550', padding: '4px 8px', cursor: 'pointer' }}>
                  Mark all read
                </button>
              )}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['unread', 'all'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', background: filter === f ? 'rgba(242,237,230,0.08)' : 'transparent', border: `1px solid ${filter === f ? '#5a5550' : '#2a2520'}`, color: filter === f ? '#f2ede6' : '#3a3530', padding: '5px 10px', cursor: 'pointer' }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          {displayed.map(s => (
            <div key={s.id} onClick={() => select(s)} style={{ padding: '12px 20px', cursor: 'pointer', borderBottom: '1px solid #1e1c18', background: selected?.id === s.id ? 'rgba(242,237,230,0.05)' : 'transparent', borderLeft: selected?.id === s.id ? '2px solid #c0392b' : `2px solid ${s.read ? 'transparent' : '#c0392b'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: s.read ? '#5a5550' : '#f2ede6' }}>{s.name}</span>
                {!s.read && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c0392b', display: 'inline-block', marginTop: 3 }} />}
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: '#5a5550', marginBottom: 3 }}>{TYPE_LABELS[s.inquiry_type] || s.inquiry_type}</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: '#3a3530', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.message.slice(0, 60)}{s.message.length > 60 ? '…' : ''}</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, color: '#2a2520', marginTop: 4 }}>{new Date(s.created_at).toLocaleDateString('en-CA')}</div>
            </div>
          ))}
          {displayed.length === 0 && <div style={{ padding: '24px 20px', fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: '#3a3530' }}>{filter === 'unread' ? 'No unread messages.' : 'No messages yet.'}</div>}
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '32px 48px' }}>
          {!selected ? (
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: '#3a3530', marginTop: 40 }}>← Select a message</div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 400, color: '#f2ede6', marginBottom: 4 }}>{selected.name}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: '#5a5550' }}>{selected.email}</div>
                </div>
                <a href={mailtoReply(selected)} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', background: '#c0392b', color: '#f2ede6', padding: '10px 20px', textDecoration: 'none' }}>Reply →</a>
              </div>
              <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, padding: '6px 12px', background: '#1a1814', border: '1px solid #2a2520', color: '#9a9088' }}>{TYPE_LABELS[selected.inquiry_type] || selected.inquiry_type}</div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, padding: '6px 12px', background: '#1a1814', border: '1px solid #2a2520', color: '#3a3530' }}>{new Date(selected.created_at).toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>
              <div style={{ height: 1, background: '#2a2520', marginBottom: 28 }} />
              <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 15, fontWeight: 300, lineHeight: 1.75, color: '#c8b99a', whiteSpace: 'pre-wrap', maxWidth: 640 }}>{selected.message}</div>
            </>
          )}
        </div>
      </div>
    </StudioShell>
  )
}
