import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Preserve',
  description: 'Artefakt Preserve: the archive. A permanent, publicly accessible record of documentary work.',
}

export default function PreservePage() {
  return (
    <>
      <section className="panel panel--paper" id="masthead">
        <div className="masthead">
          <div className="top-meta">
            <span>Pillar 03 / 04</span>
            <span>Preserve</span>
            <span>The Archive</span>
          </div>
          <div className="main">
            <h1 className="display">What the photograph <em>keeps.</em></h1>
            <p className="lede">Preserve is the permanent Artefakt Archive — a publicly accessible record of documentary photography and film made over decades in Chicago, Calgary, across the Americas, and beyond. The archive is both a reference for researchers and a working collection: all new accessions are catalogued, held with consent, and made accessible to the communities who appear in it.</p>
          </div>
          <div className="bottom-meta">
            <span>Scroll ↓</span>
            <span>05 Panels</span>
            <span>01 / 06</span>
          </div>
        </div>
      </section>

      <section className="panel">
        <Image src="/images/tent-city-01.jpg" alt="Long-term documentary project — encampment, ground level." fill className="panel-image" priority />
        <div className="overlay overlay--meta">
          <span className="pillar-code">PRV · 01</span>
          <span className="rule" aria-hidden="true" />
          <span>Archive</span>
        </div>
        <div className="overlay overlay--content">
          <span className="label">The Artefakt Archive</span>
          <h2>A record held in <em>trust.</em></h2>
          <p className="body">Every frame in the archive is accessioned with the consent of the communities it depicts. Catalogued with care. Held not as property but as responsibility.</p>
        </div>
        <div className="overlay overlay--stamp"><div>PRV / 01</div><div>Permanent · Public Access</div></div>
      </section>

      <section className="panel">
        <Image src="/images/tent-city-02.jpg" alt="Documentary archive — long-form project documentation." fill className="panel-image" />
        <div className="overlay overlay--meta">
          <span className="pillar-code">PRV · 02</span>
          <span className="rule" aria-hidden="true" />
          <span>Archive · Chicago</span>
        </div>
        <div className="overlay overlay--content">
          <span className="label">Thirty Years</span>
          <h2>Chicago, <em>continuously.</em></h2>
          <p className="body">The archive anchors over two decades of documentary work on Chicago's South Side — the longest sustained visual record of a single American neighbourhood's transformation held by any independent documentary institution.</p>
        </div>
        <div className="overlay overlay--stamp"><div>PRV / 02</div><div>Chicago · South Side</div></div>
      </section>

      <section className="panel panel--canal">
        <div className="masthead">
          <div className="top-meta" style={{ color: 'var(--dust)' }}>
            <span>Archive Access</span>
            <span>Researcher Inquiries</span>
            <span>04 / 06</span>
          </div>
          <div className="main">
            <h2 className="display">Open to researchers, <em>by appointment.</em></h2>
            <p className="lede">The Artefakt Archive is publicly accessible by appointment. Researchers, journalists, educators, and community members are welcome to request access. Licensing for editorial and documentary use is available. Write to <a href="mailto:jon@artefakt.foundation" style={{ color: 'var(--warm)', textDecoration: 'none', borderBottom: '1px solid var(--warm)' }}>jon@artefakt.foundation</a> with your research context and the material you are seeking.</p>
          </div>
          <div className="bottom-meta" style={{ color: 'var(--graphite)' }}>
            <span>Calgary · 4525 Monterey Ave NW</span>
            <span>By Appointment</span>
            <span>Research Access Free</span>
          </div>
        </div>
      </section>

      <section className="panel">
        <Image src="/images/witness-04.jpg" alt="Archive material — documentary photography." fill className="panel-image" />
        <div className="overlay overlay--meta">
          <span className="pillar-code">PRV · 03</span>
          <span className="rule" aria-hidden="true" />
          <span>Archive · Americas</span>
        </div>
        <div className="overlay overlay--content">
          <span className="label">The Americas</span>
          <h2>Borders crossed, <em>stories held.</em></h2>
          <p className="body">Beyond Chicago and Calgary, the archive holds documentary work made across Latin America, the Caribbean, and border regions — sustained engagement with communities in motion and transition.</p>
        </div>
        <div className="overlay overlay--stamp"><div>PRV / 03</div><div>The Americas</div></div>
      </section>

      <section className="panel panel--colophon" id="colophon">
        <div className="colophon-grid">
          <div className="col-head"><span>Preserve · Pillar 03 / 04</span><span>06 / 06</span></div>
          <div className="col-block">
            <h3>Archive Access</h3>
            <p>The Artefakt Archive is open to researchers, journalists, and community members by appointment. Access is free. Licensing for editorial, documentary, and educational use is available on request.</p>
            <p style={{ marginTop: 12 }}><a href="mailto:jon@artefakt.foundation">Request access →</a></p>
          </div>
          <div className="col-block">
            <h3>The Archive Platform</h3>
            <p>A searchable, publicly browsable archive catalogue is in development. To be notified when the online archive launches, write to <a href="mailto:jon@artefakt.foundation">jon@artefakt.foundation</a>.</p>
            <p style={{ marginTop: 12 }}><Link href="/">← Back to Foundation</Link></p>
          </div>
          <div className="col-foot">
            <span>4525 Monterey Ave NW · Calgary · Treaty 7 Territory</span>
            <span>artefakt.foundation/preserve</span>
            <span>© 2026</span>
          </div>
        </div>
      </section>
    </>
  )
}
