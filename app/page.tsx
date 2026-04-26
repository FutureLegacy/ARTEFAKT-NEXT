import type { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/ui/ContactForm'
import SubscribeStrip from '@/components/ui/SubscribeStrip'

export const metadata: Metadata = {
  title: 'Artefakt Foundation',
  description:
    'Artefakt Foundation — independent documentary photography, film, and arts. Calgary · Chicago.',
}

const pillars = [
  {
    number: '01',
    title: 'Witness',
    label: 'Long-form documentary practice',
    heading: 'The photograph always leads.',
    text: 'Long-form documentary practice grounded in community trust and ethical rigor. Years, not weeks. Return visits, not parachute coverage.',
    href: '/witness',
    image: '/images/witness.jpg',
  },
  {
    number: '02',
    title: 'Akademy',
    label: 'Fellowship · Academy',
    heading: 'Teach what you practice.',
    text: 'Fellowships for emerging documentarians. Masterclasses and lectures rooted in field practice, ethics, and visual authorship.',
    href: '/akademy',
    image: '/images/connect.jpg',
  },
  {
    number: '03',
    title: 'Preserve',
    label: 'The Archive',
    heading: 'What the photograph keeps.',
    text: 'A permanent, publicly accessible archive of documentary work. Accessioned with consent, catalogued with care.',
    href: '/archive',
    image: '/images/legacy.jpg',
  },
  {
    number: '04',
    title: 'Sustain',
    label: 'Materials Reuse · Funding Model',
    heading: 'Nothing of value thrown away.',
    text: 'An ethical materials-reuse and electronics-recycling operation that funds the foundation’s programming. Stewardship, not charity.',
    href: '/sustain',
    image: '/images/sustain.jpg',
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="min-h-screen px-6 py-10 md:px-12 md:py-16">
        <header className="mb-20 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-neutral-400">
          <div>Artefakt Foundation</div>
          <div>Documentary · Film · Arts</div>
          <div>Calgary · Chicago</div>
        </header>

        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-neutral-500">
              Documentary / Archive / Education / Reuse
            </p>
            <h1 className="max-w-5xl text-6xl font-semibold tracking-tight md:text-8xl">
              Documentary that stays.
            </h1>
          </div>

          <p className="max-w-xl text-base leading-7 text-neutral-300 md:text-lg">
            Artefakt is an independent documentary photography, film, and arts
            organization — built from inside the practice, not alongside it. We
            support long-form work, teach the craft, preserve the record, and
            fund ourselves through ethical materials reuse.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10">
        {pillars.map((pillar) => (
          <article
            key={pillar.number}
            className="grid border-b border-white/10 md:grid-cols-2"
          >
            <div className="relative min-h-[360px] md:min-h-[620px]">
              <img
                src={pillar.image}
                alt={`${pillar.title} — ${pillar.label}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="flex min-h-[360px] flex-col justify-between p-6 md:min-h-[620px] md:p-12">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-neutral-500">
                <span>{pillar.number} · {pillar.title}</span>
                <span>{pillar.label}</span>
              </div>

              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.25em] text-neutral-500">
                  Pillar {pillar.number} / 04
                </p>
                <h2 className="mb-6 max-w-xl text-4xl font-semibold tracking-tight md:text-6xl">
                  {pillar.heading}
                </h2>
                <p className="mb-8 max-w-xl text-base leading-7 text-neutral-300">
                  {pillar.text}
                </p>
                <Link
                  href={pillar.href}
                  className="inline-block border border-white/30 px-5 py-3 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
                >
                  Enter {pillar.title}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-8 px-6 py-16 md:grid-cols-2 md:px-12">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-neutral-500">
            Founded 2026
          </p>
          <p className="max-w-2xl text-lg leading-8 text-neutral-300">
            Founded by Jon Lowenstein — Guggenheim Fellow, National Geographic
            Explorer, TED Senior Fellow, founding member of NOOR Images. Based
            in Calgary, Treaty 7 Territory, and Chicago.
          </p>
        </div>

        <div>
          <SubscribeStrip />
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-xs uppercase tracking-[0.2em] text-neutral-500 md:px-12">
        Active programming in Calgary and Chicago. Artefakt Foundation © 2026
      </footer>
    </main>
  )
}
