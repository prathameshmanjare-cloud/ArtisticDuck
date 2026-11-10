import { useState } from 'react'
import { Link } from 'react-router-dom'
import { pillars } from '../data/content'
import Art from './Art'
import { Arrow } from './ui'

// Four editorial panels; the active one expands, its artwork shifts and its description takes focus.
export default function ServicePanels() {
  const [active, setActive] = useState(0)
  return (
    <div className="panels">
      {pillars.map((p, i) => (
        <Link
          key={p.slug}
          to={`/services/${p.slug}`}
          className={`panel ${active === i ? 'is-active' : ''}`}
          style={{ '--accent': p.accent }}
          onMouseEnter={() => setActive(i)}
          onFocus={() => setActive(i)}
        >
          <div className="panel__art">
            <Art kind={p.art} accent={p.accent} />
          </div>
          <div className="panel__shade" />
          <span className="panel__num">{p.num}</span>
          <div className="panel__body">
            <h3 className="panel__title">{p.title}</h3>
            <p className="panel__desc">{p.summary}</p>
            <span className="panel__link">
              Explore {p.short.toLowerCase()} <Arrow size={14} />
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
