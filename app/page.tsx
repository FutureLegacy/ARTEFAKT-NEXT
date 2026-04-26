import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ContactForm from '@/components/ui/ContactForm'
import SubscribeStrip from '@/components/ui/SubscribeStrip'

export const metadata: Metadata = {
  title: 'Artefakt Foundation',
  description: 'Artefakt Foundation — independent documentary photography, film, and arts. Calgary · Chicago.',
}

export default function HomePage() {
  return (
    <>
      <section className="panel panel--paper" id="masthead">
        <div className="masthead">
          <div className="top-meta">
            <span>Artefakt Foundation</span>
            <span>Documentary · Film · Arts</span>
            <span>Calgary · Chicago</span>
          </div>
          <div className="main">
            <h1 className="display">Documentary<br />that <em>stays.</em></h1>
            <p className="lede">Artefakt is an independent documentary photography, film, and arts organization — built from inside the practice, not alongside it. We support the long-form work, teach the craft to the next practitioners, preserve the record, and fund ourselves through an ethical materials-reuse operation. Four pillars. One archive. Two cities.</p>
          </div>
          <div className="bottom-meta">
            <span>Scroll ↓</span>
            <span>04 Pillars</span>
            <span>01 / 06</span>
          </div>
        </div>
      </section>

      <section className="panel" aria-labelledby="home-witness">
        <Image src="/images/witness.jpg" alt="Witness — long-form documentary practice." fill className="panel-image" priority />
        <div className="overlay overlay--meta">
          <span className="pillar-code">01 · WITNESS</span>
          <span className="rule" aria-hidden="true" />
          <span>The photograph always leads</span>
        </div>
        <div className="overlay overlay--content">
          <span className="label">Pillar 01 / 04</span>
          <h2 id="home-witness">Work that <em>earns</em> its access.</h2>
          <p className="body">Long-form documentary practice grounded in community trust and ethical rigor. Years, not weeks. Return visits, not parachute coverage.</p>
          <p className="caption">→ <Link href="/witness">Enter Witness</Link></p>
        </div>
        <div className="overlay overlay--stamp"><div>01 / 04</div><div>Long-Form · Ongoing</div></div>
      </section>

      <section className="panel" aria-labelledby="home-akademy">
        <Image src="/images/connect.jpg" alt="Akademy — fellowship and academy." fill className="panel-image" />
        <div className="overlay overlay--meta">
          <span className="pillar-code">02 · AKADEMY</span>
          <span className="rule" aria-hidden="true" />
          <span>Fellowship · Academy</span>
        </div>
        <div className="overlay overlay--content">
          <span className="label">Pillar 02 / 04</span>
          <h2 id="home-akademy">Teach what you <em>practice.</em></h2>
          <p className="body">Fellowships for emerging documentarians. Masterclasses and lectures — Bearing Witness — taught by Kiana Hayeri, Amber Bracken, Kitra Cahana, Carlos Javier Ortiz, and Darcy Padilla.</p>
          <p className="caption">→ <Link href="/akademy">Enter Akademy</Link></p>
        </div>
        <div className="overlay overlay--stamp"><div>02 / 04</div><div>Spring Intake · Fall Season</div></div>
      </section>

      <section className="panel" aria-labelledby="home-preserve">
        <Image src="/images/legacy.jpg" alt="Preserve — the permanent archive." fill className="panel-image" />
        <div className="overlay overlay--meta">
          <span className="pillar-code">03 · PRESERVE</span>
          <span className="rule" aria-hidden="true" />
          <span>The Archive</span>
        </div>
        <div className="overlay overlay--content">
          <span className="label">Pillar 03 / 04</span>
          <h2 id="home-preserve">What the photograph <em>keeps.</em></h2>
          <p className="body">A permanent, publicly accessible archive of documentary work. Accessioned with consent, catalogued with care.</p>
          <p className="caption">→ <Link href="/preserve">Enter Preserve</Link></p>
        </div>
        <div className="overlay overlay--stamp"><div>03 / 04</div><div>Public · By Appointment</div></div>
      </section>

      <section className="panel" aria-labelledby="home-sustain">
        <Image src="/images/sustain.jpg" alt="Sustain — ethical materials reuse." fill className="panel-image" />
        <div className="overlay overlay--meta">
          <span className="pillar-code">04 · SUSTAIN</span>
          <span className="rule" aria-hidden="true" />
          <span>Materials Reuse · Funding Model</span>
        </div>
        <div className="overlay overlay--content">
          <span className="label">Pillar 04 / 04</span>
          <h2 id="home-sustain">Nothing of value <em>thrown away.</em></h2>
          <p className="body">An ethical materials-reuse and electronics-recycling operation that funds the foundation's programming. Stewardship, not charity.</p>
          <p className="caption">→ <Link href="/sustain">Enter Sustain</Link></p>
        </div>
        <div className="overlay overlay--stamp"><div>04 / 04</div><div>Live · Calgary</div></div>
      </section>

      <section className="panel panel--colophon" id="colophon">
        <div className="colophon-grid">
          <div className="col-head">
            <span>Artefakt Foundation</span>
            <span>06 / 06</span>
          </div>
          <div className="col-block">
            <h3>Founded 2026</h3>
            <p>Founded by Jon Lowenstein — Guggenheim Fellow, National Geographic Explorer, TED Senior Fellow, founding member of NOOR Images. Based in Calgary (Treaty 7 Territory) and Chicago.</p>
            <p style={{ marginTop: 16 }}><Link href="/about">About the Foundation →</Link></p>
            <div style={{ marginTop: 24 }}>
              <h3>Stay in Touch</h3>
              <SubscribeStrip />
            </div>
          </div>
          <div className="col-block">
            <h3>Get in Touch</h3>
            <p>For inquiries regarding programs, archive access, partnerships, press, or donations.</p>
            <ContactForm source="home" />
          </div>
          <div className="col-foot">
            <span>Active programming in Calgary and Chicago.</span>
            <span>artefakt.foundation</span>
            <span>© 2026</span>
          </div>
        </div>
      </section>
    </>
  )
}
