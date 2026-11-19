import { about, divisions } from '../data/connect'
import ServiceArt from './ServiceArt'
import { Eyebrow, Reveal, SplitText } from './primitives'
import { Icon } from './Icons'

export default function CompanyIntroduction() {
  return (
    <section className="cx-sec cx-sec--ivory cx-about" id="about" aria-labelledby="cx-about-title">
      <div className="cx-wrap">
        <div className="cx-about__head">
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <h2 className="cx-h2" id="cx-about-title">
            <SplitText text={about.heading} />
          </h2>
          <Reveal as="p" className="cx-about__desc" delay={0.15}>
            {about.description}
          </Reveal>
        </div>

        <ol className="cx-about__list">
          {divisions.map((d, i) => (
            <Reveal as="li" key={d.id} className={`cx-arow ${i % 2 ? 'cx-arow--flip' : ''}`} y={40} style={{ '--tone': d.tone }}>
              <div className="cx-arow__media">
                {d.image ? (
                  <img src={d.image} alt="" loading="lazy" decoding="async" width="900" height="900" />
                ) : (
                  <div className="cx-arow__art">
                    <ServiceArt kind={d.art} />
                  </div>
                )}
              </div>
              <div className="cx-arow__body">
                <span className="cx-arow__num">{d.num}</span>
                <h3>{d.title}</h3>
                <p>{d.intro}</p>
                <ul className="cx-arow__svcs">
                  {d.services.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <a className="cx-arow__link" href="#expertise">
                  Explore the division <Icon name="arrowRight" size={16} />
                </a>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
