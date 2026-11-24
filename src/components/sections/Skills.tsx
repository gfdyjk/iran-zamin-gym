import { skills } from '../../data/site';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { TiltCard } from '../ui/TiltCard';
import '../ui/TiltCard.css';
import './Skills.css';

export function Skills() {
  return (
    <section className="section skills" id="skills" aria-labelledby="skills-title">
      <div className="shell">
        <SectionHeading
          index={skills.eyebrow}
          label={skills.label}
          title={skills.title}
          id="skills-title"
          wide
        />

        <ul className="skills__grid">
          {skills.categories.map((category, index) => (
            <li key={category.title}>
              <Reveal delay={index * 70} variant="scale">
                <TiltCard className="skills__card" max={5}>
                  <header className="skills__head">
                    <span className="skills__icon" aria-hidden="true">
                      <Icon name={category.icon} size={22} />
                    </span>
                    <div>
                      <h3 className="skills__title">{category.title}</h3>
                      <span className="skills__code">{category.code}</span>
                    </div>
                  </header>

                  <ul className="skills__list">
                    {category.items.map((item) => (
                      <li key={item}>
                        <span className="skills__dot" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
