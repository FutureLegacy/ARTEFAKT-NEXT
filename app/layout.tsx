import type { Metadata } from 'next'
import '../styles/globals.css'
import Nav from '@/components/ui/Nav'
import MetaBar from '@/components/ui/MetaBar'

export const metadata: Metadata = {
  title: {
    default: 'Artefakt Foundation',
    template: '%s — Artefakt Foundation',
  },
  description: 'Artefakt Foundation — independent documentary photography, film, and arts. Calgary · Chicago.',
  metadataBase: new URL('https://artefakt.foundation'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <MetaBar />
      </body>
    </html>
  )
}
