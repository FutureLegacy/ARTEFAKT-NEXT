import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ContactForm from '@/components/ui/ContactForm'

export const metadata: Metadata = {
  title: 'Sustain',
  description: 'Artefakt Sustain: ethical materials reuse that funds the foundation.',
}

export default function SustainPage() {
  return (
    <>
      <section className="panel panel--paper" id="masthead">
        <div className="masthead">
          <div className="top-meta"><span>Pillar 04 / 04</span><span>Sustain</span><span>Materials Reuse · Funding Model</span></div>
          <div className="main">
            <h1 className="display">Nothing of value <em>gets thrown away.</em></h1>
            <p className="lede">Sustain is Artefakt's funding engine and its clearest philosophical statement. A working materials-reuse and electronics-recycling operation established at 4525 Monterey Ave NW, Calgary. Revenue funds the Fellowship, the Akademy, and the archive. Nothing of value should be thrown away — materials, memories, communities, or truth.</p>
          </div>
          <div className="bottom-meta"><span>Scroll ↓</span><span>04 Panels</span><span>01 / 05</span></div>
        </div>
      </section>
      <section className="panel">
        <Image src="/images/red-dress-gravel.jpg" alt="Red dress on gravel — what gets left behind." fill className="panel-image" priority />
        <div className="overlay overlay--meta"><span className="pillar-code">SST · 01</span><span className="rule" aria-hidden="true" /><span>What Gets Left</span></div>
        <div className="overlay overlay--content">
          <span className="label">Stewardship</span>
          <h2>Stewardship, <em>not charity.</em></h2>
          <p className="body">Sustain is not a donation drop-off. It is a disciplined operation — IT asset disposal from regional partners, estate-sale acquisitions, end-of-lease cleanouts. Materials are triaged, restored where possible, and resold at fair value. Margins go directly to programming.</p>
        </div>
        <div className="overlay overlay--stamp"><div>SST / 01</div><div>Operations · Live</div></div>
      </section>
      <section className="panel panel--canal">
        <div className="masthead">
          <div className="top-meta" style={{ color: 'var(--dust)' }}><span>Origin</span><span>How It Started</span><span>03 / 05</span></div>
          <div className="main">
            <h2 className="display">Started in a garage. <em>Built into the mission.</em></h2>
            <p className="lede">The recycling practice didn't begin as a funding strategy. It began with a garage, a belief that functional equipment shouldn't landfill, and the discovery that it was financially sustainable and environmentally sound. When Artefakt was founded, that practice became a pillar — the one that pays for the others.</p>
          </div>
          <div className="bottom-meta" style={{ color: 'var(--graphite)' }}><span>Calgary · Treaty 7 Territory</span><span>4525 Monterey Ave NW</span><span>Live · 2026</span></div>
        </div>
      </section>
      <section className="panel">
        <Image src="/images/sustain.jpg" alt="Materials reuse operation." fill className="panel-image" />
        <div className="overlay overlay--meta"><span className="pillar-code">SST · 02</span><span className="rule" aria-hidden="true" /><span>Materials Intake</span></div>
        <div className="overlay overlay--content">
          <span className="label">Donate · Consign · Refer</span>
          <h2>Equipment that still <em>has work to do.</em></h2>
          <p className="body">Artefakt accepts working electronics, vintage audio, designer office furniture, specialty cameras, and professional equipment. Estate sales, office cleanouts, and IT asset disposal welcomed.</p>
          <p className="caption">→ <a href="mailto:jon@artefakt.foundation">Discuss a donation or consignment</a></p>
        </div>
        <div className="overlay overlay--stamp"><div>SST / 02</div><div>Calgary · Intake Open</div></div>
      </section>
      <section className="panel panel--colophon" id="colophon">
        <div className="colophon-grid">
          <div className="col-head"><span>Sustain · Pillar 04 / 04</span><span>05 / 05</span></div>
          <div className="col-block">
            <h3>Donate or Consign</h3>
            <p>To discuss donation, consignment, or referral of materials, contact <a href="mailto:jon@artefakt.foundation">jon@artefakt.foundation</a>. We accept working electronics, vintage audio, professional cameras, and quality office furniture.</p>
            <p style={{ marginTop: 12 }}><Link href="/">← Back to Foundation</Link></p>
          </div>
          <div className="col-block">
            <h3>Get in Touch</h3>
            <ContactForm source="sustain" />
          </div>
          <div className="col-foot"><span>4525 Monterey Ave NW · Calgary · Treaty 7 Territory</span><span>artefakt.foundation/sustain</span><span>© 2026</span></div>
        </div>
      </section>
    </>
  )
}
