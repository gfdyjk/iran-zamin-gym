import { useEffect, useState } from 'react';
import { hero, site } from '../../data/site';
import { usePointerField, useTilt } from '../../hooks/useTilt';
import { Icon } from '../ui/Icon';
import './Hero.css';

const PARTICLES = [
  { x: '12%', y: '26%', s: 3, d: 9, dx: '18px', dy: '-26px' },
  { x: '22%', y: '68%', s: 2, d: 11, dx: '-14px', dy: '-20px' },
  { x: '38%', y: '16%', s: 2, d: 13, dx: '12px', dy: '22px' },
  { x: '52%', y: '82%', s: 3, d: 10, dx: '-20px', dy: '-16px' },
  { x: '64%', y: '22%', s: 2, d: 12, dx: '16px', dy: '18px' },
  { x: '76%', y: '58%', s: 3, d: 9.5, dx: '-12px', dy: '-24px' },
  { x: '86%', y: '34%', s: 2, d: 14, dx: '-18px', dy: '14px' },
  { x: '8%', y: '48%', s: 2, d: 12.5, dx: '20px', dy: '12px' },
  { x: '46%', y: '42%', s: 2, d: 15, dx: '10px', dy: '-18px' },
  { x: '92%', y: '72%', s: 2, d: 11.5, dx: '-16px', dy: '-12px' },
];

function useRoleCycle(roles: string[], interval = 3400) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (roles.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setIndex((value) => (value + 1) % roles.length), interval);
    return () => window.clearInterval(id);
  }, [roles, interval]);

  return { role: roles[index], index };
}

function Portrait() {
  const tiltRef = useTilt<HTMLDivElement>(9);

  return (
    <div className="portrait" ref={tiltRef}>
      <div className="portrait__aura" aria-hidden="true" />

      <div className="portrait__frame">
        <div className="portrait__stage">
          {hero.portrait ? (
            <img
              className="portrait__photo"
              src={hero.portrait}
              alt={hero.portraitAlt}
              width={720}
              height={900}
              fetchPriority="high"
              decoding="async"
            />
          ) : (
            <BustArt />
          )}
        </div>

        <div className="portrait__scan" aria-hidden="true" />
        <div className="portrait__glass" aria-hidden="true" />
        <div className="portrait__vignette" aria-hidden="true" />

        <span className="portrait__corner portrait__corner--tl" aria-hidden="true" />
        <span className="portrait__corner portrait__corner--tr" aria-hidden="true" />
        <span className="portrait__corner portrait__corner--bl" aria-hidden="true" />
        <span className="portrait__corner portrait__corner--br" aria-hidden="true" />

        <div className="portrait__hud portrait__hud--top" aria-hidden="true">
          <span>PORTRAIT_FEED</span>
          <span className="portrait__live">
            <i /> LIVE
          </span>
        </div>
        <div className="portrait__hud portrait__hud--bottom" aria-hidden="true">
          <span>ID · MB-2026</span>
          <span>35.6892°N 51.3890°E</span>
        </div>
      </div>

      <ul className="portrait__chips" aria-hidden="true">
        <li className="portrait__chip portrait__chip--a">Software Engineer</li>
        <li className="portrait__chip portrait__chip--b">UI / UX</li>
        <li className="portrait__chip portrait__chip--c">AI</li>
      </ul>

      <span className="sr-only">{hero.portraitAlt}</span>
    </div>
  );
}

/** Art-directed holographic bust used until a real photograph is supplied. */
function BustArt() {
  return (
    <svg className="bust" viewBox="0 0 520 640" role="img" aria-label={hero.portraitAlt}>
      <defs>
        <linearGradient id="bustFill" x1="0.15" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#0e333c" />
          <stop offset="0.48" stopColor="#081f28" />
          <stop offset="1" stopColor="#041219" />
        </linearGradient>
        <radialGradient id="bustRim" cx="0.82" cy="0.36" r="0.62">
          <stop offset="0" stopColor="#00f0e5" stopOpacity="0.62" />
          <stop offset="0.55" stopColor="#00bfcb" stopOpacity="0.16" />
          <stop offset="1" stopColor="#00f0e5" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bustFillLight" cx="0.18" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#7ff6f0" stopOpacity="0.14" />
          <stop offset="1" stopColor="#7ff6f0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rimStroke" x1="0" y1="0.1" x2="1" y2="0.4">
          <stop offset="0.15" stopColor="#00f0e5" stopOpacity="0" />
          <stop offset="0.62" stopColor="#00f0e5" stopOpacity="0.35" />
          <stop offset="1" stopColor="#d6fffc" stopOpacity="0.95" />
        </linearGradient>
        <pattern id="scanlines" width="5" height="5" patternUnits="userSpaceOnUse">
          <rect width="5" height="1" fill="#00f0e5" />
        </pattern>
        <clipPath id="bustClip">
          <path d="M40 640C46 522 118 458 226 436L232 392C196 372 174 330 170 286C165 214 198 150 262 150C326 150 359 214 354 286C350 330 328 372 292 392L298 436C406 458 478 522 484 640Z" />
        </clipPath>
      </defs>

      <g clipPath="url(#bustClip)">
        <rect width="520" height="640" fill="url(#bustFill)" />
        <rect width="520" height="640" fill="url(#bustRim)" />
        <rect width="520" height="640" fill="url(#bustFillLight)" />
        <rect width="520" height="640" fill="url(#scanlines)" opacity="0.06" />

        <g fill="none" stroke="#00f0e5" strokeOpacity="0.16" strokeWidth="1">
          <path d="M150 300C210 262 314 262 374 300" />
          <path d="M146 340C208 306 316 306 378 340" />
          <path d="M152 380C214 352 310 352 372 380" />
          <path d="M120 470C200 432 320 432 400 470" />
          <path d="M96 530C190 486 330 486 424 530" />
          <path d="M70 596C180 548 340 548 450 596" />
        </g>

        <path
          d="M262 150C326 150 359 214 354 286"
          fill="none"
          stroke="#d6fffc"
          strokeOpacity="0.5"
          strokeWidth="1.4"
        />
      </g>

      <path
        d="M40 640C46 522 118 458 226 436L232 392C196 372 174 330 170 286C165 214 198 150 262 150C326 150 359 214 354 286C350 330 328 372 292 392L298 436C406 458 478 522 484 640"
        fill="none"
        stroke="url(#rimStroke)"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function Hero() {
  const fieldRef = usePointerField<HTMLElement>();
  const { role, index } = useRoleCycle(hero.roles);

  return (
    <section id="home" className="hero" ref={fieldRef} aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__orb hero__orb--a" />
        <div className="hero__orb hero__orb--b" />
        <div className="hero__floor" />
        <div className="hero__spotlight" />
        <div className="hero__particles">
          {PARTICLES.map((particle, i) => (
            <span
              key={i}
              className="hero__particle"
              style={
                {
                  '--x': particle.x,
                  '--y': particle.y,
                  '--s': `${particle.s}px`,
                  '--d': `${particle.d}s`,
                  '--dx': particle.dx,
                  '--dy': particle.dy,
                  '--delay': `${i * 0.7}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>

      <div className="shell hero__inner">
        <div className="hero__copy">
          <p className="hero__badge" style={{ '--d': '0ms' } as React.CSSProperties}>
            <span className="dot" aria-hidden="true" />
            {hero.badge}
          </p>

          <h1 className="hero__title" id="hero-title" style={{ '--d': '80ms' } as React.CSSProperties}>
            <span className="hero__hello">{hero.greeting}</span>
            <span className="hero__name grad-text">{hero.name}</span>
          </h1>

          <p className="hero__role" style={{ '--d': '160ms' } as React.CSSProperties}>
            <span className="hero__role-mark" aria-hidden="true" />
            <span className="sr-only">{site.title}</span>
            <span className="hero__role-text" key={index} aria-hidden="true">
              {role}
            </span>
            <span className="hero__caret" aria-hidden="true" />
          </p>

          <p className="hero__intro" style={{ '--d': '230ms' } as React.CSSProperties}>
            {hero.intro}
          </p>

          <div className="hero__actions" style={{ '--d': '300ms' } as React.CSSProperties}>
            <a className="btn btn--primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
              <Icon name="arrow" />
            </a>
            <a className="btn btn--ghost" href={hero.secondaryCta.href} download>
              <Icon name="download" />
              {hero.secondaryCta.label}
            </a>
          </div>

          <dl className="hero__meta" style={{ '--d': '380ms' } as React.CSSProperties}>
            <div>
              <dt>Based in</dt>
              <dd>Tehran, Iran</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Web · Design · AI</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd className="hero__meta-status">
                <span className="dot" aria-hidden="true" />
                Open to work
              </dd>
            </div>
          </dl>
        </div>

        <div className="hero__visual">
          <Portrait />
        </div>
      </div>

      <a className="hero__scroll" href="#about">
        <span className="hero__scroll-line" aria-hidden="true" />
        Scroll
      </a>
    </section>
  );
}
