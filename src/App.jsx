import { useCallback, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ReactLenis, useLenis } from 'lenis/react'
import { Cursor, Footer, Loader, Nav } from './components/Layout'
import { Button, PageHero } from './components/ui'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Work from './pages/Work'
import Careers from './pages/Careers'
import Insights from './pages/Insights'
import Contact from './pages/Contact'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  const lenis = useLenis()
  useEffect(() => {
    if (!lenis) return
    if (hash) {
      // wait for the new page to mount before scrolling to its anchor
      const t = setTimeout(() => lenis.scrollTo(hash, { offset: -110, immediate: true }), 80)
      return () => clearTimeout(t)
    }
    lenis.scrollTo(0, { immediate: true })
  }, [pathname, hash, lenis])
  return null
}

function NotFound() {
  return (
    <PageHero eyebrow="404" title="This duck *flew off.*" lede="The page you’re after doesn’t exist, or it moved.">
      <div className="mt-s">
        <Button to="/" variant="ink">Back home</Button>
      </div>
    </PageHero>
  )
}

export default function App() {
  const location = useLocation()
  const [loading, setLoading] = useState(() => {
    try {
      return !sessionStorage.getItem('ad-intro')
    } catch {
      return true
    }
  })
  const done = useCallback(() => {
    try {
      sessionStorage.setItem('ad-intro', '1')
    } catch {
      /* private mode */
    }
    setLoading(false)
  }, [])

  return (
    <ReactLenis root options={{ lerp: 0.1, wheelMultiplier: 1 }}>
      <AnimatePresence>{loading && <Loader onDone={done} />}</AnimatePresence>
      <Cursor />
      <ScrollManager />
      <Nav />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home ready={!loading} />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/work" element={<Work />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </ReactLenis>
  )
}
