---
title: "White Associations (Image Examples)"
subtitle: "*layout examples*"
year: "2018"
chapter: "i"
order: 5
---

## Single Image (Full Width - 70%)

![*Fig 1.* Composite portrait II](/projects/white-associations/images/white-associations-image-2.jpg)

---

## Two Images Side by Side

<div class="image-row image-row-2">
  <figure class="image-figure">
    <img src="/projects/white-associations/images/white-associations-image-1.jpg" alt="Composite portrait I" class="project-image" />
    <figcaption class="image-caption"><em>Fig 2.</em> Composite portrait I</figcaption>
  </figure>
  <figure class="image-figure">
    <img src="/projects/white-associations/images/white-associations-image-4.jpg" alt="Composite portrait HNR" class="project-image" />
    <figcaption class="image-caption"><em>Fig 3.</em> Composite portrait HNR</figcaption>
  </figure>
</div>

---

## Three Images Side by Side

<div class="image-row image-row-3">
  <figure class="image-figure">
    <img src="/projects/white-associations/images/white-associations-image-5.jpg" alt="Composite portrait IV" class="project-image" />
    <figcaption class="image-caption"><em>Fig 4.</em> Composite portrait IV</figcaption>
  </figure>
  <figure class="image-figure">
    <img src="/projects/white-associations/images/white-associations-image-6.jpg" alt="Composite portrait V" class="project-image" />
    <figcaption class="image-caption"><em>Fig 5.</em> Composite portrait V</figcaption>
  </figure>
  <figure class="image-figure">
    <img src="/projects/white-associations/images/white-associations-image-7.jpg" alt="Composite portrait VI" class="project-image" />
    <figcaption class="image-caption"><em>Fig 6.</em> Composite portrait VI</figcaption>
  </figure>
</div>

---

## Single Image - Half Width (50%)

<figure class="image-figure image-half">
  <img src="/projects/white-associations/images/white-associations-image-3.jpg" alt="My parents and me" class="project-image" />
  <figcaption class="image-caption"><em>Fig 7.</em> My parents and me</figcaption>
</figure>

---

## Single Image - Third Width (33%)

<figure class="image-figure image-third">
  <img src="/projects/white-associations/images/white-associations-image-8.jpg" alt="Reference portrait" class="project-image" />
  <figcaption class="image-caption"><em>Fig 8.</em> Reference portrait</figcaption>
</figure>

---

## Two Images - Different Sizes (2/3 + 1/3)

<div class="image-row image-row-2">
  <figure class="image-figure" style="flex: 2;">
    <img src="/projects/white-associations/images/white-associations-image-2.jpg" alt="Composite portrait II" class="project-image" />
    <figcaption class="image-caption"><em>Fig 9.</em> Composite portrait II (larger)</figcaption>
  </figure>
  <figure class="image-figure" style="flex: 1;">
    <img src="/projects/white-associations/images/white-associations-image-9.jpg" alt="Reference portrait" class="project-image" />
    <figcaption class="image-caption"><em>Fig 10.</em> Reference portrait (smaller)</figcaption>
  </figure>
</div>

---

## Syntax Reference

**Standard single image (markdown):**
```
![*Caption text*](/path/to/image.jpg)
```

**Two images side by side:**
```html
<div class="image-row image-row-2">
  <figure class="image-figure">
    <img src="/path/to/image1.jpg" alt="Alt text" class="project-image" />
    <figcaption class="image-caption"><em>Fig 1.</em> Caption</figcaption>
  </figure>
  <figure class="image-figure">
    <img src="/path/to/image2.jpg" alt="Alt text" class="project-image" />
    <figcaption class="image-caption"><em>Fig 2.</em> Caption</figcaption>
  </figure>
</div>
```

**Three images side by side:**
Use `image-row-3` instead of `image-row-2`

**Single image with custom width:**
```html
<figure class="image-figure image-half">
  ...
</figure>
```
Options: `image-half` (50%), `image-third` (33%), `image-two-thirds` (66%)

**Two images with different sizes:**
Add `style="flex: 2;"` for larger, `style="flex: 1;"` for smaller
