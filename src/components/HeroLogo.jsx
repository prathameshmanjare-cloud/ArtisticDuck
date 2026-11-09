import { useEffect } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'

const ease = [0.22, 1, 0.36, 1]

// Full-bleed decorative layer: soft light, thin gold orbit arc and the sweeping wave at the bottom.
export function HeroBackdrop() {
  return (
    <div className="hero__bg" aria-hidden="true">
      <div className="hero__glow hero__glow--a" />
      <div className="hero__glow hero__glow--b" />
      <svg className="hero__waves" viewBox="0 0 1600 1000" preserveAspectRatio="xMaxYMax slice">
        <defs>
          <linearGradient id="hw-gold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffb715" stopOpacity="0" />
            <stop offset="0.35" stopColor="#ffb715" stopOpacity="0.9" />
            <stop offset="0.75" stopColor="#ffd56a" stopOpacity="1" />
            <stop offset="1" stopColor="#ffb715" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="hw-arc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffb715" stopOpacity="0" />
            <stop offset="0.4" stopColor="#ffcf5a" stopOpacity="0.55" />
            <stop offset="1" stopColor="#5f8cff" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="hw-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1d3c9a" stopOpacity="0.55" />
            <stop offset="1" stopColor="#0a1440" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M930 420 C 980 250, 1130 150, 1290 145 C 1450 140, 1560 230, 1600 300"
          fill="none"
          stroke="url(#hw-arc)"
          strokeWidth="1.6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.6, duration: 2.2, ease }}
        />
        <path d="M0 1000 L0 930 C 380 900, 760 820, 1080 760 C 1300 720, 1470 700, 1600 690 L1600 1000 Z" fill="url(#hw-fill)" />
        <motion.path
          className="hero__wave"
          d="M260 960 C 560 900, 820 820, 1080 770 C 1300 728, 1460 712, 1600 706"
          fill="none"
          stroke="url(#hw-gold)"
          strokeWidth="2.4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 2.4, ease }}
        />
        <motion.path
          d="M620 1000 C 900 940, 1200 860, 1600 780"
          fill="none"
          stroke="url(#hw-gold)"
          strokeWidth="1.4"
          strokeOpacity="0.55"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.2, duration: 2.4, ease }}
        />
      </svg>
      <div className="hero__grain" />
    </div>
  )
}

// The brand mark with an entrance, a slow float, a breathing glow and pointer-driven tilt.
export function HeroLogo({ ready }) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18 })
  const sy = useSpring(my, { stiffness: 60, damping: 18 })
  const rotateY = useTransform(sx, [-1, 1], [-10, 10])
  const rotateX = useTransform(sy, [-1, 1], [8, -8])
  const glowX = useTransform(sx, [-1, 1], [-24, 24])
  const glowY = useTransform(sy, [-1, 1], [-18, 18])

  useEffect(() => {
    if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const move = (e) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1)
      my.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [mx, my, reduce])

  return (
    <div className="hero__visual" aria-hidden="true">
      <motion.div className="hero__halo" style={{ x: glowX, y: glowY }} />
      <motion.div
        className="hero__ring"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={ready ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.5, duration: 1.4, ease }}
      >
        <span className="hero__orbit hero__orbit--1"><i /></span>
        <span className="hero__orbit hero__orbit--2"><i /></span>
      </motion.div>
      <motion.div
        className="hero__mark"
        style={{ rotateX, rotateY }}
        initial={{ opacity: 0, scale: 0.7, y: 40, filter: 'blur(14px)' }}
        animate={ready ? { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ delay: 0.35, duration: 1.4, ease }}
      >
        <motion.div
          className="hero__float"
          animate={reduce ? {} : { y: [0, -16, 0], rotate: [0, -1.5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img src="/logo.png" alt="" width="640" height="459" fetchPriority="high" />
          <span className="hero__shine" />
        </motion.div>
      </motion.div>
      <motion.div
        className="hero__shadow"
        animate={reduce ? {} : { scaleX: [1, 0.86, 1], opacity: [0.55, 0.35, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
