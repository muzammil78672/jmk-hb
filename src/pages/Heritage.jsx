import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { site } from '../data/site'

export default function Heritage() {
  return (
    <>
      <PageHero
        crumb="Heritage"
        title={`Our Heritage Since ${site.established}`}
        description={`${site.name} has grown from a Ujjain sandalwood trade identity into a manufacturer serving domestic and international buyers.`}
      />

      <section>
        <div className="container two-col">
          <div data-reveal>
            <div className="eyebrow">{site.established} → Today</div>
            <h2>A name trusted across generations — and across markets.</h2>
            <p>
              The story begins with {site.name} in Ujjain. Today the business also
              operates as {site.division}, manufacturing agarbatti raw materials, dhoop
              and hawan samagri alongside a focused sandalwood range.
            </p>
            <p>
              That continuity matters to partners who value provenance: powder, pieces,
              logs, chips and heartwood supplied with clear naming and lasting commercial
              relationships.
            </p>
          </div>
          <div className="story-card" data-reveal>
            <div className="eyebrow">Our Principle</div>
            <h2>Heritage that travels well.</h2>
            <p>
              We keep the essentials visible — the year, the city, the materials — while
              speaking the language of modern trade: specifications, quantities,
              destinations and timely replies.
            </p>
          </div>
        </div>
      </section>

      <section className="heritage">
        <div className="container">
          <div className="section-head" data-reveal>
            <div className="eyebrow">Our Journey</div>
            <h2>From local trade roots to global buyer conversations</h2>
          </div>
          <div className="timeline">
            <div className="timeline-item" data-reveal>
              <strong>{site.established}</strong>
              <div>
                <h3>Founded in Ujjain</h3>
                <p>
                  Business heritage established in Madhya Pradesh, India — the foundation
                  of our identity in sandalwood and fragrance materials.
                </p>
              </div>
            </div>
            <div className="timeline-item" data-reveal>
              <strong>Today</strong>
              <div>
                <h3>Full commercial catalogue</h3>
                <p>
                  Powder, pieces, logs, chips, heartwood and incense materials organised
                  for manufacturers, wholesalers and importers.
                </p>
              </div>
            </div>
            <div className="timeline-item" data-reveal>
              <strong>Forward</strong>
              <div>
                <h3>Wider market access</h3>
                <p>
                  Product discovery, English-language enquiries and responsive support
                  for partners in India and overseas. See our{' '}
                  <Link to="/global-reach">markets page</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
