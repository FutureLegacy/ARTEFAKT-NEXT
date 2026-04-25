import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artefakt Studio',
  robots: { index: false, follow: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ margin: 0, padding: 0, minHeight: '100vh', background: '#111' }}>
      {children}
    </div>
  )
}
