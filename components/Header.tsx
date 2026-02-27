'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import type { Language } from '@/lib/types';

interface HeaderProps {
  lang: Language;
  showSubtitleLink?: boolean;
  showLanguageFlag?: boolean;
  isHomepage?: boolean;
}

const subtitles = {
  en: (
    <>
      editor & writer <span className="italic-text">of</span> <span className="italic-text">essays</span> <span className="italic-text">&</span> <span className="italic-text">crônicas</span>,
      <br />
      visual artist,
      <br />
      t<span className="small-paren">(</span><span className="italic-text">h</span><span className="small-paren">)</span>inker
    </>
  ),
  br: (
    <>
      escritor & editor <span className="italic-text">de</span> <span className="italic-text">ensaios</span> <span className="italic-text">&</span> <span className="italic-text">crônicas</span>,
      <br />
      artista visual,
      <br />
      pensador
    </>
  ),
};

export default function Header({ lang, showSubtitleLink = false, showLanguageFlag = true, isHomepage = false }: HeaderProps) {
  const subtitle = subtitles[lang];
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredElement, setHoveredElement] = useState<'title' | 'subtitle' | null>(null);

  const handleLanguageSwitch = () => {
    const newLang = lang === 'en' ? 'br' : 'en';
    const newPath = pathname.replace(/^\/(en|br)/, `/${newLang}`);
    // Save current scroll position
    const scrollPos = window.scrollY;
    router.push(newPath);
    // Restore scroll position after navigation
    setTimeout(() => {
      window.scrollTo(0, scrollPos);
    }, 100);
  };

  // Show the flag for the OTHER language (the one to switch to)
  const otherLanguageFlag = lang === 'en' ? '🇧🇷' : '🇬🇧';

  // Use CSS classes for opacity to ensure Safari compatibility
  const titleFaded = hoveredElement === 'subtitle' ? 'header-element-faded' : '';
  const subtitleFaded = hoveredElement === 'title' ? 'header-element-faded' : '';

  return (
    <>
      {showLanguageFlag && (
        <button
          onClick={handleLanguageSwitch}
          className="language-flag-button visible"
          aria-label={lang === 'en' ? 'Switch to Portuguese' : 'Switch to English'}
        >
          {otherLanguageFlag}
        </button>
      )}
      <header className="mb-12 text-center header-hover-group">
        <Link
          href={`/${lang}/about`}
          className={`header-title-link transition-opacity ${titleFaded}`}
          onMouseEnter={() => setHoveredElement('title')}
          onMouseLeave={() => setHoveredElement(null)}
        >
          <h1 className="title-text">henri badaröh</h1>
        </Link>

        {showSubtitleLink ? (
          <Link
            href={`/${lang}`}
            className={`header-subtitle-link transition-opacity ${subtitleFaded}`}
            onMouseEnter={() => setHoveredElement('subtitle')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <p className="subtitle-text">{subtitle}</p>
          </Link>
        ) : isHomepage ? (
          <Link
            href={`/${lang}`}
            className={`header-subtitle-link transition-opacity ${subtitleFaded}`}
            onMouseEnter={() => setHoveredElement('subtitle')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <p className="subtitle-text">{subtitle}</p>
          </Link>
        ) : (
          <p
            className={`subtitle-text header-subtitle-link ${subtitleFaded}`}
            onMouseEnter={() => setHoveredElement('subtitle')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            {subtitle}
          </p>
        )}
      </header>
    </>
  );
}
