import { Button, Eyebrow, Icon, PageHero, Reveal, SplitLine } from '../components/ui'

const pillars = [
  {
    k: 'Who we are',
    body: 'We are a dynamic integrated branding, advertising, and marketing agency committed to transforming ideas into impactful experiences. With a blend of creativity, strategy, and technology, we help brands build a strong identity and meaningful connections with their audience.',
  },
  {
    k: 'What we do',
    body: 'From concept to execution, we offer end-to-end solutions including content creation, branding, digital marketing, production, and development. Whether it’s building a brand from scratch or scaling an existing business, we deliver results that matter.',
  },
]

const reasons = [
  { t: 'Creative + strategic approach', d: 'Every idea has to look good and earn its place in the plan.' },
  { t: 'End-to-end services under one roof', d: 'Shoot, content, ads, SEO, code and events, with one team and one point of contact.' },
  { t: 'Data-driven marketing decisions', d: 'We test, measure and move budget to what works.' },
  { t: 'Experienced & passionate team', d: 'People who care about the craft and about your numbers.' },
  { t: 'Client-focused execution', d: 'Your timelines, your goals, and honest updates along the way.' },
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
      <PageHero
        eyebrow="About us"
        title="Ideas in. *Brands* out."
        lede="Artistic Duck Media & Tech is a branding, advertising and marketing agency from Pune. We help startups and growing businesses find their identity and their audience."
      />

      <section className="section">
        <div className="wrap pillars">
          {pillars.map((p, i) => (
            <Reveal key={p.k} className="pillar" delay={i * 0.1}>
              <Eyebrow num={`0${i + 1}`}>{p.k}</Eyebrow>
              <p className="pillar__body">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="vm">
        <div className="wrap vm__grid">
          <Reveal className="vm__card vm__card--duck">
            <span className="vm__label">Our vision</span>
            <p className="display">
              To become a leading creative powerhouse that drives innovation and sets new benchmarks in branding and marketing.
            </p>
          </Reveal>
          <Reveal className="vm__card" delay={0.1}>
            <span className="vm__label">Our mission</span>
            <p className="display">
              To empower businesses with creative strategies, impactful storytelling, and performance-driven marketing solutions.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="why">
        <div className="wrap why__grid">
          <div className="why__story">
            <Eyebrow>Why &ldquo;Artistic Duck&rdquo;?</Eyebrow>
            <h2 className="display h2">
              <SplitLine text="Calm on the surface. *Paddling like mad* underneath." />
            </h2>
            <Reveal as="p" className="lede lede--light">
              Watch a duck cross a pond. Above the water it glides, unbothered. Below, its feet never stop. That is how we like to work:
              your brand shows up looking effortless, while our team does the planning, the late edits, the reshoots and the
              number-crunching where nobody has to see it.
            </Reveal>
            <Reveal as="p" className="lede lede--light" delay={0.1}>
              The &ldquo;artistic&rdquo; part is the glide. The duck part is the paddling. You need both.
            </Reveal>
          </div>
          <ol className="reasons">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r.t} delay={i * 0.06}>
                <span className="reasons__n">0{i + 1}</span>
                <div>
                  <h3>{r.t}</h3>
                  <p>{r.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section team">
        <div className="wrap">
          <div className="section-head">
            <Eyebrow>Our team</Eyebrow>
            <h2 className="display h2">
              <SplitLine text="The minds behind the *magic.*" />
            </h2>
            <Reveal as="p" className="lede">
              A collective of creators, strategists, storytellers, and innovators, all working towards one goal: building brands that
              leave a lasting impression.
            </Reveal>
          </div>
          <div className="team__grid">
            {team.map((m, i) => (
              <Reveal key={m.t} className="team__card" delay={i * 0.08}>
                <Icon name={m.icon} size={36} />
                <h3>{m.t}</h3>
                <p>{m.d}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="team__line">
            <p className="display">
              Different skills. <em className="serif">One vision.</em> Turning ideas into impact.
            </p>
            <Button to="/careers" variant="ink">Join the flock</Button>
          </Reveal>
        </div>
      </section>
    </>
  )
}
