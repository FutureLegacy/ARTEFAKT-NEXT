'use client'
import { useEffect, useState } from 'react'
import StudioShell from '@/components/ui/StudioShell'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  const [stats, setStats] = useState({ submissions: 0, unread: 0, subscribers: 0, images: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [subRes, unreadRes, mailRes, imgRes] = await Promise.all([
        supabase.from('contact_submissions').select('id', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('id', { count: 'exact', head: true }).eq('read', false),
        supabase.from('mailing_list').select('id', { count: 'exact', head: true }).eq('active', true),
        supabase.from('images').select('id', { count: 'exact', head: true }),
      ])
      setStats({ submissions: subRes.count ?? 0, unread: unreadRes.count ?? 0, subscribers: mailRes.count ?? 0, images: imgRes.count ?? 0 })
      setLoading(false)
    }
    load()
  }, [])

  return (
    <StudioShell>
      <div style={{ padding: '40px 48px' }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5a5550', marginBottom: 8 }}>Artefakt Studio</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 400, color: '#f2ede6', marginBottom: 40 }}>Dashboard</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
          {[
            { label: 'Unread messages', num: stats.unread, sub: `${stats.submissions} total` },
            { label: 'Subscribers', num: stats.subscribers, sub: 'mailing list' },
            { label: 'Images', num: stats.images, sub: 'in library' },
            { label: 'Pages', num: 6, sub: 'all published' },
          ].map(c => (
            <div key={c.label} style={{ background: '#1a1814', border: '1px solid #2a2520', padding: '20px 22px' }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5a5550', marginBottom: 8 }}>{c.label}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 400, color: '#f2ede6' }}>{loading ? '—' : c.num}</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: '#3a3530', marginTop: 6 }}>{c.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 16, fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#3a3530' }}>Quick actions</div>
        {[
          { href: '/studio/pages', label: 'Edit pages →' },
          { href: '/studio/images', label: 'Upload images →' },
          { href: '/studio/exhibitions', label: 'Add exhibition →' },
          { href: '/studio/inbox', label: 'View inbox →' },
        ].map(l => (
          <a key={l.href} href={l.href} style={{ display: 'inline-block', fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#c8b99a', textDecoration: 'none', border: '1px solid #3a2e20', padding: '9px 16px', marginRight: 10, marginBottom: 10 }}>
            {l.label}
          </a>
        ))}
      </div>
    </StudioShell>
  )
}
