import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Witness',
  description: 'Artefakt Witness: long-form documentary photography grounded in community trust and ethical rigor.',
}

const plates = [
  { code: 'WTN · 01', file: 'witness-01.jpg', alt: 'Long-form documentary, Chicago South Side, 2019', location: 'Chicago · South Side', year: '2019' },
  { code: 'WTN · 02', file: 'witness-02.jpg', alt: 'Documentary practice, Chicago, 2018', location: 'Chicago', year: '2018' },
  { code: 'WTN · 03', file: 'witness-03.jpg', alt: 'South Side Chicago, 2017', location: 'Chicago · South Side', year: '2017' },
  { code: 'WTN · 04', file: 'witness-04.jpg', alt: 'Haiti, 2010', location: 'Haiti', year: '2010' },
  { code: 'WTN · 05', file: 'witness-05.jpg', alt: 'Ferguson, Missouri, 2014', location: 'Ferguson · Missouri', year: '2014' },
  { code: 'WTN · 06', file: 'witness-06.jpg', alt: 'The Americas, 2015', location: 'The Americas', year: '2015' },
  { code: 'WTN · 07', file: 'witness-07.jpg', alt: 'Chicago South Side, 2016', location: 'Chicago · South Side', year: '2016' },
  { code: 'WTN · 08', file: 'witness-08.jpg', alt: 'Chicago, 2020', location: 'Chicago', year: '2020' },
  { code: 'WTN · 09', file: 'witness-09.jpg', alt: 'Calgary, 2022', location: 'Calgary', year: '2022' },
  { code: 'WTN · 10', file: 'witness-10.jpg', alt: 'Chicago South Side, 2021', location: 'Chicago · South Side', year: '2021' },
  { code: 'WTN · 11', file: 'witness-11.jpg', alt: 'Calgary · Chicago, 2023', location: 'Calgary · Chicago', year: '2023' },
  { code: 'WTN · 12', file: 'witness-12.jpg', alt: 'The Americas, 2022', location: 'The Americas', year: '2022' },
  { code: 'WTN · 13', file: 'witness-13.jpg', alt: 'Chicago, 2024', location: 'Chicago', year: '2024' },
]

export default function WitnessPage() {
  return (
    <>
      <section className="panel panel--paper" id="masthead">
        <div className="masthead">
          <div className="top-meta">
            <span>Pillar 01 / 04</span>
            <span>Witness</span>
            <span>Long-Form Documentary</span>
          </div>
          <div className="main">
            <h1 className="display">To witness is to <em>stay.</em></h1>
            <p className="lede">Witness is Artefakt's founding pillar — long-form documentary photography and film grounded in community trust, earned access, and ethical rigor. Years rather than weeks. Return visits rather than parachute coverage. The photographs that follow are drawn from a practice that has continued, without interruption, for over two decades across Chicago, Calgary, and the broader Americas.</p>
          </div>
          <div className="bottom-meta">
            <span>Scroll ↓</span>
            <span>{plates.length} Plates</span>
            <span>01 / {plates.length + 1}</span>
          </div>
        </div>
      </section>
      {plates.map((plate, i) => (
        <section key={plate.code} className="panel" aria-label={plate.code}>
          <Image src={`/images/${plate.file}`} alt={plate.alt} fill className="panel-image" priority={i === 0} />
          <div className="plate-code">
            <span>{plate.code}</span>
            <span className="rule" aria-hidden="true" />
          </div>
          <div className="plate-stamp">
            <div>{plate.location}</div>
            <div>{plate.year}</div>
          </div>
        </section>
      ))}
    </>
  )
}
