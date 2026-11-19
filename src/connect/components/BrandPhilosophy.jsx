import { motion } from 'motion/react'
import { principles } from '../data/connect'
import { ease, SectionHead } from './primitives'

const glyphs = {
  orange: (
    <>
      <circle cx="40" cy="40" r="22" />
      <path d="M40 18v44M18 40h44" opacity=".35" />
      <circle cx="40" cy="40" r="6" className="fill" />
    </>
  ),
  teal: (
    <>
      <rect x="18" y="18" width="44" height="44" rx="8" />
      <path d="M31 33l-7 7 7 7M49 33l7 7-7 7" />
    </>
  ),
  blue: (
    <>
      <path d="M16 58l16-16 10 8 22-24" />
      <path d="M52 26h12v12" />
    </>
  ),
}

export default function BrandPhilosophy() {
  return (
    <section className="cx-sec cx-sec--deep cx-phil" id="principles" aria-labelledby="cx-phil-title">
      <div className="cx-wrap">
        <SectionHead eyebrow="Brand philosophy" title={principles.heading} id="cx-phil-title" />

        <div className="cx-phil__stage">
          {/* light trail connecting the three principles */}
          <svg className="cx-phil__trail" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="cx-trail" x1="0" x2="1">
                <stop offset="0" stopColor="#FF741E" />
                <stop offset=".5" stopColor="#16B6A3" />
                <stop offset="1" stopColor="#4F9BFF" />
              </linearGradient>
            </defs>
            <motion.path
              d="M40 150 C 260 20, 420 20, 600 100 S 940 180, 1160 50"
              fill="none"
              stroke="url(#cx-trail)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: '0px 0px -15% 0px' }}
              transition={{ duration: 2, ease }}
            />
          </svg>

          <ol className="cx-phil__grid">
            {principles.items.map((p, i) => (
              <motion.li
                key={p.word}
                className={`cx-phil__col cx-phil__col--${p.tone}`}
                initial={{ opacity: 0, rotateX: 28, y: 50 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -12% 0px' }}
                transition={{ duration: 1, ease, delay: 0.2 + i * 0.15 }}
                style={{ transformPerspective: 900 }}
              >
                <svg className="cx-phil__glyph" viewBox="0 0 80 80" aria-hidden="true">
                  {glyphs[p.tone]}
                </svg>
                <span className="cx-phil__num" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className="cx-phil__word">{p.word}</h3>
                <p className="cx-phil__line">{p.line}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
