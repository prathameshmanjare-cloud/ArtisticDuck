import { useEffect } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { Icon } from './ui'

const ease = [0.22, 1, 0.36, 1]

const chips = [
  { t: ['Grow', 'faster'], icon: 'chart', cls: 'chip3d--a', depth: 26 },
  { t: ['Build', 'smarter'], icon: 'code', cls: 'chip3d--b', depth: 40 },
  { t: ['Think', 'bigger'], icon: 'bulb', cls: 'chip3d--c', depth: 18 },
  { t: ['Create', 'better'], icon: 'palette', cls: 'chip3d--d', depth: 32 },
]

function Chip({ c, sx, sy, ready, i }) {
  const x = useTransform(sx, [-1, 1], [-c.depth, c.depth])
  const y = useTransform(sy, [-1, 1], [-c.depth * 0.6, c.depth * 0.6])
  return (
    <motion.div className={`chip3d ${c.cls}`} style={{ x, y }}>
      <motion.div
        className="chip3d__in"
        initial={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
        animate={ready ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
        transition={{ delay: 0.9 + i * 0.12, duration: 0.9, ease }}
      >
        <span className="chip3d__icon">
          <Icon name={c.icon} size={20} stroke={2} />
        </span>
        <span>
          {c.t[0]}
          <br />
          {c.t[1]}
        </span>
      </motion.div>
    </motion.div>
  )
}

// The brand mark on a lit pedestal, with glass chips and abstract objects that respond to the pointer.
export function HeroVisual({ ready = true }) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 50, damping: 18 })
  const sy = useSpring(my, { stiffness: 50, damping: 18 })
  const rotateY = useTransform(sx, [-1, 1], [-9, 9])
  const rotateX = useTransform(sy, [-1, 1], [6, -6])
  const objX = useTransform(sx, [-1, 1], [30, -30])
  const objY = useTransform(sy, [-1, 1], [20, -20])

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
    <div className="hv" aria-hidden="true">
      <div className="hv__beam" />
      <motion.div className="hv__objects" style={{ x: objX, y: objY }}>
        <span className="obj obj--sphere" />
        <span className="obj obj--sphere-sm" />
        <span className="obj obj--torus" />
        <span className="obj obj--cube">
          <i />
          <i />
          <i />
        </span>
        <span className="obj obj--pill" />
      </motion.div>

      <motion.div
        className="hv__stage"
        initial={{ opacity: 0, y: 40 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 1.2, ease }}
      >
        <div className="hv__orbit">
          <span />
          <span />
        </div>
        <div className="hv__pedestal">
          <span className="hv__ring hv__ring--1" />
          <span className="hv__ring hv__ring--2" />
          <span className="hv__disc" />
        </div>
        <motion.div
          className="hv__mark"
          style={{ rotateX, rotateY }}
          initial={{ opacity: 0, scale: 0.75, filter: 'blur(14px)' }}
          animate={ready ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ delay: 0.45, duration: 1.3, ease }}
        >
          <img src="/logo.png" alt="" width="640" height="459" fetchPriority="high" />
          <span className="hv__shine" />
        </motion.div>
      </motion.div>

      {chips.map((c, i) => (
        <Chip key={c.cls} c={c} sx={sx} sy={sy} ready={ready} i={i} />
      ))}
    </div>
  )
}
