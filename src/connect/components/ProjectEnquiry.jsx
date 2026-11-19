import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { brand, enquiry, serviceOptions, whatsappUrl } from '../data/connect'
import { buildMailto, EnquiryError, isEnquiryApiConfigured, submitEnquiry } from '../services/enquiry'
import { Btn, ease, SectionHead } from './primitives'
import { Icon } from './Icons'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MIN_FILL_MS = 2500
const empty = { name: '', email: '', company: '', service: '', message: '' }

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.'
  else if (v.name.trim().length > 100) e.name = 'Please keep your name under 100 characters.'
  if (!v.email.trim()) e.email = 'Please enter your business email.'
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email address, like name@company.com.'
  if (v.company.trim().length > 120) e.company = 'Please keep the company name under 120 characters.'
  if (!v.service) e.service = 'Please choose the service you are interested in.'
  if (v.message.trim().length < 20) e.message = 'Please tell us a little more — at least 20 characters.'
  else if (v.message.trim().length > 4000) e.message = 'Please keep the description under 4,000 characters.'
  return e
}

function Field({ id, label, optional, error, children, hint }) {
  return (
    <div className={`cx-field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>
        {label}
        {optional ? <span className="cx-field__opt"> (optional)</span> : <span className="cx-field__req" aria-hidden="true"> *</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="cx-field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            className="cx-field__err"
            id={`${id}-err`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Icon name="alert" size={14} stroke={2} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function SuccessPanel({ mode, onReset, mailto }) {
  return (
    <motion.div
      className="cx-form__done"
      role="status"
      tabIndex={-1}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      ref={(el) => el?.focus()}
    >
      <svg className="cx-tick" viewBox="0 0 64 64" aria-hidden="true">
        <motion.circle cx="32" cy="32" r="29" fill="none" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease }} />
        <motion.path d="M20 33l8 8 16-17" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, ease, delay: 0.6 }} />
      </svg>
      {mode === 'sent' ? (
        <>
          <h3>Thank you — your enquiry is on its way.</h3>
          <p>It has been delivered to our team at {brand.email}. We will reply to the email address you provided.</p>
        </>
      ) : (
        <>
          <h3>Your email app should now be open.</h3>
          <p>
            We have prepared your brief addressed to {brand.email}. Press <strong>send</strong> in your email app to deliver it — nothing has
            been sent yet.
          </p>
          <p className="cx-form__alt">
            Email app didn&rsquo;t open? <a href={mailto}>Try again</a> or <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">message us on WhatsApp</a>.
          </p>
        </>
      )}
      <button type="button" className="cx-link" onClick={onReset}>
        Send another enquiry
      </button>
    </motion.div>
  )
}

export default function ProjectEnquiry() {
  const uid = useId()
  const fid = (k) => `${uid}-${k}`
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | sent | mailto | error
  const [serverError, setServerError] = useState('')
  const [mailto, setMailto] = useState('')
  const startedAt = useRef(null)
  const honeypot = useRef(null)
  const formRef = useRef(null)

  // "Discuss This Service" in the service panel preselects the service here
  useEffect(() => {
    const onDiscuss = (e) => {
      const service = e.detail?.service
      if (!serviceOptions.includes(service)) return
      setStatus((st) => (st === 'sent' || st === 'mailto' ? 'idle' : st))
      setValues((v) => ({ ...v, service }))
      setErrors((er) => ({ ...er, service: undefined }))
      setTimeout(() => formRef.current?.querySelector('input[name="name"]')?.focus({ preventScroll: true }), 700)
    }
    window.addEventListener('cx:discuss', onDiscuss)
    return () => window.removeEventListener('cx:discuss', onDiscuss)
  }, [])

  const onChange = (k) => (e) => {
    if (!startedAt.current) startedAt.current = Date.now()
    const next = { ...values, [k]: e.target.value }
    setValues(next)
    if (touched[k] || errors[k]) setErrors((prev) => ({ ...prev, [k]: validate(next)[k] }))
  }
  const onBlur = (k) => () => {
    setTouched((t) => ({ ...t, [k]: true }))
    setErrors((prev) => ({ ...prev, [k]: validate(values)[k] }))
  }

  const aria = (k, hint) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${fid(k)}-err` : hint ? `${fid(k)}-hint` : undefined,
  })

  async function onSubmit(e) {
    e.preventDefault()
    if (status === 'submitting') return
    const found = validate(values)
    setErrors(found)
    setTouched({ name: true, email: true, company: true, service: true, message: true })
    const firstBad = Object.keys(empty).find((k) => found[k])
    if (firstBad) {
      formRef.current?.querySelector(`#${CSS.escape(fid(firstBad))}`)?.focus()
      return
    }

    // Spam protection: bots fill hidden fields or submit instantly. Silently drop those.
    const hp = honeypot.current?.value || ''
    const tooFast = startedAt.current && Date.now() - startedAt.current < MIN_FILL_MS
    if (hp) return

    setServerError('')

    if (!isEnquiryApiConfigured) {
      const link = buildMailto(brand.email, values)
      setMailto(link)
      window.location.href = link
      setStatus('mailto')
      return
    }

    setStatus('submitting')
    try {
      if (tooFast) await new Promise((r) => setTimeout(r, MIN_FILL_MS))
      await submitEnquiry(values, { honeypot: hp, startedAt: startedAt.current })
      setStatus('sent')
    } catch (err) {
      const fieldErrors = err instanceof EnquiryError ? err.fieldErrors : {}
      if (Object.keys(fieldErrors).length) setErrors((prev) => ({ ...prev, ...fieldErrors }))
      setServerError(err.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  function reset() {
    setValues(empty)
    setErrors({})
    setTouched({})
    setServerError('')
    setStatus('idle')
    startedAt.current = null
  }

  const busy = status === 'submitting'
  const msgLen = values.message.trim().length

  return (
    <section className="cx-sec cx-sec--white cx-enquiry" id="enquiry" aria-labelledby="cx-enquiry-title">
      <div className="cx-wrap cx-enquiry__grid">
        <div className="cx-enquiry__intro">
          <SectionHead eyebrow="Start a project" title={enquiry.heading} lede={enquiry.lede} id="cx-enquiry-title" />
          <ul className="cx-enquiry__steps" aria-label="What happens next">
            <li>
              <span>01</span> You share the idea
            </li>
            <li>
              <span>02</span> Our team replies
            </li>
            <li>
              <span>03</span> We plan it together
            </li>
          </ul>
        </div>

        <div className="cx-form-wrap">
          <AnimatePresence mode="wait">
            {status === 'sent' || status === 'mailto' ? (
              <SuccessPanel key="done" mode={status} onReset={reset} mailto={mailto} />
            ) : (
              <motion.form
                key="form"
                ref={formRef}
                className="cx-form"
                noValidate
                onSubmit={onSubmit}
                aria-describedby={`${uid}-note`}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <div className="cx-form__row">
                  <Field id={fid('name')} label="Full Name" error={errors.name}>
                    <input id={fid('name')} name="name" type="text" autoComplete="name" value={values.name} onChange={onChange('name')} onBlur={onBlur('name')} maxLength={100} required {...aria('name')} />
                  </Field>
                  <Field id={fid('email')} label="Business Email" error={errors.email}>
                    <input id={fid('email')} name="email" type="email" inputMode="email" autoComplete="email" value={values.email} onChange={onChange('email')} onBlur={onBlur('email')} maxLength={160} required {...aria('email')} />
                  </Field>
                </div>
                <div className="cx-form__row">
                  <Field id={fid('company')} label="Company Name" optional error={errors.company}>
                    <input id={fid('company')} name="company" type="text" autoComplete="organization" value={values.company} onChange={onChange('company')} onBlur={onBlur('company')} maxLength={120} {...aria('company')} />
                  </Field>
                  <Field id={fid('service')} label="Service Interested In" error={errors.service}>
                    <div className="cx-select">
                      <select id={fid('service')} name="service" value={values.service} onChange={onChange('service')} onBlur={onBlur('service')} required {...aria('service')}>
                        <option value="" disabled>
                          Choose a service
                        </option>
                        {serviceOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Field>
                </div>
                <Field id={fid('message')} label="Project Description" error={errors.message} hint={`What are you planning, and when would you like to start? ${msgLen < 20 ? `(${20 - msgLen} more characters needed)` : ''}`}>
                  <textarea id={fid('message')} name="message" rows={5} value={values.message} onChange={onChange('message')} onBlur={onBlur('message')} maxLength={4000} required {...aria('message', true)} />
                </Field>

                {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
                <div className="cx-hp" aria-hidden="true">
                  <label htmlFor={fid('website')}>Website</label>
                  <input ref={honeypot} id={fid('website')} name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <AnimatePresence>
                  {status === 'error' && serverError && (
                    <motion.div className="cx-form__error" role="alert" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                      <Icon name="alert" size={18} />
                      <div>
                        <strong>Your enquiry was not sent.</strong> {serverError}
                        <br />
                        You can also email <a href={`mailto:${brand.email}`}>{brand.email}</a> directly.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="cx-form__submit">
                  <Btn type="submit" disabled={busy} aria-busy={busy || undefined} className={busy ? 'is-busy' : ''} iconAfter={busy ? null : 'arrow'}>
                    {busy ? (
                      <>
                        <span className="cx-spinner" aria-hidden="true" /> Sending…
                      </>
                    ) : (
                      enquiry.cta
                    )}
                  </Btn>
                  <p className="cx-form__note" id={`${uid}-note`}>
                    {isEnquiryApiConfigured
                      ? `Your details are used only to reply to this enquiry.`
                      : `Submitting opens your email app with this brief addressed to ${brand.email}.`}
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
