import { contact, socials } from '../data/site'
import BriefWizard from '../components/BriefWizard'
import { Arrow, Icon, PageHero, Reveal, Seo } from '../components/ui'

export default function Contact() {
  return (
    <>
      <Seo title="Contact" description="Share your project brief with Artistic Duck Media & Tech, Pune. Call, email or WhatsApp us — we reply within one working day." />
      <PageHero
        eyebrow="Contact"
        title="Have a big idea? *Let’s make it happen.*"
        lede="Tell us what you are building. We reply to every enquiry within one working day."
      />
      <section className="sec sec--cream" id="brief">
        <div className="wrap contact">
          <div className="contact__form">
            <h2 className="contact__h">Project brief</h2>
            <p className="contact__p">Four quick steps. It takes about two minutes.</p>
            <BriefWizard />
          </div>
          <aside className="contact__info">
            <Reveal className="cinfo">
              <h2 className="cinfo__h">Artistic Duck Media &amp; Tech</h2>
              <p className="cinfo__p">Branding, advertising, marketing and technology studio.</p>
              <a href={contact.phoneHref} className="cline">
                <Icon name="call" size={18} />
                <span><small>Call</small>{contact.phone}</span>
                <Arrow size={14} />
              </a>
              <a href={`mailto:${contact.email}`} className="cline">
                <Icon name="mail" size={18} />
                <span><small>Email</small>{contact.email}</span>
                <Arrow size={14} />
              </a>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="cline">
                <Icon name="phone" size={18} />
                <span><small>WhatsApp</small>Chat with us</span>
                <Arrow size={14} />
              </a>
            </Reveal>
            <Reveal className="cmap" delay={0.1}>
              <div className="cmap__grid" aria-hidden="true" />
              <span className="cmap__pin" aria-hidden="true"><Icon name="pin" size={22} /></span>
              <div className="cmap__label">
                <small>Studio</small>
                <strong>{contact.address}</strong>
                <a href="https://www.google.com/maps/search/?api=1&query=Pune%2C+Maharashtra" target="_blank" rel="noreferrer">
                  Open in Maps <Arrow size={12} />
                </a>
              </div>
            </Reveal>
            <Reveal className="csocial" delay={0.15}>
              <small>Follow us</small>
              <div>
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
                ))}
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  )
}
