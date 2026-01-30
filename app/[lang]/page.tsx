import Header from '@/components/Header';
import ChapterMenu from '@/components/ChapterMenu';
import ProjectList from '@/components/ProjectList';
import BackButton from '@/components/BackButton';
import { getProjectsByChapter } from '@/lib/content';
import type { Language } from '@/lib/types';

// This is a server component - no 'use client' needed
export default async function HomePage({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const projectsByChapter = await getProjectsByChapter(lang);

  return (
    <>
      <BackButton lang={lang} showBackButton={false} showScrollToTop={false} />
      <div className="container-centered min-h-screen page-wrapper" style={{ paddingTop: '14vh', paddingBottom: '3rem' }}>
        <Header lang={lang} showLanguageFlag={false} />
        <main className="page-content">
          <ChapterMenu lang={lang} projectsByChapter={projectsByChapter} />
          <ProjectList projectsByChapter={projectsByChapter} lang={lang} />
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