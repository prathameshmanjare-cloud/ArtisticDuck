import { contact, socials } from '../data/site'
import ContactForm from '../components/ContactForm'
import { Arrow, PageHero, Reveal } from '../components/ui'

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Get in *touch.*"
        lede="We’d love to hear from you. Whether you’re looking to grow your brand, launch a campaign, or collaborate with us, let’s connect."
      />
      <section className="section contact-page">
        <div className="wrap contact-page__grid">
          <Reveal className="contact-info">
            <a href={contact.phoneHref} className="cinfo">
              <small>Phone</small>
              <span>{contact.phone}</span>
              <Arrow />
            </a>
            <a href={`mailto:${contact.email}`} className="cinfo">
              <small>Email</small>
              <span>{contact.email}</span>
              <Arrow />
            </a>
            <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="cinfo">
              <small>WhatsApp</small>
              <span>Chat with us</span>
              <Arrow />
            </a>
            <div className="cinfo cinfo--static">
              <small>Address</small>
              <span>{contact.address}</span>
              <span className="cinfo__coords">18.5204° N, 73.8567° E</span>
            </div>
            <div className="contact-socials">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="chip">
                  {s.label}
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
        <Reveal className="wrap contact-tag">
          <p className="display">
            Let&rsquo;s build your <em className="serif">empire</em> together.
          </p>
        </Reveal>
      </section>
    </>
  )
}
