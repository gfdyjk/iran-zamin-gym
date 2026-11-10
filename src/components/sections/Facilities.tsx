import { useState } from 'react';
import { site } from '../../data/site';
import { IconArrowLeft } from '../ui/Icons';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';
import { Gallery } from './Gallery';
import './Facilities.css';

export function Facilities() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="facilities" className="section facilities">
      <div className="container">
        <div className="section-head section-head--split facilities__head">
          <Reveal className="section-head">
            <SectionLabel index="03">امکانات باشگاه</SectionLabel>
            <h2 className="section-title">فضایی که برای تمرین جدی ساخته شده</h2>
            <p className="section-lead">
              سالن وسیع، تجهیزات کامل قدرتی و هوازی و منطقهٔ تمرین عملکردی؛ همه در یک باشگاه با نورپردازی و فضای حرفه‌ای.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <button type="button" className="btn btn--ghost" onClick={() => setLightboxIndex(0)}>
              مشاهدهٔ گالری کامل
              <IconArrowLeft size={17} />
            </button>
          </Reveal>
        </div>

        <ul className="facilities__grid">
          {site.facilities.map((facility, index) => (
            <Reveal as="li" key={facility.id} delay={index * 60} className="facilities__item">
              <button
                type="button"
                className="facility"
                onClick={() => setLightboxIndex(index)}
                aria-haspopup="dialog"
                aria-label={`بزرگ‌نمایی تصویر ${facility.title}`}
              >
                <img src={facility.image} alt={facility.title} width={1100} height={733} loading="lazy" decoding="async" />
                <span className="facility__overlay">
                  <span className="facility__title">{facility.title}</span>
                  <span className="facility__desc">{facility.description}</span>
                </span>
                <span className="facility__plus" aria-hidden="true">
                  +
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <Gallery
        items={site.facilities}
        index={lightboxIndex}
        onChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </section>
  );
}
