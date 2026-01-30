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
    <div className="language-page-container">
      <header className="mb-12 text-center">
        <h1 className="title-text">henri badaröh</h1>
      </header>

      <div className="language-selection-wrapper">
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
