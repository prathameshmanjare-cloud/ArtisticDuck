import { pillars, process } from '../data/content'
import Art from '../components/Art'
import { Button, Eyebrow, Icon, PageHero, Reveal, SectionHead, Seo, SplitLine } from '../components/ui'

const values = [
  { t: 'Creative + strategic', d: 'Every idea has to look good and earn its place in the plan.' },
  { t: 'One roof, one team', d: 'Shoot, content, ads, SEO, code and events with one point of contact.' },
  { t: 'Decisions from data', d: 'We test, measure and move budget to what works.' },
  { t: 'Passion for the craft', d: 'People who care about the work and about your numbers.' },
  { t: 'Client-first execution', d: 'Your timelines, your goals, and honest updates along the way.' },
]

const team = [
  { icon: 'target', t: 'Strategists', d: 'Positioning, campaigns and the plan behind every post.' },
  { icon: 'camera', t: 'Creators', d: 'Directors, shooters, editors and designers.' },
  { icon: 'phone', t: 'Storytellers', d: 'Writers who turn features into reasons to care.' },
  { icon: 'code', t: 'Innovators', d: 'Developers and growth marketers who ship and measure.' },
]

export default function About() {
  return (
    <>
      <Seo title="About" description="Artistic Duck Media & Tech is an integrated branding, advertising, marketing and technology studio from Pune." />
      <PageHero
        eyebrow="About us"
        title="Ideas in. *Brands* out."
        lede="Artistic Duck Media & Tech is an integrated branding, advertising, marketing and technology studio from Pune. We help startups and growing businesses find their identity, their audience and the products that carry them."
        aside={
          <div className="about-mark">
            <img src="/logo.png" alt="Artistic Duck Media and Tech logo" width="640" height="459" />
          </div>
        }
      />

      <section className="sec sec--cream">
        <div className="wrap story">
          <div className="story__k">
            <Eyebrow>Our story</Eyebrow>
            <h2 className="h2">
              <SplitLine text="Why *“Artistic Duck”?*" />
            </h2>
          </div>
          <div className="story__body">
            <Reveal as="p" className="story__lead">
              Watch a duck cross a pond. Above the water it glides, unbothered. Below, its feet never stop.
            </Reveal>
            <Reveal as="p" delay={0.05}>
              That is how we like to work: your brand shows up looking effortless, while our team does the planning, the late edits, the
              reshoots and the number-crunching where nobody has to see it. The &ldquo;artistic&rdquo; part is the glide. The duck part is
              the paddling. You need both.
            </Reveal>
            <Reveal as="p" delay={0.1}>
              We are a dynamic, integrated agency committed to transforming ideas into impactful experiences. From concept to execution we
              offer end-to-end solutions — content creation, branding, digital marketing, production and development — whether you are
              building a brand from scratch or scaling an existing business.
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sec sec--white">
        <div className="wrap vm">
          <Reveal className="vm__card vm__card--navy">
            <span className="vm__k">Our vision</span>
            <p>To become a leading creative powerhouse that drives innovation and sets new benchmarks in branding and marketing.</p>
          </Reveal>
          <Reveal className="vm__card vm__card--yellow" delay={0.1}>
            <span className="vm__k">Our mission</span>
            <p>To empower businesses with creative strategies, impactful storytelling and performance-driven marketing solutions.</p>
          </Reveal>
        </div>
      </section>

      <section className="sec sec--navy">
        <div className="sec__deco" aria-hidden="true"><span className="grid-bg" /></div>
        <div className="wrap">
          <SectionHead light eyebrow="Philosophy" title="Clarity first. *Craft* always." lede="Strategy decides what to say. Creativity decides how it is remembered. Technology decides how far it travels. We hold all three in one team." />
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
          <SectionHead eyebrow="Values" title="What we *stand* for." />
          <ol className="values">
            {values.map((v, i) => (
              <Reveal as="li" key={v.t} delay={i * 0.05}>
                <span>0{i + 1}</span>
                <h3>{v.t}</h3>
                <p>{v.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec sec--white">
        <div className="wrap">
          <SectionHead eyebrow="Our team" title="The minds behind the *magic.*" lede="A collective of creators, strategists, storytellers and innovators, all working towards one goal: building brands that leave a lasting impression." />
          <div className="team">
            {team.map((m, i) => (
              <Reveal key={m.t} className="team__card" delay={i * 0.07}>
                <span className="team__icon"><Icon name={m.icon} size={26} /></span>
                <h3>{m.t}</h3>
                <p>{m.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--cream">
        <div className="wrap">
          <SectionHead eyebrow="Capabilities" title="Creative and *technology,* side by side." />
          <div className="capgrid">
            {pillars.map((p, i) => (
              <Reveal key={p.slug} className="capgrid__item" delay={i * 0.06}>
                <div className="capgrid__art"><Art kind={p.art} accent={p.accent} /></div>
                <h3>{p.title}</h3>
                <ul>
                  {p.deliverables.slice(0, 5).map((d) => <li key={d}>{d}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
          <div className="center-row">
            <Button to="/careers" variant="dark">Join the team</Button>
            <Button to="/contact#brief">Work with us</Button>
          </div>
        </div>
      </section>
    </>
  )
}
