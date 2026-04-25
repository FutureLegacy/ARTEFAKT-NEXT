'use client'
import { usePathname } from 'next/navigation'

const metaByPath: Record<string, { left: string; center: string }> = {
  '/':          { left: 'Calgary · Chicago', center: 'Artefakt Foundation · 2026' },
  '/witness':   { left: 'Calgary · Chicago · The Americas', center: 'Witness — Pillar 01 / 04' },
  '/akademy':   { left: 'Fellowship · Academy', center: 'Akademy — Pillar 02 / 04' },
  '/preserve':  { left: 'Archive · Calgary', center: 'Preserve — Pillar 03 / 04' },
  '/sustain':   { left: 'Materials Reuse · Calgary', center: 'Sustain — Pillar 04 / 04' },
  '/about':     { left: 'Founded 2026', center: 'About' },
}

export default function MetaBar() {
  const pathname = usePathname()
  const meta = metaByPath[pathname] ?? metaByPath['/']
  if (pathname.startsWith('/studio')) return null
  return (
    <div className="meta" aria-hidden="true">
      <span>{meta.left}</span>
      <span>{meta.center}</span>
      <a href="mailto:jon@artefakt.foundation">jon@artefakt.foundation</a>
    </div>
  )
}
