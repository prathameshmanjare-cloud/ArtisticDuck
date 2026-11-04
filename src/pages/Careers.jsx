import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { contact, roles } from '../data/site'
import { Arrow, Eyebrow, Icon, PageHero, Reveal, SplitLine } from '../components/ui'

const perks = [
  { t: 'Real briefs', d: 'Work on live client projects from week one, not dummy tasks.' },
  { t: 'Mentors on hand', d: 'Sit beside the people shooting, writing, coding and planning.' },
  { t: 'Portfolio you can show', d: 'Leave with published work and a certificate.' },
  { t: 'Room to try things', d: 'Move across teams and find the craft that fits you.' },
]

const steps = ['Send your CV & portfolio', 'Short chat with the team', 'A small task, paid in feedback', 'Welcome to the flock']

export default function Careers() {
  const [open, setOpen] = useState(0)

  return (
    <>
      <PageHero
        eyebrow="Careers / Internship"
        title="Join our *team.*"
        lede="We believe in nurturing talent and providing real-world exposure. Our internship programs are designed for passionate individuals who want to grow in the creative and marketing industry."
      />

      <section className="section">
        <div className="wrap perks">
          {perks.map((p, i) => (
            <Reveal key={p.t} className="perk" delay={i * 0.07}>
              <span className="perk__n">0{i + 1}</span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="roles-sec">
        <div className="wrap">
          <div className="section-head">
            <Eyebrow>Internship opportunities</Eyebrow>
            <h2 className="display h2">
              <SplitLine text="Find your *seat* at the table." />
            </h2>
          </div>
          <div className="roles">
            {roles.map((g, i) => {
              const isOpen = open === i
              return (
                <div key={g.group} className={`role ${isOpen ? 'is-open' : ''}`}>
                  <button className="role__head" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                    <span className="role__icon"><Icon name={g.icon} size={26} /></span>
                    <span className="role__group">{g.group}</span>
                    <span className="role__count">{g.items.length} roles</span>
                    <span className="srow__plus" aria-hidden="true" />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.ul
                        className="role__list"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {g.items.map((r) => (
                          <li key={r}>
                            <a href={`mailto:${contact.email}?subject=${encodeURIComponent(`Internship application: ${r}`)}`}>
                              <span>{r}</span>
                              <span className="role__apply">
                                Apply <Arrow size={14} />
                              </span>
                            </a>
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

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <Eyebrow>How to apply</Eyebrow>
            <h2 className="display h2">
              <SplitLine text="Four steps. *No* hoops." />
            </h2>
          </div>
          <ol className="steps">
            {steps.map((s, i) => (
              <Reveal as="li" key={s} delay={i * 0.08}>
                <span>Step 0{i + 1}</span>
                <p>{s}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="apply-note">
            Don&rsquo;t see your role? Write to <a href={`mailto:${contact.email}?subject=Internship%20application`}>{contact.email}</a> and tell
            us what you&rsquo;d bring.
          </Reveal>
        </div>
      </section>
    </>
  )
}
