import { Fragment } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'

export const ease = [0.22, 1, 0.36, 1]

/** Fade-and-rise when scrolled into view (once). Motion's reducedMotion="user" flattens it. */
export function Reveal({ as = 'div', delay = 0, y = 28, children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Masked word-by-word reveal. Wrap words in *asterisks* to accent them. */
export function SplitText({ text, delay = 0, stagger = 0.06, inView = true, accent = 'cx-accent' }) {
  const words = []
  text.split(' ').reduce((on, w) => {
    const start = on || w.startsWith('*')
    words.push({ hl: start, w: w.replace(/\*/g, '') })
    return start && !w.endsWith('*')
  }, false)
  const trigger = inView ? { whileInView: 'show', viewport: { once: true, margin: '0px 0px -8% 0px' } } : { animate: 'show' }
  return (
    <>
      <span className="cx-sr">{text.replace(/\*/g, '')}</span>
      <motion.span className="cx-split" initial="hide" {...trigger} aria-hidden="true">
        {words.map(({ hl, w }, i) => (
          <Fragment key={i}>
            <span className="cx-split__mask">
              <motion.span
                className={hl ? `cx-split__word ${accent}` : 'cx-split__word'}
                variants={{ hide: { y: '105%' }, show: { y: '0%' } }}
                transition={{ duration: 0.9, ease, delay: delay + i * stagger }}
              >
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </motion.span>
    </>
  )
}

export function Eyebrow({ children, className = '' }) {
  return (
    <p className={`cx-eyebrow ${className}`}>
      <span className="cx-eyebrow__bar" aria-hidden="true" />
      {children}
    </p>
  )
}

export function SectionHead({ eyebrow, title, lede, id }) {
  return (
    <header className="cx-shead">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="cx-h2" id={id}>
        <SplitText text={title} />
      </h2>
      {lede && (
        <Reveal as="p" className="cx-lede" delay={0.15}>
          {lede}
        </Reveal>
      )}
    </header>
  )
}

/**
 * Button/link with a sliding label on hover.
 * variant: primary (orange), ghost (outline, inherits colour), solid (navy), light (ivory)
 */
export function Btn({ href, children, variant = 'primary', icon, iconAfter = 'arrow', className = '', ...rest }) {
  const cls = `cx-btn cx-btn--${variant} ${className}`
  const inner = (
    <>
      {icon && <span className="cx-btn__lead" aria-hidden="true">{icon}</span>}
      <span className="cx-btn__label">
        <span data-text={typeof children === 'string' ? children : undefined}>{children}</span>
      </span>
      {iconAfter === 'arrow' && (
        <span className="cx-btn__arrow" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </>
  )
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    )
  }
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  )
}

/** The original logo, never redrawn. */
export function BrandMark({ size = 'sm', className = '' }) {
  const src = size === 'lg' ? '/connect/logo-480.webp' : '/connect/logo-240.webp'
  return <img src={src} alt="Artistic Duckk Media & Tech logo" width="640" height="459" className={`cx-mark ${className}`} decoding="async" />
}

/** Lets long email addresses wrap after the @ instead of mid-word. */
export function Breakable({ text }) {
  const at = text.indexOf('@')
  if (at < 0) return text
  return (
    <>
      {text.slice(0, at + 1)}
      <wbr />
      {text.slice(at + 1)}
    </>
  )
}

/** Pointer-driven 3D tilt for cards (fine pointers only; disabled for reduced motion). */
export function useTilt(max = 8) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 18 })
  const sy = useSpring(y, { stiffness: 180, damping: 18 })
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max])
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max])
  const handlers = {
    onPointerMove: (e) => {
      if (reduce || e.pointerType !== 'mouse') return
      const r = e.currentTarget.getBoundingClientRect()
      x.set((e.clientX - r.left) / r.width - 0.5)
      y.set((e.clientY - r.top) / r.height - 0.5)
    },
    onPointerLeave: () => {
      x.set(0)
      y.set(0)
    },
  }
  return { style: { rotateX, rotateY, transformPerspective: 900 }, handlers }
}
