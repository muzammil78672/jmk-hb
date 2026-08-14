import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

const applications = [
  {
    title: 'Incense & Agarbatti',
    text: 'Powders, chips and related materials for incense-stick and cone manufacturing in domestic and export supply chains.',
  },
  {
    title: 'Ritual Offerings (Pooja Samagri)',
    text: 'Sandalwood chips and related forms used in traditional Hindu ritual offerings and temple supply.',
  },
  {
    title: 'Ceremonial Fire (Hawan)',
    text: 'Scented pieces prepared for hawan — ceremonial fire offerings used in homes and places of worship.',
  },
  {
    title: 'Oil Extraction & Perfumery',
    text: 'Sandalwood heartwood for oil extraction and fragrance compounding.',
  },
  {
    title: 'Handicrafts',
    text: 'Sandalwood chips for artisans, decorative packing and craft applications.',
  },
  {
    title: 'Fragrance & Personal Care',
    text: 'Selected powders and aromatic materials for cosmetics, wellness and fragrance formulations, subject to grade and specification.',
  },
]

export default function Applications() {
  return (
    <>
      <PageHero
        crumb="Applications"
        title="Applications"
        description="How our sandalwood and incense materials are used across manufacturing, ritual supply and fragrance industries."
      />

      <section>
        <div className="container">
          <div className="section-head" data-reveal>
            <div className="eyebrow">End Uses</div>
            <h2>Traditional craft, modern industry</h2>
            <p>
              Indian ritual terms are listed with plain-English explanations so buyers in
              India and overseas can match materials to their market.
            </p>
          </div>
          <div className="app-grid">
            {applications.map((a) => (
              <div className="app-card" data-reveal key={a.title}>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link className="btn dark" to="/contact">
              Discuss Your Application
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
