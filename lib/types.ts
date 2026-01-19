// Type definitions for the portfolio content

export type Language = 'en' | 'br';

export type Chapter = 'i' | 'ii' | 'iii' | 'iv' | 'v';

export interface ProjectMetadata {
  title: string;
  year: string;
  chapter: Chapter;
  slug: string;
  order?: number;
}

export interface Project {
  metadata: ProjectMetadata;
  content: string;
}

export interface AboutContent {
  content: string;
  portrait: string;
  portraitCaption: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface ChapterInfo {
  id: Chapter;
  title: {
    en: string;
    br: string;
  };
}
