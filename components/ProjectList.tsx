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
  const [hoveredChapter, setHoveredChapter] = useState<Chapter | null>(null);

  const handleProjectClick = (slug: string) => {
    router.push(`/${lang}/project/${slug}`);
  };

  return (
    <div>
      {chapters.map((chapter) => {
        const projects = projectsByChapter[chapter.id];
        if (!projects || projects.length === 0) return null;

        const isChapterHovered = hoveredChapter === chapter.id;

        return (
          <section key={chapter.id} id={`chapter-${chapter.id}`} className="chapter-section">
            <ul className="leaders">
              {projects.map((project, index) => {
                const isProjectHovered = hoveredProject === project.metadata.slug;
                // Only fade other projects within the same chapter
                const shouldFade = hoveredProject && !isProjectHovered && isChapterHovered;

                return (
                  <li
                    key={project.metadata.slug}
                    className={`project-item ${shouldFade ? 'faded' : ''}`}
                    onClick={() => handleProjectClick(project.metadata.slug)}
                    onMouseEnter={() => {
                      setHoveredProject(project.metadata.slug);
                      setHoveredChapter(chapter.id);
                    }}
                    onMouseLeave={() => {
                      setHoveredProject(null);
                      setHoveredChapter(null);
                    }}
                  >
                    <span className={`chapter-number ${isChapterHovered ? 'chapter-active' : ''}`}>
                      {index === 0 ? `${chapter.id}.` : '\u00A0\u00A0\u00A0\u00A0'}
                    </span>
                    <span className="project-title">
                      {project.metadata.title}
                    </span>
                    <span className="project-year">
                      {project.metadata.year}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
