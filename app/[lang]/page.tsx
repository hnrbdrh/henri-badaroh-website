import Header from '@/components/Header';
import ChapterMenu from '@/components/ChapterMenu';
import ProjectList from '@/components/ProjectList';
import { getProjectsByChapter } from '@/lib/content';
import type { Language } from '@/lib/types';

// This is a server component - no 'use client' needed
export default async function HomePage({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const projectsByChapter = await getProjectsByChapter(lang);

  return (
    <div className="container-centered min-h-screen" style={{ paddingTop: '10vh', paddingBottom: '3rem' }}>
      <Header lang={lang} />
      <ChapterMenu lang={lang} />
      <ProjectList projectsByChapter={projectsByChapter} lang={lang} />
    </div>
  );
}

// Generate static pages for both languages
export async function generateStaticParams() {
  return [
    { lang: 'en' as Language },
    { lang: 'br' as Language },
  ];
}