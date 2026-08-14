import { useEffect, useId, useRef, useState } from 'react'
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

function isFormSubmitOk(data) {
  if (!data || typeof data !== 'object') return false
  const value = data.success
  return value === true || value === 'true' || value === 'ok'
}

export default function EnquiryForm({
  companyRequired = false,
  locationRequired = false,
  requirementRequired = false,
  productOptions = DEFAULT_OPTIONS,
}) {
  const id = useId()
  const formRef = useRef(null)
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const [serverMsg, setServerMsg] = useState('')

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

  useEffect(() => {
    if (status !== 'success' && status !== 'error') return
    formRef.current
      ?.querySelector(status === 'success' ? '.form-success' : '.form-error')
      ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [status])

  function update(field) {
    return (e) => {
      if (status !== 'idle') {
        setStatus('idle')
        setErrorMsg('')
        setServerMsg('')
      }
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
    }
  }

  function validate() {
    const missing = []
    if (!form.name.trim()) missing.push('Your Name')
    if (companyRequired && !form.company.trim()) missing.push('Company Name')
    if (!form.email.trim()) missing.push('Email')
    if (!form.phone.trim()) missing.push('Phone / WhatsApp')
    if (!form.market) missing.push('Market')
    if (locationRequired && !form.location.trim()) missing.push('Location')
    if (!form.product) missing.push('Product')
    if (requirementRequired && !form.requirement.trim()) {
      missing.push('Requirement / Quantity')
    }

    if (missing.length) {
      setStatus('error')
      setErrorMsg(`Please fill: ${missing.join(', ')}.`)
      const firstInvalid = formRef.current?.querySelector(':invalid')
      firstInvalid?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      firstInvalid?.focus?.()
      return false
    }

    return true
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (status === 'submitting') return
    if (!validate()) return

    setStatus('submitting')
    setErrorMsg('')
    setServerMsg('')

    const subject = `JMK Enquiry · ${form.market || 'General'} · ${form.product || 'Product'}`

    // FormData is the most reliable FormSubmit path from browsers.
    const body = new FormData()
    body.append('name', form.name.trim())
    body.append('company', form.company.trim() || '—')
    body.append('email', form.email.trim())
    body.append('phone', form.phone.trim())
    body.append('market', form.market)
    body.append('location', form.location.trim() || '—')
    body.append('product', form.product)
    body.append('requirement', form.requirement.trim() || '—')
    body.append('_subject', subject)
    body.append('_template', 'table')
    body.append('_captcha', 'false')
    body.append('_replyto', form.email.trim())
    body.append('_cc', site.formSubmitCc)

    try {
      const res = await fetch(site.formSubmitEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body,
      })

      const data = await res.json().catch(() => null)

      if (!res.ok || !isFormSubmitOk(data)) {
        throw new Error(
          data?.message ||
            'Could not send enquiry. Please try WhatsApp or email us directly.',
        )
      }

      setServerMsg(typeof data?.message === 'string' ? data.message : '')
      setStatus('success')
      setForm(empty)
    } catch (err) {
      setStatus('error')
      setErrorMsg(
        err?.message ||
          'Something went wrong. Please try WhatsApp or email us directly.',
      )
    }
  }

  function handleWhatsApp(e) {
    e.preventDefault()
    if (!validate()) return
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
    <form
      ref={formRef}
      className="enquiry-form"
      onSubmit={handleSubmit}
      noValidate
    >
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
        Fill all required fields above, then send. Enquiries go to our sales email; WhatsApp
        is also available.
      </p>

      {status === 'success' && (
        <div className="form-success" role="status">
          <p>
            <strong>Submitted to FormSubmit.</strong> Check these inboxes (and Spam /
            Promotions):
          </p>
          <ul>
            <li>
              <strong>{site.email}</strong> — open any email from FormSubmit and click{' '}
              <em>Confirm / Activate</em> (required once). Then submit the form again.
            </li>
            <li>
              After activation, new enquiries arrive here and are CC’d to{' '}
              <strong>{site.formSubmitCc}</strong>.
            </li>
          </ul>
          {serverMsg ? <p className="form-server-msg">{serverMsg}</p> : null}
        </div>
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
