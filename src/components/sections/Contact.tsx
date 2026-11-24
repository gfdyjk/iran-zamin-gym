import { contact } from '../../data/site';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { ContactForm } from './ContactForm';
import './Contact.css';

export function Contact() {
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="shell">
        <div className="contact__panel">
          <div className="contact__glow" aria-hidden="true" />

          <div className="contact__copy">
            <SectionHeading
              index={contact.eyebrow}
              label={contact.label}
              title={contact.title}
              id="contact-title"
            />

            <Reveal as="p" className="contact__desc" delay={80}>
              {contact.description}
            </Reveal>

            <Reveal className="contact__details" delay={140}>
              <a className="contact__email" href={`mailto:${contact.email}`}>
                <span className="contact__email-icon" aria-hidden="true">
                  <Icon name="mail" size={18} />
                </span>
                <span>
                  <span className="contact__detail-label">Email</span>
                  <span className="contact__email-value">{contact.email}</span>
                </span>
                <Icon name="arrow" size={16} />
              </a>

              <dl className="contact__meta">
                <div>
                  <dt>Location</dt>
                  <dd>{contact.location}</dd>
                </div>
                <div>
                  <dt>Response</dt>
                  <dd>{contact.responseTime}</dd>
                </div>
              </dl>

              <p className="contact__availability">
                <span className="dot" aria-hidden="true" />
                {contact.availability}
              </p>
            </Reveal>
          </div>

          <Reveal className="contact__form-wrap" delay={120} variant="right">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
