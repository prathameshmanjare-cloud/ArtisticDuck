import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { articles, process, readingTime } from '../data/content'
import { HeroVisual } from '../components/HeroLogo'
import ServicePanels from '../components/ServicePanels'
import IndustryExplorer from '../components/IndustryExplorer'
import WorkGrid from '../components/WorkGrid'
import GoalPicker from '../components/GoalPicker'
import { ArticleCard } from '../components/ArticleCard'
import { Button, Eyebrow, Marquee, Reveal, SectionHead, Seo, SplitLine, ease } from '../components/ui'

const capabilities = ['Brand strategy', 'Visual identity', 'Creative campaigns', 'Ad films & shoots', 'Performance marketing', 'SEO', 'Websites & web apps', 'Product UI/UX', 'Content', 'Events & launches']

export default function Home() {
  const hero = useRef()
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] })
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const visY = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <>
      <Seo
        description="Artistic Duck Media & Tech is a branding, advertising, marketing and technology studio in Pune. We turn ambitious ideas into brands, products and digital experiences."
      />
      <section className="hero" ref={hero}>
        <div className="hero__bg" aria-hidden="true">
          <span className="hero__glow hero__glow--a" />
          <span className="hero__glow hero__glow--b" />
          <span className="grid-bg grid-bg--hero" />
          <svg className="hero__lines" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
            <motion.path
              d="M-50 260 C 300 120, 520 420, 900 260 S 1450 60, 1700 180"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.4, ease, delay: 0.3 }}
            />
            <motion.path
              d="M-50 720 C 380 640, 700 820, 1100 640 S 1500 520, 1700 560"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.6, ease, delay: 0.6 }}
            />
          </svg>
        </div>

        <div className="wrap hero__grid">
          <motion.div className="hero__copy" style={{ y: copyY }}>
            <motion.p className="hero__pill" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}>
              <span className="dot" /> Creative <i>•</i> Strategic <i>•</i> Tech-driven
            </motion.p>
            <h1 className="hero__title">
              <SplitLine text="We turn ambitious ideas into" animate delay={0.2} />{' '}
              <span className="hero__accent">
                <SplitLine text="*brands,*" animate delay={0.45} />
                <svg className="hero__swoosh" viewBox="0 0 220 18" preserveAspectRatio="none" aria-hidden="true">
                  <motion.path
                    d="M4 12 C 60 4, 150 2, 216 10"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.1, duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
                  />
                </svg>
              </span>{' '}
              <SplitLine text="products and digital experiences." animate delay={0.55} />
            </h1>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}>
              <p className="hero__sub">
                From brand strategy and creative campaigns to technology and digital products, we help ambitious businesses build what comes
                next.
              </p>
              <div className="hero__ctas">
                <Button to="/contact#brief">Start your project</Button>
                <Button to="/work" variant="light">Explore our work</Button>
              </div>
            </motion.div>
          </motion.div>
          <motion.div className="hero__visual" style={{ y: visY }}>
            <HeroVisual />
          </motion.div>
        </div>

        <motion.div className="hero__scroll" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
          <span className="hero__mouse"><i /></span>
          Scroll to explore
        </motion.div>
        <svg className="hero__curve" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path className="hero__curve-gold" d="M0 70 C 360 0, 900 10, 1440 70" />
          <path d="M0 120 L0 92 C 360 22, 900 32, 1440 92 L1440 120 Z" />
        </svg>
      </section>

      <section className="capbar" aria-label="Capabilities">
        <div className="wrap">
          <div className="capbar__inner">
            <p className="capbar__k">
              What we<br />
              <strong>do best</strong>
            </p>
            <Marquee items={capabilities} speed={38} />
          </div>
        </div>
      </section>

      <section className="sec sec--cream" id="services">
        <div className="wrap">
          <SectionHead
            eyebrow="Our services"
            title="Four disciplines. *One* studio."
            lede="Strategy, creativity and technology in one team — so your brand, your campaigns and your product all tell the same story."
          >
            <Button to="/services" variant="dark" size="sm">Explore all services</Button>
          </SectionHead>
          <Reveal>
            <ServicePanels />
          </Reveal>
        </div>
      </section>

      <section className="sec sec--navy" id="industries">
        <div className="sec__deco" aria-hidden="true"><span className="grid-bg" /></div>
        <div className="wrap">
          <SectionHead
            light
            eyebrow="Industries"
            title="Built for businesses shaping *what’s next.*"
            lede="We work with founders and teams in fast-moving sectors. Pick an industry to see where we usually help."
          />
          <Reveal>
            <IndustryExplorer />
          </Reveal>
        </div>
      </section>

      <section className="sec sec--cream" id="work">
        <div className="wrap">
          <SectionHead
            eyebrow="Our work"
            title="Ideas into *impact.*"
            lede="How we approach brand, campaign, growth and technology projects — from first challenge to measurable outcome."
          >
            <Button to="/work" variant="dark" size="sm">See all work</Button>
          </SectionHead>
          <WorkGrid limit={4} />
        </div>
      </section>

      <section className="sec sec--white process">
        <div className="wrap process__grid">
          <div className="process__intro">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="h2">
              <SplitLine text="Calm on the surface. *Paddling hard* underneath." />
            </h2>
            <Reveal as="p" className="lede" delay={0.1}>
              Like a duck crossing a pond, your brand should look effortless. Below the surface, a clear process keeps every project on
              time and on purpose.
            </Reveal>
          </div>
          <ol className="process__steps">
            {process.map((p, i) => (
              <Reveal as="li" key={p.k} className="pstep" delay={i * 0.08}>
                <span className="pstep__n">0{i + 1}</span>
                <div>
                  <h3>{p.k}</h3>
                  <p>{p.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec sec--navy sec--goals" id="next-move">
        <div className="sec__deco" aria-hidden="true"><span className="grid-bg" /><span className="sec__glow" /></div>
        <div className="wrap">
          <SectionHead
            light
            eyebrow="Let’s plan it"
            title="What’s your next *big move?*"
            lede="Choose the goal that sounds most like you. We’ll show the services that fit and the best way to get started."
          />
          <GoalPicker />
        </div>
      </section>

      <section className="sec sec--cream">
        <div className="wrap">
          <SectionHead eyebrow="Insights" title="Notes from the *studio.*" lede="Practical thinking on brand, content, growth and building digital products.">
            <Button to="/insights" variant="dark" size="sm">All insights</Button>
          </SectionHead>
          <div className="acards acards--3">
            {articles.slice(0, 3).map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.08}>
                <ArticleCard a={a} mins={readingTime(a)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
