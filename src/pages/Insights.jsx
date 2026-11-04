import { useState } from 'react'
import { contact, posts } from '../data/site'
import { Button, PageHero, Reveal } from '../components/ui'

export default function Insights() {
  const cats = ['All', ...new Set(posts.map((p) => p.cat))]
  const [cat, setCat] = useState('All')
  const list = cat === 'All' ? posts : posts.filter((p) => p.cat === cat)
  const [lead, ...rest] = list

  return (
    <>
      <PageHero
        eyebrow="Blog / Insights"
        title="Notes from the *pond.*"
        lede="What we learn running shoots, campaigns and launches for growing brands. First articles are being written right now."
      />
      <section className="section">
        <div className="wrap">
          <div className="filters" role="tablist">
            {cats.map((c) => (
              <button key={c} role="tab" aria-selected={c === cat} className={`chip ${c === cat ? 'chip--on' : ''}`} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>

          {lead && (
            <Reveal key={lead.title} className="post-lead" data-cursor>
              <div className="post-lead__art" aria-hidden="true">
                <span>{lead.cat}</span>
              </div>
              <div className="post-lead__copy">
                <p className="post__meta">
                  {lead.cat} · {lead.read} read · <em>Coming soon</em>
                </p>
                <h2 className="display">{lead.title}</h2>
              </div>
            </Reveal>
          )}

          <div className="posts">
            {rest.map((p, i) => (
              <Reveal key={p.title} className="post" delay={i * 0.06} data-cursor>
                <p className="post__meta">
                  {p.cat} · {p.read} read
                </p>
                <h3>{p.title}</h3>
                <span className="post__soon">Coming soon</span>
              </Reveal>
            ))}
          </div>

          <Reveal className="subscribe">
            <div>
              <h3 className="display">Get new insights first.</h3>
              <p>One short email when a new article goes live. No spam.</p>
            </div>
            <Button href={`mailto:${contact.email}?subject=${encodeURIComponent('Subscribe me to Artistic Duck Insights')}`} variant="duck">
              Notify me
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  )
}
