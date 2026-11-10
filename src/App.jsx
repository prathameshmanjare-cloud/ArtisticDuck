import { lazy, Suspense, useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { ReactLenis, useLenis } from 'lenis/react'
import { Footer, Nav } from './components/Layout'
import Home from './pages/Home'
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const ServiceDetail = lazy(() => import('./pages/Services').then((m) => ({ default: m.ServiceDetail })))
const Work = lazy(() => import('./pages/Work'))
const WorkDetail = lazy(() => import('./pages/Work').then((m) => ({ default: m.WorkDetail })))
const Careers = lazy(() => import('./pages/Careers'))
const Insights = lazy(() => import('./pages/Insights'))
const Article = lazy(() => import('./pages/Insights').then((m) => ({ default: m.Article })))
const Contact = lazy(() => import('./pages/Contact'))
import NotFound from './pages/NotFound'

const ease = [0.76, 0, 0.24, 1]

function ScrollManager() {
  const { pathname, hash } = useLocation()
  const lenis = useLenis()
  const prevPath = useRef(pathname)
  useEffect(() => {
    if (!lenis) return
    const samePage = prevPath.current === pathname
    prevPath.current = pathname
    if (!samePage) lenis.scrollTo(0, { immediate: true, force: true })
    if (!hash) return
    // the new page may still be exiting/lazy-loading: wait for the anchor to exist, then scroll to it
    let tries = 0
    let t
    const seek = () => {
      const el = document.querySelector(hash)
      // ignore the outgoing page's copy of the element while the curtain transition runs
      if (el && (samePage || tries > 6)) lenis.scrollTo(el, { offset: -90, immediate: !samePage, force: true })
      else if (tries++ < 40) t = setTimeout(seek, 100)
    }
    t = setTimeout(seek, samePage ? 0 : 100)
    return () => clearTimeout(t)
  }, [pathname, hash, lenis])
  return null
}

export default function App() {
  const location = useLocation()
  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -100 } }}>
        <ScrollManager />
        <Nav />
        <AnimatePresence mode="wait">
          <motion.main id="main" key={location.pathname} tabIndex={-1}>
            <motion.div
              className="curtain"
              aria-hidden="true"
              initial={{ scaleY: 1, transformOrigin: 'top' }}
              animate={{ scaleY: 0, transformOrigin: 'top' }}
              exit={{ scaleY: 1, transformOrigin: 'bottom' }}
              transition={{ duration: 0.55, ease }}
            />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              <Suspense fallback={<div className="page-loading" />}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/work" element={<Work />} />
                <Route path="/work/:slug" element={<WorkDetail />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/insights/:slug" element={<Article />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              </Suspense>
            </motion.div>
          </motion.main>
        </AnimatePresence>
        <Footer />
      </ReactLenis>
    </MotionConfig>
  )
}
