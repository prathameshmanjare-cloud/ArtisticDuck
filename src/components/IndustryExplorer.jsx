import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { industries, pillars } from '../data/content'
import Art from './Art'
import { Button, Icon, ease } from './ui'

const bySlug = Object.fromEntries(pillars.map((p) => [p.slug, p]))

export default function IndustryExplorer() {
  const { state } = useLocation()
  const initial = Math.max(0, industries.findIndex((i) => i.slug === state?.industry))
  const [active, setActive] = useState(initial)
  useEffect(() => {
    const idx = industries.findIndex((i) => i.slug === state?.industry)
    if (idx >= 0) setActive(idx)
  }, [state])
  const ind = industries[active]

  return (
    <div className="inds">
      <div className="inds__list" role="tablist" aria-label="Industries">
        {industries.map((x, i) => (
          <button
            key={x.slug}
            role="tab"
            id={`ind-tab-${x.slug}`}
            aria-selected={i === active}
            aria-controls="ind-panel"
            className={`inds__tab ${i === active ? 'is-active' : ''}`}
            onClick={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
          >
            <span className="inds__n">{String(i + 1).padStart(2, '0')}</span>
            <span className="inds__name">{x.name}</span>
            <span className="inds__bar" />
          </button>
        ))}
      </div>

      <div className="inds__stage" id="ind-panel" role="tabpanel" aria-labelledby={`ind-tab-${ind.slug}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={ind.slug}
            className="inds__card"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease }}
          >
            <div className="inds__art">
              <Art kind={ind.art} accent={ind.accent} label={`Illustration for ${ind.name}`} />
            </div>
            <div className="inds__copy">
              <p className="inds__kicker">{String(active + 1).padStart(2, '0')} / {String(industries.length).padStart(2, '0')}</p>
              <h3>{ind.name}</h3>
              <p className="inds__desc">{ind.desc}</p>
              <ul className="inds__needs">
                {ind.needs.map((n) => (
                  <li key={n}>
                    <Icon name="check" size={13} stroke={3} />
                    {n}
                  </li>
                ))}
              </ul>
              <div className="inds__svc">
                {ind.pillars.map((s) => (
                  <span key={s} className="tag">{bySlug[s].short}</span>
                ))}
              </div>
              <Button to={`/contact?industry=${encodeURIComponent(ind.name)}#brief`} variant="navy" size="sm">
                Explore solutions
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
