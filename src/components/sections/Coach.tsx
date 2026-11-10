import { useState } from 'react';
import { site } from '../../data/site';
import { IconArrowLeft, IconCheck } from '../ui/Icons';
import { Modal } from '../ui/Modal';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';
import './Coach.css';

export function Coach() {
  const [open, setOpen] = useState(false);
  const coach = site.coach;

  return (
    <section id="coach" className="section coach">
      <div className="container coach__inner">
        <Reveal className="coach__media">
          <figure className="coach__frame">
            <img
              src="/images/coach-mohsen.webp"
              alt={`پرترهٔ ${coach.name}، ${coach.role}`}
              width={1200}
              height={800}
              loading="lazy"
              decoding="async"
            />
            <span className="coach__frame-glow" aria-hidden="true" />
          </figure>
          <div className="coach__plate">
            <span className="coach__plate-label">مربی اصلی</span>
            <span className="coach__plate-name">{coach.name}</span>
          </div>
        </Reveal>

        <div className="coach__body">
          <Reveal>
            <SectionLabel index="01">{coach.label}</SectionLabel>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="section-title coach__title">{coach.title}</h2>
          </Reveal>

          <Reveal delay={140} className="coach__identity">
            <p className="coach__name">{coach.name}</p>
            <p className="coach__latin" dir="ltr">
              {coach.latin}
            </p>
            <p className="coach__role">{coach.role}</p>
          </Reveal>

          <Reveal delay={200}>
            <p className="section-lead coach__bio">{coach.bio}</p>
          </Reveal>

          <Reveal delay={260}>
            <ul className="coach__principles">
              {coach.principles.map((principle) => (
                <li key={principle}>
                  <IconCheck size={15} />
                  {principle}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={320}>
            <button type="button" className="btn btn--ghost" onClick={() => setOpen(true)}>
              {coach.cta}
              <IconArrowLeft size={17} />
            </button>
          </Reveal>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} label={`دربارهٔ ${coach.name}`} size="lg">
        <div className="coach-modal">
          <p className="eyebrow">دربارهٔ مربی</p>
          <h3 className="coach-modal__title">{coach.name}</h3>
          <p className="coach-modal__role">{coach.role}</p>
          <p className="coach-modal__intro">{coach.modal.intro}</p>

          <ul className="coach-modal__list">
            {coach.modal.approach.map((item) => (
              <li key={item}>
                <IconCheck size={16} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="coach-modal__note">
            <span className="badge">در حال تکمیل</span>
            {coach.modal.note}
          </p>

          <a className="btn btn--primary coach-modal__cta" href="#join" onClick={() => setOpen(false)}>
            دریافت مشاوره با مربی
            <IconArrowLeft size={17} />
          </a>
        </div>
      </Modal>
    </section>
  );
}
