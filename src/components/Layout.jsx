import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { useLenis } from 'lenis/react'
import { contact, socials } from '../data/site'
import { industries, pillars } from '../data/content'
import Art from './Art'
import { Arrow, Button, Icon, Logo, ease } from './ui'

const links = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services', mega: true },
  { label: 'Work', to: '/work' },
  { label: 'Careers', to: '/careers' },
  { label: 'Insights', to: '/insights' },
]

function MegaMenu({ open, onClose }) {
  const [active, setActive] = useState(0)
  const p = pillars[active]
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="mega"
          id="mega-services"
          initial={{ opacity: 0, y: 12, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.99 }}
          transition={{ duration: 0.35, ease }}
        >
          <div className="mega__panel">
            <div className="mega__list">
              <p className="mega__label">Disciplines</p>
              {pillars.map((s, i) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className={`mega__item ${i === active ? 'is-active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={onClose}
                >
                  <span className="mega__num">{s.num}</span>
                  <span>
                    <strong>{s.title}</strong>
                    <small>{s.tagline}</small>
                  </span>
                  <Arrow size={14} />
                </Link>
              ))}
              <Link to="/services" className="mega__all" onClick={onClose}>
                View all services <Arrow size={13} dir="right" />
              </Link>
            </div>

            <div className="mega__preview">
              <AnimatePresence mode="wait">
                <motion.div
                  key={p.slug}
                  className="mega__stage"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease }}
                >
                  <Art kind={p.art} accent={p.accent} className="mega__art" />
                  <ul className="mega__deliv">
                    {p.deliverables.slice(0, 4).map((d) => (
                      <li key={d}>
                        <Icon name="check" size={12} stroke={3} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mega__side">
              <p className="mega__label">Industries</p>
              <div className="mega__inds">
                {industries.map((ind) => (
                  <Link key={ind.slug} to={`/#industries`} state={{ industry: ind.slug }} className="mega__ind" onClick={onClose}>
                    {ind.name}
                  </Link>
                ))}
              </div>
              <Link to="/contact#brief" className="mega__cta" onClick={onClose}>
                <span className="mega__cta-k">Start a project</span>
                <span className="mega__cta-t">Share a short brief and we&rsquo;ll reply within one working day.</span>
                <span className="mega__cta-a">
                  <Arrow size={14} />
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Nav() {
  const [menu, setMenu] = useState(false)
  const [mega, setMega] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { pathname } = useLocation()
  const lenis = useLenis()
  const closeTimer = useRef()

  useLenis(({ scroll, direction }) => {
    setScrolled(scroll > 30)
    setHidden(scroll > 400 && direction === 1)
  })

  useEffect(() => {
    setMenu(false)
    setMega(false)
  }, [pathname])

  useEffect(() => {
    if (!lenis) return
    if (menu) lenis.stop()
    else lenis.start()
  }, [menu, lenis])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMega(false)
        setMenu(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const openMega = () => {
    clearTimeout(closeTimer.current)
    setMega(true)
  }
  const closeMega = () => {
    closeTimer.current = setTimeout(() => setMega(false), 120)
  }

  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${hidden && !menu && !mega ? 'is-hidden' : ''} ${menu ? 'is-open' : ''}`}>
        <div className="nav__inner" onMouseLeave={closeMega}>
          <Link to="/" className="nav__logo" aria-label="Artistic Duck Media and Tech — home">
            <Logo />
          </Link>
          <nav className="nav__pill" aria-label="Primary">
            {links.map((l) =>
              l.mega ? (
                <div
                  key={l.to}
                  className={`nav__drop ${mega ? 'is-open' : ''}`}
                  onMouseEnter={openMega}
                  onFocus={openMega}
                  onBlur={(e) => {
                    if (!e.currentTarget.parentElement.parentElement.contains(e.relatedTarget)) setMega(false)
                  }}
                >
                  <NavLink to={l.to} className="nav__link">
                    {l.label}
                  </NavLink>
                  <button
                    className="nav__chev"
                    aria-label="Show services menu"
                    aria-expanded={mega}
                    aria-controls="mega-services"
                    onClick={(e) => setMega((m) => (e.detail === 0 ? !m : true))}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                      <path d="M2 4l3 3 3-3" stroke="currentColor" fill="none" strokeWidth="1.5" />
                    </svg>
                  </button>
                </div>
              ) : (
                <NavLink key={l.to} to={l.to} className="nav__link" onMouseEnter={closeMega}>
                  {l.label}
                </NavLink>
              ),
            )}
          </nav>
          <div className="nav__cta">
            <Button to="/contact" size="sm">Let&rsquo;s talk</Button>
          </div>
          <button className="burger" onClick={() => setMenu((o) => !o)} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu}>
            <span />
            <span />
          </button>
          <div onMouseEnter={openMega} className="mega__wrap">
            <MegaMenu open={mega} onClose={() => setMega(false)} />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease }}
          >
            <nav className="menu__links" aria-label="Mobile">
              {[{ label: 'Home', to: '/' }, ...links, { label: 'Contact', to: '/contact' }].map((l, i) => (
                <motion.div key={l.to} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.12 + i * 0.04, duration: 0.6, ease }}>
                  <NavLink to={l.to} className="menu__link" end>
                    <span className="menu__num">0{i + 1}</span>
                    {l.label}
                  </NavLink>
                  {l.mega && (
                    <div className="menu__sub">
                      {pillars.map((p) => (
                        <Link key={p.slug} to={`/services/${p.slug}`}>{p.short}</Link>
                      ))}
                    </div>
                  )}
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
      <div className="footer__bg" aria-hidden="true">
        <span className="grid-bg" />
        <span className="footer__glow" />
      </div>
      <div className="wrap footer__cta">
        <div>
          <p className="eyebrow eyebrow--light">Next big move?</p>
          <h2 className="footer__title">
            Have a big idea? <span className="hl">Let&rsquo;s make it happen.</span>
          </h2>
        </div>
        <div className="footer__actions">
          <Button to="/contact#brief">Start a project</Button>
          <Button href={contact.whatsapp} variant="light" icon={null} target="_blank" rel="noreferrer">WhatsApp us</Button>
        </div>
      </div>
      <div className="wrap footer__main">
        <div className="footer__brand">
          <Logo />
          <p>
            A branding, advertising, marketing and technology studio from Pune, helping startups and growing businesses turn ideas into
            brands, products and digital experiences.
          </p>
          <div className="footer__contact">
            <a href={contact.phoneHref}><Icon name="call" size={16} /> {contact.phone}</a>
            <a href={`mailto:${contact.email}`}><Icon name="mail" size={16} /> {contact.email}</a>
            <span><Icon name="pin" size={16} /> {contact.address}</span>
          </div>
        </div>
        <div className="footer__col">
          <h3>Explore</h3>
          {[{ label: 'Home', to: '/' }, ...links, { label: 'Contact', to: '/contact' }].map((l) => (
            <Link key={l.to} to={l.to}>{l.label}</Link>
          ))}
        </div>
        <div className="footer__col">
          <h3>Services</h3>
          {pillars.map((p) => (
            <Link key={p.slug} to={`/services/${p.slug}`}>{p.title}</Link>
          ))}
        </div>
        <div className="footer__col">
          <h3>Industries</h3>
          {industries.map((i) => (
            <Link key={i.slug} to="/#industries" state={{ industry: i.slug }}>{i.name}</Link>
          ))}
        </div>
        <div className="footer__col">
          <h3>Follow</h3>
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="footer__social">
              {s.label} <Arrow size={12} />
            </a>
          ))}
        </div>
      </div>
      <div className="wrap footer__base">
        <span>© {new Date().getFullYear()} Artistic Duck Media &amp; Tech. Made in Pune.</span>
        <button className="footer__top" onClick={() => lenis?.scrollTo(0, { duration: 1.4 })}>
          Back to top ↑
        </button>
      </div>
      <div className="footer__giant" aria-hidden="true">Artistic Duck</div>
    </footer>
  )
}
