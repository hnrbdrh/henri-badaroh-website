import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { Project, ProjectMetadata, Language, Chapter } from './types';

const contentDirectory = path.join(process.cwd(), 'content');

// Configure marked renderer to add classes to images and captions
const renderer = new marked.Renderer();
renderer.image = (href, title, text) => {
  return `<figure class="image-figure">
    <img src="${href}" alt="${text}" class="project-image" ${title ? `title="${title}"` : ''} />
    <figcaption class="image-caption">${text}</figcaption>
  </figure>`;
};

marked.setOptions({ renderer });

// Re-export chapters from the separate file (for backward compatibility)
export { chapters } from './chapters';

// Get all projects for a specific language
export async function getAllProjects(lang: Language): Promise<Project[]> {
  const projectsDirectory = path.join(contentDirectory, 'projects');
  
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const projectFolders = fs.readdirSync(projectsDirectory);
  const projects: Project[] = [];

  for (const folder of projectFolders) {
    const projectPath = path.join(projectsDirectory, folder);
    
    if (!fs.statSync(projectPath).isDirectory()) continue;

    const filePath = path.join(projectPath, `${lang}.md`);
    
    if (!fs.existsSync(filePath)) continue;

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    projects.push({
      metadata: {
        title: data.title,
        year: data.year,
        chapter: data.chapter,
        slug: folder,
        order: data.order || 0,
      },
      content: await marked(content),
    });
  }

  // Sort by order and then by year
  return projects.sort((a, b) => {
    const orderDiff = (a.metadata.order || 0) - (b.metadata.order || 0);
    if (orderDiff !== 0) return orderDiff;
    return parseInt(b.metadata.year) - parseInt(a.metadata.year);
  });
}

// Get projects grouped by chapter
export async function getProjectsByChapter(lang: Language): Promise<Record<Chapter, Project[]>> {
  const allProjects = await getAllProjects(lang);
  
  const grouped: Record<Chapter, Project[]> = {
    'i': [],
    'ii': [],
    'iii': [],
    'iv': [],
  };

  allProjects.forEach(project => {
    grouped[project.metadata.chapter].push(project);
  });

  return grouped;
}

// Get a single project by slug
export async function getProjectBySlug(slug: string, lang: Language): Promise<Project | null> {
  const projectPath = path.join(contentDirectory, 'projects', slug);
  
  if (!fs.existsSync(projectPath)) {
    return null;
  }

  const filePath = path.join(projectPath, `${lang}.md`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    metadata: {
      title: data.title,
      year: data.year,
      chapter: data.chapter,
      slug: slug,
      order: data.order || 0,
    },
    content: await marked(content),
  };
}

// Get about page content
export async function getAboutContent(lang: Language) {
  const aboutPath = path.join(contentDirectory, 'about', `${lang}.md`);
  
  if (!fs.existsSync(aboutPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(aboutPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    content: await marked(content),
    portrait: data.portrait || '/portrait.jpg',
    portraitCaption: data.portraitCaption || '',
    socialLinks: data.socialLinks || [],
  };
}

// Get all project slugs (for static generation)
export function getAllProjectSlugs(): string[] {
  const projectsDirectory = path.join(contentDirectory, 'projects');
  
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  return fs.readdirSync(projectsDirectory).filter(item => {
    return fs.statSync(path.join(projectsDirectory, item)).isDirectory();
  });
}