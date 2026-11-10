import { Link, useParams } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { work } from '../data/content'
import Art from '../components/Art'
import WorkGrid from '../components/WorkGrid'
import NotFound from './NotFound'
import { Arrow, Button, Eyebrow, PageHero, Reveal, Seo, ease } from '../components/ui'

export default function Work() {
  const lead = work[0]
  return (
    <>
      <Seo title="Work" description="How Artistic Duck approaches branding, advertising, marketing and technology projects, from challenge to results." />
      <PageHero
        eyebrow="Our work"
        title="Ideas into *impact.*"
        lede="Every project follows the same path: understand the challenge, set the strategy, give it a creative direction, build it properly and measure what changes."
      />

      <section className="sec sec--cream">
        <div className="wrap">
          <Reveal className="note">
            <strong>About these studies.</strong> The projects below are capability studies — they show how we approach each kind of brief.
            Client case studies with approved results and screenshots will be published here as they are cleared.
          </Reveal>

          <Reveal>
            <Link to={`/work/${lead.slug}`} className="feature" style={{ '--accent': lead.accent }}>
              <div className="feature__media">
                <Art kind={lead.art} accent={lead.accent} />
              </div>
              <div className="feature__copy">
                <p className="wcard__cat">Featured · {lead.cat} · {lead.sector}</p>
                <h2>{lead.title}</h2>
                <p>{lead.summary}</p>
                <span className="feature__go">
                  Read the study <Arrow size={14} />
                </span>
              </div>
            </Link>
          </Reveal>

          <WorkGrid filters />
        </div>
      </section>
    </>
  )
}

const chapters = [
  ['challenge', 'Challenge'],
  ['strategy', 'Strategy'],
  ['creative', 'Creative direction'],
  ['development', 'Development'],
  ['results', 'Results'],
]

export function WorkDetail() {
  const { slug } = useParams()
  const ref = useRef()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const artY = useTransform(scrollYProgress, [0, 1], [-40, 40])
  const idx = work.findIndex((w) => w.slug === slug)
  if (idx < 0) return <NotFound />
  const w = work[idx]
  const next = work[(idx + 1) % work.length]

  return (
    <>
      <Seo title={w.title} description={w.summary} />
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Work', to: '/work' }, { label: w.cat }]}
        eyebrow={`${w.cat} · ${w.sector}`}
        title={w.title}
        lede={w.summary}
      >
        <p className="phero__badge">Capability study — illustrates our approach, not a specific client engagement.</p>
      </PageHero>

      <section className="sec sec--cream" ref={ref}>
        <div className="wrap">
          <div className="cs__hero" style={{ '--accent': w.accent }}>
            <motion.div style={{ y: artY }} className="cs__art">
              <Art kind={w.art} accent={w.accent} label={`Illustration for ${w.title}`} />
            </motion.div>
          </div>
          <div className="cs__meta">
            <div>
              <span>Discipline</span>
              <strong>{w.cat}</strong>
            </div>
            <div>
              <span>Sector</span>
              <strong>{w.sector}</strong>
            </div>
            <div className="cs__deliv">
              <span>Deliverables</span>
              <strong>{w.deliverables.join(' · ')}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="sec sec--white">
        <div className="wrap cs">
          <nav className="cs__toc" aria-label="Study sections">
            {chapters.map(([k, label], i) => (
              <a key={k} href={`#cs-${k}`}>
                <span>0{i + 1}</span>
                {label}
              </a>
            ))}
          </nav>
          <div className="cs__body">
            {chapters.map(([k, label], i) => (
              <motion.section
                key={k}
                id={`cs-${k}`}
                className="cs__ch"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15% 0px' }}
                transition={{ duration: 0.7, ease }}
              >
                <Eyebrow>0{i + 1} — {label}</Eyebrow>
                <p>{w[k]}</p>
              </motion.section>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--navy">
        <div className="sec__deco" aria-hidden="true"><span className="grid-bg" /></div>
        <div className="wrap nextcs">
          <div>
            <p className="eyebrow eyebrow--light">Next study</p>
            <Link to={`/work/${next.slug}`} className="nextcs__link">
              {next.title} <Arrow size={22} />
            </Link>
          </div>
          <Button to={`/contact#brief`}>Start a similar project</Button>
        </div>
      </section>
    </>
  )
}
