'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { Language } from '@/lib/types';

interface BackButtonProps {
  lang: Language;
  showBackButton?: boolean;
  showScrollToTop?: boolean;
}

export default function BackButton({ lang, showBackButton = true, showScrollToTop = true }: BackButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show arrows immediately when user scrolls even a little
      const scrolled = window.scrollY > 10;
      setHasScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  // Flag for the OTHER language (the one to switch to)
  const otherLanguageFlag = lang === 'en' ? '🇧🇷' : '🇬🇧';

  return (
    <>
      {showBackButton && (
        <button
          className={`back-button ${hasScrolled ? 'visible' : ''}`}
          onClick={() => router.push(`/${lang}`)}
          aria-label="Back to home"
        >
          ↑
        </button>
      )}
      {/* Language flag - visible when not scrolled */}
      <button
        className={`language-flag-button ${!hasScrolled ? 'visible' : ''}`}
        onClick={handleLanguageSwitch}
        aria-label={lang === 'en' ? 'Switch to Portuguese' : 'Switch to English'}
      >
        {otherLanguageFlag}
      </button>
      {/* Scroll to top - visible when scrolled, replaces flag */}
      {showScrollToTop && (
        <button
          className={`scroll-top-button ${hasScrolled ? 'visible' : ''}`}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </>
  );
}
