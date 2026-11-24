import { overview } from '../../data/site';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { TiltCard } from '../ui/TiltCard';
import '../ui/TiltCard.css';
import './Overview.css';

export function Overview() {
  return (
    <section className="section overview" id="overview" aria-labelledby="overview-title">
      <div className="shell">
        <SectionHeading
          index={overview.eyebrow}
          label={overview.label}
          title={overview.title}
          id="overview-title"
          wide
        />

        <ul className="overview__grid">
          {overview.cards.map((card, index) => (
            <li key={card.title} className="overview__cell">
              <Reveal delay={index * 80} variant="scale">
                <TiltCard className="overview__card">
                  <div className="overview__top">
                    <span className="overview__icon" aria-hidden="true">
                      <Icon name={card.icon} size={24} />
                    </span>
                    <span className="overview__index" aria-hidden="true">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="overview__kicker">{card.kicker}</p>
                  <h3 className="overview__title">{card.title}</h3>
                  <p className="overview__text">{card.text}</p>
                  <span className="overview__edge" aria-hidden="true" />
                </TiltCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
