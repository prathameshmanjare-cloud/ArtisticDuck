import { useState } from 'react'
import { brand, contact, socials, whatsappUrl } from '../data/connect'
import { DuckLogoLayered } from './DuckLogo3D'
import { Breakable, Reveal, SectionHead } from './primitives'
import { Icon } from './Icons'

function CopyButton({ value, label }) {
  const [done, setDone] = useState(false)
  if (typeof navigator === 'undefined' || !navigator.clipboard) return null
  return (
    <button
      type="button"
      className="cx-copy"
      aria-label={done ? `${label} copied` : `Copy ${label}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setDone(true)
          setTimeout(() => setDone(false), 1800)
        } catch {
          /* clipboard blocked: the link itself still works */
        }
      }}
    >
      <Icon name={done ? 'check' : 'copy'} size={16} stroke={done ? 2.4 : 1.7} />
      <span className="cx-sr" aria-live="polite">
        {done ? 'Copied' : ''}
      </span>
    </button>
  )
}

const ext = { target: '_blank', rel: 'noopener noreferrer' }

const actions = [
  { key: 'call', icon: 'phone', label: 'Call Us', value: brand.phoneDisplay, href: `tel:${brand.phoneE164}`, copy: brand.phone },
  { key: 'whatsapp', icon: 'whatsapp', label: 'WhatsApp Us', value: 'Start a conversation', href: whatsappUrl, extra: ext, accent: true },
  { key: 'email', icon: 'mail', label: 'Email Us', value: brand.email, href: `mailto:${brand.email}`, copy: brand.email },
  { key: 'web', icon: 'globe', label: 'Visit Website', value: brand.websiteLabel, href: brand.website, extra: ext },
  { key: 'save', icon: 'contact', label: 'Save Company Contact', value: 'Add us to your contacts', href: brand.vcard.href },
  socials.linkedin && { key: 'linkedin', icon: 'linkedin', label: 'LinkedIn', value: 'Follow the company', href: socials.linkedin, extra: ext },
  socials.instagram && { key: 'instagram', icon: 'instagram', label: 'Instagram', value: 'See our latest work', href: socials.instagram, extra: ext },
].filter(Boolean)

export default function CompanyContact() {
  return (
    <section className="cx-sec cx-sec--navy cx-contact" id="contact" aria-labelledby="cx-contact-title">
      <div className="cx-wrap">
        <SectionHead eyebrow="Contact" title={contact.heading} lede={contact.lede} id="cx-contact-title" />

        <div className="cx-contact__grid">
          <Reveal className="cx-ccard" y={30}>
            <DuckLogoLayered size="sm" />
            <p className="cx-ccard__name">{brand.legalName}</p>
            <p className="cx-ccard__tag">{brand.principles.join(' • ')}</p>
            <dl className="cx-ccard__dl">
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${brand.phoneE164}`}>{brand.phoneDisplay}</a>
                </dd>
              </div>
              <div>
                <dt>Business email</dt>
                <dd>
                  <a href={`mailto:${brand.email}`}>
                    <Breakable text={brand.email} />
                  </a>
                </dd>
              </div>
              <div>
                <dt>Website</dt>
                <dd>
                  <a href={brand.website} {...ext}>
                    {brand.websiteLabel}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <ul className="cx-cgrid">
            {actions.map((c, i) => (
              <Reveal as="li" key={c.key} className={`cx-ctile ${c.accent ? 'cx-ctile--accent' : ''}`} delay={i * 0.05} y={24}>
                <a href={c.href} className="cx-ctile__link" {...(c.extra || {})}>
                  <span className="cx-ctile__icon">
                    <Icon name={c.icon} size={22} />
                  </span>
                  <span className="cx-ctile__text">
                    <span className="cx-ctile__label">{c.label}</span>
                    <small>
                      <Breakable text={c.value} />
                    </small>
                  </span>
                  <Icon name={c.key === 'save' ? 'download' : 'arrowNE'} size={18} className="cx-ctile__go" />
                </a>
                {c.copy && <CopyButton value={c.copy} label={c.label.replace(' Us', '')} />}
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
