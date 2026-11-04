import { useEffect, useRef, useState } from 'react'
import { motion, animate, useMotionValue } from 'motion/react'
import { showcase } from '../data/site'
import { Arrow } from './ui'

const DELAY = 5500

function Art({ kind }) {
  return (
    <div className={`art art--${kind}`} aria-hidden="true">
      {kind === 'film' && (
        <>
          <div className="art__frame">
            <span className="art__rec">● REC</span>
            <span className="art__tc">00:00:12:08</span>
            <div className="art__sun" />
            <div className="art__horizon" />
          </div>
          <div className="art__strip">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div>
        </>
      )}
      {kind === 'link' && (
        <svg viewBox="0 0 400 300">
          <circle cx="150" cy="150" r="90" />
          <circle cx="250" cy="150" r="90" />
          <path d="M200 78 Q 236 150 200 222 Q 164 150 200 78" />
        </svg>
      )}
      {kind === 'star' && (
        <div className="art__laurel">
          <svg viewBox="0 0 200 200">
            <path d="M100 18l22 50 54 5-41 36 13 53-48-28-48 28 13-53-41-36 54-5z" />
          </svg>
        </div>
      )}
      {kind === 'grid' && (
        <div className="art__tiles">
          {['D2C', 'Retail', 'Tech', 'Food', 'Health', 'Events', 'Edu', 'Realty', 'Fashion'].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      )}
      {kind === 'quote' && <div className="art__quote">“</div>}
    </div>
  )
}

export default function Showcase() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const viewport = useRef()
  const x = useMotionValue(0)
  const n = showcase.length

  const slideW = () => {
    const el = viewport.current?.querySelector('.slide')
    if (!el) return 0
    const gap = parseFloat(getComputedStyle(el.parentElement).columnGap) || 0
    return el.offsetWidth + gap
  }

  useEffect(() => {
    const c = animate(x, -i * slideW(), { type: 'spring', stiffness: 120, damping: 24 })
    return c.stop
  }, [i, x])

  useEffect(() => {
    const onResize = () => x.set(-i * slideW())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [i, x])

  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => setI((p) => (p + 1) % n), DELAY)
    return () => clearTimeout(t)
  }, [i, paused, n])

  const go = (d) => setI((p) => (p + d + n) % n)

  return (
    <section className="showcase" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div className="wrap showcase__head">
        <div className="showcase__tabs" role="tablist">
          {showcase.map((s, k) => (
            <button key={s.tag} role="tab" aria-selected={k === i} className={`tab ${k === i ? 'is-active' : ''}`} onClick={() => setI(k)}>
              <span>{s.tag}</span>
              {k === i && !paused && <span className="tab__fill" style={{ animationDuration: `${DELAY}ms` }} />}
            </button>
          ))}
        </div>
        <div className="showcase__ctrl">
          <span className="showcase__count">
            {String(i + 1).padStart(2, '0')} <i>/</i> {String(n).padStart(2, '0')}
          </span>
          <button className="round" onClick={() => go(-1)} aria-label="Previous slide">
            <Arrow />
          </button>
          <button className="round" onClick={() => go(1)} aria-label="Next slide">
            <Arrow />
          </button>
        </div>
      </div>
      <div className="showcase__viewport" ref={viewport}>
        <motion.div
          className="showcase__track"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -(n - 1) * 2000, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            const w = slideW()
            const next = Math.round((-x.get() - info.velocity.x * 0.2) / w)
            const clamped = Math.max(0, Math.min(n - 1, next))
            if (clamped === i) animate(x, -i * w, { type: 'spring', stiffness: 120, damping: 24 })
            setI(clamped)
          }}
        >
          {showcase.map((s, k) => (
            <article key={s.tag} className={`slide slide--${s.art} ${k === i ? 'is-active' : ''}`} data-cursor>
              <Art kind={s.art} />
              <div className="slide__copy">
                <span className="slide__tag">{s.tag}</span>
                <h3 className="slide__title">{s.title}</h3>
                <p className="slide__body">{s.body}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
