import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useSearchParams } from 'react-router-dom'
import { contact, services } from '../data/site'
import { Button } from './ui'

const empty = { name: '', email: '', phone: '', service: '', message: '' }

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Tell us your name'
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email'
  if (v.phone && !/^[+\d][\d\s-]{7,}$/.test(v.phone)) e.phone = 'Enter a valid phone number'
  if (!v.service) e.service = 'Pick a service'
  return e
}

// No backend yet: on submit we open the visitor's mail app with the enquiry pre-filled.
export default function ContactForm({ compact = false }) {
  const [params] = useSearchParams()
  const [v, setV] = useState(() => {
    const pre = params.get('service')
    return { ...empty, service: services.some((s) => s.title === pre) ? pre : '' }
  })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => {
    setV({ ...v, [k]: e.target.value })
    if (errors[k]) setErrors({ ...errors, [k]: undefined })
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = validate(v)
    setErrors(errs)
    if (Object.keys(errs).length) return
    const body = `Name: ${v.name}\nEmail: ${v.email}\nPhone: ${v.phone || '-'}\nService: ${v.service}\n\n${v.message}`
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Enquiry: ${v.service} — ${v.name}`)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <div className={`form-card ${compact ? 'form-card--compact' : ''}`}>
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div key="ok" className="form-ok" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="form-ok__badge">✓</span>
            <h3 className="display">Quack! Your mail app should be open.</h3>
            <p>Hit send there and we&rsquo;ll reply within one working day. If nothing opened, write to <a href={`mailto:${contact.email}`}>{contact.email}</a>.</p>
            <button className="link-btn" onClick={() => { setV(empty); setSent(false) }}>Send another enquiry</button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="form-grid">
              <Field label="Full name" error={errors.name}>
                <input value={v.name} onChange={set('name')} autoComplete="name" placeholder="Aarav Kulkarni" />
              </Field>
              <Field label="Email address" error={errors.email}>
                <input type="email" value={v.email} onChange={set('email')} autoComplete="email" placeholder="you@company.com" />
              </Field>
              <Field label="Phone number" error={errors.phone} optional>
                <input type="tel" value={v.phone} onChange={set('phone')} autoComplete="tel" placeholder="+91" />
              </Field>
              <Field label="Service interested in" error={errors.service}>
                <select value={v.service} onChange={set('service')}>
                  <option value="" disabled>Choose one</option>
                  {services.map((s) => (
                    <option key={s.slug}>{s.title}</option>
                  ))}
                  <option>Not sure yet, let&rsquo;s talk</option>
                </select>
              </Field>
              <Field label="Message / additional comments" wide optional>
                <textarea rows={compact ? 3 : 5} value={v.message} onChange={set('message')} placeholder="Tell us about your brand, your goals and your timeline." />
              </Field>
            </div>
            <div className="form-foot">
              <Button type="submit" variant="ink">Send enquiry</Button>
              <p className="form-note">We reply within one working day.</p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

function Field({ label, error, wide, optional, children }) {
  return (
    <label className={`field ${wide ? 'field--wide' : ''} ${error ? 'has-error' : ''}`}>
      <span className="field__label">
        {label}
        {optional && <em>optional</em>}
      </span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span className="field__error" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  )
}
