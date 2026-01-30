# Website Content Management Instructions

This guide explains how to add and edit content on your website.

---

## Table of Contents
1. [Initial Setup (One Time Only)](#1-initial-setup-one-time-only)
2. [Daily Workflow](#2-daily-workflow)
3. [Project Structure](#3-project-structure)
4. [Adding a New Project](#4-adding-a-new-project)
5. [Editing Existing Projects](#5-editing-existing-projects)
6. [Content Formatting Guide](#6-content-formatting-guide)
7. [Publishing Changes](#7-publishing-changes)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Initial Setup (One Time Only)

### Install Required Software

1. **Visual Studio Code** (for editing files)
   - Download from: https://code.visualstudio.com/
   - Install it like any other application

2. **GitHub Desktop** (for syncing changes)
   - Download from: https://desktop.github.com/
   - Install and sign in with your GitHub account

### Clone the Repository

1. Open **GitHub Desktop**
2. Click **File** → **Clone Repository**
3. Select the repository `henri-badaroh-website` from the list
4. Choose where to save it on your computer (remember this location!)
5. Click **Clone**

### Open the Project in VS Code

1. Open **Visual Studio Code**
2. Click **File** → **Open Folder**
3. Navigate to where you cloned the repository and select the folder
4. Click **Open**

---

## 2. Daily Workflow

**IMPORTANT: Always follow this workflow!**

### Before You Start Working

1. Open **GitHub Desktop**
2. Make sure `henri-badaroh-website` is selected
3. Click **Fetch origin** (top right)
4. If there's a **Pull origin** button, click it to get the latest changes

### After You Finish Working

1. Save all your files in VS Code (**Ctrl+S** or **Cmd+S**)
2. Open **GitHub Desktop**
3. You'll see your changes listed on the left
4. Write a short description of what you changed (e.g., "Added new project: Project Name")
5. Click **Commit to main**
6. Click **Push origin**

Your changes will automatically be published to the website within a few minutes via Vercel.

---

## 3. Project Structure

Your website files are organized like this:

```
henri-badaroh-website/
├── content/
│   ├── projects/
│   │   ├── project-name-1/
│   │   │   ├── en.md          ← English content
│   │   │   ├── br.md          ← Portuguese content
│   │   │   └── images/
│   │   │       ├── image1.png
│   │   │       └── image2.jpg
│   │   └── project-name-2/
│   │       ├── en.md
│   │       ├── br.md
│   │       └── images/
│   └── about/
│       ├── en.md
│       └── br.md
├── public/
│   └── projects/
│       └── project-name/
│           └── images/        ← Where images are served from
└── lib/
    ├── chapters.ts            ← Chapter definitions
    └── types.ts               ← Chapter type definitions
```

---

## 4. Adding a New Project

### Step 1: Create the Project Folder

1. In VS Code, find the `content/projects/` folder in the left sidebar
2. Right-click on `projects` folder
3. Select **New Folder**
4. Name it using lowercase letters and hyphens (e.g., `my-new-project`)

### Step 2: Create the Images Folder

1. Right-click on your new project folder
2. Select **New Folder**
3. Name it `images`

### Step 3: Create the Public Images Folder

1. Find the `public/projects/` folder
2. Right-click and create a new folder with the **exact same name** as your project folder
3. Inside that, create an `images` folder
4. Copy your images here (this is where the website reads them from)

### Step 4: Create the English Content File

1. Right-click on your project folder (in `content/projects/`)
2. Select **New File**
3. Name it `en.md`
4. Add the following template:

```markdown
---
title: "Your Project Title"
year: "2024"
chapter: "i"
order: 1
---
# Your Project Title

Write your project description here.

![*Fig 1.* Image caption here](/projects/your-project-folder/images/image1.png)

More text here...
```

### Step 5: Create the Portuguese Content File

1. Right-click on your project folder
2. Select **New File**
3. Name it `br.md`
4. Copy the same structure but with Portuguese content

### Step 6: Understanding the Header Fields

At the top of each `.md` file, between the `---` marks:

| Field | Description | Example |
|-------|-------------|---------|
| `title` | Project title (in quotes) | `"My Project"` |
| `year` | Year of the project | `"2024"` |
| `chapter` | Which section it appears in (see below) | `"i"` |
| `order` | Order within the chapter (lower = first) | `1` |

**Available chapters:**
- `"i"` = projects / projetos
- `"ii"` = publications / publicações
- `"iii"` = speaking / palestras
- `"iv"` = writing / escrita

---

## 5. Editing Existing Projects

1. In VS Code, navigate to `content/projects/project-name/`
2. Open `en.md` for English or `br.md` for Portuguese
3. Edit the text
4. Save the file (**Ctrl+S** or **Cmd+S**)
5. Follow the publishing steps in Section 7

---

## 6. Content Formatting Guide

### Basic Text

Just write normally. Paragraphs are separated by a blank line.

```markdown
This is the first paragraph.

This is the second paragraph.
```

### Bold and Italic Text

```markdown
This is *italic text* (use single asterisks)
This is **bold text** (use double asterisks)
```

### Links

Links will automatically open in a new tab.

```markdown
Visit [my website](https://example.com) for more info.
```

### Images

Images are added using this format:

```markdown
![*Fig 1.* Your caption here](/projects/your-project-folder/images/filename.png)
```

**Breaking it down:**
- `![...]` = This tells it's an image
- `*Fig 1.*` = This part will be italic in the caption
- `Your caption here` = The rest of the caption
- `(/projects/...)` = The path to the image

**Caption with a link:**
```markdown
![*Fig 1.* Photo by [Photographer Name](https://photographer-website.com)](/projects/your-project/images/image.png)
```

### Videos (YouTube Embeds)

For YouTube videos, use this HTML code:

```html
<div class="video-figure">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID_HERE" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<p class="video-caption"><em>Fig 1.</em> Your video caption here</p>
```

**To get the VIDEO_ID:**
1. Go to the YouTube video
2. Look at the URL: `https://www.youtube.com/watch?v=ABC123xyz`
3. The VIDEO_ID is the part after `v=` (in this example: `ABC123xyz`)

**Video caption with a link:**
```html
<p class="video-caption"><em>Fig 1.</em> Video by <a href="https://example.com" target="_blank" rel="noopener noreferrer">Person Name</a></p>
```

### ASSETS Section

To add an assets/credits section at the bottom of a project:

```markdown
**ASSETS**

[Self-portrait](https://link-to-asset.com)

[Another asset](https://another-link.com)
```

---

## 7. Publishing Changes

### Step-by-Step Publishing

1. **Save all files** in VS Code (**Ctrl+S** or **Cmd+S** on each file you edited)

2. **Open GitHub Desktop**

3. **Review your changes**
   - On the left side, you'll see all changed files
   - Click on a file to see what changed (green = added, red = removed)

4. **Write a commit message**
   - In the bottom left, there's a "Summary" field
   - Write a short description (e.g., "Added project: Landscapes of Extraction")

5. **Commit**
   - Click the blue **Commit to main** button

6. **Push to GitHub**
   - Click **Push origin** at the top

7. **Wait for deployment**
   - Vercel will automatically detect the changes
   - The website updates within 2-3 minutes

### Checking if it Worked

- Go to your website URL
- Do a hard refresh: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
- Your changes should appear

---

## 8. Troubleshooting

### "I don't see my changes on the website"

1. Did you save the files in VS Code?
2. Did you commit in GitHub Desktop?
3. Did you push to origin?
4. Wait 2-3 minutes and hard refresh (Ctrl+Shift+R)

### "My image isn't showing"

1. Check the image is in `public/projects/your-project/images/`
2. Check the path in your markdown matches exactly (case-sensitive!)
3. Make sure there are no spaces in file names

### "The page shows an error"

1. Check that your markdown file starts and ends with `---` correctly
2. Make sure all quotes are straight quotes `"` not curly quotes `"`
3. Check that the chapter value is valid (`"i"`, `"ii"`, `"iii"`, or `"iv"`)

### "I need help"

Contact [your name/email] and I can make corrections remotely.

---

## Quick Reference Card

### Image
```markdown
![*Fig 1.* Caption text](/projects/project-name/images/image.png)
```

### Link
```markdown
[link text](https://url.com)
```

### Italic
```markdown
*italic text*
```

### Bold
```markdown
**bold text**
```

### YouTube Video
```html
<div class="video-figure">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<p class="video-caption"><em>Fig 1.</em> Caption here</p>
```

### Project Header Template
```markdown
---
title: "Project Title"
year: "2024"
chapter: "i"
order: 1
---
```
