import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { asset } from '../utils/asset'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="container footer-grid">
        <div className="footer-brand">
          <img
            className="footer-logo-mark"
            src={asset('assets/brand/logo-mark.svg')}
            alt={site.name}
            width={72}
            height={72}
          />
          <p className="footer-name">{site.name}</p>
          <p className="footer-division">{site.division}</p>
          <p>{site.tagline}</p>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <nav className="footer-links" aria-label="Company">
            <Link to="/about">About Us</Link>
            <Link to="/heritage">Our Heritage</Link>
            <Link to="/quality">Quality</Link>
            <Link to="/global-reach">Markets</Link>
          </nav>
        </div>
        <div className="footer-col">
          <h4>Products</h4>
          <nav className="footer-links" aria-label="Products">
            <Link to="/products#powder">Sandalwood Powder</Link>
            <Link to="/products#pieces1">Pieces &amp; Logs</Link>
            <Link to="/products#chips">Chips &amp; Heartwood</Link>
            <Link to="/products">Full Catalogue</Link>
          </nav>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <p>
            {site.address.lines[0]}
            <br />
            {site.address.lines[1]}
          </p>
          <div className="footer-links">
            {site.phones.map((p) => (
              <a key={p.href} href={p.href}>
                {p.display}
              </a>
            ))}
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="container copyright">
        <span>
          © {year} {site.name}. All Rights Reserved.
        </span>
        <span>
          Est. {site.established} · {site.division} · Ujjain, India
        </span>
      </div>
    </footer>
  )
}
