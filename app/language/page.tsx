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
      <h1 className="title-text">Henri Badaröh</h1>

      <div className="language-selection-wrapper">
        <button
          className={`language-button hover-item ${hoveredLang && hoveredLang !== 'en' ? 'opacity-30' : ''}`}
          onClick={() => handleLanguageSelect('en')}
          onMouseEnter={() => setHoveredLang('en')}
          onMouseLeave={() => setHoveredLang(null)}
        >
          English
        </button>

        <div className="language-image">
          <Image
            src="/frog.png"
            alt="Frog"
            width={300}
            height={300}
            priority
            style={{ width: '100%', height: 'auto' }}
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
