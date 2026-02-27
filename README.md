# Henri Badaröh Portfolio Website

A bilingual (English/Brazilian Portuguese) portfolio website built with Next.js 14, React, and TypeScript.

## 🚀 Quick Start

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
henri-badaroh-portfolio/
├── app/                          # Next.js app directory
│   ├── globals.css              # Global styles (CUSTOMIZE HERE)
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Root page (redirects to /language)
│   ├── language/
│   │   └── page.tsx             # Language selection page
│   └── [lang]/                  # Dynamic language routes
│       ├── layout.tsx           # Language-specific layout
│       ├── page.tsx             # Homepage
│       ├── about/
│       │   └── page.tsx         # About page
│       └── project/
│           └── [slug]/
│               └── page.tsx     # Individual project page
├── components/                   # Reusable React components
│   ├── Header.tsx               # Site header
│   ├── ChapterMenu.tsx          # Chapter navigation menu
│   ├── ProjectList.tsx          # Project listing with hover effects
│   └── BackButton.tsx           # Back button for project pages
├── lib/                         # Utility functions
│   ├── content.ts               # Content loading functions
│   └── types.ts                 # TypeScript type definitions
├── content/                     # Markdown content (ADD YOUR CONTENT HERE)
│   ├── about/
│   │   ├── en.md                # English about page
│   │   └── br.md                # Portuguese about page
│   └── projects/
│       └── [project-folder]/    # One folder per project
│           ├── en.md            # English version
│           ├── br.md            # Portuguese version
│           └── images/          # Project images
├── public/                      # Static assets (ADD YOUR IMAGES HERE)
│   ├── frog.png                 # Language selection image
│   └── portrait.jpg             # About page portrait
└── Configuration files
    ├── package.json
    ├── tsconfig.json
    ├── next.config.js
    └── tailwind.config.ts
```

## 🎨 Customization Guide

### 1. Change Colors and Fonts (Easiest!)

Open `app/globals.css` and modify the CSS variables at the top:

```css
:root {
  /* Colors - change these to update site-wide */
  --color-text: #000000;              /* Main text color */
  --color-text-grey: rgba(0, 0, 0, 0.3);  /* Greyed out color */
  --color-background: #ffffff;        /* Background color */
  
  /* Font - change to your preferred serif font */
  --font-serif: Georgia, 'Times New Roman', serif;
}
```

**Examples:**
- For a dark theme: 
  - `--color-text: #ffffff;`
  - `--color-background: #000000;`
- For a different font: 
  - `--font-serif: 'Garamond', 'Baskerville', serif;`

### 2. Add Your Images

**Frog image (language selection):**
- Replace `/public/frog.png` with your image
- Keep the filename or update it in `app/language/page.tsx`

**Portrait (about page):**
- Replace `/public/portrait.jpg` with your portrait
- Or change the path in `content/about/en.md` and `content/about/br.md`

### 3. Add Your Content

#### About Page

Edit these files:
- `content/about/en.md` (English version)
- `content/about/br.md` (Portuguese version)

Format:
```markdown
---
portrait: /portrait.jpg
portraitCaption: "Fig 1. Portrait by Photographer (2023)"
socialLinks:
  - name: Facebook
    url: https://facebook.com/yourpage
  - name: Instagram
    url: https://instagram.com/yourhandle
---

Your biography text goes here. You can use **bold** and *italic* text.

Add multiple paragraphs as needed.
```

#### Projects

For each project, create a folder in `content/projects/`:

1. Create folder: `content/projects/your-project-name/`
2. Add two markdown files:
   - `en.md` (English version)
   - `br.md` (Portuguese version)
3. Add an `images/` subfolder for project images

**Project markdown format:**

```markdown
---
title: "Your Project Title"
year: "2025"
chapter: "I"    # Options: "I", "II", "III", "IV"
order: 1        # Optional: controls order within chapter
---

Your project description goes here.

![Image description](/projects/your-project-name/images/image1.jpg)

*Fig 1. Image caption goes here.*

More text can follow.
```

**Chapter meanings:**
- I = Projects
- II = Publications
- III = Speaking
- IV = Writing

**Adding images to projects:**
1. Place images in: `content/projects/your-project-name/images/`
2. Reference in markdown: `![Alt text](/projects/your-project-name/images/filename.jpg)`
3. Add caption: `*Fig 1. Your caption here.*`

### 4. Customize Responsive Margins

In `app/globals.css`, adjust these values:

```css
:root {
  --margin-desktop: 10%;       /* Desktop screens (>1200px) */
  --margin-tablet: 8%;         /* Tablets (768-1200px) */
  --margin-mobile: 5%;         /* Mobile (480-768px) */
  --margin-small-mobile: 4%;   /* Small mobile (<480px) */
}
```

## 📝 Content Writing Tips

### Images in Markdown

```markdown
![Image description](/path/to/image.jpg)
*Caption text goes here.*
```

Images will automatically be:
- Centered on the page
- Sized at 80% width (90% on tablet, 100% on mobile)
- Caption will match image width

### Text Formatting

```markdown
**Bold text**
*Italic text*

# Large heading
## Medium heading

Regular paragraph text.
```

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js and deploy

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import your repository
4. Build command: `npm run build`
5. Publish directory: `.next`

## 🐛 Troubleshooting

**Images not showing:**
- Check file path matches markdown exactly
- Ensure images are in correct folder
- Try clearing Next.js cache: `rm -rf .next`

**Styles not updating:**
- Clear browser cache
- Restart dev server
- Check CSS syntax in `globals.css`

**Content not appearing:**
- Verify markdown frontmatter format (must have `---` before and after)
- Check that required fields are present (title, year, chapter)
- Ensure file is named `en.md` or `br.md`

## 📚 Adding More Languages

To add another language (e.g., Spanish):

1. Add language type in `lib/types.ts`:
```typescript
export type Language = 'en' | 'br' | 'es';
```

2. Create content files: `es.md`
3. Update chapter titles in `lib/content.ts`
4. Add language button in `app/language/page.tsx`

## 🎯 Key Features

- ✅ Bilingual support (English/Portuguese)
- ✅ Hover effects that grey out non-hovered items
- ✅ Smooth scrolling to chapter sections
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Markdown-based content (easy to edit)
- ✅ Clean, minimal aesthetic
- ✅ SEO-friendly
- ✅ Fast performance (static generation)

## 📞 Need Help?

1. Check this README first
2. Look at example files in `content/`
3. Review comments in `app/globals.css`

---

Built with Next.js 14, React, TypeScript, and Tailwind CSS
