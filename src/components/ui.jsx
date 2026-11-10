import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

export const ease = [0.22, 1, 0.36, 1]
const SITE = 'Artistic Duck Media & Tech'

// React 19 hoists these tags into <head>.
export function Seo({ title, description }) {
  const full = title ? `${title} — ${SITE}` : `${SITE} — Branding, Advertising, Marketing & Technology`
  return (
    <>
      <title>{full}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={full} />
      {description && <meta property="og:description" content={description} />}
    </>
  )
}

export function Reveal({ children, delay = 0, y = 32, as = 'div', className, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Words slide up from a mask. Wrap words in *asterisks* to highlight them.
export function SplitLine({ text, delay = 0, stagger = 0.045, animate }) {
  let inHl = false
  const words = text.split(' ').map((w) => {
    if (w.startsWith('*')) inHl = true
    const hl = inHl
    if (w.endsWith('*')) inHl = false
    return { hl, clean: w.replace(/\*/g, '') }
  })
  const trigger = animate === undefined ? { whileInView: 'show', viewport: { once: true } } : { animate: animate ? 'show' : 'hide' }
  return (
    <motion.span className="split" initial="hide" {...trigger}>
      {words.map(({ hl, clean }, i) => (
        <span className="split__mask" key={i}>
          <motion.span
            className={hl ? 'split__word hl' : 'split__word'}
            variants={{ hide: { y: '110%' }, show: { y: '0%' } }}
            transition={{ duration: 0.9, ease, delay: delay + i * stagger }}
          >
            {clean}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </motion.span>
  )
}

export function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef()
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16 })
  const sy = useSpring(y, { stiffness: 220, damping: 16 })
  return (
    <motion.span
      ref={ref}
      className="magnetic"
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse') return
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

// variants: primary (yellow), light (outline on dark), dark (outline on light), navy (solid navy)
export function Button({ to, href, children, variant = 'primary', icon = 'arrow', size, className = '', ...rest }) {
  const cls = `btn btn--${variant} ${size ? `btn--${size}` : ''} ${className}`
  const inner = (
    <>
      <span className="btn__label" data-text={typeof children === 'string' ? children : undefined}>
        <span>{children}</span>
      </span>
      {icon && (
        <span className="btn__icon" aria-hidden="true">
          {icon === 'arrow' ? <Arrow /> : <Icon name={icon} size={16} />}
        </span>
      )}
    </>
  )
  let el
  if (to) el = <Link to={to} className={cls} {...rest}>{inner}</Link>
  else if (href) el = <a href={href} className={cls} {...rest}>{inner}</a>
  else el = <button className={cls} {...rest}>{inner}</button>
  return <Magnetic strength={0.18}>{el}</Magnetic>
}

export function Arrow({ size = 16, dir = 'ne' }) {
  if (dir === 'right')
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 12.5L12.5 3.5M12.5 3.5H5.5M12.5 3.5V10.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function Eyebrow({ children, light, className = '' }) {
  return <p className={`eyebrow ${light ? 'eyebrow--light' : ''} ${className}`}>{children}</p>
}

export function SectionHead({ eyebrow, title, lede, light, align = 'left', children }) {
  return (
    <div className={`shead shead--${align} ${light ? 'shead--light' : ''}`}>
      <div>
        {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
        <h2 className="h2">
          <SplitLine text={title} />
        </h2>
      </div>
      {(lede || children) && (
        <Reveal className="shead__side" delay={0.15}>
          {lede && <p className="lede">{lede}</p>}
          {children}
        </Reveal>
      )}
    </div>
  )
}

export function PageHero({ eyebrow, title, lede, children, aside, crumbs }) {
  return (
    <header className="phero">
      <div className="phero__bg" aria-hidden="true">
        <span className="phero__glow" />
        <span className="grid-bg" />
      </div>
      <div className="wrap phero__grid">
        <div className="phero__copy">
          {crumbs && (
            <nav className="crumbs" aria-label="Breadcrumb">
              {crumbs.map((c, i) => (
                <span key={c.label}>
                  {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                  {i < crumbs.length - 1 && <i aria-hidden="true">/</i>}
                </span>
              ))}
            </nav>
          )}
          {eyebrow && <Eyebrow light>{eyebrow}</Eyebrow>}
          <h1 className="phero__title">
            <SplitLine text={title} delay={0.1} animate />
          </h1>
          {lede && (
            <Reveal delay={0.35} as="p" className="phero__lede">
              {lede}
            </Reveal>
          )}
          {children && <Reveal delay={0.45}>{children}</Reveal>}
        </div>
        {aside && (
          <Reveal className="phero__aside" delay={0.2} y={20}>
            {aside}
          </Reveal>
        )}
      </div>
      <svg className="phero__curve" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 80 C 400 10, 1000 10, 1440 60 L1440 80 Z" />
      </svg>
    </header>
  )
}

export function Marquee({ items, speed = 40, className = '', sep = '✦' }) {
  const row = (hidden) => (
    <div className="marquee__row" aria-hidden={hidden || undefined}>
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
        {row(false)}
        {row(true)}
      </div>
    </div>
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
      <path d="M21 21l7 7" />
    </>
  ),
  code: <path d="M11 9l-7 7 7 7M21 9l7 7-7 7M18 6l-4 20" />,
  spark: (
    <>
      <path d="M16 3v6M16 23v6M3 16h6M23 16h6M7 7l4 4M21 21l4 4M25 7l-4 4M11 21l-4 4" />
      <circle cx="16" cy="16" r="3" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="6" width="24" height="22" rx="4" />
      <path d="M4 13h24M11 3v6M21 3v6" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="7" width="26" height="18" rx="3" />
      <path d="M4 9l12 9 12-9" />
    </>
  ),
  pin: (
    <>
      <path d="M16 29s9-8.5 9-15a9 9 0 10-18 0c0 6.5 9 15 9 15z" />
      <circle cx="16" cy="14" r="3.5" />
    </>
  ),
  call: <path d="M7 4h5l2 6-3 2a15 15 0 007 7l2-3 6 2v5a3 3 0 01-3 3C13 26 6 19 4 7a3 3 0 013-3z" />,
  check: <path d="M6 16l7 7 13-14" />,
  bulb: (
    <>
      <path d="M11 22h10M12 26h8M16 3a9 9 0 00-5 16.5V22h10v-2.5A9 9 0 0016 3z" />
    </>
  ),
  palette: (
    <>
      <path d="M16 3a13 13 0 100 26c2 0 2.5-1.5 2-3-.7-2 .5-3.5 2.5-3.5H24a5 5 0 005-5C29 9 23 3 16 3z" />
      <circle cx="10" cy="14" r="1.6" />
      <circle cx="15" cy="9" r="1.6" />
      <circle cx="21" cy="10" r="1.6" />
    </>
  ),
  people: (
    <>
      <circle cx="11" cy="11" r="4" />
      <circle cx="22" cy="12" r="3" />
      <path d="M3 26c0-4.5 3.5-7.5 8-7.5s8 3 8 7.5M19 19.5c4 0 8 2 8 6" />
    </>
  ),
}

export function Icon({ name, size = 24, stroke = 1.7 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

export function Logo({ small }) {
  return (
    <span className={`brand ${small ? 'brand--sm' : ''}`}>
      <img src="/logo-sm.png" alt="" width="160" height="114" className="brand__mark" />
      <span className="brand__text">
        Artistic Duck<small>Media and Tech</small>
      </span>
    </span>
  )
}
