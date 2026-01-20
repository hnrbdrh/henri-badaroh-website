'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import type { Language } from '@/lib/types';

interface HeaderProps {
  lang: Language;
  showSubtitleLink?: boolean;
}

const subtitles = {
  en: (
    <>
      editor & writer <span className="italic-text">of</span> <span className="italic-text">essays</span> & <span className="italic-text">crônicas</span>,
      <br />
      visual artist,
      <br />
      t<span className="small-paren">(</span><span className="italic-text">h</span><span className="small-paren">)</span>inker
    </>
  ),
  br: (
    <>
      editor & escritor <span className="italic-text">de</span> <span className="italic-text">ensaios</span> & <span className="italic-text">crônicas</span>,
      <br />
      artista visual,
      <br />
      pensador(a)
    </>
  ),
};

export default function Header({ lang, showSubtitleLink = false }: HeaderProps) {
  const subtitle = subtitles[lang];
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageSwitch = () => {
    const newLang = lang === 'en' ? 'br' : 'en';
    const newPath = pathname.replace(/^\/(en|br)/, `/${newLang}`);
    router.push(newPath);
  };

  const otherLanguageLabel = lang === 'en' ? 'brasileira' : 'english';

  return (
    <>
      <button
        onClick={handleLanguageSwitch}
        className="language-switcher"
      >
        {otherLanguageLabel}
      </button>
      <header className="mb-12 text-center">
        <Link href={`/${lang}/about`} className="hover:opacity-70 transition-opacity">
          <h1 className="title-text">Henri Badaröh</h1>
        </Link>

        {showSubtitleLink ? (
          <Link href={`/${lang}`} className="hover:opacity-70 transition-opacity">
            <p className="subtitle-text">{subtitle}</p>
          </Link>
        ) : (
          <p className="subtitle-text">{subtitle}</p>
        )}
      </header>
    </>
  );
}
