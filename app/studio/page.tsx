'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function StudioPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [checking, setChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (sessionStorage.getItem('artefakt-studio-auth') === 'true') {
      router.replace('/studio/dashboard')
    } else {
      setChecking(false)
    }
  }, [router])

  async function handleLogin() {
    setError(false)
    const res = await fetch('/api/studio/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      sessionStorage.setItem('artefakt-studio-auth', 'true')
      router.push('/studio/dashboard')
    } else {
      setError(true)
      setPassword('')
    }
  }

  if (checking) return null

  return (
    <div style={{ minHeight: '100vh', background: '#0f0d0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'IBM Plex Mono', monospace" }}>
      <div style={{ width: 340 }}>
        <div style={{ fontSize: 13, letterSpacing: '0.06em', color: '#f2ede6', marginBottom: 48, display: 'flex', alignItems: 'center', gap: 2 }}>
          arte
          <span style={{ display: 'inline-block', width: 2, height: 13, background: '#c0392b', margin: '0 1px', position: 'relative', top: -1 }} />
          fakt
          <span style={{ color: '#5a5550', marginLeft: 12, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Studio</span>
        </div>
        <div style={{ color: '#9a9088', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 20 }}>Admin Access</div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          autoFocus
          style={{ width: '100%', fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, background: 'rgba(242,237,230,0.05)', border: `1px solid ${error ? '#c0392b' : 'rgba(90,85,80,0.4)'}`, color: '#f2ede6', padding: '12px 14px', outline: 'none', marginBottom: 10 }}
        />
        {error && <div style={{ color: '#e06050', fontSize: 11, marginBottom: 10 }}>Incorrect password.</div>}
        <button
          onClick={handleLogin}
          style={{ width: '100%', fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'transparent', border: '1px solid #c8b99a', color: '#c8b99a', padding: '12px 0', cursor: 'pointer' }}
        >
          Enter Studio →
        </button>
      </div>
    </div>
  )
}
