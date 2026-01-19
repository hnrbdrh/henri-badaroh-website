'use client';

import Link from 'next/link';
import type { Language } from '@/lib/types';

interface HeaderProps {
  lang: Language;
  showSubtitleLink?: boolean;
}

const subtitles = {
  en: 'brazilian visual artist & writer',
  br: 'artista visual & escritor brasileiro',
};

export default function Header({ lang, showSubtitleLink = false }: HeaderProps) {
  const subtitle = subtitles[lang];

  return (
    <header className="mb-12 text-center">
      <Link href={`/${lang}/about`} className="hover:opacity-70 transition-opacity">
        <h1 className="title-text">henri badaröh</h1>
      </Link>

      {showSubtitleLink ? (
        <Link href={`/${lang}`} className="hover:opacity-70 transition-opacity">
          <p className="subtitle-text">{subtitle}</p>
        </Link>
      ) : (
        <p className="subtitle-text">{subtitle}</p>
      )}
    </header>
  );
}
