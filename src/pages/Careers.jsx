import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { contact, roles } from '../data/site'
import Art from '../components/Art'
import { Arrow, Button, Icon, PageHero, Reveal, SectionHead, Seo, ease } from '../components/ui'

const perks = [
  { icon: 'target', t: 'Real briefs', d: 'Work on live client projects from week one, not dummy tasks.' },
  { icon: 'people', t: 'Mentors on hand', d: 'Sit beside the people shooting, writing, coding and planning.' },
  { icon: 'camera', t: 'A portfolio to show', d: 'Leave with published work and a certificate.' },
  { icon: 'spark', t: 'Room to explore', d: 'Move across teams and find the craft that fits you.' },
]
const steps = ['Send your CV & portfolio', 'Short chat with the team', 'A small task, with honest feedback', 'Welcome to the flock']
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function ApplyForm({ role, onClose }) {
  const [v, setV] = useState({ name: '', email: '', link: '', note: '' })
  const [err, setErr] = useState({})
  const [opened, setOpened] = useState(false)
  const set = (k) => (e) => {
    setV({ ...v, [k]: e.target.value })
    if (err[k]) setErr({ ...err, [k]: undefined })
  }
  const submit = (e) => {
    e.preventDefault()
    const x = {}
    if (v.name.trim().length < 2) x.name = 'Please enter your name'
    if (!emailRe.test(v.email.trim())) x.email = 'Please enter a valid email'
    if (v.link && !/^https?:\/\/\S+\.\S+/.test(v.link.trim())) x.link = 'Links should start with http:// or https://'
    setErr(x)
    if (Object.keys(x).length) return
    const body = `Role: ${role}\nName: ${v.name}\nEmail: ${v.email}\nPortfolio / CV link: ${v.link || '-'}\n\n${v.note}\n\n(Please attach your CV to this email.)`
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Application: ${role} — ${v.name}`)}&body=${encodeURIComponent(body)}`
    setOpened(true)
  }
  if (opened)
    return (
      <div className="apply apply--done" role="status">
        <p>
          Your email app should now be open with your application for <strong>{role}</strong>. Attach your CV and press send. If nothing
          opened, email <a href={`mailto:${contact.email}`}>{contact.email}</a>.
        </p>
        <button className="linkbtn" onClick={onClose}>Close</button>
      </div>
    )
  return (
    <form className="apply" onSubmit={submit} noValidate>
      <div className="fgrid">
        {[
          ['name', 'Your name', 'text', 'name'],
          ['email', 'Email', 'email', 'email'],
          ['link', 'Portfolio or CV link (optional)', 'url', 'url'],
        ].map(([k, label, type, ac]) => (
          <div key={k} className={`field ${err[k] ? 'has-error' : ''}`}>
            <label className="field__label" htmlFor={`ap-${k}`}>{label}</label>
            <input id={`ap-${k}`} type={type} value={v[k]} onChange={set(k)} autoComplete={ac} aria-invalid={!!err[k]} />
            {err[k] && <span className="field__error" role="alert">{err[k]}</span>}
          </div>
        ))}
        <div className="field field--wide">
          <label className="field__label" htmlFor="ap-note">Why this role? (optional)</label>
          <textarea id="ap-note" rows={3} value={v.note} onChange={set('note')} />
        </div>
      </div>
      <div className="apply__foot">
        <button type="submit" className="wbtn wbtn--primary">Apply by email <Arrow size={14} dir="right" /></button>
        <button type="button" className="wbtn wbtn--text" onClick={onClose}>Cancel</button>
      </div>
    </form>
  )
}

export default function Careers() {
  const [open, setOpen] = useState(0)
  const [applying, setApplying] = useState(null)
  const total = roles.reduce((n, g) => n + g.items.length, 0)

  return (
    <>
      <Seo title="Careers" description="Internships at Artistic Duck Media & Tech in Pune across production, content, marketing, technology and events." />
      <PageHero
        eyebrow="Careers & internships"
        title="Do the best work of your *early career.*"
        lede="We believe in nurturing talent with real-world exposure. Our internships are built for curious people who want to grow in creative, marketing and technology work."
        aside={<Art kind="event" accent="#FFC107" />}
      >
        <div className="row-gap">
          <Button to="#roles">See open roles</Button>
        </div>
      </PageHero>

      <section className="sec sec--cream">
        <div className="wrap">
          <SectionHead eyebrow="Culture" title="Small team. *Real* work. Fast learning." lede="You will sit with the people shooting, writing, designing, coding and planning — and your work will go live." />
          <div className="perks">
            {perks.map((p, i) => (
              <Reveal key={p.t} className="perk" delay={i * 0.06}>
                <span className="perk__icon"><Icon name={p.icon} size={24} /></span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--white" id="roles">
        <div className="wrap">
          <SectionHead eyebrow={`${total} internship roles`} title="Find your *seat* at the table." lede="These are the internship tracks we are currently hiring for. Pick a role to apply." />
          <div className="roles">
            {roles.map((g, i) => {
              const isOpen = open === i
              return (
                <div key={g.group} className={`role ${isOpen ? 'is-open' : ''}`}>
                  <button className="role__head" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} aria-controls={`role-${i}`}>
                    <span className="role__icon"><Icon name={g.icon} size={22} /></span>
                    <span className="role__group">{g.group}</span>
                    <span className="role__count">{g.items.length} roles</span>
                    <span className="plus" aria-hidden="true" />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.ul
                        id={`role-${i}`}
                        className="role__list"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease }}
                      >
                        {g.items.map((r) => (
                          <li key={r}>
                            <div className="role__row">
                              <span>
                                {r}
                                <small>Internship · Pune</small>
                              </span>
                              <button className="role__apply" onClick={() => setApplying(applying === r ? null : r)} aria-expanded={applying === r}>
                                Apply <Arrow size={13} />
                              </button>
                            </div>
                            <AnimatePresence>
                              {applying === r && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }} style={{ overflow: 'hidden' }}>
                                  <ApplyForm role={r} onClose={() => setApplying(null)} />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="sec sec--navy">
        <div className="sec__deco" aria-hidden="true"><span className="grid-bg" /></div>
        <div className="wrap">
          <SectionHead light eyebrow="How to apply" title="Four steps. *No* hoops." />
          <ol className="psteps-h">
            {steps.map((s, i) => (
              <Reveal as="li" key={s} delay={i * 0.08}>
                <span>0{i + 1}</span>
                <h3>{s}</h3>
              </Reveal>
            ))}
          </ol>
          <p className="apply-note">
            Don&rsquo;t see your role? Write to <a href={`mailto:${contact.email}?subject=Internship%20application`}>{contact.email}</a> and tell
            us what you&rsquo;d bring.
          </p>
        </div>
      </section>
    </>
  )
}
