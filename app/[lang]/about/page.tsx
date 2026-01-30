import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import { getAboutContent } from '@/lib/content';
import type { Language, SocialLink } from '@/lib/types';
import Image from 'next/image';

// This is a server component
export default async function AboutPage({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const aboutContent = await getAboutContent(lang);

  if (!aboutContent) {
    return (
      <div className="container-centered min-h-screen" style={{ paddingTop: '10vh', paddingBottom: '3rem' }}>
        <Header lang={lang} showSubtitleLink />
        <p>Content not available</p>
      </div>
    );
  }

  return (
    <>
      <BackButton lang={lang} showBackButton={false} showScrollToTop={false} />
      <div className="container-centered min-h-screen page-wrapper" style={{ paddingTop: '14vh', paddingBottom: '3rem' }}>
        <Header lang={lang} showSubtitleLink showLanguageFlag={false} />

        <main className="page-content">
        {/* Portrait Image */}
        <div className="about-image-container">
          <Image
            src={aboutContent.portrait}
            alt="Henri Badaroh"
            width={800}
            height={600}
            style={{ width: '100%', height: 'auto' }}
            priority
          />
        </div>

        {/* Portrait Caption */}
        {aboutContent.portraitCaption && (
          <p className="image-caption" style={{ marginBottom: '2rem' }} dangerouslySetInnerHTML={{ __html: aboutContent.portraitCaption }} />
        )}

        {/* Biography (before ASSETS) */}
        {(() => {
          const assetsMarker = '<strong>ASSETS</strong>';
          const assetsIndex = aboutContent.content.indexOf(assetsMarker);
          const bioContent = assetsIndex > -1
            ? aboutContent.content.substring(0, assetsIndex)
            : aboutContent.content;
          const assetsContent = assetsIndex > -1
            ? aboutContent.content.substring(assetsIndex)
            : '';

          return (
            <>
              <div
                className="body-text"
                style={{ marginBottom: '2rem' }}
                dangerouslySetInnerHTML={{ __html: bioContent }}
              />

              {/* Social Links - above ASSETS */}
              {aboutContent.socialLinks && aboutContent.socialLinks.length > 0 && (
                <div className="text-left" style={{ marginBottom: '3rem', fontSize: '0.805rem', fontStyle: 'italic' }}>
                  {aboutContent.socialLinks.map((link: SocialLink, index: number) => (
                    <span key={link.name}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-70 transition-opacity"
                      >
                        {link.name}
                      </a>
                      {index < aboutContent.socialLinks.length - 1 && ', '}
                    </span>
                  ))}
                </div>
              )}

              {/* ASSETS section */}
              {assetsContent && (
                <div
                  className="body-text"
                  style={{ marginBottom: '200px' }}
                  dangerouslySetInnerHTML={{ __html: assetsContent }}
                />
              )}
            </>
          );
        })()}
      </main>
    </div>
    </>
  );
}

// Generate static pages for both languages
export async function generateStaticParams() {
  return [
    { lang: 'en' as Language },
    { lang: 'br' as Language },
  ];
}