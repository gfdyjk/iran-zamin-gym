import { useEffect, useState } from 'react';
import { site } from '../../data/site';
import { Logo } from '../ui/Logo';
import { IconArrowLeft, IconInstagram, IconPhone, IconTelegram, IconWhatsapp } from '../ui/Icons';
import './Header.css';

const socialIcons = {
  instagram: IconInstagram,
  telegram: IconTelegram,
  whatsapp: IconWhatsapp,
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock the page behind the full-screen mobile menu. */
  useEffect(() => {
    document.body.classList.toggle('is-locked', menuOpen);
    return () => document.body.classList.remove('is-locked');
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  /* Highlight the nav item of the section currently in view. */
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const sections = site.nav
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((element): element is HTMLElement => Boolean(element));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`header${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-menu-open' : ''}`}>
        <div className="header__inner container">
          <a className="header__brand" href="#home" aria-label={`${site.brand.full} — صفحه اصلی`}>
            <Logo persian={site.brand.persian} latin={site.brand.latin} />
          </a>

          <nav className="header__nav" aria-label="منوی اصلی">
            <ul>
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={activeHref === item.href ? 'is-active' : undefined}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <a className="btn btn--ghost header__login" href="#join">
              ورود / عضویت
              <IconArrowLeft size={16} />
            </a>
            <button
              type="button"
              className="header__burger"
              aria-label={menuOpen ? 'بستن منو' : 'باز کردن منو'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="منوی موبایل"
        aria-hidden={!menuOpen}
      >
        <nav className="mobile-menu__nav container" aria-label="منوی موبایل">
          <ul className="mobile-menu__list">
            {site.nav.map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={closeMenu}
                  tabIndex={menuOpen ? 0 : -1}
                  style={{ '--i': index } as React.CSSProperties}
                >
                  <span className="mobile-menu__index">{String(index + 1).padStart(2, '0')}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mobile-menu__foot">
            <a className="btn btn--primary" href="#join" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
              دریافت مشاورهٔ رایگان
              <IconArrowLeft size={18} />
            </a>
            <a className="mobile-menu__phone" href={site.contact.phoneHref} tabIndex={menuOpen ? 0 : -1}>
              <IconPhone size={17} />
              <span>{site.contact.phone}</span>
            </a>
            <ul className="mobile-menu__socials">
              {site.contact.socials.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <li key={social.label}>
                    <a href={social.href} aria-label={social.label} tabIndex={menuOpen ? 0 : -1}>
                      <Icon size={18} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
