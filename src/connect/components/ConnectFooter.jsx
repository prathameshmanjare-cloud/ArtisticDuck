import { brand, footer, socials, whatsappUrl } from '../data/connect'
import { BrandMark, Reveal } from './primitives'
import { Icon } from './Icons'

const ext = { target: '_blank', rel: 'noopener noreferrer' }
const YEAR = new Date().getFullYear()

export default function ConnectFooter() {
  const social = [
    socials.linkedin && { icon: 'linkedin', label: 'LinkedIn', href: socials.linkedin },
    socials.instagram && { icon: 'instagram', label: 'Instagram', href: socials.instagram },
    { icon: 'whatsapp', label: 'WhatsApp', href: whatsappUrl },
  ].filter(Boolean)

  return (
    <footer className="cx-footer">
      <div className="cx-wrap">
        <Reveal className="cx-footer__top">
          <BrandMark size="lg" className="cx-footer__mark" />
          <p className="cx-footer__word" aria-label={brand.name}>
            ARTISTIC DUCKK
          </p>
          <p className="cx-footer__principles">
            {brand.principles.map((p, i) => (
              <span key={p}>
                {p.toUpperCase()}
                {i < brand.principles.length - 1 && <i aria-hidden="true">•</i>}
              </span>
            ))}
          </p>
          <p className="cx-footer__line">{footer.line}</p>
        </Reveal>

        <div className="cx-footer__bottom">
          <ul className="cx-footer__links">
            <li>
              <a href={brand.website} {...ext}>
                <Icon name="globe" size={16} /> {brand.websiteLabel}
              </a>
            </li>
            <li>
              <a href={`mailto:${brand.email}`}>
                <Icon name="mail" size={16} /> {brand.email}
              </a>
            </li>
          </ul>
          <ul className="cx-footer__social" aria-label="Social links">
            {social.map((s) => (
              <li key={s.label}>
                <a href={s.href} aria-label={s.label} {...ext}>
                  <Icon name={s.icon} size={20} />
                </a>
              </li>
            ))}
          </ul>
          <p className="cx-footer__copy">
            © {YEAR} {brand.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
