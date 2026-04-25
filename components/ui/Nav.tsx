'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/witness',  label: 'Witness'  },
  { href: '/akademy',  label: 'Akademy'  },
  { href: '/preserve', label: 'Preserve' },
  { href: '/sustain',  label: 'Sustain'  },
  { href: '/about',    label: 'About'    },
]

export default function Nav() {
  const pathname = usePathname()
  return (
    <nav className="nav" aria-label="Primary">
      <Link href="/" className="wordmark" aria-label="Artefakt Foundation home">
        arte<span className="splice" aria-hidden="true" />fakt
      </Link>
      <div className="nav-links">
        {links.map(({ href, label }) => (
          <Link key={href} href={href} className={pathname.startsWith(href) ? 'active' : ''}>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
