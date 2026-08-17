import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { products, featuredProductIds } from '../data/products'
import { asset } from '../utils/asset'

const featured = featuredProductIds
  .map((id) => products.find((p) => p.id === id))
  .filter(Boolean)

const applications = [
  {
    title: 'Incense Manufacturing',
    text: 'Powders and chips for agarbatti and incense production in India and abroad.',
  },
  {
    title: 'Ritual & Ceremonial',
    text: 'Pieces, chips and scented materials for pooja, hawan and sacred use.',
  },
  {
    title: 'Perfumery & Fragrance',
    text: 'Heartwood and aromatic materials for oil extraction and fragrance work.',
  },
  {
    title: 'Personal Care',
    text: 'Selected powders for cosmetic and wellness formulations.',
  },
  {
    title: 'Handicrafts & Trade',
    text: 'Chips and wood forms for artisans, packers and specialty traders.',
  },
]

const values = [
  {
    title: 'Heritage Since 1939',
    text: 'Generations of sandalwood and fragrance raw-material trade from Ujjain.',
  },
  {
    title: 'One Clear Catalogue',
    text: 'Powder, pieces, logs, chips, heartwood and incense materials with defined forms and sizes.',
  },
  {
    title: 'Domestic & International',
    text: 'The same team responds to Indian market needs and overseas trade enquiries.',
  },
]

export default function Home() {
  return (
    <>
      <section className="hero hero-bleed">
        <div
          className="hero-bg"
          style={{ backgroundImage: `url('${asset('assets/products/hero-natural.jpg')}')` }}
          aria-hidden="true"
        />
        <div className="hero-veil" aria-hidden="true" />
        <div className="container hero-grid hero-grid-single">
          <div className="hero-copy">
            <h1>
              Sandalwood &amp; incense
              <br />
              for India and the world
            </h1>
            <p>{site.pitch}</p>
            <div className="hero-actions">
              <Link className="btn primary" to="/products">
                Explore Products
              </Link>
              <Link className="btn ghost" to="/contact">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="trust" aria-label="Credentials">
        <div className="container trust-line">
          <span>Since {site.established}</span>
          <span>Ujjain, Madhya Pradesh</span>
          <span>Domestic · India</span>
          <span>International trade</span>
        </div>
      </section>

      <section className="markets-split markets-home">
        <div className="container">
          <div className="section-head" data-reveal>
            <div className="eyebrow">Our Markets</div>
            <h2>Serving domestic and international buyers</h2>
            <p>
              Whether you source within India or import from abroad, you get the same
              product range and a clear commercial conversation.
            </p>
          </div>
          <div className="markets-grid">
            {site.markets.map((market) => (
              <div className="market-card" data-reveal key={market.title}>
                <h3>{market.title}</h3>
                <p>{market.text}</p>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link className="btn dark" to="/global-reach">
              View Markets
            </Link>
          </div>
        </div>
      </section>

      <section className="legacy-band">
        <div className="container legacy-grid">
          <div className="legacy-media" data-reveal>
            <img
              src={asset('assets/products/legacy-natural.jpg')}
              alt="Sandalwood powder and heartwood representing the JMK legacy"
              loading="lazy"
              width={2000}
              height={1500}
            />
            <div className="legacy-caption">
              <strong>{site.established}</strong>
              <span>Sandalwood trade heritage · Ujjain</span>
            </div>
          </div>
          <div className="legacy-copy" data-reveal>
            <div className="eyebrow">The JMK Legacy</div>
            <h2>Rooted in India. Ready for partners everywhere.</h2>
            <p>
              {site.name} ({site.division}) manufactures and supplies sandalwood and
              agarbatti raw materials, dhoop and hawan samagri. Our catalogue helps
              Indian manufacturers and traders — and overseas buyers — identify the right
              form and share a clear requirement.
            </p>
            <div className="legacy-points">
              <div>
                <em>01</em>
                <strong>Defined product forms</strong>
                <span>Powder, pieces, logs, chips and heartwood for commercial use.</span>
              </div>
              <div>
                <em>02</em>
                <strong>Domestic strength</strong>
                <span>Long-standing supply relationships across the Indian market.</span>
              </div>
              <div>
                <em>03</em>
                <strong>International access</strong>
                <span>Export and overseas enquiries handled with the same clarity.</span>
              </div>
            </div>
            <Link className="btn dark" to="/heritage">
              Discover Our Heritage
            </Link>
          </div>
        </div>
      </section>

      <section className="products">
        <div className="container">
          <div className="section-head" data-reveal>
            <div className="eyebrow">Our Products</div>
            <h2>Sandalwood &amp; Fragrance Raw Materials</h2>
            <p>
              One catalogue for both markets — from fine powder to heartwood — for
              incense, ritual, fragrance and wholesale buyers.
            </p>
          </div>
          <div className="product-grid">
            {featured.map((p) => (
              <Link
                key={p.id}
                className="product-card"
                to={`/products#${p.id}`}
                data-reveal
              >
                <img src={p.img} alt={p.alt} loading="lazy" />
                <div className="body">
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <span className="tag">View product</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="section-cta">
            <Link className="btn dark" to="/products">
              View Full Catalogue
            </Link>
          </div>
        </div>
      </section>

      <section className="benefits">
        <div className="container">
          <div className="section-head light" data-reveal>
            <div className="eyebrow">Applications</div>
            <h2>Where Our Materials Are Used</h2>
            <p>
              From Indian incense factories and ceremonial supply to fragrance houses
              abroad — materials matched to traditional and commercial demand.
            </p>
          </div>
          <div className="benefits-row" data-reveal>
            {applications.map((a) => (
              <div className="benefit-item" key={a.title}>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link className="btn ghost" to="/applications">
              View Applications
            </Link>
          </div>
        </div>
      </section>

      <section className="values">
        <div className="container">
          <div className="section-head" data-reveal>
            <div className="eyebrow">Why Work With Us</div>
            <h2>What Every Buyer Can Expect</h2>
          </div>
          <div className="values-grid">
            {values.map((v) => (
              <div className="value-item" data-reveal key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band-inner" data-reveal>
          <div>
            <div className="eyebrow">Domestic or International</div>
            <h2>Share your product, quantity and delivery location.</h2>
            <p>
              Buying within India or importing from overseas — tell us what you need and
              we will respond with availability and commercial guidance.
            </p>
          </div>
          <div className="cta-band-actions">
            <Link className="btn primary" to="/contact">
              Request a Quote
            </Link>
            <Link className="btn ghost" to="/global-reach">
              View Markets
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
