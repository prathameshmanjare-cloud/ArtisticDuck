import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { MotionConfig, motion } from 'motion/react'
import ConnectHeader from './components/ConnectHeader'
import HeroSection from './components/HeroSection'
import MobileActionBar from './components/MobileActionBar'
import ConnectFooter from './components/ConnectFooter'

// Everything below the first screen is split out so the intro paints fast on phones.
const BelowFold = lazy(() => import('./BelowFold'))

const SEEN_KEY = 'cx-intro-seen'

function initialPhase() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'world'
    if (window.location.hash && window.location.hash !== '#home') return 'world'
    if (sessionStorage.getItem(SEEN_KEY)) return 'world'
  } catch {
    /* storage blocked: show the intro */
  }
  return 'intro'
}

export default function ConnectPage() {
  const [phase, setPhase] = useState(initialPhase)

  // the intro always starts at the top, even if the browser restored an old scroll position
  useEffect(() => {
    if (phase !== 'intro') return
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const enter = useCallback(() => {
    setPhase('world')
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* ignore */
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a className="cx-skip" href="#contact" onClick={enter}>
        Skip to contact details
      </a>
      <ConnectHeader hidden={phase === 'intro'} />
      <motion.main id="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <HeroSection phase={phase} onEnter={enter} />
        <Suspense fallback={<div className="cx-loading" aria-hidden="true" />}>
          <BelowFold />
        </Suspense>
      </motion.main>
      <ConnectFooter />
      {phase === 'world' && <MobileActionBar />}
    </MotionConfig>
  )
}
