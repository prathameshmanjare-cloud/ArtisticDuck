import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { contact } from '../data/site'
import { budgets, industries, projectTypes } from '../data/content'
import { Arrow, Icon, ease } from './ui'

const steps = ['About you', 'Your project', 'The details', 'Review']
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const freeMail = /@(gmail|yahoo|hotmail|outlook|icloud|rediffmail)\./i

function validate(step, v) {
  const e = {}
  if (step === 0) {
    if (v.name.trim().length < 2) e.name = 'Please enter your name'
    if (!emailRe.test(v.email.trim())) e.email = 'Please enter a valid email address'
    if (!v.company.trim()) e.company = 'Please enter your company or project name'
  }
  if (step === 1) {
    if (!v.industry) e.industry = 'Please choose an industry'
    if (!v.types.length) e.types = 'Choose at least one project type'
  }
  if (step === 2 && v.description.trim().length < 20) e.description = 'Tell us a little more (at least 20 characters)'
  return e
}

function buildBrief(v) {
  return [
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    `Company: ${v.company}`,
    `Industry: ${v.industry}`,
    `Project type: ${v.types.join(', ')}`,
    `Budget: ${v.budget || 'Not specified'}`,
    '',
    'Project description:',
    v.description,
  ].join('\n')
}

// Submission opens the visitor's email app with the brief addressed to the studio's enquiry inbox.
// There is no server endpoint yet, so we never claim the brief was delivered.
export default function BriefWizard() {
  const [params] = useSearchParams()
  const presetType = params.get('type')
  const presetInd = params.get('industry')
  const presetGoal = params.get('goal')
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [v, setV] = useState(() => ({
    name: '',
    email: '',
    company: '',
    industry: industries.some((i) => i.name === presetInd) ? presetInd : '',
    types: projectTypes.includes(presetType) ? [presetType] : [],
    budget: '',
    description: presetGoal ? `Goal: ${presetGoal}. ` : '',
  }))
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | opened
  const [copied, setCopied] = useState(false)
  const topRef = useRef()

  const set = (k, val) => {
    setV((o) => ({ ...o, [k]: val }))
    if (errors[k]) setErrors((o) => ({ ...o, [k]: undefined }))
  }
  const toggleType = (t) => set('types', v.types.includes(t) ? v.types.filter((x) => x !== t) : [...v.types, t])

  const go = (n) => {
    if (n > step) {
      const errs = validate(step, v)
      setErrors(errs)
      if (Object.keys(errs).length) {
        requestAnimationFrame(() => topRef.current?.querySelector('[aria-invalid="true"]')?.focus())
        return
      }
    }
    setDir(n > step ? 1 : -1)
    setStep(n)
    topRef.current?.querySelector('.wiz__body')?.focus?.()
  }

  const submit = (e) => {
    e.preventDefault()
    if (step < 3) return go(step + 1)
    const subject = `Project brief: ${v.types.join(', ')} — ${v.company}`
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildBrief(v))}`
    setStatus('opened')
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(buildBrief(v))
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  if (status === 'opened') {
    return (
      <div className="wiz wiz--done" ref={topRef}>
        <span className="wiz__done-icon"><Icon name="mail" size={28} /></span>
        <h3>Your brief is ready in your email app.</h3>
        <p>
          We&rsquo;ve opened a new email to <strong>{contact.email}</strong> with your brief filled in. Press <strong>send</strong> in your email
          app to deliver it — we reply within one working day.
        </p>
        <p className="wiz__small">Nothing opened? Copy the brief and email it to us directly.</p>
        <div className="wiz__done-actions">
          <button type="button" className="wbtn wbtn--ghost" onClick={copy}>{copied ? 'Copied ✓' : 'Copy brief'}</button>
          <a className="wbtn wbtn--ghost" href={`mailto:${contact.email}`}>Email {contact.email}</a>
          <button type="button" className="wbtn wbtn--text" onClick={() => setStatus('idle')}>Edit brief</button>
        </div>
      </div>
    )
  }

  return (
    <form className="wiz" onSubmit={submit} noValidate ref={topRef} aria-label="Project brief">
      <div className="wiz__progress">
        <div className="wiz__steps">
          {steps.map((s, i) => (
            <button
              type="button"
              key={s}
              className={`wiz__step ${i === step ? 'is-on' : ''} ${i < step ? 'is-done' : ''}`}
              onClick={() => i < step && go(i)}
              disabled={i > step}
              aria-current={i === step ? 'step' : undefined}
            >
              <span>{i < step ? <Icon name="check" size={12} stroke={3} /> : i + 1}</span>
              <em>{s}</em>
            </button>
          ))}
        </div>
        <div className="wiz__bar" role="progressbar" aria-valuemin={1} aria-valuemax={4} aria-valuenow={step + 1} aria-label={`Step ${step + 1} of 4`}>
          <motion.span animate={{ scaleX: (step + 1) / steps.length }} transition={{ duration: 0.5, ease }} />
        </div>
      </div>

      <div className="wiz__body" tabIndex={-1}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            initial={{ opacity: 0, x: dir * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -30 }}
            transition={{ duration: 0.35, ease }}
            className="wiz__pane"
          >
            {step === 0 && (
              <div className="fgrid">
                <Field id="bw-name" label="Your name" error={errors.name}>
                  <input id="bw-name" value={v.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" aria-invalid={!!errors.name} />
                </Field>
                <Field
                  id="bw-email"
                  label="Business email"
                  error={errors.email}
                  hint={!errors.email && freeMail.test(v.email) ? 'A work address helps us reply faster, but personal email is fine.' : null}
                >
                  <input id="bw-email" type="email" value={v.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" aria-invalid={!!errors.email} placeholder="you@company.com" />
                </Field>
                <Field id="bw-company" label="Company" error={errors.company} wide>
                  <input id="bw-company" value={v.company} onChange={(e) => set('company', e.target.value)} autoComplete="organization" aria-invalid={!!errors.company} />
                </Field>
              </div>
            )}

            {step === 1 && (
              <div className="fgrid">
                <Field id="bw-ind" label="Industry" error={errors.industry} wide>
                  <select id="bw-ind" value={v.industry} onChange={(e) => set('industry', e.target.value)} aria-invalid={!!errors.industry}>
                    <option value="" disabled>Choose your industry</option>
                    {industries.map((i) => <option key={i.slug}>{i.name}</option>)}
                    <option>Other</option>
                  </select>
                </Field>
                <fieldset className={`field field--wide ${errors.types ? 'has-error' : ''}`}>
                  <legend className="field__label">Project type <em>choose one or more</em></legend>
                  <div className="pchips" aria-invalid={!!errors.types}>
                    {projectTypes.map((t) => (
                      <label key={t} className={`pchip ${v.types.includes(t) ? 'is-on' : ''}`}>
                        <input type="checkbox" checked={v.types.includes(t)} onChange={() => toggleType(t)} />
                        {t}
                      </label>
                    ))}
                  </div>
                  {errors.types && <span className="field__error" role="alert">{errors.types}</span>}
                </fieldset>
                <fieldset className="field field--wide">
                  <legend className="field__label">Estimated budget <em>optional</em></legend>
                  <div className="pchips">
                    {budgets.map((b) => (
                      <label key={b} className={`pchip ${v.budget === b ? 'is-on' : ''}`}>
                        <input type="radio" name="budget" checked={v.budget === b} onChange={() => set('budget', b)} />
                        {b}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}

            {step === 2 && (
              <div className="fgrid">
                <Field id="bw-desc" label="Project description" error={errors.description} wide>
                  <textarea
                    id="bw-desc"
                    rows={6}
                    value={v.description}
                    onChange={(e) => set('description', e.target.value)}
                    aria-invalid={!!errors.description}
                    placeholder="What are you building, who is it for, and when do you want to launch?"
                  />
                </Field>
                <p className="wiz__small">{v.description.trim().length} characters</p>
              </div>
            )}

            {step === 3 && (
              <dl className="review">
                {[
                  ['Name', v.name, 0],
                  ['Email', v.email, 0],
                  ['Company', v.company, 0],
                  ['Industry', v.industry, 1],
                  ['Project type', v.types.join(', '), 1],
                  ['Budget', v.budget || 'Not specified', 1],
                  ['Description', v.description, 2],
                ].map(([k, val, s]) => (
                  <div key={k} className="review__row">
                    <dt>{k}</dt>
                    <dd>{val}</dd>
                    <button type="button" className="review__edit" onClick={() => go(s)}>Edit</button>
                  </div>
                ))}
              </dl>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="wiz__foot">
        {step > 0 ? (
          <button type="button" className="wbtn wbtn--text" onClick={() => go(step - 1)}>← Back</button>
        ) : (
          <span className="wiz__small">Step {step + 1} of {steps.length}</span>
        )}
        <button type="submit" className="wbtn wbtn--primary">
          {step < 3 ? 'Continue' : 'Send brief by email'}
          <Arrow size={14} dir="right" />
        </button>
      </div>
      {step === 3 && <p className="wiz__small wiz__note">This opens your email app with the brief addressed to {contact.email}.</p>}
    </form>
  )
}

function Field({ id, label, error, hint, wide, children }) {
  return (
    <div className={`field ${wide ? 'field--wide' : ''} ${error ? 'has-error' : ''}`}>
      <label className="field__label" htmlFor={id}>{label}</label>
      {children}
      {error && <span className="field__error" role="alert">{error}</span>}
      {hint && <span className="field__hint">{hint}</span>}
    </div>
  )
}
