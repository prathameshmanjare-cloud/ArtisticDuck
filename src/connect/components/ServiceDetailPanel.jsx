import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import ServiceArt from './ServiceArt'
import { Btn, ease } from './primitives'
import { Icon } from './Icons'

/** Ask the enquiry form to preselect a service, then take the visitor there. */
export function discussService(service) {
  window.dispatchEvent(new CustomEvent('cx:discuss', { detail: { service } }))
  const target = document.getElementById('enquiry')
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

export default function ServiceDetailPanel({ division: d, onClose }) {
  const ref = useRef(null)
  const titleId = `cx-panel-${d.id}`

  // modal behaviour: lock scroll, trap focus, close on Escape
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const first = ref.current?.querySelector('[data-autofocus]')
    first?.focus({ preventScroll: true })
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && ref.current) {
        const f = [...ref.current.querySelectorAll('a[href], button:not([disabled])')]
        const [a, z] = [f[0], f[f.length - 1]]
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault()
          z.focus()
        } else if (!e.shiftKey && document.activeElement === z) {
          e.preventDefault()
          a.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const discuss = () => {
    onClose()
    setTimeout(() => discussService(d.enquiryService), 80)
  }

  return (
    <div className="cx-panel-wrap">
      <motion.div
        className="cx-panel-backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      />
      <motion.div
        ref={ref}
        layoutId={`division-${d.id}`}
        className="cx-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        style={{ '--tone': d.tone }}
        transition={{ type: 'spring', stiffness: 260, damping: 32 }}
      >
        <motion.div
          className="cx-panel__inner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.18, duration: 0.35 } }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
        >
          <div className="cx-panel__head">
            <span className="cx-panel__num">Division {d.num}</span>
            <button type="button" className="cx-panel__close" onClick={onClose} aria-label="Close and return to all divisions" data-autofocus>
              <Icon name="close" size={20} stroke={2} />
            </button>
          </div>

          <div className="cx-panel__grid">
            <div className="cx-panel__visual">
              {d.image ? (
                <img src={d.image} alt="" width="900" height="900" loading="lazy" decoding="async" />
              ) : (
                <div className="cx-panel__artbox">
                  <ServiceArt kind={d.art} />
                </div>
              )}
              <span className="cx-panel__visual-tag">{d.title}</span>
            </div>

            <div className="cx-panel__body">
              <h3 className="cx-panel__title" id={titleId}>
                {d.title}
              </h3>
              <p className="cx-panel__intro">{d.intro}</p>

              <h4 className="cx-panel__label">Services</h4>
              <ul className="cx-panel__chips">
                {d.services.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>

              <h4 className="cx-panel__label">What we deliver</h4>
              <ul className="cx-panel__list">
                {d.deliverables.map((s, i) => (
                  <motion.li key={s} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease, delay: 0.25 + i * 0.04 }}>
                    <Icon name="check" size={16} stroke={2.4} /> {s}
                  </motion.li>
                ))}
              </ul>

              <div className="cx-panel__actions">
                <Btn onClick={discuss}>Discuss This Service</Btn>
                <a className="cx-panel__more" href={d.href}>
                  More on our website <Icon name="arrowNE" size={14} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
