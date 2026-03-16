# AI Agency Design System

A comprehensive design system for a dark-mode-first, high-converting AI agency website. Built for modern web technologies with Tailwind CSS and Framer Motion.

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography System](#typography-system)
4. [Spacing System](#spacing-system)
5. [Border Radius System](#border-radius-system)
6. [Shadow System](#shadow-system)
7. [Animation System](#animation-system)
8. [Breakpoint System](#breakpoint-system)
9. [Grid System](#grid-system)
10. [Component Patterns](#component-patterns)

---

## Design Philosophy

### Core Principles

1. **Dark Mode First** - Tech-forward aesthetic that reduces eye strain and makes UI elements pop
2. **Motion Adds Meaning** - Every animation serves a purpose; never decorative
3. **Every Element Earns Its Space** - Ruthless prioritization; if it doesn't convert, it doesn't stay
4. **Mobile Isn't an Afterthought** - Designed for touch, optimized for speed
5. **Delight Through Details** - Micro-interactions that surprise and engage

### Visual Language

- **Depth**: Layered surfaces create hierarchy
- **Glow**: Accent colors emit light, creating focus
- **Contrast**: High contrast for readability, subtle contrast for hierarchy
- **Movement**: Smooth, physics-based animations

---

## Color System

### CSS Variables

```css
:root {
  /* ========================
     BACKGROUND COLORS
     ======================== */

  /* Primary - Main page background */
  --bg-primary: #0a0a0f;
  --bg-primary-rgb: 10, 10, 15;

  /* Secondary - Cards, elevated surfaces */
  --bg-secondary: #12121a;
  --bg-secondary-rgb: 18, 18, 26;

  /* Tertiary - Inputs, nested elements */
  --bg-tertiary: #1a1a24;
  --bg-tertiary-rgb: 26, 26, 36;

  /* ========================
     TEXT COLORS
     ======================== */

  /* Primary - Headlines, important text */
  --text-primary: #ffffff;
  --text-primary-rgb: 255, 255, 255;

  /* Secondary - Body text */
  --text-secondary: #a1a1aa;
  --text-secondary-rgb: 161, 161, 170;

  /* Muted - Captions, placeholders */
  --text-muted: #52525b;
  --text-muted-rgb: 82, 82, 91;

  /* ========================
     BRAND ACCENT
     ======================== */

  /* Electric Violet - Primary brand color */
  --accent-primary: #8b5cf6;
  --accent-primary-rgb: 139, 92, 246;
  --accent-primary-light: #a78bfa;
  --accent-primary-dark: #7c3aed;

  /* Cyan - Secondary accent for variety */
  --accent-secondary: #06b6d4;
  --accent-secondary-rgb: 6, 182, 212;

  /* ========================
     SEMANTIC COLORS
     ======================== */

  /* Success */
  --color-success: #22c55e;
  --color-success-rgb: 34, 197, 94;
  --color-success-light: #4ade80;
  --color-success-dark: #16a34a;
  --color-success-bg: rgba(34, 197, 94, 0.1);
  --color-success-border: rgba(34, 197, 94, 0.3);

  /* Error */
  --color-error: #ef4444;
  --color-error-rgb: 239, 68, 68;
  --color-error-light: #f87171;
  --color-error-dark: #dc2626;
  --color-error-bg: rgba(239, 68, 68, 0.1);
  --color-error-border: rgba(239, 68, 68, 0.3);

  /* Warning */
  --color-warning: #f59e0b;
  --color-warning-rgb: 245, 158, 11;
  --color-warning-light: #fbbf24;
  --color-warning-dark: #d97706;
  --color-warning-bg: rgba(245, 158, 11, 0.1);
  --color-warning-border: rgba(245, 158, 11, 0.3);

  /* Info */
  --color-info: #3b82f6;
  --color-info-rgb: 59, 130, 246;
  --color-info-light: #60a5fa;
  --color-info-dark: #2563eb;
  --color-info-bg: rgba(59, 130, 246, 0.1);
  --color-info-border: rgba(59, 130, 246, 0.3);

  /* ========================
     BORDERS
     ======================== */

  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-default: rgba(255, 255, 255, 0.1);
  --border-strong: rgba(255, 255, 255, 0.2);
  --border-accent: rgba(139, 92, 246, 0.5);

  /* ========================
     GLOWS & HIGHLIGHTS
     ======================== */

  --glow-accent: 0 0 20px rgba(139, 92, 246, 0.4);
  --glow-accent-strong: 0 0 40px rgba(139, 92, 246, 0.6);
  --glow-success: 0 0 20px rgba(34, 197, 94, 0.4);
  --glow-error: 0 0 20px rgba(239, 68, 68, 0.4);

  /* ========================
     GRADIENTS
     ======================== */

  /* Hero gradient - dramatic, attention-grabbing */
  --gradient-hero: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #8b5cf6 100%);

  /* Subtle background gradient */
  --gradient-subtle: linear-gradient(180deg, rgba(139, 92, 246, 0.05) 0%, transparent 50%);

  /* Card shine effect */
  --gradient-shine: linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%);

  /* Text gradient */
  --gradient-text: linear-gradient(90deg, #8b5cf6 0%, #06b6d4 100%);

  /* Mesh gradient for backgrounds */
  --gradient-mesh: radial-gradient(at 40% 20%, rgba(139, 92, 246, 0.15) 0px, transparent 50%),
                   radial-gradient(at 80% 0%, rgba(6, 182, 212, 0.1) 0px, transparent 50%),
                   radial-gradient(at 0% 50%, rgba(139, 92, 246, 0.1) 0px, transparent 50%);

  /* ========================
     OVERLAYS
     ======================== */

  --overlay-light: rgba(10, 10, 15, 0.6);
  --overlay-medium: rgba(10, 10, 15, 0.8);
  --overlay-heavy: rgba(10, 10, 15, 0.95);
}
```

### Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Backgrounds
        'bg-primary': '#0a0a0f',
        'bg-secondary': '#12121a',
        'bg-tertiary': '#1a1a24',

        // Text
        'text-primary': '#ffffff',
        'text-secondary': '#a1a1aa',
        'text-muted': '#52525b',

        // Brand Accent
        accent: {
          DEFAULT: '#8b5cf6',
          light: '#a78bfa',
          dark: '#7c3aed',
          secondary: '#06b6d4',
        },

        // Semantic
        success: {
          DEFAULT: '#22c55e',
          light: '#4ade80',
          dark: '#16a34a',
        },
        error: {
          DEFAULT: '#ef4444',
          light: '#f87171',
          dark: '#dc2626',
        },
        warning: {
          DEFAULT: '#f59e0b',
          light: '#fbbf24',
          dark: '#d97706',
        },
        info: {
          DEFAULT: '#3b82f6',
          light: '#60a5fa',
          dark: '#2563eb',
        },
      },
    },
  },
};
```

### Color Usage Guide

| Element | Color Variable | Tailwind Class |
|---------|---------------|----------------|
| Page background | `--bg-primary` | `bg-bg-primary` |
| Card background | `--bg-secondary` | `bg-bg-secondary` |
| Input background | `--bg-tertiary` | `bg-bg-tertiary` |
| Headlines | `--text-primary` | `text-text-primary` |
| Body text | `--text-secondary` | `text-text-secondary` |
| Placeholders | `--text-muted` | `text-text-muted` |
| CTA buttons | `--accent-primary` | `bg-accent` |
| Links | `--accent-primary` | `text-accent` |
| Card borders | `--border-subtle` | `border-white/[0.06]` |

---

## Typography System

### Font Stack

```css
:root {
  /* Display - Bold statements, headlines */
  --font-display: 'Cal Sans', 'Inter', system-ui, sans-serif;

  /* Body - Readable, clean */
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;

  /* Mono - Numbers, code, technical */
  --font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
}
```

### Font Loading

```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

<!-- Cal Sans (self-hosted recommended) -->
<link href="/fonts/cal-sans.css" rel="stylesheet">
```

### Type Scale

#### Display Sizes (Headlines, Hero Text)

| Name | Size | Line Height | Weight | Letter Spacing | Tailwind |
|------|------|-------------|--------|----------------|----------|
| Display XL | 72px / 4.5rem | 1.1 | 700 | -0.02em | `text-7xl font-bold tracking-tight` |
| Display LG | 60px / 3.75rem | 1.1 | 700 | -0.02em | `text-6xl font-bold tracking-tight` |
| Display MD | 48px / 3rem | 1.15 | 700 | -0.02em | `text-5xl font-bold tracking-tight` |
| Display SM | 36px / 2.25rem | 1.2 | 600 | -0.01em | `text-4xl font-semibold tracking-tight` |

#### Body Sizes (Content, UI)

| Name | Size | Line Height | Weight | Tailwind |
|------|------|-------------|--------|----------|
| Body LG | 20px / 1.25rem | 1.7 | 400 | `text-xl leading-relaxed` |
| Body MD | 16px / 1rem | 1.6 | 400 | `text-base leading-normal` |
| Body SM | 14px / 0.875rem | 1.5 | 400 | `text-sm` |

#### Mono Sizes (Numbers, Code)

| Name | Size | Line Height | Weight | Tailwind |
|------|------|-------------|--------|----------|
| Mono LG | 48px / 3rem | 1.2 | 500 | `font-mono text-5xl font-medium` |
| Mono MD | 24px / 1.5rem | 1.4 | 500 | `font-mono text-2xl font-medium` |
| Mono SM | 14px / 0.875rem | 1.5 | 400 | `font-mono text-sm` |

### Tailwind Typography Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'SF Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-sm': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
      },
    },
  },
};
```

### Typography Components

```tsx
// components/Typography.tsx

export const Typography = {
  // Display variants
  DisplayXL: ({ children, className = '', gradient = false }) => (
    <h1 className={`font-display text-display-xl text-text-primary ${
      gradient ? 'bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent' : ''
    } ${className}`}>
      {children}
    </h1>
  ),

  DisplayLG: ({ children, className = '' }) => (
    <h1 className={`font-display text-display-lg text-text-primary ${className}`}>
      {children}
    </h1>
  ),

  DisplayMD: ({ children, className = '' }) => (
    <h2 className={`font-display text-display-md text-text-primary ${className}`}>
      {children}
    </h2>
  ),

  DisplaySM: ({ children, className = '' }) => (
    <h3 className={`font-display text-display-sm text-text-primary ${className}`}>
      {children}
    </h3>
  ),

  // Body variants
  BodyLG: ({ children, className = '' }) => (
    <p className={`font-body text-xl leading-relaxed text-text-secondary ${className}`}>
      {children}
    </p>
  ),

  BodyMD: ({ children, className = '' }) => (
    <p className={`font-body text-base leading-normal text-text-secondary ${className}`}>
      {children}
    </p>
  ),

  BodySM: ({ children, className = '' }) => (
    <p className={`font-body text-sm text-text-secondary ${className}`}>
      {children}
    </p>
  ),

  // Mono variants (for stats, numbers)
  MonoLG: ({ children, className = '' }) => (
    <span className={`font-mono text-5xl font-medium text-text-primary ${className}`}>
      {children}
    </span>
  ),

  MonoMD: ({ children, className = '' }) => (
    <span className={`font-mono text-2xl font-medium text-text-primary ${className}`}>
      {children}
    </span>
  ),

  MonoSM: ({ children, className = '' }) => (
    <span className={`font-mono text-sm text-text-muted ${className}`}>
      {children}
    </span>
  ),

  // Gradient text
  Gradient: ({ children, className = '' }) => (
    <span className={`bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  ),
};
```

---

## Spacing System

### Scale Definition

| Token | Value | Tailwind | Use Case |
|-------|-------|----------|----------|
| `--space-0` | 0 | `p-0`, `m-0` | Reset |
| `--space-1` | 4px / 0.25rem | `p-1`, `m-1` | Tight spacing, icon gaps |
| `--space-2` | 8px / 0.5rem | `p-2`, `m-2` | Button padding, tight gaps |
| `--space-3` | 12px / 0.75rem | `p-3`, `m-3` | Form element padding |
| `--space-4` | 16px / 1rem | `p-4`, `m-4` | Card padding (mobile) |
| `--space-5` | 20px / 1.25rem | `p-5`, `m-5` | Comfortable spacing |
| `--space-6` | 24px / 1.5rem | `p-6`, `m-6` | Card padding (desktop) |
| `--space-8` | 32px / 2rem | `p-8`, `m-8` | Section gaps |
| `--space-10` | 40px / 2.5rem | `p-10`, `m-10` | Component separation |
| `--space-12` | 48px / 3rem | `p-12`, `m-12` | Large gaps |
| `--space-16` | 64px / 4rem | `p-16`, `m-16` | Section padding (mobile) |
| `--space-20` | 80px / 5rem | `p-20`, `m-20` | Section padding (tablet) |
| `--space-24` | 96px / 6rem | `p-24`, `m-24` | Section padding (desktop) |
| `--space-32` | 128px / 8rem | `p-32`, `m-32` | Hero spacing |

### CSS Variables

```css
:root {
  --space-0: 0;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;
}
```

### Spacing Guidelines

```
Section Vertical Padding:
- Mobile: py-16 (64px)
- Tablet: py-20 (80px)
- Desktop: py-24 (96px)

Card Internal Padding:
- Mobile: p-4 (16px)
- Desktop: p-6 (24px)

Grid Gaps:
- Tight: gap-4 (16px)
- Default: gap-6 (24px)
- Loose: gap-8 (32px)

Button Padding:
- Small: px-3 py-1.5
- Default: px-4 py-2
- Large: px-6 py-3

Text Blocks:
- Paragraph spacing: space-y-4
- List items: space-y-2
```

---

## Border Radius System

### Scale Definition

| Token | Value | Tailwind | Use Case |
|-------|-------|----------|----------|
| `--radius-none` | 0 | `rounded-none` | Sharp edges |
| `--radius-sm` | 4px / 0.25rem | `rounded-sm` | Tags, badges |
| `--radius-md` | 8px / 0.5rem | `rounded-md` | Buttons, inputs |
| `--radius-lg` | 12px / 0.75rem | `rounded-lg` | Cards, dropdowns |
| `--radius-xl` | 16px / 1rem | `rounded-xl` | Large cards, modals |
| `--radius-2xl` | 24px / 1.5rem | `rounded-2xl` | Feature cards, hero elements |
| `--radius-full` | 9999px | `rounded-full` | Pills, avatars, circular buttons |

### CSS Variables

```css
:root {
  --radius-none: 0;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;
}
```

### Usage Guidelines

```
Buttons:
- Small buttons: rounded-md
- Default buttons: rounded-lg
- Pill buttons: rounded-full

Cards:
- Compact cards: rounded-lg
- Feature cards: rounded-xl
- Hero cards: rounded-2xl

Inputs:
- Text inputs: rounded-md
- Search bars: rounded-full

Images:
- Thumbnails: rounded-lg
- Avatars: rounded-full
- Hero images: rounded-2xl
```

---

## Shadow System

### CSS Variables

```css
:root {
  /* ========================
     STANDARD SHADOWS
     ======================== */

  /* Subtle - Cards at rest */
  --shadow-subtle: 0 1px 2px rgba(0, 0, 0, 0.3),
                   0 1px 3px rgba(0, 0, 0, 0.15);

  /* Medium - Cards on hover, elevated elements */
  --shadow-medium: 0 4px 6px rgba(0, 0, 0, 0.3),
                   0 2px 4px rgba(0, 0, 0, 0.2);

  /* Strong - Modals, popovers, dropdowns */
  --shadow-strong: 0 10px 25px rgba(0, 0, 0, 0.5),
                   0 6px 10px rgba(0, 0, 0, 0.3);

  /* XL - Hero elements, floating panels */
  --shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.5),
               0 10px 20px rgba(0, 0, 0, 0.3);

  /* ========================
     GLOW SHADOWS (Colored)
     ======================== */

  /* Accent glow - CTA buttons, active states */
  --shadow-glow-accent: 0 0 20px rgba(139, 92, 246, 0.3),
                        0 0 40px rgba(139, 92, 246, 0.2);

  --shadow-glow-accent-strong: 0 0 30px rgba(139, 92, 246, 0.5),
                               0 0 60px rgba(139, 92, 246, 0.3);

  /* Success glow */
  --shadow-glow-success: 0 0 20px rgba(34, 197, 94, 0.3),
                         0 0 40px rgba(34, 197, 94, 0.2);

  /* Error glow */
  --shadow-glow-error: 0 0 20px rgba(239, 68, 68, 0.3),
                       0 0 40px rgba(239, 68, 68, 0.2);

  /* Cyan glow - Secondary accent */
  --shadow-glow-cyan: 0 0 20px rgba(6, 182, 212, 0.3),
                      0 0 40px rgba(6, 182, 212, 0.2);

  /* ========================
     INNER SHADOWS
     ======================== */

  --shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.3);
  --shadow-inner-strong: inset 0 4px 8px rgba(0, 0, 0, 0.4);
}
```

### Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'subtle': '0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.15)',
        'medium': '0 4px 6px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)',
        'strong': '0 10px 25px rgba(0, 0, 0, 0.5), 0 6px 10px rgba(0, 0, 0, 0.3)',
        'xl': '0 20px 40px rgba(0, 0, 0, 0.5), 0 10px 20px rgba(0, 0, 0, 0.3)',
        'glow-accent': '0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)',
        'glow-accent-strong': '0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)',
        'glow-success': '0 0 20px rgba(34, 197, 94, 0.3), 0 0 40px rgba(34, 197, 94, 0.2)',
        'glow-error': '0 0 20px rgba(239, 68, 68, 0.3), 0 0 40px rgba(239, 68, 68, 0.2)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(6, 182, 212, 0.2)',
        'inner-dark': 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
      },
    },
  },
};
```

### Shadow Usage

| Element | Rest State | Hover State |
|---------|------------|-------------|
| Card | `shadow-subtle` | `shadow-medium` |
| CTA Button | `shadow-glow-accent` | `shadow-glow-accent-strong` |
| Modal | `shadow-strong` | - |
| Dropdown | `shadow-medium` | - |
| Hero element | `shadow-xl` | - |
| Input (focused) | - | `shadow-glow-accent` |

---

## Animation System

### Timing Functions

```css
:root {
  /* Standard easing - most animations */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);

  /* Snappy - quick interactions */
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);

  /* Smooth - longer transitions */
  --ease-in-out: cubic-bezier(0.45, 0, 0.55, 1);

  /* Bounce - playful interactions */
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Spring - natural motion */
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

### Duration Scale

| Token | Value | Use Case |
|-------|-------|----------|
| `--duration-instant` | 50ms | Immediate feedback |
| `--duration-fast` | 150ms | Micro-interactions, hovers |
| `--duration-normal` | 200ms | Standard transitions |
| `--duration-moderate` | 300ms | Complex transitions |
| `--duration-slow` | 500ms | Page transitions, reveals |
| `--duration-slower` | 700ms | Dramatic entrances |

### CSS Variables

```css
:root {
  --duration-instant: 50ms;
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-moderate: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 700ms;
}
```

### Framer Motion Configurations

```ts
// lib/animations.ts

// ========================
// ENTRANCE ANIMATIONS
// ========================

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
};

export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
};

export const fadeDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
  transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -15 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
};

export const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 15 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
};

// ========================
// STAGGER ANIMATIONS
// ========================

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

// For lists
export const staggerFast = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const staggerSlow = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// ========================
// NUMBER COUNTER
// ========================

export const countUp = (end: number, duration = 2) => ({
  initial: { count: 0 },
  animate: { count: end },
  transition: { duration, ease: [0.16, 1, 0.3, 1] },
});

// Usage with component:
// const CountUpNumber = ({ value, suffix = '' }) => {
//   const count = useMotionValue(0);
//   const rounded = useTransform(count, Math.round);
//
//   useEffect(() => {
//     const animation = animate(count, value, { duration: 2, ease: [0.16, 1, 0.3, 1] });
//     return animation.stop;
//   }, [value]);
//
//   return <motion.span>{rounded}{suffix}</motion.span>;
// };

// ========================
// GLOW PULSE
// ========================

export const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)',
      '0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)',
      '0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)',
    ],
  },
  transition: {
    duration: 2,
    ease: 'easeInOut',
    repeat: Infinity,
  },
};

// ========================
// MAGNETIC HOVER
// ========================

export const useMagneticHover = (strength = 0.3) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    style: { x, y },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
};

// ========================
// CARD TILT
// ========================

export const useCardTilt = (maxTilt = 10) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    style: {
      rotateX,
      rotateY,
      transformStyle: 'preserve-3d' as const,
    },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
};

// ========================
// SCROLL-TRIGGERED
// ========================

export const scrollReveal = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

// ========================
// BUTTON INTERACTIONS
// ========================

export const buttonTap = {
  whileTap: { scale: 0.98 },
  transition: { duration: 0.1 },
};

export const buttonHover = {
  whileHover: { scale: 1.02 },
  transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
};
```

### Tailwind Animation Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'fade-up': 'fadeUp 0.3s ease-out',
        'fade-down': 'fadeDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glowPulse: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)'
          },
          '50%': {
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)'
          },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'out-quart': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
};
```

---

## Breakpoint System

### Mobile-First Breakpoints

| Name | Min Width | Tailwind Prefix | Target Devices |
|------|-----------|-----------------|----------------|
| Base | 0px | (none) | All devices (mobile-first) |
| `sm` | 640px | `sm:` | Large phones, small tablets |
| `md` | 768px | `md:` | Tablets |
| `lg` | 1024px | `lg:` | Small laptops, tablets landscape |
| `xl` | 1280px | `xl:` | Laptops, desktops |
| `2xl` | 1536px | `2xl:` | Large desktops |

### CSS Variables

```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

### Responsive Patterns

```tsx
// Typography scaling
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
  Headline
</h1>

// Spacing scaling
<section className="py-16 md:py-20 lg:py-24">
  Content
</section>

// Grid responsive
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
  Cards
</div>

// Container padding
<div className="px-4 sm:px-6 lg:px-8">
  Content
</div>
```

### Device-Specific Hooks

```tsx
// hooks/useBreakpoint.ts
import { useState, useEffect } from 'react';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState('base');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= breakpoints['2xl']) setBreakpoint('2xl');
      else if (width >= breakpoints.xl) setBreakpoint('xl');
      else if (width >= breakpoints.lg) setBreakpoint('lg');
      else if (width >= breakpoints.md) setBreakpoint('md');
      else if (width >= breakpoints.sm) setBreakpoint('sm');
      else setBreakpoint('base');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    breakpoint,
    isMobile: breakpoint === 'base' || breakpoint === 'sm',
    isTablet: breakpoint === 'md',
    isDesktop: breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl',
  };
}
```

---

## Grid System

### Container Configuration

```css
:root {
  /* Container max widths */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1400px;  /* Slightly narrower for readability */

  /* Container padding */
  --container-padding-mobile: 1rem;     /* 16px */
  --container-padding-tablet: 1.5rem;   /* 24px */
  --container-padding-desktop: 2rem;    /* 32px */
}
```

### Tailwind Container Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
  },
};
```

### Grid Layouts

```tsx
// components/Grid.tsx

// Standard content container
export const Container = ({ children, className = '' }) => (
  <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

// Narrow container for text-heavy content
export const ContainerNarrow = ({ children, className = '' }) => (
  <div className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

// Wide container for hero sections
export const ContainerWide = ({ children, className = '' }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

// Full bleed (edge-to-edge)
export const ContainerFull = ({ children, className = '' }) => (
  <div className={`w-full ${className}`}>
    {children}
  </div>
);

// Standard grid
export const Grid = ({ children, cols = 3, gap = 6, className = '' }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${cols} gap-${gap} ${className}`}>
    {children}
  </div>
);

// Two-column asymmetric (content + sidebar)
export const GridSidebar = ({ content, sidebar, reverse = false }) => (
  <div className={`grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 ${
    reverse ? 'lg:grid-cols-[360px_1fr]' : ''
  }`}>
    {reverse ? sidebar : content}
    {reverse ? content : sidebar}
  </div>
);

// Bento grid
export const GridBento = ({ children, className = '' }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
    {children}
  </div>
);
```

### Column Structure

```
12-Column Grid Reference:

Full width:     col-span-12
3/4 width:      col-span-9
2/3 width:      col-span-8
1/2 width:      col-span-6
1/3 width:      col-span-4
1/4 width:      col-span-3
1/6 width:      col-span-2

Common layouts:
- Hero split:   [col-span-6] [col-span-6]
- Content+side: [col-span-8] [col-span-4]
- Three equal:  [col-span-4] [col-span-4] [col-span-4]
- Four equal:   [col-span-3] [col-span-3] [col-span-3] [col-span-3]
```

---

## Component Patterns

### Button System

```tsx
// components/Button.tsx
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  onClick?: () => void;
}

const variants = {
  primary: `
    bg-accent text-white
    hover:bg-accent-light
    shadow-glow-accent hover:shadow-glow-accent-strong
    border border-transparent
  `,
  secondary: `
    bg-bg-tertiary text-text-primary
    hover:bg-white/10
    border border-white/10 hover:border-white/20
  `,
  ghost: `
    bg-transparent text-text-secondary
    hover:text-text-primary hover:bg-white/5
    border border-transparent
  `,
  outline: `
    bg-transparent text-accent
    hover:bg-accent/10
    border border-accent/50 hover:border-accent
  `,
  danger: `
    bg-error text-white
    hover:bg-error-light
    shadow-glow-error
    border border-transparent
  `,
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-base gap-2',
  lg: 'px-6 py-3 text-lg gap-2.5',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  className = '',
  onClick,
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.15 }}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center justify-center
        font-medium rounded-lg
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!isLoading && icon && iconPosition === 'left' && icon}
      {children}
      {!isLoading && icon && iconPosition === 'right' && icon}
    </motion.button>
  );
}
```

### Card System

```tsx
// components/Card.tsx
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  glow?: boolean;
  className?: string;
}

export function Card({ children, hover = true, glow = false, className = '' }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`
        bg-bg-secondary rounded-xl
        border border-white/[0.06]
        p-6
        ${hover ? 'hover:border-white/10 hover:shadow-medium transition-all duration-200' : ''}
        ${glow ? 'shadow-glow-accent' : 'shadow-subtle'}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

// Feature card with icon
export function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="group">
      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
        <div className="text-accent">{icon}</div>
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary">{description}</p>
    </Card>
  );
}

// Stat card with animated number
export function StatCard({ value, label, suffix = '' }: {
  value: number;
  label: string;
  suffix?: string;
}) {
  return (
    <Card className="text-center">
      <div className="font-mono text-4xl font-bold text-text-primary mb-2">
        {value}{suffix}
      </div>
      <div className="text-text-secondary">{label}</div>
    </Card>
  );
}
```

### Input System

```tsx
// components/Input.tsx

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({ label, error, icon, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full px-4 py-2.5
            bg-bg-tertiary text-text-primary
            border border-white/10
            rounded-lg
            placeholder:text-text-muted
            focus:outline-none focus:border-accent focus:shadow-glow-accent
            transition-all duration-200
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-error focus:border-error focus:shadow-glow-error' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-error">{error}</p>
      )}
    </div>
  );
}
```

---

## Usage Examples

### Hero Section

```tsx
<section className="relative min-h-screen flex items-center py-24 overflow-hidden">
  {/* Background gradient */}
  <div
    className="absolute inset-0 bg-gradient-mesh opacity-50"
    style={{ background: 'var(--gradient-mesh)' }}
  />

  <Container className="relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-4xl"
    >
      <Typography.DisplayXL gradient>
        Build the future with AI
      </Typography.DisplayXL>

      <Typography.BodyLG className="mt-6 max-w-2xl">
        We help companies transform their business with cutting-edge
        artificial intelligence solutions.
      </Typography.BodyLG>

      <div className="mt-10 flex flex-wrap gap-4">
        <Button size="lg">Get Started</Button>
        <Button size="lg" variant="secondary">Learn More</Button>
      </div>
    </motion.div>
  </Container>
</section>
```

### Feature Grid

```tsx
<section className="py-16 md:py-20 lg:py-24">
  <Container>
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {features.map((feature) => (
        <motion.div key={feature.id} variants={staggerItem}>
          <FeatureCard {...feature} />
        </motion.div>
      ))}
    </motion.div>
  </Container>
</section>
```

---

## Accessibility Checklist

- [ ] Color contrast ratio minimum 4.5:1 for text
- [ ] Color contrast ratio minimum 3:1 for large text and UI components
- [ ] Focus states visible on all interactive elements
- [ ] Reduced motion support with `prefers-reduced-motion`
- [ ] Touch targets minimum 44x44px on mobile
- [ ] Semantic HTML structure
- [ ] ARIA labels where needed
- [ ] Keyboard navigation support

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

```tsx
// Framer Motion hook
import { useReducedMotion } from 'framer-motion';

function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
    >
      Content
    </motion.div>
  );
}
```

---

## File Structure

```
src/
  styles/
    globals.css          # CSS variables, base styles
    animations.css       # Keyframe animations

  lib/
    animations.ts        # Framer Motion configs

  components/
    ui/
      Button.tsx
      Card.tsx
      Input.tsx
      Typography.tsx
    layout/
      Container.tsx
      Grid.tsx
```

---

## Quick Reference

### Most Used Tailwind Classes

```
Backgrounds:  bg-bg-primary, bg-bg-secondary, bg-bg-tertiary
Text:         text-text-primary, text-text-secondary, text-text-muted
Accent:       bg-accent, text-accent, border-accent
Border:       border-white/[0.06], border-white/10, border-white/20
Radius:       rounded-md, rounded-lg, rounded-xl, rounded-2xl
Shadow:       shadow-subtle, shadow-medium, shadow-glow-accent
Padding:      p-4, p-6, p-8, py-16, py-20, py-24
Gap:          gap-4, gap-6, gap-8
```

### Color Codes at a Glance

```
Background Primary:   #0a0a0f
Background Secondary: #12121a
Background Tertiary:  #1a1a24
Text Primary:         #ffffff
Text Secondary:       #a1a1aa
Text Muted:           #52525b
Accent (Violet):      #8b5cf6
Accent Secondary:     #06b6d4
Success:              #22c55e
Error:                #ef4444
Warning:              #f59e0b
Info:                 #3b82f6
```
