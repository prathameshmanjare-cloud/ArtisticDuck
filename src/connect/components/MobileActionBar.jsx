import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { brand, whatsappUrl } from '../data/connect'
import { ease } from './primitives'
import { Icon } from './Icons'

/**
 * Sticky Save Contact / WhatsApp bar for phones, plus a back-to-top control.
 * Appears once the hero has scrolled away and hides while the form, contact
 * section or footer are on screen so it never covers inputs or duplicates actions.
 */
export default function MobileActionBar() {
  const [pastHero, setPastHero] = useState(false)
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    let io1
    let io2
    let timer
    let tries = 0
    const seen = new Set()
    const attach = () => {
      const hero = document.getElementById('home')
      const blockers = ['enquiry', 'contact'].map((id) => document.getElementById(id)).concat(document.querySelector('.cx-footer')).filter(Boolean)
      if (blockers.length < 3 && tries++ < 40) {
        timer = setTimeout(attach, 250)
        return
      }
      io1 = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting), { rootMargin: '0px 0px -40% 0px' })
      io2 = new IntersectionObserver((entries) => {
        entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)))
        setBlocked(seen.size > 0)
      })
      if (hero) io1.observe(hero)
      blockers.forEach((b) => io2.observe(b))
    }
    attach()
    return () => {
      clearTimeout(timer)
      io1?.disconnect()
      io2?.disconnect()
    }
  }, [])

  const show = pastHero && !blocked
  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    document.getElementById('cx-hero-title')?.focus({ preventScroll: true })
  }

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            className="cx-mbar"
            initial={{ y: '130%' }}
            animate={{ y: 0 }}
            exit={{ y: '130%' }}
            transition={{ duration: 0.45, ease }}
          >
            <a href={brand.vcard.href} className="cx-mbar__save" aria-label="Save company contact">
              <Icon name="download" size={18} stroke={2} /> Save contact
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="cx-mbar__wa">
              <Icon name="whatsapp" size={18} /> WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {pastHero && (
          <motion.button
            type="button"
            className="cx-totop"
            aria-label="Back to top"
            onClick={toTop}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Icon name="arrowUp" size={18} stroke={2} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
