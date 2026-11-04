import { clients, socials } from '../data/site'
import { Button, Eyebrow, Marquee, PageHero, Reveal, SplitLine } from '../components/ui'

// PLACEHOLDER: project tiles until real case studies are collected.
const tiles = [
  { cat: 'Ad film', title: 'Launch film', size: 'tall', hue: 'duck' },
  { cat: 'Identity', title: 'Brand system', size: 'wide', hue: 'ink' },
  { cat: 'Social', title: 'Reels series', size: 'sq', hue: 'tang' },
  { cat: 'Web', title: 'E-commerce build', size: 'sq', hue: 'sky' },
  { cat: 'Event', title: 'Product launch', size: 'wide', hue: 'mint' },
  { cat: 'Product', title: 'Studio shoot', size: 'tall', hue: 'paper' },
]

export default function Work() {
  return (
    <>
      <PageHero
        eyebrow="Client / Portfolio / Work"
        title="Work that speaks *for itself.*"
        lede="We don’t just create, we deliver results. Explore how we’ve helped businesses transform into brands."
      >
        <Reveal delay={0.6} className="row gap mt-s">
          {socials.slice(0, 3).map((s, i) => (
            <Button key={s.label} href={s.href} target="_blank" rel="noreferrer" variant={i === 0 ? 'ink' : 'ghost'}>
              See us on {s.label}
            </Button>
          ))}
        </Reveal>
      </PageHero>

      <section className="section">
        <div className="wrap">
          <div className="work__grid">
            {tiles.map((t, i) => (
              <Reveal key={t.title} className={`work__tile work__tile--${t.size} hue--${t.hue}`} delay={(i % 3) * 0.08} data-cursor>
                <div className="work__art" aria-hidden="true">
                  <span className="work__blob" />
                  <span className="work__ring" />
                </div>
                <div className="work__meta">
                  <span>{t.cat}</span>
                  <h3>{t.title}</h3>
                </div>
                <span className="work__soon">Case study soon</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="served">
        <div className="wrap section-head">
          <Eyebrow>Clients</Eyebrow>
          <h2 className="display h2">
            <SplitLine text="We have *proudly* served" />
          </h2>
        </div>
        <Marquee items={clients} speed={45} sep="◆" className="marquee--logos" />
        <Marquee items={[...clients].reverse()} speed={55} sep="◆" className="marquee--logos marquee--reverse" />
      </section>
    </>
  )
}
