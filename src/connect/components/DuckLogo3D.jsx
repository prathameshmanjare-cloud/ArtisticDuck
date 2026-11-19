import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { brand } from '../data/connect'
import { ease } from './primitives'

const LOAD_BUDGET_MS = 1400

/**
 * Lightweight dimensional logo built with CSS 3D: the original artwork stacked in layers so it has
 * visible thickness when it turns. Used as the no-WebGL / reduced-motion fallback and as the
 * centre-piece of the service universe.
 */
export function DuckLogoLayered({ size = 'md', animate = true, className = '' }) {
  const reduce = useReducedMotion()
  const layers = 8
  return (
    <div className={`cx-duck cx-duck--${size} ${animate && !reduce ? 'is-alive' : ''} ${className}`} aria-hidden="true">
      <div className="cx-duck__stack">
        {Array.from({ length: layers }, (_, i) => (
          <img
            key={i}
            src={brand.logo.src}
            alt=""
            width="640"
            height="459"
            decoding="async"
            className="cx-duck__layer"
            style={{ '--i': i, '--n': layers }}
          />
        ))}
      </div>
      <span className="cx-duck__shadow" />
    </div>
  )
}

/**
 * The hero's 3D logo. Lazily loads a three.js scene; if WebGL is missing, too slow to load or the
 * visitor prefers reduced motion, it shows the CSS-layered fallback instead.
 *
 * phase: 'intro' (logo centred, emerging) | 'world' (logo moved aside for the hero copy)
 */
export default function DuckLogo3D({ phase, onReady }) {
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const reduce = useReducedMotion()
  const [mode, setMode] = useState(reduce ? 'fallback' : 'loading')
  const readyFired = useRef(false)

  const fireReady = () => {
    if (readyFired.current) return
    readyFired.current = true
    onReady?.()
  }

  // boot the WebGL scene
  useEffect(() => {
    if (reduce) {
      setMode('fallback')
      fireReady()
      return
    }
    let disposed = false
    let scene = null
    const timer = setTimeout(() => {
      if (!scene?.ready) {
        disposed = true
        scene?.dispose()
        scene = null
        setMode('fallback')
        fireReady()
      }
    }, LOAD_BUDGET_MS)

    import('../three/duckScene')
      .then(({ createDuckScene, supportsWebGL }) => {
        if (disposed || !canvasRef.current) return
        if (!supportsWebGL()) throw new Error('no webgl')
        scene = createDuckScene(canvasRef.current, {
          logoSrc: brand.logo.src,
          aspect: brand.logo.width / brand.logo.height,
          reduced: false,
          onReady: () => {
            if (disposed) return
            clearTimeout(timer)
            sceneRef.current = scene
            setMode('webgl')
            scene.play()
            fireReady()
          },
        })
      })
      .catch(() => {
        if (disposed) return
        clearTimeout(timer)
        setMode('fallback')
        fireReady()
      })

    return () => {
      disposed = true
      clearTimeout(timer)
      scene?.dispose()
      sceneRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce])

  // pause rendering while the hero is off screen or the tab is hidden
  useEffect(() => {
    if (mode !== 'webgl') return
    const el = canvasRef.current
    let visible = true
    const sync = () => (visible && !document.hidden ? sceneRef.current?.play() : sceneRef.current?.pause())
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      sync()
    })
    io.observe(el)
    document.addEventListener('visibilitychange', sync)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', sync)
    }
  }, [mode])

  // place the logo: centred during the intro, beside/above the copy once the visitor enters
  useEffect(() => {
    const s = sceneRef.current
    if (!s) return
    const place = () => {
      const wide = window.innerWidth >= 1024
      if (phase === 'intro') s.setLayout({ x: 0, y: wide ? 0.95 : 0.9, s: wide ? 0.74 : 0.9 })
      else s.setLayout(wide ? { x: 1.85, y: 0, s: 0.95 } : { x: 0, y: 2.15, s: 0.6 })
      if (phase === 'world') s.skip()
    }
    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [phase, mode])

  return (
    <div className={`cx-stage cx-stage--${phase} cx-stage--${mode}`} aria-hidden="true">
      <canvas ref={canvasRef} className="cx-stage__canvas" />
      {mode === 'fallback' && (
        <motion.div
          className="cx-stage__fallback"
          initial={reduce ? false : { opacity: 0, scale: 0.7, rotateY: -50, z: -300 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0, z: 0 }}
          transition={{ duration: 1.6, ease }}
        >
          <DuckLogoLayered size="lg" />
        </motion.div>
      )}
      {mode === 'fallback' && (
        <div className="cx-stage__trails">
          <span />
          <span />
          <span />
        </div>
      )}
    </div>
  )
}
