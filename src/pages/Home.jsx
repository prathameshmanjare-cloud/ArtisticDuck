import { lazy, Suspense, useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { contact } from '../data/site'
import { Button, Eyebrow, Marquee, Reveal, SplitLine } from '../components/ui'
import Showcase from '../components/Showcase'
import ServiceRows from '../components/ServiceRows'
import ContactForm from '../components/ContactForm'

const DuckScene = lazy(() => import('../three/DuckScene'))

const journey = [
  { k: 'Idea', t: 'You bring the spark', d: 'A napkin sketch, a product, a half-built pitch deck. That is enough to start.' },
  { k: 'Identity', t: 'We give it a face', d: 'Name, logo, voice and visual system, built around who you want to reach.' },
  { k: 'Launch', t: 'We make some noise', d: 'Shoots, content, campaigns, a website and an event if it needs one.' },
  { k: 'Impact', t: 'We keep it growing', d: 'Ads, SEO and reporting every month, so the brand keeps earning its keep.' },
]

export default function Home({ ready }) {
  const hero = useRef()
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] })
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const copyO = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <>
      <section className="hero" ref={hero}>
        <Suspense fallback={null}>{ready && <DuckScene />}</Suspense>
        <div className="hero__shade" aria-hidden="true" />
        <div className="hero__grain" aria-hidden="true" />
        <motion.div className="wrap hero__copy" style={{ y: copyY, opacity: copyO }}>
          <motion.p className="eyebrow eyebrow--light" initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ delay: 0.2 }}>
            <span className="dot" /> Branding · Advertising · Marketing · Tech
          </motion.p>
          <h1 className="display hero__title">
            <span className="line"><SplitLine text="We don’t just market" animate={ready} delay={0.25} /></span>
            <span className="line"><SplitLine text="businesses. We turn" animate={ready} delay={0.4} /></span>
            <span className="line"><SplitLine text="them into *brands.*" animate={ready} delay={0.55} /></span>
          </h1>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1, duration: 0.9 }}>
            <p className="hero__sub">
              At Artistic Duck Media and Tech, we partner with startups and growing businesses to transform ideas into powerful brands
              through creativity, strategy, and technology.
            </p>
            <div className="row gap">
              <Button to="/contact" variant="duck">Start your brand journey</Button>
              <Button href={contact.phoneHref} variant="ghost-light">Book a free consultation</Button>
            </div>
          </motion.div>
        </motion.div>
        <motion.div className="hero__base wrap" initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ delay: 1.4 }}>
          <span>Pune, India</span>
          <span className="hero__scroll">
            <i /> Scroll
          </span>
          <span>Est. for startups</span>
        </motion.div>
      </section>

      <Showcase />

      <section className="strip" aria-label="Brand positioning">
        <Marquee items={['Built for Startups', 'Designed for Growth', 'Driven by Creativity']} speed={28} />
      </section>

      <section className="startup">
        <div className="wrap startup__grid">
          <div className="startup__intro">
            <Eyebrow num="01">Startup-focused</Eyebrow>
            <h2 className="display h2">
              <SplitLine text="Built for *dreamers,* designed for *doers.*" />
            </h2>
            <Reveal as="p" className="lede" delay={0.2}>
              We understand startups: the hustle, the vision, the challenges. That&rsquo;s why we don&rsquo;t just offer services. We
              become your growth partner, helping you move from idea to impact.
            </Reveal>
            <Reveal delay={0.3}>
              <Button to="/about" variant="ink">How we work</Button>
            </Reveal>
          </div>
          <ol className="journey">
            {journey.map((j, i) => (
              <Reveal as="li" key={j.k} className="journey__step" delay={i * 0.08}>
                <span className="journey__k">{j.k}</span>
                <div>
                  <h3>{j.t}</h3>
                  <p>{j.d}</p>
                </div>
                <span className="journey__i">0{i + 1}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="services-home">
        <div className="wrap">
          <div className="section-head">
            <Eyebrow num="02">What we do</Eyebrow>
            <h2 className="display h2">
              <SplitLine text="Eight crafts. *One* roof." />
            </h2>
            <Reveal as="p" className="lede lede--light">
              Everything a brand needs to be seen, remembered and chosen, without juggling five agencies.
            </Reveal>
          </div>
          <ServiceRows />
          <div className="center mt">
            <Button to="/services" variant="duck">See every service</Button>
          </div>
        </div>
      </section>

      <section className="contact-home">
        <div className="wrap contact-home__grid">
          <div>
            <Eyebrow num="03">Contact us</Eyebrow>
            <h2 className="display h2">
              <SplitLine text="Got a brand in you? *Let’s talk.*" />
            </h2>
            <Reveal as="p" className="lede" delay={0.1}>
              Whether you&rsquo;re looking to grow your brand, launch a campaign or collaborate with us, we&rsquo;d love to hear from you.
            </Reveal>
            <Reveal delay={0.2} className="contact-list">
              <a href={contact.phoneHref}><small>Call</small>{contact.phone}</a>
              <a href={`mailto:${contact.email}`}><small>Email</small>{contact.email}</a>
              <span><small>Studio</small>{contact.address}</span>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <ContactForm compact />
          </Reveal>
        </div>
      </section>
    </>
  )
}
