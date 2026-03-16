# Quick Start Guide

## Getting Started

### 1. Navigate to the Project
```bash
cd /Users/galbaumel/agency-website
```

### 2. Start Development Server
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### 3. View the Website
Open your browser and visit:
- **Homepage**: http://localhost:3000
- **Stories**: http://localhost:3000/stories
- **About**: http://localhost:3000/about
- **Get Started**: http://localhost:3000/start

## Project Commands

```bash
# Development
npm run dev          # Start dev server (with hot reload)

# Production
npm run build        # Create production build
npm start            # Run production server

# Code Quality
npm run lint         # Run ESLint

# Type Checking
npx tsc --noEmit     # Check TypeScript types
```

## Making Changes

### Adding a New Page
1. Create a new folder in `src/app/` (e.g., `src/app/pricing/`)
2. Add `page.tsx` file:
```tsx
export default function PricingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold">Pricing</h1>
    </div>
  );
}
```
3. Next.js automatically creates the route at `/pricing`

### Adding a New Component
1. Create file in `src/components/` (e.g., `src/components/ui/Badge.tsx`)
2. Export your component:
```tsx
import { cn } from "@/lib/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span className={cn("inline-flex px-2 py-1 rounded text-sm", {
      "bg-gray-100 text-gray-800": variant === "default",
      "bg-green-100 text-green-800": variant === "success",
      "bg-yellow-100 text-yellow-800": variant === "warning",
    })}>
      {children}
    </span>
  );
}
```
3. Import and use: `import { Badge } from "@/components/ui/Badge"`

### Updating Site Configuration
Edit `src/lib/data/siteConfig.ts`:
```typescript
export const siteConfig = {
  name: "Your Agency Name",
  description: "Your tagline",
  navigation: [
    { name: "Stories", href: "/stories" },
    { name: "Pricing", href: "/pricing" }, // Add new nav items
  ],
  // ... more config
};
```

## Folder Structure Quick Reference

```
src/
├── app/              # Pages and routes
├── components/       # React components
│   ├── ui/          # Reusable UI components
│   ├── layout/      # Layout components
│   ├── home/        # Home page specific
│   └── stories/     # Stories page specific
├── lib/             # Utilities and logic
│   ├── store/       # Zustand state management
│   ├── data/        # Static data
│   ├── utils/       # Helper functions
│   └── design-system/ # Tokens and animations
└── content/         # Content and copy
```

## Common Tasks

### 1. Add Framer Motion Animation
```tsx
"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/design-system/animations";

export function AnimatedCard() {
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="p-4 bg-white rounded-lg"
    >
      Content here
    </motion.div>
  );
}
```

### 2. Use Zustand Store
```tsx
"use client";

import { useUIStore } from "@/lib/store/uiStore";

export function MobileMenu() {
  const { isMobileMenuOpen, toggleMobileMenu } = useUIStore();

  return (
    <button onClick={toggleMobileMenu}>
      {isMobileMenuOpen ? "Close" : "Open"} Menu
    </button>
  );
}
```

### 3. Add Tailwind Classes
```tsx
// Use utility classes
<div className="bg-orange-500 text-white p-4 rounded-lg hover:bg-orange-600 transition-colors">

// Or combine with cn utility
import { cn } from "@/lib/utils/cn";

<div className={cn(
  "p-4 rounded-lg",
  isActive && "bg-orange-500 text-white"
)}>
```

## Environment Variables

Create `.env.local` for local environment variables:
```env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Access in code:
```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

## Tips

1. **Use `"use client"`** for components with interactivity (useState, onClick, etc.)
2. **Server Components by default** - better performance
3. **Import aliases** - Use `@/` instead of relative paths
4. **Tailwind first** - Avoid custom CSS when possible
5. **Type everything** - TypeScript strict mode is enabled

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Clear Next.js Cache
```bash
rm -rf .next
npm run dev
```

### TypeScript Errors
```bash
# Check all types
npx tsc --noEmit

# Restart TypeScript server in VS Code
# Cmd+Shift+P > "TypeScript: Restart TS Server"
```

## Next Steps

1. Customize the homepage hero section
2. Add real content to the stories page
3. Build out the contact form
4. Add more UI components as needed
5. Implement mobile navigation
6. Add SEO metadata to pages

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://github.com/pmndrs/zustand)

Happy coding!
