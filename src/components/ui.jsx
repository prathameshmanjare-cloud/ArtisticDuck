import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'motion/react'

const ease = [0.22, 1, 0.36, 1]

export function Reveal({ children, delay = 0, y = 40, as = 'div', className, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Splits a line into words that slide up from behind a mask. Wrap a word in *asterisks* to italicise it.
export function SplitLine({ text, delay = 0, stagger = 0.06, animate }) {
  let inEm = false
  const words = text.split(' ').map((w) => {
    if (w.startsWith('*')) inEm = true
    const em = inEm
    if (w.endsWith('*')) inEm = false
    return { em, clean: w.replace(/\*/g, '') }
  })
  const trigger = animate === undefined ? { whileInView: 'show', viewport: { once: true } } : { animate: animate ? 'show' : 'hide' }
  return (
    <motion.span className="split" initial="hide" {...trigger}>
      {words.map(({ em, clean }, i) => {
        return (
          <span className="split__mask" key={i}>
            <motion.span
              className={em ? 'split__word serif' : 'split__word'}
              variants={{ hide: { y: '110%', rotate: 4 }, show: { y: '0%', rotate: 0 } }}
              transition={{ duration: 1, ease, delay: delay + i * stagger }}
            >
              {clean}
            </motion.span>
            {i < words.length - 1 && ' '}
          </span>
        )
      })}
    </motion.span>
  )
}

export function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 15 })
  const sy = useSpring(y, { stiffness: 220, damping: 15 })
  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy, display: 'inline-flex' }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.span>
  )
}

export function Button({ to, href, children, variant = 'solid', arrow = true, ...rest }) {
  const cls = `btn btn--${variant}`
  const inner = (
    <>
      <span className="btn__label" data-text={typeof children === 'string' ? children : undefined}>
        <span>{children}</span>
      </span>
      {arrow && (
        <span className="btn__arrow" aria-hidden="true">
          <Arrow />
        </span>
      )}
    </>
  )
  let el
  if (to) el = <Link to={to} className={cls} {...rest}>{inner}</Link>
  else if (href) el = <a href={href} className={cls} {...rest}>{inner}</a>
  else el = <button className={cls} {...rest}>{inner}</button>
  return <Magnetic strength={0.2}>{el}</Magnetic>
}

export function Arrow({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function Marquee({ items, speed = 40, className = '', sep = '✺' }) {
  const row = (
    <div className="marquee__row">
      {items.map((t, i) => (
        <span key={i} className="marquee__item">
          {t}
          <span className="marquee__sep">{sep}</span>
        </span>
      ))}
    </div>
  )
  return (
    <div className={`marquee ${className}`} style={{ '--speed': `${speed}s` }}>
      <div className="marquee__track">
        {row}
        {row}
      </div>
    </div>
  )
}

export function Eyebrow({ children, num }) {
  return (
    <p className="eyebrow">
      {num && <span className="eyebrow__num">{num}</span>}
      {children}
    </p>
  )
}

export function PageHero({ eyebrow, title, lede, children }) {
  return (
    <header className="page-hero">
      <div className="wrap">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="display page-hero__title">
          <SplitLine text={title} delay={0.15} animate />
        </h1>
        {lede && (
          <Reveal delay={0.5} as="p" className="page-hero__lede">
            {lede}
          </Reveal>
        )}
        {children}
      </div>
    </header>
  )
}

const paths = {
  camera: (
    <>
      <rect x="3" y="8" width="26" height="18" rx="4" />
      <path d="M11 8l2-4h6l2 4" />
      <circle cx="16" cy="17" r="5" />
    </>
  ),
  phone: (
    <>
      <rect x="9" y="3" width="14" height="26" rx="3" />
      <path d="M14 7h4M14 18l5-3-5-3z" />
    </>
  ),
  target: (
    <>
      <circle cx="16" cy="16" r="12" />
      <circle cx="16" cy="16" r="7" />
      <circle cx="16" cy="16" r="2" />
      <path d="M16 16L28 4M24 4h4v4" />
    </>
  ),
  store: (
    <>
      <path d="M4 12l3-7h18l3 7M4 12h24M4 12c0 2 1.8 3.5 4 3.5S12 14 12 12c0 2 1.8 3.5 4 3.5S20 14 20 12c0 2 1.8 3.5 4 3.5S28 14 28 12" />
      <path d="M6 15.5V27h20V15.5M13 27v-6h6v6" />
    </>
  ),
  chart: (
    <>
      <path d="M4 27h24" />
      <path d="M6 22l7-7 5 4 9-10" />
      <path d="M22 9h5v5" />
    </>
  ),
  search: (
    <>
      <circle cx="14" cy="14" r="9" />
      <path d="M21 21l7 7M10 14h8M14 10v8" />
    </>
  ),
  code: (
    <>
      <path d="M11 9l-7 7 7 7M21 9l7 7-7 7M18 6l-4 20" />
    </>
  ),
  spark: (
    <>
      <path d="M16 3v6M16 23v6M3 16h6M23 16h6M7 7l4 4M21 21l4 4M25 7l-4 4M11 21l-4 4" />
      <circle cx="16" cy="16" r="3" />
    </>
  ),
}

export function Icon({ name, size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

export function DuckMark({ size = 46 }) {
  return (
    <span className="logo__badge" style={{ width: size, height: size }}>
      <img src="/logo-sm.png" alt="" style={{ width: size * 0.82 }} />
    </span>
  )
}
