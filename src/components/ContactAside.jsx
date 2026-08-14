import { site } from '../data/site'

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="12" cy="10" r="2.25" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="m4.5 7.5 7.5 6 7.5-6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8.5 4.5h2.2l1 3.2-1.5 1.2a11.5 11.5 0 0 0 4.4 4.4l1.2-1.5 3.2 1v2.2a2 2 0 0 1-2.1 2A14.5 14.5 0 0 1 4.5 6.6a2 2 0 0 1 2-2.1Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ContactAside({
  title = 'Connect With Us',
  eyebrow,
  showMap = false,
  addressVariant = 'short',
}) {
  const address =
    addressVariant === 'full' ? (
      <>
        {site.address.lines[0]}
        <br />
        {site.address.lines[1]}
      </>
    ) : (
      site.address.short
    )

  return (
    <aside className="contact-card">
      {showMap && (
        <div className="contact-map">
          <iframe
            title={`${site.name} location map`}
            src={site.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a
            className="contact-map-link"
            href={site.mapLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps
          </a>
        </div>
      )}
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h3>{title}</h3>
      <p className="contact-tagline">{site.contactBlurb}</p>

      <div className="contact-list">
        <div className="contact-row">
          <span className="contact-icon">
            <IconPin />
          </span>
          <div>
            <b>Address</b>
            <span>{address}</span>
          </div>
        </div>
        <div className="contact-row">
          <span className="contact-icon">
            <IconMail />
          </span>
          <div>
            <b>Email</b>
            <span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </span>
          </div>
        </div>
        <div className="contact-row">
          <span className="contact-icon">
            <IconPhone />
          </span>
          <div>
            <b>Contact</b>
            <span className="contact-phones">
              {site.phones.map((p, i) => (
                <span key={p.href}>
                  {i > 0 ? <span className="contact-sep"> / </span> : null}
                  <a href={p.href}>{p.display}</a>
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>

      <div className="wa">
        <a
          className="btn dark"
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          Chat on WhatsApp
        </a>
      </div>
    </aside>
  )
}
