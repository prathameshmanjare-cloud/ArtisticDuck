import { useEffect, useState } from 'react'
import { services } from '../data/site'
import { Button, Icon, PageHero, Reveal } from '../components/ui'
import { useLenis } from 'lenis/react'

export default function Services() {
  const [active, setActive] = useState(services[0].slug)
  const lenis = useLenis()

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    services.forEach((s) => {
      const el = document.getElementById(s.slug)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  const jump = (e, slug) => {
    e.preventDefault()
    lenis?.scrollTo(`#${slug}`, { offset: -110 })
    history.replaceState(null, '', `#${slug}`)
  }

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything your brand needs, *under one roof.*"
        lede="Eight crafts that work better together. Pick one, or let us run the whole show from first shoot to monthly report."
      />
      <section className="section svc">
        <div className="wrap svc__grid">
          <aside className="svc__index">
            <p className="svc__index-h">Index</p>
            {services.map((s, i) => (
              <a key={s.slug} href={`#${s.slug}`} onClick={(e) => jump(e, s.slug)} className={active === s.slug ? 'is-active' : ''}>
                <span>0{i + 1}</span>
                {s.title}
              </a>
            ))}
          </aside>
          <div className="svc__list">
            {services.map((s, i) => (
              <article key={s.slug} id={s.slug} className="svc__item" style={{ '--tone': s.tone }}>
                <Reveal className="svc__top">
                  <div className="svc__badge">
                    <Icon name={s.icon} size={40} />
                  </div>
                  <span className="svc__num">0{i + 1} / 0{services.length}</span>
                </Reveal>
                <Reveal as="h2" className="display svc__title">{s.title}</Reveal>
                <Reveal as="p" className="svc__intro" delay={0.05}>{s.intro}</Reveal>
                <ul className="svc__points">
                  {s.points.map((p, k) => (
                    <Reveal as="li" key={p} delay={0.04 * k} y={16}>
                      <span className="svc__tick" />
                      {p}
                    </Reveal>
                  ))}
                </ul>
                <Reveal className="svc__cta">
                  <Button to={`/contact?service=${encodeURIComponent(s.title)}`} variant="ink">Talk about {s.short.toLowerCase()}</Button>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
