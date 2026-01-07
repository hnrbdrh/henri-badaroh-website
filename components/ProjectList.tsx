'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Project, Language, Chapter } from '@/lib/types';
import { chapters } from '@/lib/chapters';

interface ProjectListProps {
  projectsByChapter: Record<Chapter, Project[]>;
  lang: Language;
}

export default function ProjectList({ projectsByChapter, lang }: ProjectListProps) {
  const router = useRouter();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const handleProjectClick = (slug: string) => {
    router.push(`/${lang}/project/${slug}`);
  };

  return (
    <div>
      {chapters.map((chapter, chapterIndex) => {
        const projects = projectsByChapter[chapter.id];
        if (!projects || projects.length === 0) return null;

        return (
          <section key={chapter.id} id={`chapter-${chapter.id}`} className="chapter-section">
            <div className="hover-group">
              {projects.map((project, index) => (
                <div
                  key={project.metadata.slug}
                  className={`project-item hover-item ${
                    hoveredProject && hoveredProject !== project.metadata.slug ? 'opacity-30' : ''
                  }`}
                  onClick={() => handleProjectClick(project.metadata.slug)}
                  onMouseEnter={() => setHoveredProject(project.metadata.slug)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <span className="chapter-number">{index === 0 ? `${chapter.id}.` : ''}</span>
                  <span className="project-title">{project.metadata.title}</span>
                  <span className="dotted-line"></span>
                  <span className="project-year">{project.metadata.year}</span>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
