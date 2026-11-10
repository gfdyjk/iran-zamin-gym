import { useState } from 'react';
import { site, type Program } from '../../data/site';
import { IconArrowLeft, IconBarbell, IconCheck, IconDumbbell, IconEndurance, IconFlame, IconSpark } from '../ui/Icons';
import { Modal } from '../ui/Modal';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';
import './Programs.css';

const programIcons = {
  muscle: IconDumbbell,
  flame: IconFlame,
  barbell: IconBarbell,
  endurance: IconEndurance,
  spark: IconSpark,
};

export function Programs() {
  const [selected, setSelected] = useState<Program | null>(null);

  return (
    <section id="programs" className="section programs">
      <div className="container">
        <div className="section-head section-head--split programs__head">
          <Reveal className="section-head">
            <SectionLabel index="02">برنامه‌های تمرینی</SectionLabel>
            <h2 className="section-title">برنامه‌ای که با هدف تو ساخته می‌شود</h2>
            <p className="section-lead">
              از عضله‌سازی و چربی‌سوزی تا قدرت و آمادگی عمومی؛ هر برنامه با ارزیابی اولیه و پیگیری مربی پیش می‌رود.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <a className="btn btn--ghost programs__all" href="#join">
              دریافت مشاورهٔ برنامه
              <IconArrowLeft size={17} />
            </a>
          </Reveal>
        </div>

        <ul className="programs__grid">
          {site.programs.map((program, index) => {
            const Icon = programIcons[program.icon];
            return (
              <Reveal as="li" key={program.id} delay={index * 70} className={index === 0 ? 'programs__item programs__item--featured' : 'programs__item'}>
                <button type="button" className="program-card" onClick={() => setSelected(program)} aria-haspopup="dialog">
                  <span className="program-card__media">
                    <img src={program.image} alt="" width={1000} height={667} loading="lazy" decoding="async" />
                    <span className="program-card__index">{program.index}</span>
                    <span className="program-card__icon" aria-hidden="true">
                      <Icon size={18} />
                    </span>
                  </span>
                  <span className="program-card__body">
                    <span className="program-card__tagline">{program.tagline}</span>
                    <span className="program-card__title">{program.title}</span>
                    <span className="program-card__desc">{program.description}</span>
                    <span className="program-card__cta">
                      مشاهده جزئیات
                      <IconArrowLeft size={16} />
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </ul>
      </div>

      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        label={selected ? `جزئیات برنامهٔ ${selected.title}` : 'جزئیات برنامه'}
        size="lg"
      >
        {selected && (
          <div className="program-modal">
            <div className="program-modal__media">
              <img src={selected.image} alt="" width={1000} height={667} />
              <span className="program-modal__index">{selected.index}</span>
            </div>
            <div className="program-modal__body">
              <p className="eyebrow">{selected.tagline}</p>
              <h3 className="program-modal__title">{selected.title}</h3>
              <p className="program-modal__desc">{selected.description}</p>

              <ul className="program-modal__list">
                {selected.highlights.map((highlight) => (
                  <li key={highlight}>
                    <IconCheck size={15} />
                    {highlight}
                  </li>
                ))}
              </ul>

              <dl className="program-modal__meta">
                {selected.meta.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>

              <a className="btn btn--primary" href="#join" onClick={() => setSelected(null)}>
                درخواست مشاورهٔ این برنامه
                <IconArrowLeft size={17} />
              </a>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
