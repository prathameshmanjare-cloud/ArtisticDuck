import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { articles, readingTime } from '../data/content'
import Art from '../components/Art'
import NotFound from './NotFound'
import { ArticleCard, fmt } from '../components/ArticleCard'
import { Arrow, Button, Icon, PageHero, Reveal, Seo, ease } from '../components/ui'

export default function Insights() {
  const cats = ['All', ...new Set(articles.map((a) => a.cat))]
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const featured = articles.find((a) => a.featured) || articles[0]

  const term = q.trim().toLowerCase()
  const list = articles.filter(
      (a) =>
        (cat === 'All' || a.cat === cat) &&
      (!term || `${a.title} ${a.excerpt} ${a.cat}`.toLowerCase().includes(term)),
  )

  return (
    <>
      <Seo title="Insights" description="Practical articles on branding, content, SEO, advertising, production and events from the Artistic Duck studio." />
      <PageHero
        eyebrow="Insights"
        title="Notes from the *studio.*"
        lede="Practical thinking on brand, content, growth and building digital products — written by the people doing the work."
      />

      <section className="sec sec--cream">
        <div className="wrap">
          <Reveal>
            <Link to={`/insights/${featured.slug}`} className="feature feature--article">
              <div className="feature__media">
                <Art kind={featured.art} />
              </div>
              <div className="feature__copy">
                <p className="wcard__cat">Featured · {featured.cat} · {readingTime(featured)} min read</p>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <span className="feature__go">
                  Read article <Arrow size={14} />
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="ibar">
            <div className="filters" role="group" aria-label="Filter by category">
              {cats.map((c) => (
                <button key={c} className={`fchip ${c === cat ? 'is-on' : ''}`} aria-pressed={c === cat} onClick={() => setCat(c)}>
                  {c}
                  {c === cat && <motion.span layoutId="ichip-bg" className="fchip__bg" transition={{ duration: 0.4, ease }} />}
                </button>
              ))}
            </div>
            <label className="search">
              <Icon name="search" size={18} />
              <span className="sr-only">Search articles</span>
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles" />
            </label>
          </div>

          <motion.div layout className="acards">
            <AnimatePresence mode="popLayout">
              {list.map((a) => (
                <motion.div
                  key={a.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <ArticleCard a={a} mins={readingTime(a)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {!list.length && (
            <p className="empty" role="status">
              No articles match &ldquo;{q}&rdquo;. <button className="linkbtn" onClick={() => { setQ(''); setCat('All') }}>Clear filters</button>
            </p>
          )}
        </div>
      </section>
    </>
  )
}

export function Article() {
  const { slug } = useParams()
  const a = articles.find((x) => x.slug === slug)
  if (!a) return <NotFound />
  const related = [...articles.filter((x) => x.slug !== a.slug && x.cat === a.cat), ...articles.filter((x) => x.slug !== a.slug && x.cat !== a.cat)].slice(0, 3)

  return (
    <>
      <Seo title={a.title} description={a.excerpt} />
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Insights', to: '/insights' }, { label: a.cat }]}
        eyebrow={`${a.cat} · ${readingTime(a)} min read`}
        title={a.title}
        lede={a.excerpt}
      >
        <p className="phero__meta">By the Artistic Duck team · {fmt(a.date)}</p>
      </PageHero>

      <article className="sec sec--white">
        <div className="wrap post">
          <div className="post__art">
            <Art kind={a.art} />
          </div>
          <div className="post__body">
            {a.body.map((b, i) => {
              if (b.h) return <h2 key={i}>{b.h}</h2>
              if (b.ul) return <ul key={i}>{b.ul.map((li) => <li key={li}>{li}</li>)}</ul>
              if (b.quote) return <blockquote key={i}>{b.quote}</blockquote>
              return <p key={i}>{b.p}</p>
            })}
            <div className="post__cta">
              <p>Want help putting this into practice?</p>
              <Button to="/contact#brief" variant="navy" size="sm">Talk to us</Button>
            </div>
          </div>
        </div>
      </article>

      <section className="sec sec--cream">
        <div className="wrap">
          <h2 className="subhead">Related articles</h2>
          <div className="acards acards--3">
            {related.map((r) => <ArticleCard key={r.slug} a={r} mins={readingTime(r)} />)}
          </div>
        </div>
      </section>
    </>
  )
}
