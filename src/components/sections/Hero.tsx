import { useState } from 'react';
import { site } from '../../data/site';
import { useParallax } from '../../hooks/useParallax';
import { IconArrowLeft, IconCheck, IconPlay } from '../ui/Icons';
import { HeroStats } from './HeroStats';
import { VideoModal } from './VideoModal';
import './Hero.css';

export function Hero() {
  const offset = useParallax(90);
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section id="home" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-image" style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.1)` }}>
          <img src="/images/hero-rope.webp" alt="" width={2200} height={1467} decoding="async" />
        </div>
        <span className="hero__veil" />
        <span className="hero__beam" />
        <span className="hero__glow hero__glow--green" />
        <span className="hero__glow hero__glow--white" />
      </div>

      <div className="hero__inner container">
        <div className="hero__main">
          <p className="hero__eyebrow">
            <span className="hero__eyebrow-dot" aria-hidden="true" />
            {site.hero.eyebrow}
          </p>

          <h1 className="hero__title">
            <span className="hero__title-primary">
              <span className="hero__title-accent">{site.hero.titleLead}</span> {site.hero.titleRest}
            </span>
            <span className="hero__title-ghost">{site.hero.titleGhost}</span>
          </h1>

          <p className="hero__lead">{site.hero.lead}</p>

          <ul className="hero__points">
            {site.hero.points.map((point) => (
              <li key={point}>
                <IconCheck size={15} />
                {point}
              </li>
            ))}
          </ul>

          <div className="hero__actions">
            <a className="btn btn--primary" href={site.hero.primaryCta.href}>
              {site.hero.primaryCta.label}
              <IconArrowLeft size={18} />
            </a>
            <a className="btn btn--ghost" href={site.hero.secondaryCta.href}>
              {site.hero.secondaryCta.label}
            </a>
          </div>
        </div>

        <aside className="hero__aside" aria-label="دسترسی سریع">
          {site.hero.panels.map((panel, index) => (
            <a className="hero-panel" href={panel.href} key={panel.title} style={{ '--i': index } as React.CSSProperties}>
              <span className="hero-panel__text">
                <span className="hero-panel__title">{panel.title}</span>
                <span className="hero-panel__caption">{panel.caption}</span>
              </span>
              <span className="hero-panel__icon" aria-hidden="true">
                <IconArrowLeft size={17} />
              </span>
            </a>
          ))}

          <button type="button" className="hero-video" onClick={() => setVideoOpen(true)}>
            <span className="hero-video__thumb" aria-hidden="true">
              <img src={site.video.poster} alt="" width={160} height={96} loading="lazy" decoding="async" />
              <span className="hero-video__play">
                <IconPlay size={12} />
              </span>
            </span>
            <span className="hero-video__text">
              <span className="hero-video__label">{site.hero.videoLabel}</span>
              <span className="hero-video__duration" dir="ltr">
                {site.hero.videoDuration}
              </span>
            </span>
          </button>
        </aside>
      </div>

      <HeroStats />

      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-label">SCROLL</span>
        <span className="hero__scroll-track">
          <span className="hero__scroll-dot" />
          <span className="hero__scroll-dot" />
          <span className="hero__scroll-dot" />
        </span>
      </div>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </section>
  );
}
