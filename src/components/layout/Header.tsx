import { useEffect, useState } from 'react';
import { nav, site } from '../../data/site';
import { useActiveSection, useBodyLock, useScrolled } from '../../hooks/useUiState';
import { Icon } from '../ui/Icon';
import { LogoMark } from '../ui/Logo';
import './Header.css';

const sectionIds = nav.map((item) => item.id);

export function Header() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const scrolled = useScrolled(30);

  useBodyLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 980) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="nav__inner shell">
        <a className="brand" href="#home" aria-label={`${site.name} — back to top`}>
          <LogoMark className="brand__mark" />
          <span className="brand__text">
            <span className="brand__name">{site.name}</span>
            <span className="brand__tag">{site.tagline}</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          <ul>
            {nav.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={isActive ? 'is-active' : undefined}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <span className="nav__index" aria-hidden="true">
                      {item.index}
                    </span>
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="nav__actions">
          <a className="btn btn--primary btn--sm nav__cta" href="#contact">
            Let&apos;s Talk
            <Icon name="arrow" />
          </a>
          <button
            type="button"
            className="nav__burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="nav__sheet" id="mobile-menu">
        <nav aria-label="Mobile" className="nav__sheet-nav">
          <ul>
            {nav.map((item, index) => (
              <li key={item.id} style={{ transitionDelay: open ? `${80 + index * 45}ms` : '0ms' }}>
                <a
                  href={`#${item.id}`}
                  className={active === item.id ? 'is-active' : undefined}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                >
                  <span className="nav__sheet-index">{item.index}</span>
                  <span className="nav__sheet-label">{item.label}</span>
                  <Icon name="arrow" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav__sheet-foot">
          <p className="nav__sheet-status">
            <span className="dot" aria-hidden="true" />
            Available for new projects
          </p>
          <a
            className="btn btn--primary"
            href="#contact"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            Let&apos;s Talk
            <Icon name="arrow" />
          </a>
        </div>
      </div>
    </header>
  );
}
