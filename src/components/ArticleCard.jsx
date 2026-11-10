import { Link } from 'react-router-dom'
import Art from './Art'
import { Arrow } from './ui'

export const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

export function ArticleCard({ a, mins }) {
  return (
    <Link to={`/insights/${a.slug}`} className="acard">
      <div className="acard__media">
        <Art kind={a.art} />
        <span className="acard__cat">{a.cat}</span>
      </div>
      <div className="acard__body">
        <p className="acard__meta">
          {fmt(a.date)} <i>·</i> {mins} min read
        </p>
        <h3>{a.title}</h3>
        <p className="acard__ex">{a.excerpt}</p>
        <span className="acard__go">
          Read article <Arrow size={13} dir="right" />
        </span>
      </div>
    </Link>
  )
}

