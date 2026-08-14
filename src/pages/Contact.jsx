import ContactAside from '../components/ContactAside'
import EnquiryForm from '../components/EnquiryForm'
import PageHero from '../components/PageHero'
import { site } from '../data/site'

export default function Contact() {
  return (
    <>
      <PageHero
        crumb="Contact"
        title="Request a Quote"
        description="Enquiries welcome from buyers across India and from international partners. Choose your market and share product, quantity and location."
      />

      <section className="contact">
        <div className="container contact-grid">
          <div className="form-card">
            <div className="eyebrow">Business Enquiry</div>
            <h2 className="form-card-title">Domestic or International</h2>
            <p className="contact-intro">
              Select your market, then add company details, product and quantity. We
              reply by email or WhatsApp with the relevant next steps.
            </p>
            <EnquiryForm companyRequired locationRequired requirementRequired />
          </div>
          <ContactAside
            showMap
            eyebrow={site.name}
            title="India supply · Worldwide enquiries."
            addressVariant="full"
          />
        </div>
      </section>
    </>
  )
}
