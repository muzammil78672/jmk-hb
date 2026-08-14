import { useEffect, useId, useMemo, useRef, useState } from 'react'
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

function contactThankYouUrl() {
  const base = import.meta.env.BASE_URL || '/'
  const path = `${base.replace(/\/?$/, '/') }contact?sent=1`
  if (typeof window === 'undefined') return path
  return `${window.location.origin}${path}`
}

export default function EnquiryForm({
  companyRequired = false,
  locationRequired = false,
  requirementRequired = false,
  productOptions = DEFAULT_OPTIONS,
}) {
  const id = useId()
  const formRef = useRef(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const nextUrl = useMemo(() => contactThankYouUrl(), [])
  const subject = `JMK Enquiry · ${form.market || 'General'} · ${form.product || 'Product'}`

  useEffect(() => {
    if (searchParams.get('sent') === '1') {
      setStatus('success')
    }
  }, [searchParams])

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
      if (status !== 'idle' && status !== 'submitting') {
        setStatus('idle')
        setErrorMsg('')
        if (searchParams.get('sent') === '1') {
          const next = new URLSearchParams(searchParams)
          next.delete('sent')
          setSearchParams(next, { replace: true })
        }
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

  function handleSubmit(e) {
    if (!validate()) {
      e.preventDefault()
      return
    }
    // Native POST to FormSubmit (avoids AJAX activation-loop issues).
    setStatus('submitting')
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
      action={site.formSubmitEndpoint}
      method="POST"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* FormSubmit controls — do not send _captcha=false (causes activation loops). */}
      <input type="hidden" name="_next" value={nextUrl} />
      <input type="hidden" name="_subject" value={subject} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_cc" value={site.formSubmitCc} />
      <input type="hidden" name="_replyto" value={form.email.trim()} />

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
        You may briefly leave this page while FormSubmit delivers the email, then return
        here automatically.
      </p>

      {status === 'success' && (
        <div className="form-success" role="status">
          <p>
            <strong>Enquiry submitted.</strong> Check <strong>{site.email}</strong> and{' '}
            <strong>{site.formSubmitCc}</strong> (including Spam).
          </p>
          <p>
            If you only see “activate your form” emails, open the latest FormSubmit message
            and click Activate once more — then send a second test. Do not use disable-captcha
            until normal enquiry emails are arriving.
          </p>
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
