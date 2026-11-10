import { useState } from 'react';
import { site } from '../../data/site';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';
import { IconPlay } from '../ui/Icons';
import { VideoModal } from './VideoModal';
import './VideoStory.css';

export function VideoStory() {
  const [open, setOpen] = useState(false);

  return (
    <section id="story" className="story">
      <div className="story__bg" aria-hidden="true">
        <img src={site.video.poster} alt="" width={1600} height={1067} loading="lazy" decoding="async" />
      </div>
      <span className="story__veil" aria-hidden="true" />

      <div className="container story__inner">
        <Reveal className="story__head">
          <SectionLabel index="05">{site.video.label}</SectionLabel>
          <h2 className="section-title story__title">{site.video.title}</h2>
          <p className="section-lead story__lead">{site.video.subtitle}</p>
        </Reveal>

        <Reveal delay={120} className="story__player">
          <button type="button" className="story__play" onClick={() => setOpen(true)} aria-label={`پخش ویدیو: ${site.video.title}`}>
            <span className="story__play-ring" aria-hidden="true" />
            <IconPlay size={22} />
          </button>
          <span className="story__duration" dir="ltr">
            {site.video.duration}
          </span>
          <span className="story__hint">تماشای معرفی باشگاه</span>
        </Reveal>
      </div>

      <VideoModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
