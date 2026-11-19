import Art from '../../components/Art'
import { portfolio } from '../data/connect'
import { Btn, Reveal, SectionHead } from './primitives'
import { Icon } from './Icons'

function Media({ item }) {
  if (item.image) {
    return <img src={item.image} alt={`${item.title} — screenshot`} loading="lazy" decoding="async" width="1200" height="800" />
  }
  // Illustrated cover shared with /work until real project imagery is cleared.
  return <Art kind={item.art} accent="#FF741E" />
}

export default function PortfolioShowcase() {
  const { items } = portfolio
  return (
    <section className="cx-sec cx-sec--ivory cx-work" id="work" aria-labelledby="cx-work-title">
      <div className="cx-wrap">
        <SectionHead eyebrow="Selected work" title={portfolio.heading} id="cx-work-title" />
        <Reveal as="p" className="cx-work__note" delay={0.1}>
          <Icon name="alert" size={16} />
          <span>{portfolio.note}</span>
        </Reveal>

        {items.length === 0 ? (
          <div className="cx-work__empty">
            <p>Project case studies are being prepared and will appear here soon.</p>
            <Btn href="#enquiry" variant="solid">Start a project</Btn>
          </div>
        ) : (
          <ul className="cx-wgrid">
            {items.map((w, i) => (
              <Reveal as="li" key={w.slug} className={`cx-wcard cx-wcard--${w.layout}`} delay={(i % 2) * 0.08} y={40}>
                <a href={w.href} className="cx-wcard__link">
                  <div className="cx-wcard__media">
                    <Media item={w} />
                    {w.kind === 'study' && <span className="cx-wcard__badge">Capability study</span>}
                  </div>
                  <div className="cx-wcard__meta">
                    <p className="cx-wcard__cat">{w.category}</p>
                    <h3 className="cx-wcard__title">{w.title}</h3>
                    <p className="cx-wcard__desc">{w.description}</p>
                    <span className="cx-wcard__cta">
                      View Project <Icon name="arrowRight" size={16} />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </ul>
        )}

        <Reveal className="cx-work__all">
          <Btn href={portfolio.allHref} variant="outline">
            See all studies
          </Btn>
        </Reveal>
      </div>
    </section>
  )
}
