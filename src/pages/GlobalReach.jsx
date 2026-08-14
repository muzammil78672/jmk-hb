import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { site } from '../data/site'

const enquirySteps = [
  {
    title: 'Market',
    text: 'Tell us if you need domestic supply in India or an international / export enquiry.',
  },
  {
    title: 'Product & grade',
    text: 'Name the item (for example sandalwood powder, chips or heartwood) and any grade or brand preference.',
  },
  {
    title: 'Quantity & packing',
    text: 'Indicate approximate quantity, unit of measure and preferred packing for delivery or shipment.',
  },
  {
    title: 'Location',
    text: 'Share your city and state (India) or destination country so we can advise the next commercial steps.',
  },
]

export default function GlobalReach() {
  return (
    <>
      <PageHero
        crumb="Markets"
        title="Domestic & International Markets"
        description="One product catalogue for buyers in India and for partners overseas — clear forms, clear quantities, clear replies."
      />

      <section className="global">
        <div className="container global-grid">
          <div data-reveal>
            <div className="eyebrow">Two Markets, One Catalogue</div>
            <h2>Built for Indian buyers and international trade partners.</h2>
            <p>
              {site.name} serves the domestic Indian market and welcomes international
              enquiries. Whether you need local supply or materials for overseas use,
              start with the same catalogue and tell us where the goods need to go.
            </p>
            <Link className="btn primary" to="/contact">
              Request a Quote
            </Link>
          </div>
          <div className="stats" data-reveal>
            <div className="stat">
              <strong>{site.established}</strong>
              <span>Established in Ujjain</span>
            </div>
            <div className="stat">
              <strong>India</strong>
              <span>Domestic market focus</span>
            </div>
            <div className="stat">
              <strong>Global</strong>
              <span>International enquiries welcome</span>
            </div>
            <div className="stat">
              <strong>14+</strong>
              <span>Product types in catalogue</span>
            </div>
          </div>
        </div>
      </section>

      <section className="markets-split">
        <div className="container">
          <div className="section-head" data-reveal>
            <div className="eyebrow">How We Serve</div>
            <h2>Domestic supply and international trade</h2>
          </div>
          <div className="markets-grid">
            {site.markets.map((market) => {
              const marketParam = market.title.startsWith('Domestic')
                ? 'domestic'
                : 'international'
              return (
                <div className="market-card" data-reveal key={market.title}>
                  <h3>{market.title}</h3>
                  <p>{market.text}</p>
                  <Link className="btn dark" to={`/contact?market=${marketParam}`}>
                    Enquire for this market
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="regions">
        <div className="container">
          <div className="section-head" data-reveal>
            <div className="eyebrow">Coverage</div>
            <h2>India first — open to partners worldwide</h2>
            <p>
              Domestic buyers across India remain central to our business. International
              partners can enquire from any region; we advise supply options based on
              product, quantity and destination.
            </p>
          </div>
          <div className="regions-grid">
            {site.regions.map((region) => (
              <div className="region-item" data-reveal key={region.title}>
                <h3>{region.title}</h3>
                <p>{region.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="heritage">
        <div className="container">
          <div className="section-head" data-reveal>
            <div className="eyebrow">How To Enquire</div>
            <h2>What helps us respond faster</h2>
            <p>
              The same details help for both markets — product, quantity, location and
              company contact.
            </p>
          </div>
          <div className="app-grid">
            {enquirySteps.map((step) => (
              <div className="app-card" data-reveal key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link className="btn dark" to="/contact">
              Submit Your Requirement
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
