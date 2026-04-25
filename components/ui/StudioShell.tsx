'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

const NAV = [
  { href: '/studio/dashboard',   label: 'Dashboard',   code: '00' },
  { href: '/studio/pages',       label: 'Pages',       code: '01' },
  { href: '/studio/exhibitions', label: 'Exhibitions', code: '02' },
  { href: '/studio/images',      label: 'Images',      code: '03' },
  { href: '/studio/inbox',       label: 'Inbox',       code: '04' },
  { href: '/studio/subscribers', label: 'Subscribers', code: '05' },
]

export default function StudioShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('artefakt-studio-auth') !== 'true') {
      router.replace('/studio')
    } else {
      setAuthed(true)
    }
  }, [router])

  function logout() {
    sessionStorage.removeItem('artefakt-studio-auth')
    router.push('/studio')
  }

  if (!authed) return null

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f0d0b', fontFamily: "'IBM Plex Mono', monospace", color: '#f2ede6' }}>
      <aside style={{ width: 220, borderRight: '1px solid #2a2520', display: 'flex', flexDirection: 'column', flexShrink: 0, position: 'sticky', top: 0, height: '100vh' }}>
        <Link href="/studio/dashboard" style={{ padding: '24px 20px 20px', borderBottom: '1px solid #2a2520', fontSize: 12, letterSpacing: '0.06em', color: '#f2ede6', display: 'flex', alignItems: 'center', gap: 2, textDecoration: 'none' }}>
          arte<span style={{ display: 'inline-block', width: 2, height: 12, background: '#c0392b', margin: '0 1px', position: 'relative', top: -1 }} />fakt
          <span style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5a5550', marginLeft: 8 }}>Studio</span>
        </Link>
        <nav style={{ padding: '16px 0', flex: 1 }}>
          <div style={{ fontSize: 8, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#3a3530', padding: '0 20px 8px' }}>Content</div>
          {NAV.map(item => (
            <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 20px', textDecoration: 'none', fontSize: 11, letterSpacing: '0.08em', color: pathname.startsWith(item.href) ? '#f2ede6' : '#5a5550', background: pathname.startsWith(item.href) ? 'rgba(242,237,230,0.05)' : 'transparent', borderLeft: pathname.startsWith(item.href) ? '2px solid #c0392b' : '2px solid transparent' }}>
              <span style={{ fontSize: 9, color: '#3a3530', width: 16 }}>{item.code}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div style={{ padding: '16px 20px', borderTop: '1px solid #2a2520' }}>
          <button onClick={logout} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', background: 'transparent', border: '1px solid #2a2520', color: '#5a5550', padding: '7px 12px', cursor: 'pointer', width: '100%' }}>Sign out</button>
          <a href="/" target="_blank" style={{ display: 'block', fontSize: 9, color: '#3a3530', textDecoration: 'none', marginTop: 10, textAlign: 'center' }}>↗ view site</a>
        </div>
      </aside>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {children}
      </main>
    </div>
  )
}
