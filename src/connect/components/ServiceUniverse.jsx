import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { divisions, expertise } from '../data/connect'
import { DuckLogoLayered } from './DuckLogo3D'
import ServiceArt from './ServiceArt'
import ServiceDetailPanel from './ServiceDetailPanel'
import { ease, SectionHead, useTilt } from './primitives'
import { Icon } from './Icons'

function DivisionCard({ d, i, active, onOpen }) {
  const tilt = useTilt(7)
  return (
    <motion.li
      className={`cx-uni__slot cx-uni__slot--${i}`}
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, ease, delay: 0.15 + i * 0.1 }}
    >
      <motion.div className="cx-dcard__float" style={{ '--tone': d.tone, '--delay': `${i * -1.7}s` }}>
        <motion.button
          type="button"
          layoutId={`division-${d.id}`}
          className={`cx-dcard ${active ? 'is-active' : ''}`}
          onClick={(e) => onOpen(d.id, e.currentTarget)}
          aria-haspopup="dialog"
          aria-label={`${d.title}: view services`}
          style={tilt.style}
          {...tilt.handlers}
        >
          <span className="cx-dcard__top">
            <span className="cx-dcard__num">{d.num}</span>
            <span className="cx-dcard__plus" aria-hidden="true">
              <Icon name="arrowNE" size={16} />
            </span>
          </span>
          <ServiceArt kind={d.art} className="cx-dcard__art" />
          <span className="cx-dcard__title">{d.title}</span>
          <span className="cx-dcard__sum">{d.summary}</span>
          <span className="cx-dcard__chips" aria-hidden="true">
            {d.services.slice(0, 3).map((s) => (
              <i key={s}>{s}</i>
            ))}
            {d.services.length > 3 && <i>+{d.services.length - 3}</i>}
          </span>
        </motion.button>
      </motion.div>
    </motion.li>
  )
}

export default function ServiceUniverse() {
  const [activeId, setActiveId] = useState(null)
  const trigger = useRef(null)
  const active = divisions.find((d) => d.id === activeId)

  const open = useCallback((id, el) => {
    trigger.current = el
    setActiveId(id)
  }, [])
  const close = useCallback(() => {
    setActiveId(null)
    requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true }))
  }, [])

  return (
    <section className="cx-sec cx-sec--navy cx-universe" id="expertise" aria-labelledby="cx-uni-title">
      <div className="cx-universe__glow" aria-hidden="true" />
      <div className="cx-wrap">
        <SectionHead eyebrow="Our expertise" title={expertise.heading} lede={expertise.lede} id="cx-uni-title" />

        <div className={`cx-uni ${activeId ? 'has-active' : ''}`}>
          <div className="cx-uni__core" aria-hidden="true">
            <span className="cx-uni__ring cx-uni__ring--a" />
            <span className="cx-uni__ring cx-uni__ring--b" />
            <DuckLogoLayered size="md" />
          </div>
          <ul className="cx-uni__cards" aria-label="Our four divisions">
            {divisions.map((d, i) => (
              <DivisionCard key={d.id} d={d} i={i} active={d.id === activeId} onOpen={open} />
            ))}
          </ul>
          <p className="cx-uni__hint" aria-hidden="true">
            Swipe to explore <Icon name="arrowRight" size={14} />
          </p>
        </div>
      </div>

      <AnimatePresence>{active && <ServiceDetailPanel key={active.id} division={active} onClose={close} />}</AnimatePresence>
    </section>
  )
}
