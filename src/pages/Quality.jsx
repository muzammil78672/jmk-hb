import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { asset } from '../utils/asset'

export default function Quality() {
  return (
    <>
      <PageHero
        crumb="Quality"
        title="Quality & Consistency"
        description="Clear product forms, transparent sizing where available, and dependable communication for domestic and international enquiries."
      />

      <section className="quality">
        <div className="container quality-grid">
          <div className="quality-copy" data-reveal>
            <div className="eyebrow">Our Quality Approach</div>
            <h2>Materials buyers can specify with confidence.</h2>
            <p>
              Indian and overseas partners need the same fundamentals: the correct
              product form, usable size information, realistic application context and a
              team that answers with commercial clarity.
            </p>
            <div className="checklist">
              <div className="check">
                <strong>Product Identification</strong>
                <span>Named grades and categories that are easy to quote against.</span>
              </div>
              <div className="check">
                <strong>Size Guidance</strong>
                <span>Where ranges apply, sizes are shown on the product page.</span>
              </div>
              <div className="check">
                <strong>Application Fit</strong>
                <span>End uses explained for incense, ritual and fragrance buyers.</span>
              </div>
              <div className="check">
                <strong>Market Conversations</strong>
                <span>Domestic India supply and international trade enquiries, case by case.</span>
              </div>
            </div>
            <div className="section-cta" style={{ textAlign: 'left', marginTop: 28 }}>
              <Link className="btn dark" to="/contact">
                Ask About a Grade
              </Link>
            </div>
          </div>
          <div className="quality-art" data-reveal>
            <img
              src={asset('assets/products/pieces-no1.jpg')}
              alt="Sandalwood pieces prepared for commercial supply"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  )
}
