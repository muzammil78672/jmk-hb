import { useEffect, useId, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { productOptions as DEFAULT_OPTIONS } from '../data/products'
import { site } from '../data/site'

const empty = {
  name: '',
  company: '',
  email: '',
  phone: '',
  market: '',
  location: '',
  product: '',
  requirement: '',
}

function Label({ htmlFor, children, required }) {
  return (
    <label htmlFor={htmlFor}>
      {children}
      {required ? <span className="req" aria-hidden="true"> *</span> : null}
    </label>
  )
}

function buildMessage(form) {
  return [
    'Business enquiry from website',
    '',
    `Name: ${form.name}`,
    `Company: ${form.company || '—'}`,
    `Email: ${form.email}`,
    `Phone / WhatsApp: ${form.phone}`,
    `Market: ${form.market || '—'}`,
    `City / State / Country: ${form.location || '—'}`,
    `Product: ${form.product}`,
    '',
    'Requirement:',
    form.requirement || '—',
  ].join('\n')
}

export default function EnquiryForm({
  companyRequired = false,
  locationRequired = false,
  requirementRequired = false,
  productOptions = DEFAULT_OPTIONS,
}) {
  const id = useId()
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState(empty)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const product = searchParams.get('product')
    const market = searchParams.get('market')
    setForm((prev) => ({
      ...prev,
      ...(product && productOptions.includes(product) ? { product } : {}),
      ...(market === 'domestic' || market === 'international'
        ? {
            market:
              market === 'domestic'
                ? 'Domestic — India'
                : 'International',
          }
        : {}),
    }))
  }, [searchParams, productOptions])

  function update(field) {
    return (e) => {
      setSent(false)
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const body = buildMessage(form)
    const subject = encodeURIComponent(
      `${form.market || 'Enquiry'}: ${form.product || 'Sandalwood materials'}`,
    )
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  function handleWhatsApp(e) {
    const formEl = e.currentTarget.form
    if (formEl && !formEl.reportValidity()) return
    const body = buildMessage(form)
    window.open(
      `${site.whatsapp}?text=${encodeURIComponent(body)}`,
      '_blank',
      'noopener,noreferrer',
    )
    setSent(true)
  }

  const locationLabel =
    form.market === 'Domestic — India'
      ? 'City / State (India)'
      : form.market === 'International'
        ? 'Destination Country'
        : 'City / State / Country'

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="field">
          <Label htmlFor={`${id}-name`} required>
            Your Name
          </Label>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            required
            value={form.name}
            onChange={update('name')}
          />
        </div>
        <div className="field">
          <Label htmlFor={`${id}-company`} required={companyRequired}>
            Company Name
          </Label>
          <input
            id={`${id}-company`}
            name="company"
            autoComplete="organization"
            required={companyRequired}
            value={form.company}
            onChange={update('company')}
          />
        </div>
        <div className="field">
          <Label htmlFor={`${id}-email`} required>
            Email
          </Label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={update('email')}
          />
        </div>
        <div className="field">
          <Label htmlFor={`${id}-phone`} required>
            Phone / WhatsApp
          </Label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            value={form.phone}
            onChange={update('phone')}
          />
        </div>
        <div className="field">
          <Label htmlFor={`${id}-market`} required>
            Market
          </Label>
          <div className="select-wrap">
            <select
              id={`${id}-market`}
              name="market"
              required
              value={form.market}
              onChange={update('market')}
            >
              <option value="">Select market</option>
              <option value="Domestic — India">Domestic — India</option>
              <option value="International">International</option>
            </select>
          </div>
        </div>
        <div className="field">
          <Label htmlFor={`${id}-location`} required={locationRequired}>
            {locationLabel}
          </Label>
          <input
            id={`${id}-location`}
            name="location"
            autoComplete="address-level2"
            required={locationRequired}
            placeholder={
              form.market === 'Domestic — India'
                ? 'e.g. Indore, Madhya Pradesh'
                : form.market === 'International'
                  ? 'e.g. United Arab Emirates'
                  : 'City, state or country'
            }
            value={form.location}
            onChange={update('location')}
          />
        </div>
        <div className="field full">
          <Label htmlFor={`${id}-product`} required>
            Product Required
          </Label>
          <div className="select-wrap">
            <select
              id={`${id}-product`}
              name="product"
              required
              value={form.product}
              onChange={update('product')}
            >
              <option value="">Select Product</option>
              {productOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="field full">
          <Label htmlFor={`${id}-requirement`} required={requirementRequired}>
            Requirement / Quantity
          </Label>
          <textarea
            id={`${id}-requirement`}
            name="requirement"
            required={requirementRequired}
            placeholder="Grade or brand preference, quantity, packing and delivery notes..."
            value={form.requirement}
            onChange={update('requirement')}
          />
        </div>
      </div>
      <div className="form-actions form-actions-split">
        <button className="btn dark" type="submit">
          Email Enquiry
        </button>
        <button className="btn primary" type="button" onClick={handleWhatsApp}>
          WhatsApp Enquiry
        </button>
      </div>
      <p className="form-hint">
        Your details open as a ready-to-send message — no account required.
      </p>
      {sent && (
        <p className="form-success" role="status">
          Draft prepared. Send the message from your email or WhatsApp to reach us.
        </p>
      )}
    </form>
  )
}
