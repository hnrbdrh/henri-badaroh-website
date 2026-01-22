'use client';

import { chapters } from '@/lib/chapters';
import type { Language, Chapter, Project } from '@/lib/types';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ChapterMenuProps {
  lang: Language;
  projectsByChapter: Record<Chapter, Project[]>;
}

export default function ChapterMenu({ lang, projectsByChapter }: ChapterMenuProps) {
  const [hoveredChapter, setHoveredChapter] = useState<string | null>(null);
  const router = useRouter();

  // Filter chapters to only show those with projects
  const visibleChapters = chapters.filter(
    (chapter) => projectsByChapter[chapter.id]?.length > 0
  );

  const handleChapterClick = (chapterId: Chapter) => {
    const element = document.getElementById(`chapter-${chapterId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="mb-8 hover-group">
      {visibleChapters.map((chapter) => (
        <div
          key={chapter.id}
          className={`chapter-item hover-item ${hoveredChapter && hoveredChapter !== chapter.id ? 'opacity-30' : ''}`}
          onClick={() => handleChapterClick(chapter.id)}
          onMouseEnter={() => setHoveredChapter(chapter.id)}
          onMouseLeave={() => setHoveredChapter(null)}
        >
          <span className="chapter-number">{chapter.id}.</span>
          <span className="chapter-title">{chapter.title[lang].split('. ')[1]}</span>
        </div>
      ))}
    </nav>
  );
}
