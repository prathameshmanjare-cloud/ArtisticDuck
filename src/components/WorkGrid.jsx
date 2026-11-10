import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { work, workCats } from '../data/content'
import Art from './Art'
import { Arrow, ease } from './ui'

export function WorkCard({ w, i = 0 }) {
  return (
    <motion.article
      layout
      className={`wcard wcard--${w.size}`}
      style={{ '--accent': w.accent }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, ease, delay: i * 0.05 }}
    >
      <Link to={`/work/${w.slug}`} className="wcard__link">
        <div className="wcard__media">
          <Art kind={w.art} accent={w.accent} />
          <span className="wcard__badge">Capability study</span>
        </div>
        <div className="wcard__meta">
          <div>
            <p className="wcard__cat">
              {w.cat} <i>·</i> {w.sector}
            </p>
            <h3 className="wcard__title">{w.title}</h3>
            <p className="wcard__sum">{w.summary}</p>
          </div>
          <span className="wcard__go" aria-hidden="true">
            <Arrow size={16} />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}

export default function WorkGrid({ limit, filters = false }) {
  const [cat, setCat] = useState('All')
  const list = (cat === 'All' ? work : work.filter((w) => w.cat === cat)).slice(0, limit)
  return (
    <LayoutGroup>
      {filters && (
        <div className="filters" role="group" aria-label="Filter work by category">
          {workCats.map((c) => (
            <button key={c} className={`fchip ${c === cat ? 'is-on' : ''}`} aria-pressed={c === cat} onClick={() => setCat(c)}>
              {c}
              {c === cat && <motion.span layoutId="fchip-bg" className="fchip__bg" transition={{ duration: 0.4, ease }} />}
            </button>
          ))}
        </div>
      )}
      <motion.div layout className="wgrid">
        <AnimatePresence mode="popLayout">
          {list.map((w, i) => (
            <WorkCard key={w.slug} w={w} i={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  )
}
