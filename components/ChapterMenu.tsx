'use client';

import { chapters } from '@/lib/chapters';
import type { Language, Chapter } from '@/lib/types';
import { useState } from 'react';

interface ChapterMenuProps {
  lang: Language;
}

export default function ChapterMenu({ lang }: ChapterMenuProps) {
  const [hoveredChapter, setHoveredChapter] = useState<string | null>(null);

  const scrollToChapter = (chapterId: Chapter) => {
    const element = document.getElementById(`chapter-${chapterId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="mb-8 hover-group">
      {chapters.map((chapter) => (
        <div
          key={chapter.id}
          className={`chapter-item hover-item ${hoveredChapter && hoveredChapter !== chapter.id ? 'opacity-30' : ''}`}
          onClick={() => scrollToChapter(chapter.id)}
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
