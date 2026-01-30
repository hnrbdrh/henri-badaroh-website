import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/content';
import type { Language } from '@/lib/types';
import { notFound } from 'next/navigation';

// This is a server component
export default async function ProjectPage({ 
  params 
}: { 
  params: Promise<{ lang: Language; slug: string }> 
}) {
  const { lang, slug } = await params;
  const project = await getProjectBySlug(slug, lang);

  if (!project) {
    notFound();
  }

  return (
    <>
      <BackButton lang={lang} />

      <div className="container-centered min-h-screen page-wrapper" style={{ paddingTop: '14vh', paddingBottom: '3rem' }}>
        <Header lang={lang} showSubtitleLink showLanguageFlag={false} />

        <main className="page-content">
          {/* Project Title with Year */}
          <ul className="leaders" style={{ marginBottom: '4rem' }}>
            <li className="project-item">
              <span className="chapter-number">{'\u00A0\u00A0\u00A0\u00A0'}</span>
              <span className="project-title">{project.metadata.title}</span>
              <span className="project-year">{project.metadata.year}</span>
            </li>
          </ul>

          {/* Project Content */}
          <div
            className="body-text"
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        </main>
      </div>
    </>
  );
}

// Generate static pages for all projects in both languages
export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  const params = [];
  
  for (const slug of slugs) {
    params.push({ lang: 'en' as Language, slug });
    params.push({ lang: 'br' as Language, slug });
  }
  
  return params;
}