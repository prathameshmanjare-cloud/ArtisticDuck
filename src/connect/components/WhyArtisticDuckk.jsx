import { why } from '../data/connect'
import { Reveal, SectionHead } from './primitives'
import { Icon } from './Icons'

export default function WhyArtisticDuckk() {
  return (
    <section className="cx-sec cx-sec--white cx-why" id="why" aria-labelledby="cx-why-title">
      <div className="cx-wrap">
        <SectionHead eyebrow="Why Artistic Duckk" title={why.heading} id="cx-why-title" />
        <ul className="cx-why__grid">
          {why.items.map((w, i) => (
            <Reveal as="li" key={w.title} className={`cx-why__card cx-why__card--${i}`} delay={(i % 3) * 0.08} y={30}>
              <span className="cx-why__icon">
                <Icon name={w.icon} size={24} />
              </span>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
