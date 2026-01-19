'use client';

import { chapters } from '@/lib/chapters';
import type { Language, Chapter } from '@/lib/types';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ChapterMenuProps {
  lang: Language;
}

export default function ChapterMenu({ lang }: ChapterMenuProps) {
  const [hoveredChapter, setHoveredChapter] = useState<string | null>(null);
  const router = useRouter();

  const handleChapterClick = (chapterId: Chapter) => {
    if (chapterId === 'v') {
      router.push(`/${lang}/about`);
    } else {
      const element = document.getElementById(`chapter-${chapterId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <nav className="mb-8 hover-group">
      {chapters.map((chapter) => (
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
