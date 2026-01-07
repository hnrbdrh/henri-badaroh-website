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
      <BackButton />

      <div className="container-centered min-h-screen" style={{ paddingTop: '10vh', paddingBottom: '3rem' }}>
        <Header lang={lang} showSubtitleLink />
        
        {/* Project Title with Year */}
        <div className="project-item justify-center" style={{ marginBottom: '4rem' }}>
          <span className="project-title">{project.metadata.title}</span>
          <span className="dotted-line"></span>
          <span className="project-year">{project.metadata.year}</span>
        </div>

        {/* Project Content */}
        <div 
          className="body-text"
          dangerouslySetInnerHTML={{ __html: project.content }}
        />
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