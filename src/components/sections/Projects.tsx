import { useState } from 'react';
import { projects, type Project } from '../../data/site';
import { useTilt } from '../../hooks/useTilt';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectModal } from './ProjectModal';
import { ProjectVisual } from './ProjectVisual';
import './Projects.css';

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const tiltRef = useTilt<HTMLButtonElement>(4);

  return (
    <button
      ref={tiltRef}
      type="button"
      className="project tilt"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`Open case study: ${project.title}`}
    >
      <span className="project__media">
        <ProjectVisual project={project} />
      </span>

      <span className="project__body">
        <span className="project__meta">
          <span className="project__index">{project.index}</span>
          <span className="project__category">{project.category}</span>
        </span>

        <span className="project__title">{project.title}</span>
        <span className="project__text">{project.description}</span>

        <span className="project__foot">
          <span className="project__link">
            View case study
            <Icon name="arrow" />
          </span>
          <span className="project__year">{project.year}</span>
        </span>
      </span>
    </button>
  );
}

export function Projects() {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  return (
    <section className="section projects" id="projects" aria-labelledby="projects-title">
      <div className="shell">
        <SectionHeading
          index="04"
          label="Selected Projects"
          title="Work that pairs design intent with engineering discipline."
          id="projects-title"
          lede="Four selected concepts across fitness, productivity, real estate and artificial intelligence — each built as a complete digital experience."
          wide
        />

        <ul className="projects__grid">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <Reveal delay={(index % 2) * 90} variant="scale">
                <ProjectCard project={project} onOpen={() => setOpenProject(project)} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}
