import { Link, useParams } from 'react-router-dom'
import { services } from '../data/site'
import { industries, pillars, process, work } from '../data/content'
import Art from '../components/Art'
import ServicePanels from '../components/ServicePanels'
import { WorkCard } from '../components/WorkGrid'
import NotFound from './NotFound'
import { Arrow, Button, Eyebrow, Icon, PageHero, Reveal, SectionHead, Seo } from '../components/ui'

const svcBySlug = Object.fromEntries(services.map((s) => [s.slug, s]))
const typeFor = {
  'branding-identity': 'Brand identity',
  'advertising-campaigns': 'Advertising campaign',
  'digital-marketing-growth': 'Digital marketing',
  'technology-development': 'Website',
}

export default function Services() {
  return (
    <>
      <Seo title="Services" description="Branding & identity, advertising & creative campaigns, digital marketing & growth, and technology & software development — under one roof in Pune." />
      <PageHero
        eyebrow="Services"
        title="Everything your brand needs, *under one roof.*"
        lede="Four disciplines that work better together. Start with one, or let one team take you from strategy to launch and growth."
        aside={<Art kind="brand" accent="#FFC107" />}
      >
        <div className="row-gap">
          <Button to="/contact#brief">Start a project</Button>
        </div>
      </PageHero>

      <section className="sec sec--cream">
        <div className="wrap">
          <ServicePanels />
        </div>
      </section>

      {pillars.map((p, idx) => (
        <section key={p.slug} className={`sec ${idx % 2 ? 'sec--white' : 'sec--cream'} svcrow`}>
          <div className={`wrap svcrow__grid ${idx % 2 ? 'is-flip' : ''}`}>
            <Reveal className="svcrow__art">
              <Art kind={p.art} accent={p.accent} />
            </Reveal>
            <div className="svcrow__copy">
              <Eyebrow>{p.num} — {p.short}</Eyebrow>
              <h2 className="h2">{p.title}</h2>
              <p className="lede">{p.summary}</p>
              <div className="svcrow__caps">
                {p.related.map((slug) => (
                  <div key={slug} id={slug} className="svcrow__cap">
                    <Icon name={svcBySlug[slug].icon} size={20} />
                    <span>{svcBySlug[slug].title}</span>
                  </div>
                ))}
              </div>
              <Button to={`/services/${p.slug}`} variant="navy">Explore {p.short.toLowerCase()}</Button>
            </div>
          </div>
        </section>
      ))}
    </>
  )
}

export function ServiceDetail() {
  const { slug } = useParams()
  const p = pillars.find((x) => x.slug === slug)
  if (!p) return <NotFound />
  const related = p.related.map((s) => svcBySlug[s])
  const inds = industries.filter((i) => i.pillars.includes(p.slug))
  const studies = work.filter((w) => w.cat === p.short).slice(0, 2)
  const others = pillars.filter((x) => x.slug !== p.slug)

  return (
    <>
      <Seo title={p.title} description={p.summary} />
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }, { label: p.title }]}
        eyebrow={`Service ${p.num}`}
        title={p.title}
        lede={p.tagline}
        aside={<Art kind={p.art} accent={p.accent} />}
      >
        <div className="row-gap">
          <Button to={`/contact?type=${encodeURIComponent(typeFor[p.slug])}#brief`}>Discuss your project</Button>
        </div>
      </PageHero>

      <section className="sec sec--cream">
        <div className="wrap overview">
          <Reveal className="overview__lead">
            <Eyebrow>Overview</Eyebrow>
            <p className="overview__text">{p.overview}</p>
          </Reveal>
          <Reveal className="overview__list" delay={0.1}>
            <h3>What&rsquo;s included</h3>
            <ul>
              {p.deliverables.map((d) => (
                <li key={d}>
                  <Icon name="check" size={14} stroke={3} />
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="sec sec--white">
        <div className="wrap">
          <SectionHead eyebrow="Capabilities" title="The detail behind the *discipline.*" />
          <div className="caps">
            {related.map((s, i) => (
              <Reveal key={s.slug} className="cap" delay={i * 0.06}>
                <div className="cap__head">
                  <span className="cap__icon"><Icon name={s.icon} size={22} /></span>
                  <h3>{s.title}</h3>
                </div>
                <p>{s.intro}</p>
                <ul>
                  {s.points.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--navy">
        <div className="sec__deco" aria-hidden="true"><span className="grid-bg" /></div>
        <div className="wrap">
          <SectionHead light eyebrow="Process" title="How a project *runs.*" />
          <ol className="psteps-h">
            {process.map((s, i) => (
              <Reveal as="li" key={s.k} delay={i * 0.08}>
                <span>0{i + 1}</span>
                <h3>{s.k}</h3>
                <p>{s.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec sec--cream">
        <div className="wrap">
          <SectionHead eyebrow="Industries" title="Where this *helps most.*" />
          <div className="indchips">
            {inds.map((i) => (
              <Link key={i.slug} to="/#industries" state={{ industry: i.slug }} className="indchip">
                <Art kind={i.art} accent={i.accent} />
                <span>{i.name}</span>
                <Arrow size={14} />
              </Link>
            ))}
          </div>
          {studies.length > 0 && (
            <>
              <h3 className="subhead">Related capability studies</h3>
              <div className="wgrid wgrid--2">
                {studies.map((w) => <WorkCard key={w.slug} w={{ ...w, size: 'lg' }} />)}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="sec sec--white">
        <div className="wrap">
          <h3 className="subhead">Explore other disciplines</h3>
          <div className="others">
            {others.map((o) => (
              <Link key={o.slug} to={`/services/${o.slug}`} className="other" style={{ '--accent': o.accent }}>
                <span className="other__n">{o.num}</span>
                <span className="other__t">{o.title}</span>
                <Arrow size={16} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
