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
  _honey: '',
}

function Label({ htmlFor, children, required }) {
  return (
    <label htmlFor={htmlFor}>
      {children}
      {required ? <span className="req" aria-hidden="true"> *</span> : null}
    </label>
  )
}

function buildWhatsAppMessage(form) {
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
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const product = searchParams.get('product')
    const market = searchParams.get('market')
    setForm((prev) => ({
      ...prev,
      ...(product && productOptions.includes(product) ? { product } : {}),
      ...(market === 'domestic' || market === 'international'
        ? {
            market:
              market === 'domestic' ? 'Domestic — India' : 'International',
          }
        : {}),
    }))
  }, [searchParams, productOptions])

  function update(field) {
    return (e) => {
      if (status !== 'idle') {
        setStatus('idle')
        setErrorMsg('')
      }
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (form._honey) return
    if (status === 'submitting') return

    setStatus('submitting')
    setErrorMsg('')

    const subject = `JMK Enquiry · ${form.market || 'General'} · ${form.product || 'Product'}`

    const payload = {
      name: form.name,
      company: form.company || '—',
      email: form.email,
      phone: form.phone,
      market: form.market,
      location: form.location || '—',
      product: form.product,
      requirement: form.requirement || '—',
      _subject: subject,
      _template: 'table',
      _captcha: false,
      _honey: form._honey,
      _replyto: form.email,
      _cc: site.formSubmitCc,
      _autoresponse: `Thank you for contacting ${site.name} (${site.division}). We have received your enquiry and will respond shortly.`,
    }

    try {
      const res = await fetch(site.formSubmitEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.message || 'Could not send enquiry. Please try again.')
      }

      setStatus('success')
      setForm(empty)
    } catch (err) {
      setStatus('error')
      setErrorMsg(
        err?.message ||
          'Something went wrong. Please email us directly or try WhatsApp.',
      )
    }
  }

  function handleWhatsApp(e) {
    const formEl = e.currentTarget.form
    if (formEl && !formEl.reportValidity()) return
    const body = buildWhatsAppMessage(form)
    window.open(
      `${site.whatsapp}?text=${encodeURIComponent(body)}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  const locationLabel =
    form.market === 'Domestic — India'
      ? 'City / State (India)'
      : form.market === 'International'
        ? 'Destination Country'
        : 'City / State / Country'

  const busy = status === 'submitting'

  return (
    <form className="enquiry-form" onSubmit={handleSubmit} noValidate={false}>
      {/* Honeypot — hidden from users, blocks basic bots */}
      <input
        className="hp-field"
        type="text"
        name="_honey"
        value={form._honey}
        onChange={update('_honey')}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

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
            disabled={busy}
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
            disabled={busy}
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
            disabled={busy}
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
            disabled={busy}
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
              disabled={busy}
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
            disabled={busy}
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
              disabled={busy}
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
            disabled={busy}
            placeholder="Grade or brand preference, quantity, packing and delivery notes..."
            value={form.requirement}
            onChange={update('requirement')}
          />
        </div>
      </div>

      <div className="form-actions form-actions-split">
        <button className="btn dark" type="submit" disabled={busy}>
          {busy ? 'Sending…' : 'Send Enquiry'}
        </button>
        <button
          className="btn primary"
          type="button"
          disabled={busy}
          onClick={handleWhatsApp}
        >
          WhatsApp
        </button>
      </div>

      <p className="form-hint">
        Enquiries are emailed to our sales team. WhatsApp is available if you prefer a
        quick chat.
      </p>

      {status === 'success' && (
        <p className="form-success" role="status">
          Thank you — your enquiry was sent. Our team will reply shortly. You should also
          receive a short confirmation email.
        </p>
      )}

      {status === 'error' && (
        <p className="form-error" role="alert">
          {errorMsg} Or write to{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}
    </form>
  )
}
