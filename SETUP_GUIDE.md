# Setup Guide - Step by Step

This guide will help you set up and customize Henri Badaroh's portfolio website, even if you're new to web development.

## Step 1: Install Node.js

Before anything else, you need Node.js installed on your computer.

1. Go to [nodejs.org](https://nodejs.org)
2. Download the LTS (Long Term Support) version
3. Install it (just click Next through the installer)
4. Verify installation:
   - Open Terminal (Mac) or Command Prompt (Windows)
   - Type: `node --version`
   - You should see a version number like `v20.11.0`

## Step 2: Get the Project Files

1. Download the entire `henri-badaroh-portfolio` folder
2. Place it somewhere easy to find (like your Desktop or Documents)

## Step 3: Install Dependencies

1. Open Terminal (Mac) or Command Prompt (Windows)
2. Navigate to the project folder:
   ```bash
   cd path/to/henri-badaroh-portfolio
   ```
   Example: `cd Desktop/henri-badaroh-portfolio`

3. Install dependencies:
   ```bash
   npm install
   ```
   This will take a few minutes the first time.

## Step 4: Start the Development Server

```bash
npm run dev
```

You should see:
```
Ready in X ms
Local: http://localhost:3000
```

Open your browser and go to: **http://localhost:3000**

You should see the language selection page!

## Step 5: Add Your Images

### Frog Image (Language Selection Page)

1. Find a frog image you like (or any image for language selection)
2. Save it as `frog.png`
3. Place it in the `public` folder
4. Replace the existing `frog.png`

### Portrait Image (About Page)

1. Get a portrait photo
2. Save it as `portrait.jpg`
3. Place it in the `public` folder
4. Replace the existing `portrait.jpg`

## Step 6: Update About Page Content

### English Version

1. Open: `content/about/en.md` in a text editor
2. Update the front matter (between the `---` lines):
   ```markdown
   ---
   portrait: /portrait.jpg
   portraitCaption: "Your caption here"
   socialLinks:
     - name: Facebook
       url: https://facebook.com/yourpage
     - name: Instagram
       url: https://instagram.com/yourhandle
   ---
   ```
3. Replace the biography text below the `---` with your own
4. Save the file

### Portuguese Version

1. Open: `content/about/br.md`
2. Follow the same steps as English version
3. Write in Portuguese

## Step 7: Add Your First Project

### Create Project Folder

1. Go to: `content/projects/`
2. Create a new folder: `my-first-project`
3. Inside that folder, create another folder: `images`

### Create English Version

1. In `content/projects/my-first-project/`, create a file: `en.md`
2. Add this content:
   ```markdown
   ---
   title: "My First Project"
   year: "2025"
   chapter: "I"
   order: 1
   ---

   This is my first project description.

   You can add multiple paragraphs.
   ```
3. Save the file

### Create Portuguese Version

1. In `content/projects/my-first-project/`, create a file: `br.md`
2. Add Portuguese version with same format
3. Save the file

### Add Project Images

1. Place your project images in: `content/projects/my-first-project/images/`
2. In your markdown file, reference them:
   ```markdown
   ![Description](/projects/my-first-project/images/photo1.jpg)
   
   *Fig 1. Your caption here.*
   ```

## Step 8: Customize Colors and Fonts

1. Open: `app/globals.css`
2. Find the `:root` section at the top
3. Change values:

**For a dark theme:**
```css
--color-text: #ffffff;
--color-background: #000000;
```

**For a different font:**
```css
--font-serif: 'Garamond', 'Baskerville', serif;
```

4. Save the file
5. Refresh your browser - changes appear instantly!

## Step 9: View Your Changes

While the development server is running (`npm run dev`):

1. Edit any file
2. Save it
3. Your browser will automatically update!

## Step 10: Build for Production

When you're ready to publish:

```bash
npm run build
```

This creates an optimized version of your site.

## Common Tasks

### Add Another Project

1. Create folder: `content/projects/project-name/`
2. Add `en.md` and `br.md` files
3. Add images to `project-name/images/`
4. Follow the markdown format from examples

### Change Chapter Names

1. Open: `lib/content.ts`
2. Find the `chapters` array
3. Update the titles

### Adjust Page Margins

1. Open: `app/globals.css`
2. Find the margin variables:
   ```css
   --margin-desktop: 10%;
   --margin-tablet: 8%;
   ```
3. Change the percentages

## Troubleshooting

**"Command not found: npm"**
→ Install Node.js (Step 1)

**Changes not showing?**
→ Refresh your browser (Cmd+R or Ctrl+R)
→ Or stop server (Ctrl+C) and run `npm run dev` again

**Images not displaying?**
→ Check file path matches exactly
→ Check file extension (.jpg, .png)
→ Make sure image is in correct folder

**Port 3000 already in use?**
→ Kill the existing process or use: `npm run dev -- -p 3001`

## Getting Help

1. Read the main README.md file
2. Check the example files
3. Look at console for error messages
4. Search the error message online

## Next Steps

- Add all your projects
- Customize colors and fonts
- Test on mobile (resize browser window)
- Deploy to Vercel or Netlify (see README.md)

---

Remember: Save your files after every change!
