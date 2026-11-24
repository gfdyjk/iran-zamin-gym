import { services } from '../../data/site';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { TiltCard } from '../ui/TiltCard';
import '../ui/TiltCard.css';
import './Services.css';

export function Services() {
  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <div className="shell">
        <SectionHeading
          index={services.eyebrow}
          label={services.label}
          title={services.title}
          id="services-title"
          wide
        />

        <ul className="services__grid">
          {services.items.map((service, index) => (
            <li key={service.title}>
              <Reveal delay={(index % 4) * 60} variant="scale">
                <TiltCard className="services__card" max={5}>
                  <span className="services__icon" aria-hidden="true">
                    <Icon name={service.icon} size={20} />
                  </span>
                  <h3 className="services__title">{service.title}</h3>
                  <p className="services__text">{service.text}</p>
                  <span className="services__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </TiltCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
