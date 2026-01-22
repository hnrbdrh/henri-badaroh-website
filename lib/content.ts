import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { Project, ProjectMetadata, Language, Chapter } from './types';
import { chapters } from './chapters';

const contentDirectory = path.join(process.cwd(), 'content');

// Configure marked renderer to add classes to images and captions
const renderer = new marked.Renderer();
renderer.image = (href, title, text) => {
  // Convert *text* to <em>text</em> for italic formatting in captions
  let formattedCaption = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  // Convert [text](url) to links that open in new tab
  formattedCaption = formattedCaption.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  return `<figure class="image-figure">
    <img src="${href}" alt="${text}" class="project-image" ${title ? `title="${title}"` : ''} />
    <figcaption class="image-caption">${formattedCaption}</figcaption>
  </figure>`;
};

// Make all links open in a new tab
renderer.link = (href, title, text) => {
  return `<a href="${href}" target="_blank" rel="noopener noreferrer"${title ? ` title="${title}"` : ''}>${text}</a>`;
};

marked.setOptions({ renderer });

// Re-export chapters for backward compatibility
export { chapters };

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

  // Initialize grouped object dynamically from chapters array
  const grouped = {} as Record<Chapter, Project[]>;
  chapters.forEach(chapter => {
    grouped[chapter.id] = [];
  });

  allProjects.forEach(project => {
    if (grouped[project.metadata.chapter]) {
      grouped[project.metadata.chapter].push(project);
    }
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