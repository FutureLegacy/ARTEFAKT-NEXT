import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ContactForm from '@/components/ui/ContactForm'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Artefakt Foundation — built from inside documentary practice by Jon Lowenstein.',
}

export default function AboutPage() {
  return (
    <>
      <section className="panel panel--paper" id="masthead">
        <div className="masthead">
          <div className="top-meta"><span>About</span><span>Artefakt Foundation</span><span>Est. 2026</span></div>
          <div className="main">
            <h1 className="display">Documentary, <em>from inside the practice.</em></h1>
            <p className="lede">Artefakt is an independent documentary photography, film, and arts organization based in Calgary (Treaty 7 Territory) and Chicago. Built from inside documentary practice rather than alongside it — the archive, the relationships, thirty years of earned access are the institution's foundation.</p>
          </div>
          <div className="bottom-meta"><span>Scroll ↓</span><span>05 Panels</span><span>01 / 06</span></div>
        </div>
      </section>
      <section className="panel">
        <Image src="/images/chicago-hat-figure.jpg" alt="Figure against the Chicago skyline — South Side documentary practice." fill className="panel-image" priority />
        <div className="overlay overlay--meta"><span className="pillar-code">ABT · 01</span><span className="rule" aria-hidden="true" /><span>Chicago</span></div>
        <div className="overlay overlay--content">
          <span className="label">Since 2001</span>
          <h2>Chicago, <em>continuously.</em></h2>
          <p className="body">The work that seeded Artefakt has been made on Chicago's South Side since 2001 — long-form documentary practice held in place through three economic cycles, a pandemic, and the gradual transformation of the neighbourhoods themselves.</p>
        </div>
        <div className="overlay overlay--stamp"><div>ABT / 01</div><div>South Side · Chicago</div></div>
      </section>
      <section className="panel panel--canal">
        <div className="masthead">
          <div className="top-meta" style={{ color: 'var(--dust)' }}><span>Founder</span><span>Jon Lowenstein</span><span>03 / 06</span></div>
          <div className="main">
            <h2 className="display">Thirty years. <em>The same communities.</em></h2>
            <p className="lede">Jon Lowenstein is a documentary photographer, filmmaker, and visual artist with thirty years of practice rooted in Chicago's South Side. Guggenheim Fellow. National Geographic Explorer. TED Senior Fellow. Founding member of NOOR Images.</p>
            <p className="lede" style={{ marginTop: 16 }}>Artefakt is not built alongside his practice. It is built from inside it.</p>
          </div>
          <div className="bottom-meta" style={{ color: 'var(--graphite)' }}><span>Calgary · Treaty 7 Territory</span><span>Chicago · South Side</span></div>
        </div>
      </section>
      <section className="panel">
        <Image src="/images/calgary-gallery.jpg" alt="The Artefakt Foundation gallery — 1,800 sq ft, Calgary." fill className="panel-image" />
        <div className="overlay overlay--meta"><span className="pillar-code">ABT · 02</span><span className="rule" aria-hidden="true" /><span>Calgary</span></div>
        <div className="overlay overlay--content">
          <span className="label">4525 Monterey Ave NW · Treaty 7 Territory</span>
          <h2>The gallery, <em>in build.</em></h2>
          <p className="body">1,800 sq ft. 14-ft ceilings. Raw concrete floors. Artefakt's Calgary home is under build-out as a functioning gallery and studio space — the physical address of the archive, the Sustain operation, and the programming.</p>
        </div>
        <div className="overlay overlay--stamp"><div>ABT / 02</div><div>Calgary · In Build · 2026</div></div>
      </section>
      <section className="panel panel--colophon" id="colophon">
        <div className="colophon-grid">
          <div className="col-head"><span>About · Artefakt Foundation</span><span>06 / 06</span></div>
          <div className="col-block">
            <h3>Press &amp; Partnerships</h3>
            <p>For press inquiries, partnership proposals, or programming discussions, contact <a href="mailto:jon@artefakt.foundation">jon@artefakt.foundation</a>.</p>
            <p style={{ marginTop: 12 }}>Artefakt Foundation is an Alberta Society.</p>
            <p style={{ marginTop: 12 }}><Link href="/">← Foundation home</Link></p>
          </div>
          <div className="col-block">
            <h3>Get in Touch</h3>
            <ContactForm source="about" />
          </div>
          <div className="col-foot"><span>Active programming in Calgary and Chicago.</span><span>artefakt.foundation/about</span><span>© 2026</span></div>
        </div>
      </section>
    </>
  )
}

