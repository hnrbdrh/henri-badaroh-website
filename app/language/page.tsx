'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

export default function LanguagePage() {
  const router = useRouter();
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);

  const handleLanguageSelect = (lang: string) => {
    router.push(`/${lang}`);
  };

  return (
    <div className="container-centered min-h-screen page-wrapper" style={{ paddingTop: '14vh', paddingBottom: '3rem' }}>
      <header className="mb-12 text-center header-hover-group">
        <span className="header-title-link transition-opacity">
          <h1 className="title-text">henri badaröh</h1>
        </span>
      </header>

      <div className="language-selection-wrapper" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <button
          className={`language-button hover-item ${hoveredLang && hoveredLang !== 'en' ? 'opacity-30' : ''}`}
          onClick={() => handleLanguageSelect('en')}
          onMouseEnter={() => setHoveredLang('en')}
          onMouseLeave={() => setHoveredLang(null)}
        >
          English
        </button>

        <div className={`language-image ${hoveredLang ? 'grayscale' : ''}`}>
          <Image
            src="/frog.png"
            alt="Frog"
            width={150}
            height={150}
            priority
            style={{ width: '100%', height: 'auto', maxWidth: '150px' }}
          />
        </div>

        <button
          className={`language-button hover-item ${hoveredLang && hoveredLang !== 'br' ? 'opacity-30' : ''}`}
          onClick={() => handleLanguageSelect('br')}
          onMouseEnter={() => setHoveredLang('br')}
          onMouseLeave={() => setHoveredLang(null)}
        >
          Brasileira
        </button>
      </div>
    </div>
  );
}
