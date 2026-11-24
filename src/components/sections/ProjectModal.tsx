import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { Project } from '../../data/site';
import { useBodyLock } from '../../hooks/useUiState';
import { Icon } from '../ui/Icon';
import { ProjectVisual } from './ProjectVisual';
import './ProjectModal.css';

type Props = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useBodyLock(Boolean(project));

  useEffect(() => {
    if (!project) return;

    openerRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (!nodes || nodes.length === 0) return;

      const list = Array.from(nodes);
      const first = list[0];
      const last = list[list.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      openerRef.current?.focus?.();
    };
  }, [project, onClose]);

  if (!project) return null;

  return createPortal(
    <div className="pmodal" role="dialog" aria-modal="true" aria-labelledby="pmodal-title">
      <button type="button" className="pmodal__backdrop" aria-label="Close case study" onClick={onClose} />

      <div className="pmodal__panel" ref={panelRef}>
        <button type="button" className="pmodal__close" onClick={onClose} ref={closeRef} aria-label="Close case study">
          <Icon name="close" size={18} />
        </button>

        <div className="pmodal__media">
          <ProjectVisual project={project} />
        </div>

        <div className="pmodal__body">
          <p className="pmodal__eyebrow">
            <span>{project.index}</span>
            {project.category} · {project.year}
          </p>

          <h2 className="pmodal__title" id="pmodal-title">
            {project.title}
          </h2>

          <p className="pmodal__desc">{project.description}</p>

          <dl className="pmodal__facts">
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
          </dl>

          <div className="pmodal__stack">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <h3 className="pmodal__subhead">Highlights</h3>
          <ul className="pmodal__highlights">
            {project.highlights.map((highlight) => (
              <li key={highlight}>
                <span aria-hidden="true">
                  <Icon name="check" size={12} />
                </span>
                {highlight}
              </li>
            ))}
          </ul>

          <button type="button" className="btn btn--primary pmodal__cta" onClick={onClose}>
            Close case study
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
