import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { brand, nav, whatsappUrl } from '../data/connect'
import { BrandMark, ease } from './primitives'
import { Icon } from './Icons'

/** Highlights the section currently in view. */
function useActiveSection(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    let io
    let tries = 0
    let timer
    // sections below the hero load lazily: wait until they exist before observing
    const attach = () => {
      const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
      if (els.length < ids.length && tries++ < 40) {
        timer = setTimeout(attach, 250)
        return
      }
      io = new IntersectionObserver(
        (entries) => {
          const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
          if (hit) setActive(hit.target.id)
        },
        { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
      )
      els.forEach((el) => io.observe(el))
    }
    attach()
    return () => {
      clearTimeout(timer)
      io?.disconnect()
    }
  }, [ids])
  return active
}

const ids = nav.map((n) => n.id)

export default function ConnectHeader({ hidden = false }) {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile menu: lock scroll, close on Escape, keep focus inside.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const first = panelRef.current?.querySelector('a, button')
    first?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
      if (e.key === 'Tab' && panelRef.current) {
        const f = [toggleRef.current, ...panelRef.current.querySelectorAll('a, button')]
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
  }, [open])

  return (
    <header className={`cx-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''} ${hidden ? 'is-hidden' : ''}`} inert={hidden || undefined}>
      <div className="cx-wrap cx-header__bar">
        <a href="#home" className="cx-header__brand" aria-label={`${brand.legalName} — back to top`}>
          <BrandMark />
          <span className="cx-header__name">
            {brand.name}
            <small>{brand.descriptor}</small>
          </span>
        </a>

        <nav className="cx-header__nav" aria-label="On this page">
          <ul>
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} aria-current={active === n.id ? 'location' : undefined}>
                  {active === n.id && <motion.span layoutId="cx-nav-pill" className="cx-header__pill" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
                  <span className="cx-header__txt">{n.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href={brand.vcard.href} className="cx-header__save">
          <Icon name="download" size={16} stroke={2} />
          <span>Save company contact</span>
        </a>

        <button
          ref={toggleRef}
          className="cx-header__toggle"
          aria-expanded={open}
          aria-controls="cx-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="cx-burger" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="cx-menu"
            ref={panelRef}
            className="cx-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Page menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease }}
          >
            <nav aria-label="On this page" className="cx-wrap">
              <ol className="cx-menu__list">
                {nav.map((n, i) => (
                  <motion.li
                    key={n.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease, delay: 0.12 + i * 0.05 }}
                  >
                    <a href={`#${n.id}`} onClick={() => setOpen(false)} aria-current={active === n.id ? 'location' : undefined}>
                      <span className="cx-menu__num">0{i + 1}</span>
                      {n.label}
                    </a>
                  </motion.li>
                ))}
              </ol>
              <motion.div
                className="cx-menu__actions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.4 }}
              >
                <a className="cx-btn cx-btn--primary" href={brand.vcard.href} onClick={() => setOpen(false)}>
                  <Icon name="download" size={18} stroke={2} /> Save Company Contact
                </a>
                <a className="cx-btn cx-btn--ghost" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={18} /> WhatsApp
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
