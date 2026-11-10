import { site, type Stat } from '../../data/site';
import { useCountUp } from '../../hooks/useCountUp';
import { useInView } from '../../hooks/useInView';

function StatValue({ stat, active }: { stat: Stat; active: boolean }) {
  const animated = useCountUp(stat.value ?? 0, active, { decimals: stat.decimals ?? 0 });
  return <span className="hero-stat__value">{stat.staticValue ?? `${animated}${stat.suffix ?? ''}`}</span>;
}

export function HeroStats() {
  // The bar sits at the very bottom of the first screen, so it must count up
  // as soon as it appears rather than after a scroll.
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15, rootMargin: '0px' });

  return (
    <div className="hero-stats" ref={ref}>
      <div className="container hero-stats__inner">
        <ul className="hero-stats__list">
          {site.stats.map((stat) => (
            <li className="hero-stat" key={stat.label}>
              <StatValue stat={stat} active={inView} />
              <span className="hero-stat__label">{stat.label}</span>
            </li>
          ))}
        </ul>
        <p className="hero-stats__note">
          <span className="badge">دادهٔ نمونه</span>
          {site.hero.statsNote}
        </p>
      </div>
    </div>
  );
}
