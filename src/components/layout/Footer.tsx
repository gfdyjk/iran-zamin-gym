import { site } from '../../data/site';
import { Logo } from '../ui/Logo';
import {
  IconArrowUp,
  IconClock,
  IconInstagram,
  IconMail,
  IconPhone,
  IconPin,
  IconTelegram,
  IconWhatsapp,
} from '../ui/Icons';
import './Footer.css';

const socialIcons = { instagram: IconInstagram, telegram: IconTelegram, whatsapp: IconWhatsapp };

export function Footer() {
  return (
    <footer id="contact" className="footer">
      <span className="footer__watermark" aria-hidden="true">
        {site.brand.latin}
      </span>

      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo persian={site.brand.persian} latin={site.brand.latin} />
          <p className="footer__tagline">{site.footer.tagline}</p>
          <ul className="footer__socials">
            {site.contact.socials.map((social) => {
              const Icon = socialIcons[social.icon];
              return (
                <li key={social.label}>
                  <a href={social.href} aria-label={social.label}>
                    <Icon size={18} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav className="footer__col" aria-label="دسترسی سریع">
          <h3 className="footer__col-title">دسترسی سریع</h3>
          <ul>
            {site.footer.quickLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer__col" aria-label="برنامه‌های تمرینی باشگاه">
          <h3 className="footer__col-title">برنامه‌های تمرینی</h3>
          <ul>
            {site.programs.map((program) => (
              <li key={program.id}>
                <a href="#programs">{program.title}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col footer__contact">
          <h3 className="footer__col-title">تماس با ما</h3>
          <ul>
            <li>
              <IconPhone size={16} />
              <a href={site.contact.phoneHref} dir="ltr">
                {site.contact.phone}
              </a>
            </li>
            <li>
              <IconMail size={16} />
              <a href={`mailto:${site.contact.email}`} dir="ltr">
                {site.contact.email}
              </a>
            </li>
            <li>
              <IconPin size={16} />
              <span>{site.contact.address}</span>
            </li>
            <li>
              <IconClock size={16} />
              <span>{site.contact.hours}</span>
            </li>
          </ul>
          <p className="footer__note">{site.contact.note}</p>
        </div>
      </div>

      <div className="container footer__bottom">
        <p className="footer__copy">{site.footer.copyright}</p>
        <a className="footer__top" href="#home">
          بازگشت به بالا
          <IconArrowUp size={16} />
        </a>
      </div>
    </footer>
  );
}
