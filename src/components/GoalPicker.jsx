import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { goals, pillars } from '../data/content'
import Art from './Art'
import { Arrow, Button, Icon, ease } from './ui'

const bySlug = Object.fromEntries(pillars.map((p) => [p.slug, p]))

export default function GoalPicker() {
  const [sel, setSel] = useState(null)
  const goal = goals.find((g) => g.key === sel)
  return (
    <div className="goals">
      <div className="goals__grid" role="radiogroup" aria-label="Your business goal">
        {goals.map((g, i) => (
          <button
            key={g.key}
            role="radio"
            aria-checked={sel === g.key}
            className={`goal ${sel === g.key ? 'is-on' : ''} ${sel && sel !== g.key ? 'is-dim' : ''}`}
            onClick={() => setSel(g.key)}
          >
            <span className="goal__icon">
              <Icon name={g.icon} size={22} />
            </span>
            <span className="goal__n">0{i + 1}</span>
            <span className="goal__label">{g.label}</span>
            <span className="goal__tick" aria-hidden="true">
              <Icon name="check" size={14} stroke={3} />
            </span>
          </button>
        ))}
      </div>

      <div className="goals__result" aria-live="polite">
        <AnimatePresence mode="wait">
          {goal ? (
            <motion.div
              key={goal.key}
              className="goals__plan"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease }}
            >
              <p className="goals__k">Your plan</p>
              <h3>{goal.label}</h3>
              <p className="goals__pitch">{goal.pitch}</p>
              <div className="goals__svcs">
                {goal.pillars.map((s, i) => (
                  <Link key={s} to={`/services/${s}`} className="goals__svc" style={{ '--accent': bySlug[s].accent }}>
                    <Art kind={bySlug[s].art} accent={bySlug[s].accent} />
                    <span>
                      <small>Step {i + 1}</small>
                      {bySlug[s].title}
                    </span>
                    <Arrow size={14} />
                  </Link>
                ))}
              </div>
              <Button to={`/contact?goal=${encodeURIComponent(goal.label)}&type=${encodeURIComponent(goal.type)}#brief`}>{goal.cta}</Button>
            </motion.div>
          ) : (
            <motion.div key="empty" className="goals__empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <span className="goals__pulse" />
              <p>Pick a goal to see the services and next step we&rsquo;d recommend.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
