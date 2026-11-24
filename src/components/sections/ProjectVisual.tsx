import type { Project } from '../../data/site';
import './ProjectVisual.css';

/**
 * Stylised interface previews — pure CSS/HTML so they cost no network
 * request and stay crisp on every display.
 */
export function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`pv pv--${project.visual}`} style={{ '--acc': project.accent } as React.CSSProperties}>
      <div className="pv__bar" aria-hidden="true">
        <span className="pv__dot" />
        <span className="pv__dot" />
        <span className="pv__dot" />
        <span className="pv__url">{project.slug.replace(/-/g, '')}.com</span>
      </div>
      <div className="pv__screen" aria-hidden="true">
        {screens[project.visual]}
      </div>
      <span className="pv__sheen" aria-hidden="true" />
    </div>
  );
}

const screens: Record<Project['visual'], React.ReactNode> = {
  gym: (
    <>
      <div className="pv__topbar">
        <span className="pv__brand" />
        <span className="pv__navline" />
        <span className="pv__navline" />
        <span className="pv__navline pv__navline--short" />
        <span className="pv__btn" />
      </div>
      <div className="pv__gym">
        <div className="pv__gym-copy">
          <span className="pv__eyebrow" />
          <span className="pv__h pv__h--xl" />
          <span className="pv__h pv__h--xl pv__h--short" />
          <span className="pv__p" />
          <span className="pv__p pv__p--short" />
          <span className="pv__cta" />
        </div>
        <div className="pv__gym-figure">
          <span className="pv__figure-glow" />
          <span className="pv__stat">
            <b>24</b>
            <i />
          </span>
        </div>
      </div>
      <div className="pv__strip">
        <span />
        <span />
        <span />
        <span />
      </div>
    </>
  ),
  app: (
    <>
      <div className="pv__app">
        <div className="pv__sidebar">
          <span className="pv__brand pv__brand--sm" />
          <span className="pv__navline pv__navline--active" />
          <span className="pv__navline" />
          <span className="pv__navline" />
          <span className="pv__navline pv__navline--short" />
        </div>
        <div className="pv__app-main">
          <div className="pv__app-head">
            <span className="pv__h" />
            <span className="pv__ring">
              <b>72%</b>
            </span>
          </div>
          <div className="pv__tasks">
            {[0, 1, 2, 3].map((row) => (
              <span key={row} className={`pv__task${row === 0 ? ' is-done' : ''}`}>
                <i />
                <em />
                <u />
              </span>
            ))}
          </div>
          <div className="pv__bars">
            <span style={{ height: '38%' }} />
            <span style={{ height: '62%' }} />
            <span style={{ height: '48%' }} />
            <span style={{ height: '84%' }} />
            <span style={{ height: '56%' }} />
          </div>
        </div>
      </div>
    </>
  ),
  estate: (
    <>
      <div className="pv__topbar">
        <span className="pv__brand" />
        <span className="pv__navline" />
        <span className="pv__navline" />
        <span className="pv__btn" />
      </div>
      <div className="pv__estate">
        <span className="pv__h pv__h--xl" />
        <span className="pv__filter" />
        <div className="pv__listings">
          {[0, 1, 2].map((card) => (
            <span key={card} className="pv__listing">
              <i />
              <em />
              <u />
            </span>
          ))}
        </div>
      </div>
    </>
  ),
  ai: (
    <>
      <div className="pv__ai">
        <div className="pv__nodes">
          {[0, 1, 2, 3, 4, 5].map((node) => (
            <span key={node} className={`pv__node pv__node--${node}`} />
          ))}
          <span className="pv__link pv__link--1" />
          <span className="pv__link pv__link--2" />
          <span className="pv__link pv__link--3" />
        </div>
        <div className="pv__chat">
          <span className="pv__bubble pv__bubble--in" />
          <span className="pv__bubble pv__bubble--out" />
          <span className="pv__bubble pv__bubble--in pv__bubble--short" />
          <span className="pv__prompt">
            <i />
            <b />
          </span>
        </div>
      </div>
    </>
  ),
};
