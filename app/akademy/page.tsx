import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Akademy',
  description: 'The Artefakt Akademy — Fellowship, workshops, and the transmission of documentary practice.',
}

const bearingWitness = [
  { name: 'Kiana Hayeri',        dates: 'September 2026' },
  { name: 'Amber Bracken',       dates: 'Winter 2026–27' },
  { name: 'Kitra Cahana',        dates: 'Spring 2027'    },
  { name: 'Carlos Javier Ortiz', dates: 'Summer 2027'    },
  { name: 'Darcy Padilla',       dates: 'Fall 2027'      },
]

export default function AkademyPage() {
  return (
    <>
      <section className="panel panel--paper" id="masthead">
        <div className="masthead">
          <div className="top-meta">
            <span>Pillar 02 / 04</span>
            <span>Akademy</span>
            <span>Fellowship · Workshops · Practice</span>
          </div>
          <div className="main">
            <h1 className="display">Education, Fellowship, <em>Practice.</em></h1>
            <p className="lede">The Akademy is where documentary practice is taught, challenged, and passed forward. It houses all of Artefakt's workshops, masterclasses, and fellowship programs — built on a single conviction that the photograph is a document, and that the person who makes it is responsible for what it says.</p>
          </div>
          <div className="bottom-meta">
            <span>Scroll ↓</span>
            <span>05 Panels</span>
            <span>01 / 06</span>
          </div>
        </div>
      </section>

      <section className="panel" aria-labelledby="panel-bearing-witness">
        <Image src="/images/zurich-workshop-01.jpg" alt="Documentary photography workshop in progress." fill className="panel-image" priority />
        <div className="overlay overlay--meta">
          <span className="pillar-code">AKD · 01</span>
          <span className="rule" aria-hidden="true" />
          <span>Bearing Witness</span>
        </div>
        <div className="overlay overlay--content">
          <span className="label">Masterclass Series</span>
          <h2 id="panel-bearing-witness">Taught by practitioners who <em>stayed.</em></h2>
          <p className="body">Bearing Witness brings the world's leading documentary photographers to Calgary and Chicago for intensive masterclasses. Working conversations with practitioners who have spent years inside the stories they tell.</p>
        </div>
        <div className="overlay overlay--stamp"><div>AKD / 01</div><div>Ongoing · Both Cities</div></div>
      </section>

      <section className="panel panel--paper">
        <div className="masthead">
          <div className="top-meta">
            <span>Bearing Witness</span>
            <span>Masterclass Series</span>
            <span>03 / 06</span>
          </div>
          <div className="main" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--graphite)', marginBottom: 32 }}>2026–2027 Season</p>
            <ul className="artist-list">
              {bearingWitness.map(a => (
                <li key={a.name} className="artist-list-item">
                  <span className="artist-name">{a.name}</span>
                  <span className="artist-dates">{a.dates}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bottom-meta"><span>Calgary · Chicago</span><span>Documentary Masterclasses</span></div>
        </div>
      </section>

      <section className="panel panel--canal">
        <div className="masthead">
          <div className="top-meta" style={{ color: 'var(--dust)' }}>
            <span>The Artefakt Fellowship</span>
            <span>Inaugural Year</span>
            <span>04 / 06</span>
          </div>
          <div className="main">
            <h2 className="display">The work and the commitment <em>are the criteria.</em></h2>
            <p className="lede">Two Fellowship programs in the inaugural year — staggered so each cohort receives the full attention of the organization. The Documentary Fellowship opens Fall 2026. The Sustainability Documentary/Arts Fellowship follows Spring/Summer 2027. Each accepts two fellows. No formal education requirement.</p>
          </div>
          <div className="bottom-meta" style={{ color: 'var(--graphite)' }}>
            <span>Open Call · Summer 2026</span>
            <span>2 positions available</span>
            <span>12 months · Calgary + Chicago</span>
          </div>
        </div>
      </section>

      <section className="panel" aria-labelledby="panel-fellowship-photo">
        <Image src="/images/witness-01.jpg" alt="Documentary practice — long-form work in progress." fill className="panel-image" />
        <div className="overlay overlay--meta">
          <span className="pillar-code">AKD · 02</span>
          <span className="rule" aria-hidden="true" />
          <span>Fellowship</span>
        </div>
        <div className="overlay overlay--content">
          <span className="label">Open Call — Summer 2026</span>
          <h2 id="panel-fellowship-photo">A committed working <em>relationship.</em></h2>
          <p className="body">Fellows arrive with a project in progress and leave with it materially advanced — photographically, editorially, and ethically. Fellows present their work publicly at the close of the fellowship year.</p>
          <p className="caption">→ <a href="mailto:jon@artefakt.foundation">Write to register interest</a></p>
        </div>
        <div className="overlay overlay--stamp"><div>AKD / 02</div><div>Applications Open · Summer 2026</div></div>
      </section>

      <section className="panel panel--colophon" id="colophon">
        <div className="colophon-grid">
          <div className="col-head"><span>Akademy · Pillar 02 / 04</span><span>06 / 06</span></div>
          <div className="col-block">
            <h3>Fellowship Inquiry</h3>
            <p>The Documentary Fellowship open call launches Summer 2026. To register interest ahead of the open call, write to <a href="mailto:jon@artefakt.foundation">jon@artefakt.foundation</a>.</p>
            <p style={{ marginTop: 12 }}><Link href="/">← Back to Foundation</Link></p>
          </div>
          <div className="col-block">
            <h3>Bearing Witness</h3>
            <p>For workshop registration, press inquiries, or institutional partnerships related to the Bearing Witness masterclass series, contact <a href="mailto:jon@artefakt.foundation">jon@artefakt.foundation</a>.</p>
          </div>
          <div className="col-foot">
            <span>Active programming in Calgary and Chicago.</span>
            <span>artefakt.foundation/akademy</span>
            <span>© 2026</span>
          </div>
        </div>
      </section>
    </>
  )
}
