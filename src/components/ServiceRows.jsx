import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { services } from '../data/site'
import { Arrow, Icon } from './ui'

const ease = [0.22, 1, 0.36, 1]

export default function ServiceRows() {
  const [open, setOpen] = useState(null)
  return (
    <ul className="srows">
      {services.map((s, i) => {
        const isOpen = open === i
        return (
          <li
            key={s.slug}
            className={`srow ${isOpen ? 'is-open' : ''}`}
            style={{ '--tone': s.tone }}
            onPointerEnter={(e) => e.pointerType === 'mouse' && setOpen(i)}
            onPointerLeave={(e) => e.pointerType === 'mouse' && setOpen(null)}
          >
            <button className="srow__head" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
              <span className="srow__num">0{i + 1}</span>
              <span className="srow__title">{s.title}</span>
              <span className="srow__icon"><Icon name={s.icon} size={28} /></span>
              <span className="srow__plus" aria-hidden="true" />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="srow__body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease }}
                >
                  <div className="srow__inner">
                    <p>{s.intro}</p>
                    <ul className="tags">
                      {s.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                    <Link to={`/services#${s.slug}`} className="link-arrow">
                      Explore {s.short.toLowerCase()} <Arrow size={14} />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}
