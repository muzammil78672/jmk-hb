import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { site } from '../data/site'

export default function About() {
  return (
    <>
      <PageHero
        crumb="About Us"
        title={`About ${site.name}`}
        description={`Manufacturers of sandalwood and incense raw materials since ${site.established}, based in Ujjain — serving the Indian domestic market and international buyers.`}
      />

      <section>
        <div className="container two-col">
          <div data-reveal>
            <div className="eyebrow">Who We Are</div>
            <h2>A heritage manufacturer for India and overseas partners.</h2>
            <p>
              {site.name} ({site.division}) manufactures agarbatti (incense) raw
              materials, dhoop and hawan samagri, with a focused sandalwood range —
              powder, pieces, logs, chips and heartwood.
            </p>
            <p>
              We serve Indian manufacturers, traders and wholesalers, and we welcome
              international importers and specialty buyers who need clear product forms
              and dependable commercial communication.
            </p>
          </div>
          <div className="story-card" data-reveal>
            <img
              className="about-logo-card"
              src="/assets/brand/logo-card.png"
              alt={`${site.name} official identity`}
            />
            <div className="eyebrow">Established</div>
            <h2>{site.established}</h2>
            <p>
              More than eight decades of business heritage in Ujjain, Madhya Pradesh,
              India. Reach us at <a href={`mailto:${site.email}`}>{site.email}</a> or{' '}
              {site.phones.map((p) => p.display).join(' / ')}.
            </p>
          </div>
        </div>
      </section>

      <section className="heritage">
        <div className="container">
          <div className="section-head" data-reveal>
            <div className="eyebrow">What We Offer</div>
            <h2>Materials for incense, ritual and fragrance supply chains</h2>
          </div>
          <div className="app-grid">
            <div className="app-card" data-reveal>
              <h3>Sandalwood</h3>
              <p>Powder, pieces, logs, chips and heartwood for processing and trade.</p>
            </div>
            <div className="app-card" data-reveal>
              <h3>Incense Raw Materials</h3>
              <p>Agarbatti powders, scented pieces and wood chips for stick manufacturing.</p>
            </div>
            <div className="app-card" data-reveal>
              <h3>Dhoop &amp; Hawan Samagri</h3>
              <p>Materials for ceremonial smoke offerings, pooja and aromatic ritual use.</p>
            </div>
          </div>
          <div className="section-cta">
            <Link className="btn dark" to="/products">
              Browse Catalogue
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
