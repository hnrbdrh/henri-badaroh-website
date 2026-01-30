# Grid-Aligned Dot Leaders System

## Overview
This technique creates table-of-contents style dot leaders that fill the space between a title and a value (like a year). The dots align both horizontally AND vertically across rows, creating a precise grid effect.

## How It Works

### The Core Trick
1. A pseudo-element (`::before`) contains a very long string of dots with fixed `letter-spacing`
2. This pseudo-element is floated left with `width: 0` - it "overflows" invisibly across the entire row
3. The title span covers the dots with a solid background color
4. The year span (floated right) also covers the dots with a solid background color
5. The dots are only visible in the GAP between the two spans

### Why Dots Align on a Grid
- All dots use the same `letter-spacing` (0.4em)
- All dots start from the same position (left edge of the list)
- Since spacing is consistent and the starting point is the same, dots in every row align vertically

---

## HTML Structure

```html
<ul class="leaders">
  <li class="menu-item">
    <span class="title">Project Title Here</span>
    <span class="year">2023</span>
  </li>
</ul>
```

If items are links, wrap the `<li>` in an `<a>`:

```html
<ul class="leaders">
  <a href="/project-url">
    <li class="menu-item">
      <span class="title">Project Title Here</span>
      <span class="year">2023</span>
    </li>
  </a>
</ul>
```

---

## CSS

```css
/* Container */
ul.leaders {
  padding: 0;
  overflow: hidden;  /* IMPORTANT: clips the overflowing dots */
  list-style: none;
}

/* List item */
ul.leaders li {
  position: relative;  /* optional, for additional positioning needs */
}

/* The dots - generated via ::before pseudo-element */
ul.leaders li::before {
  float: left;
  width: 0;  /* CRITICAL: makes dots overflow without taking space */
  white-space: nowrap;  /* keeps dots on one line */
  letter-spacing: 0.4em;  /* CRITICAL: controls dot spacing/grid alignment */
  color: black;
  content: ". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . ";
  /* Note: needs enough dots to span the widest possible container */
}

/* First span (title) - covers dots on the left */
ul.leaders span:first-child {
  padding-right: 0.5em;  /* space between title text and first visible dot */
  background-color: white;  /* CRITICAL: must match page background to hide dots */
}

/* Second span (year/value) - floated right, covers dots on the right */
ul.leaders span + span {
  float: right;
  padding-left: 0.1em;  /* space between last visible dot and year text */
  background-color: white;  /* CRITICAL: must match page background to hide dots */
}
```

---

## Critical Details

### 1. Background Color Must Match
The `background-color` on both spans MUST match the page/container background. This is what "hides" the dots behind the text. If your background is different (e.g., `#f5f5f5`), update the spans accordingly:

```css
ul.leaders span:first-child,
ul.leaders span + span {
  background-color: #f5f5f5;  /* match your actual background */
}
```

### 2. Letter-Spacing Controls Grid Alignment
The `letter-spacing: 0.4em` value determines the spacing between dots. Adjust this value to make dots closer together or farther apart:
- Smaller value (e.g., `0.3em`) = dots closer together
- Larger value (e.g., `0.5em`) = dots farther apart

### 3. Enough Dots Are Needed
The `content` string must have enough dots to span your widest possible container. The example uses ~80 dots. For wider containers, add more.

### 4. overflow: hidden Is Essential
Without `overflow: hidden` on the `<ul>`, the dots will visibly overflow outside the container.

### 5. The First Span Cannot Be Floated
The first span (title) should NOT be floated - it flows naturally. Only the second span is floated right.

---

## Optional Enhancements

### Hover Effects
The original site dims non-hovered items:

```css
ul.leaders:hover {
  color: rgba(0, 0, 0, 0.25);
}
ul.leaders:hover li:before {
  color: rgba(0, 0, 0, 0.25);
}
ul.leaders li:hover {
  color: rgba(0, 0, 0, 1) !important;
}
ul.leaders li:hover::before {
  color: rgba(0, 0, 0, 1) !important;
}
```

### Transitions
Add smooth color transitions:

```css
ul.leaders li {
  transition: color 0.2s ease-in-out;
}
```

### Text Overflow for Long Titles
If titles might be too long:

```css
ul.leaders span:first-child {
  max-width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

---

## Removing Dots (for headers/descriptions)
If you need a list without dots (e.g., for category headers):

```css
ul.leaders.no-bullets li::before {
  content: "";
}
```

---

## Mobile Considerations
On small screens, you may want to hide the dots entirely:

```css
@media (max-width: 480px) {
  ul.leaders li::before {
    content: '';  /* removes dots */
  }

  ul.leaders span + span {
    display: none;  /* optionally hide the year */
  }
}
```

---

## Complete Working Example

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Georgia, serif;
      font-size: 18px;
      background: white;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
    }

    ul.leaders {
      padding: 0;
      overflow: hidden;
      list-style: none;
    }

    ul.leaders li {
      cursor: pointer;
    }

    ul.leaders li::before {
      float: left;
      width: 0;
      white-space: nowrap;
      letter-spacing: 0.4em;
      color: black;
      content: ". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . ";
    }

    ul.leaders span:first-child {
      padding-right: 0.5em;
      background-color: white;
    }

    ul.leaders span + span {
      float: right;
      padding-left: 0.1em;
      background-color: white;
    }
  </style>
</head>
<body>
  <ul class="leaders">
    <li><span>Project Alpha</span><span>2023</span></li>
    <li><span>Project Beta: A Longer Title</span><span>2022</span></li>
    <li><span>Project Gamma</span><span>2021</span></li>
    <li><span>Project Delta</span><span>2020</span></li>
  </ul>
</body>
</html>
```

---

## Summary
The technique works by:
1. Flooding each row with dots via `::before` pseudo-element
2. Using `width: 0` and `float: left` to make dots overflow invisibly
3. Using solid `background-color` on spans to "punch holes" in the dot layer
4. Fixed `letter-spacing` ensures dots align vertically across all rows
