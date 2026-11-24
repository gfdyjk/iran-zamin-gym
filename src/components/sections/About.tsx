import { about } from '../../data/site';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import './About.css';

export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="about__decor" aria-hidden="true">
        <span className="about__ring" />
        <span className="about__ring about__ring--inner" />
      </div>

      <div className="shell about__grid">
        <div className="about__main">
          <SectionHeading
            index={about.eyebrow}
            label={about.label}
            title={about.title}
            id="about-title"
          />

          <Reveal className="about__panel" delay={80}>
            <span className="about__quote" aria-hidden="true">
              &ldquo;
            </span>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="about__paragraph">
                {paragraph}
              </p>
            ))}
            <ul className="about__principles">
              {about.principles.map((principle) => (
                <li key={principle}>
                  <span className="about__tick" aria-hidden="true">
                    <Icon name="check" size={13} />
                  </span>
                  {principle}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="about__aside" delay={160} variant="right">
          <div className="about__card">
            <div className="about__card-head">
              <span className="about__card-label">Profile data</span>
              <span className="about__card-dot" aria-hidden="true" />
            </div>
            <dl className="about__meta">
              {about.meta.map((row) => (
                <div key={row.label} className="about__meta-row">
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="about__status">
            <span className="dot" aria-hidden="true" />
            <div>
              <p className="about__status-title">Currently available</p>
              <p className="about__status-text">Taking on select web, design and AI projects.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
