import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { brand, hero, intro, whatsappUrl } from '../data/connect'
import DuckLogo3D from './DuckLogo3D'
import { Btn, ease, SplitText } from './primitives'
import { Icon } from './Icons'

const AUTO_ENTER_MS = 8000

/** Scenes 1–3: dark reveal, 3D logo, brand introduction with Enter + Skip. */
function CinematicIntro({ ready, onEnter }) {
  // advance automatically, or as soon as the visitor scrolls / swipes / presses a key
  useEffect(() => {
    if (!ready) return
    const t = setTimeout(onEnter, AUTO_ENTER_MS)
    // only a deliberate downward scroll/swipe enters (ignores stray trackpad inertia)
    let wheel = 0
    const onWheel = (e) => {
      wheel += Math.max(0, e.deltaY)
      if (wheel > 60) onEnter()
    }
    let startY = null
    const onTouchStart = (e) => (startY = e.touches[0].clientY)
    const onTouchMove = (e) => {
      if (startY !== null && startY - e.touches[0].clientY > 40) onEnter()
    }
    const onKey = (e) => {
      if (['ArrowDown', 'PageDown', ' ', 'Enter', 'Escape'].includes(e.key) && e.target === document.body) onEnter()
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKey)
    }
  }, [ready, onEnter])

  const d = 1.5 // text starts once the logo has mostly emerged
  return (
    <motion.div className="cx-intro" exit={{ opacity: 0, y: -24, transition: { duration: 0.5, ease } }}>
      <button type="button" className="cx-intro__skip" onClick={onEnter}>
        Skip intro <Icon name="arrowRight" size={14} stroke={2} />
      </button>
      {ready && (
        <div className="cx-intro__copy">
          <h1 className="cx-intro__name">
            <motion.span initial={{ opacity: 0, letterSpacing: '0.5em' }} animate={{ opacity: 1, letterSpacing: '0.06em' }} transition={{ duration: 1.4, ease, delay: d }}>
              {intro.name}
            </motion.span>
            <motion.small initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: d + 0.5 }}>
              {intro.descriptor}
            </motion.small>
          </h1>
          <motion.p className="cx-intro__principles" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: d + 0.8 }}>
            {brand.principles.map((p, i) => (
              <span key={p}>
                {p}
                {i < 2 && <i aria-hidden="true">•</i>}
              </span>
            ))}
          </motion.p>
          <motion.p className="cx-intro__line" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: d + 1.1 }}>
            {intro.line}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: d + 1.4 }}>
            <Btn onClick={onEnter} className="cx-intro__enter">
              {intro.cta}
            </Btn>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

/** Company introduction shown once the visitor has entered. */
function BrandIntroduction() {
  const item = (delay) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease, delay } })
  return (
    <div className="cx-wrap cx-hero__inner">
      <div className="cx-hero__copy">
        <motion.p className="cx-eyebrow cx-eyebrow--light" {...item(0.1)}>
          <span className="cx-eyebrow__bar" aria-hidden="true" />
          {hero.label}
        </motion.p>
        <h1 className="cx-h1" id="cx-hero-title" tabIndex={-1}>
          <SplitText text={hero.headline} delay={0.2} stagger={0.07} inView={false} />
        </h1>
        <motion.p className="cx-hero__desc" {...item(0.6)}>
          {hero.description}
        </motion.p>
        <motion.div className="cx-hero__ctas" {...item(0.75)}>
          <Btn href="#expertise">Explore Our Expertise</Btn>
          <Btn href="#enquiry" variant="ghost">
            Start a Project
          </Btn>
        </motion.div>
        <motion.ul className="cx-quick" aria-label="Quick actions" {...item(0.9)}>
          <li>
            <a href={brand.vcard.href} aria-label="Save company contact">
              <Icon name="contact" size={18} /> Save contact
            </a>
          </li>
          <li>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={18} /> WhatsApp
            </a>
          </li>
          <li>
            <a href={`tel:${brand.phoneE164}`}>
              <Icon name="phone" size={18} /> Call
            </a>
          </li>
        </motion.ul>
      </div>
    </div>
  )
}

export default function HeroSection({ phase, onEnter }) {
  const [logoReady, setLogoReady] = useState(false)
  return (
    <section className={`cx-hero cx-hero--${phase}`} id="home" aria-label="Artistic Duckk Media & Tech">
      <div className="cx-hero__bg" aria-hidden="true">
        <span className="cx-hero__grid" />
        <span className="cx-hero__beam cx-hero__beam--o" />
        <span className="cx-hero__beam cx-hero__beam--t" />
      </div>

      <DuckLogo3D phase={phase} onReady={() => setLogoReady(true)} />

      <AnimatePresence mode="wait">
        {phase === 'intro' ? <CinematicIntro key="intro" ready={logoReady} onEnter={onEnter} /> : <BrandIntroduction key="world" />}
      </AnimatePresence>

      {phase === 'world' && (
        <a href="#about" className="cx-hero__scroll" aria-label="Scroll to About">
          <span />
        </a>
      )}
    </section>
  )
}
