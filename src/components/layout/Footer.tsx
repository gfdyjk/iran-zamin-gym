import { footer, nav, site } from '../../data/site';
import { useLocalTime, useScrollProgress } from '../../hooks/useUiState';
import { LogoMark } from '../ui/Logo';
import './Footer.css';

export function Footer() {
  const progress = useScrollProgress();
  const time = useLocalTime();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="shell footer__top">
        <div className="footer__brand">
          <a className="footer__logo" href="#home" aria-label={`${site.name} — back to top`}>
            <LogoMark className="footer__mark" />
            <span>{site.name}</span>
          </a>
          <p className="footer__note">{footer.note}</p>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          <ul>
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="footer__back" href="#home">
          Back to top
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M12 19V5" />
            <path d="m6 11 6-6 6 6" />
          </svg>
        </a>
      </div>

      <div className="statusbar">
        <span className="statusbar__bar" style={{ transform: `scaleX(${progress / 100})` }} aria-hidden="true" />
        <div className="shell statusbar__inner">
          <span className="statusbar__item statusbar__item--status">
            <span className="dot" aria-hidden="true" />
            {footer.status}
          </span>
          <span className="statusbar__item">
            TEHRAN <b>{time}</b>
          </span>
          <span className="statusbar__item">
            SCROLL <b>{progress}%</b>
          </span>
          <span className="statusbar__item statusbar__item--copy">
            © {year} {site.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
