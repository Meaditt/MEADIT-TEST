// ========================
// DESIGN SYSTEM TOKENS
// ========================

export const colors = {
  // Backgrounds
  bg: {
    primary: '#0a0a0f',
    secondary: '#12121a',
    tertiary: '#1a1a24',
  },

  // Text
  text: {
    primary: '#ffffff',
    secondary: '#a1a1aa',
    muted: '#52525b',
  },

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

  // Borders
  border: {
    subtle: 'rgba(255, 255, 255, 0.06)',
    default: 'rgba(255, 255, 255, 0.1)',
    strong: 'rgba(255, 255, 255, 0.2)',
    accent: 'rgba(139, 92, 246, 0.5)',
  },
} as const;

export const gradients = {
  hero: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #8b5cf6 100%)',
  subtle: 'linear-gradient(180deg, rgba(139, 92, 246, 0.05) 0%, transparent 50%)',
  text: 'linear-gradient(90deg, #8b5cf6 0%, #06b6d4 100%)',
  mesh: `radial-gradient(at 40% 20%, rgba(139, 92, 246, 0.15) 0px, transparent 50%),
         radial-gradient(at 80% 0%, rgba(6, 182, 212, 0.1) 0px, transparent 50%),
         radial-gradient(at 0% 50%, rgba(139, 92, 246, 0.1) 0px, transparent 50%)`,
} as const;

export const shadows = {
  subtle: '0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.15)',
  medium: '0 4px 6px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)',
  strong: '0 10px 25px rgba(0, 0, 0, 0.5), 0 6px 10px rgba(0, 0, 0, 0.3)',
  xl: '0 20px 40px rgba(0, 0, 0, 0.5), 0 10px 20px rgba(0, 0, 0, 0.3)',
  glow: {
    accent: '0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)',
    accentStrong: '0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)',
    success: '0 0 20px rgba(34, 197, 94, 0.3), 0 0 40px rgba(34, 197, 94, 0.2)',
    error: '0 0 20px rgba(239, 68, 68, 0.3), 0 0 40px rgba(239, 68, 68, 0.2)',
    cyan: '0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(6, 182, 212, 0.2)',
  },
} as const;

export const typography = {
  fontFamily: {
    display: "'Inter', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  fontSize: {
    // Display sizes
    'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
    'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
    'display-md': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
    'display-sm': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
    // Body sizes
    'body-lg': ['1.25rem', { lineHeight: '1.7', fontWeight: '400' }],
    'body-md': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
    'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
  },
} as const;

export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
} as const;

export const borderRadius = {
  none: '0',
  sm: '0.25rem',    // 4px
  md: '0.5rem',     // 8px
  lg: '0.75rem',    // 12px
  xl: '1rem',       // 16px
  '2xl': '1.5rem',  // 24px
  full: '9999px',
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const animation = {
  easing: {
    out: 'cubic-bezier(0.16, 1, 0.3, 1)',
    outExpo: 'cubic-bezier(0.19, 1, 0.22, 1)',
    inOut: 'cubic-bezier(0.45, 0, 0.55, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  duration: {
    instant: '50ms',
    fast: '150ms',
    normal: '200ms',
    moderate: '300ms',
    slow: '500ms',
    slower: '700ms',
  },
} as const;

export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  modal: 300,
  popover: 400,
  toast: 500,
  tooltip: 600,
} as const;

// ========================
// COMPONENT SIZES
// ========================

export const buttonSizes = {
  sm: {
    px: '0.75rem',
    py: '0.375rem',
    fontSize: '0.875rem',
    gap: '0.375rem',
  },
  md: {
    px: '1rem',
    py: '0.5rem',
    fontSize: '1rem',
    gap: '0.5rem',
  },
  lg: {
    px: '1.5rem',
    py: '0.75rem',
    fontSize: '1.125rem',
    gap: '0.625rem',
  },
} as const;

export const inputSizes = {
  sm: {
    px: '0.75rem',
    py: '0.375rem',
    fontSize: '0.875rem',
  },
  md: {
    px: '1rem',
    py: '0.625rem',
    fontSize: '1rem',
  },
  lg: {
    px: '1.25rem',
    py: '0.875rem',
    fontSize: '1.125rem',
  },
} as const;

// ========================
// TYPE EXPORTS
// ========================

export type ColorToken = typeof colors;
export type SpacingToken = keyof typeof spacing;
export type BreakpointToken = keyof typeof breakpoints;
export type ButtonSize = keyof typeof buttonSizes;
export type InputSize = keyof typeof inputSizes;
