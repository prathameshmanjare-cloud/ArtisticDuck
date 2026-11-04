import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { useLenis } from 'lenis/react'
import { contact, nav, services, socials } from '../data/site'
import { Arrow, Button, DuckMark, Magnetic, Marquee } from './ui'

const ease = [0.22, 1, 0.36, 1]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { pathname } = useLocation()
  const lenis = useLenis()

  useLenis(({ scroll, direction }) => {
    setScrolled(scroll > 40)
    setHidden(scroll > 300 && direction === 1)
  })

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!lenis) return
    if (open) lenis.stop()
    else lenis.start()
  }, [open, lenis])

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${hidden && !open ? 'is-hidden' : ''} ${open ? 'is-open' : ''}`}>
        <div className="nav__inner">
          <Link to="/" className="logo" aria-label="Artistic Duck home">
            <DuckMark />
            <span className="logo__text">
              Artistic Duck<small>Media and Tech</small>
            </span>
          </Link>
          <nav className="nav__links" aria-label="Primary">
            {nav.slice(0, 5).map((l) =>
              l.label === 'Services' ? (
                <div className="nav__drop" key={l.to}>
                  <NavLink to={l.to} className="nav__link">
                    {l.label}
                    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                      <path d="M2 4l3 3 3-3" stroke="currentColor" fill="none" strokeWidth="1.4" />
                    </svg>
                  </NavLink>
                  <div className="mega">
                    <div className="mega__grid">
                      {services.map((s, i) => (
                        <Link key={s.slug} to={`/services#${s.slug}`} className="mega__item">
                          <span className="mega__num">0{i + 1}</span>
                          <span>{s.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink key={l.to} to={l.to} className="nav__link">
                  {l.label}
                </NavLink>
              ),
            )}
          </nav>
          <div className="nav__cta">
            <Button to="/contact" variant="duck">Let&rsquo;s talk</Button>
          </div>
          <button className="burger" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            <span />
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease }}
          >
            <nav className="menu__links">
              {[{ label: 'Home', to: '/' }, ...nav].map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.7, ease }}
                >
                  <NavLink to={l.to} className="menu__link" end>
                    <span className="menu__num">0{i + 1}</span>
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="menu__foot">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={contact.phoneHref}>{contact.phone}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function Footer() {
  const lenis = useLenis()
  return (
    <footer className="footer">
      <Marquee items={['Let’s build your empire together', 'Start your brand journey', 'Calm on the surface', 'Paddling hard underneath']} speed={50} className="marquee--footer" />
      <div className="wrap footer__main">
        <div className="footer__cta">
          <img src="/logo.png" alt="Artistic Duck Media and Tech logo" className="footer__logo" width="640" height="459" loading="lazy" />
          <p className="eyebrow">Got an idea?</p>
          <h2 className="display footer__title">
            Let&rsquo;s build your <em className="serif">empire</em> together.
          </h2>
          <div className="row gap">
            <Button to="/contact" variant="duck">Start your brand journey</Button>
            <Button href={contact.whatsapp} variant="ghost-light" target="_blank" rel="noreferrer">WhatsApp us</Button>
          </div>
        </div>
        <div className="footer__cols">
          <div>
            <h3 className="footer__h">Explore</h3>
            {[{ label: 'Home', to: '/' }, ...nav].map((l) => (
              <Link key={l.to} to={l.to} className="footer__link">{l.label}</Link>
            ))}
          </div>
          <div>
            <h3 className="footer__h">Services</h3>
            {services.map((s) => (
              <Link key={s.slug} to={`/services#${s.slug}`} className="footer__link">{s.title}</Link>
            ))}
          </div>
          <div>
            <h3 className="footer__h">Say hello</h3>
            <a href={contact.phoneHref} className="footer__link">{contact.phone}</a>
            <a href={`mailto:${contact.email}`} className="footer__link">{contact.email}</a>
            <span className="footer__link footer__muted">{contact.address}</span>
            <div className="footer__socials">
              {socials.map((s) => (
                <Magnetic key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="chip chip--dark">
                    {s.label} <Arrow size={12} />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="wrap footer__base">
        <span>© {new Date().getFullYear()} Artistic Duck Media &amp; Tech</span>
        <span>Made with a lot of paddling in Pune</span>
        <button className="footer__top" onClick={() => lenis?.scrollTo(0, { duration: 1.6 })}>
          Back to top ↑
        </button>
      </div>
      <div className="footer__giant" aria-hidden="true">artistic duck</div>
    </footer>
  )
}

export function Loader({ onDone }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let raf
    const start = performance.now()
    const dur = 1700
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(onDone, 250)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <motion.div className="loader" exit={{ y: '-100%' }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}>
      <div className="loader__top">
        <DuckMark size={52} />
        <span>Artistic Duck — Media and Tech</span>
      </div>
      <div className="loader__words">
        {['Ideas', 'Into', 'Brands'].map((w, i) => (
          <motion.span key={w} initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.12, duration: 0.9, ease }}>
            {w}
          </motion.span>
        ))}
      </div>
      <div className="loader__bar">
        <span style={{ transform: `scaleX(${n / 100})` }} />
      </div>
      <div className="loader__count">{String(n).padStart(3, '0')}</div>
    </motion.div>
  )
}

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [big, setBig] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      setBig(!!e.target.closest('a, button, [data-cursor]'))
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])

  if (!enabled) return null
  return (
    <motion.div
      className="cursor"
      animate={{ x: pos.x, y: pos.y, scale: big ? 3.2 : 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.4 }}
    />
  )
}
