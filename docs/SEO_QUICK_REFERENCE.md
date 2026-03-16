# SEO Quick Reference Guide

Quick templates for adding SEO metadata to new pages.

## Static Page Metadata Template

For regular pages (e.g., `/pricing`, `/services`):

```typescript
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/data/siteConfig';

export const metadata: Metadata = {
  title: 'Your Page Title',
  description: 'Compelling 150-160 character description that includes primary keywords and encourages clicks.',
  keywords: [
    'primary keyword',
    'secondary keyword',
    'related term',
  ],
  openGraph: {
    title: 'Your Page Title - Additional Context',
    description: 'Description for social sharing',
    type: 'website',
    url: `${siteConfig.url}/your-page-slug`,
    images: [
      {
        url: `${siteConfig.url}/og-your-page.png`,
        width: 1200,
        height: 630,
        alt: 'Descriptive alt text',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Page Title - Additional Context',
    description: 'Description for social sharing',
    images: [`${siteConfig.url}/og-your-page.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/your-page-slug`,
  },
};

export default function YourPage() {
  return (
    // Your page content
  );
}
```

## Dynamic Page Metadata Template

For pages with dynamic routes (e.g., `/blog/[slug]`):

```typescript
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/lib/data/siteConfig';
import { getItemBySlug, getAllItems } from '@/lib/data/items';

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Generate static params for SSG
export async function generateStaticParams() {
  const items = getAllItems();
  return items.map((item) => ({
    slug: item.slug,
  }));
}

// Generate metadata dynamically
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const item = getItemBySlug(resolvedParams.slug);

  if (!item) {
    return {
      title: 'Not Found',
      description: 'The requested page could not be found.',
    };
  }

  const itemUrl = `${siteConfig.url}/items/${item.slug}`;

  return {
    title: item.title,
    description: item.description,
    keywords: item.tags || [],
    openGraph: {
      title: item.title,
      description: item.description,
      type: 'article',
      url: itemUrl,
      siteName: siteConfig.name,
      publishedTime: item.publishedDate,
      authors: [item.author],
      tags: item.tags,
      images: [
        {
          url: item.image || `${siteConfig.url}/og-default.png`,
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: item.title,
      description: item.description,
      images: [item.image || `${siteConfig.url}/og-default.png`],
    },
    alternates: {
      canonical: itemUrl,
    },
  };
}

export default async function ItemPage({ params }: PageProps) {
  const resolvedParams = await params;
  const item = getItemBySlug(resolvedParams.slug);

  if (!item) {
    notFound();
  }

  return (
    // Your page content
  );
}
```

## Client Component with Layout Metadata

For client components that need metadata:

**Create `/app/your-page/layout.tsx`:**

```typescript
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/data/siteConfig';

export const metadata: Metadata = {
  title: 'Your Page Title',
  description: 'Your description',
  // ... rest of metadata
};

export default function YourPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

**Then `/app/your-page/page.tsx`:**

```typescript
'use client';

export default function YourPage() {
  // Client component code with hooks, state, etc.
  return (
    // Your page content
  );
}
```

## Adding Structured Data

### Article Schema (Blog Posts, Case Studies)

```typescript
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from '@/lib/utils/structured-data';

export default function ArticlePage({ article }) {
  const articleSchema = generateArticleSchema(article);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteConfig.url },
    { name: 'Blog', url: `${siteConfig.url}/blog` },
    { name: article.title, url: `${siteConfig.url}/blog/${article.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Your page content */}
    </>
  );
}
```

### FAQ Schema

```typescript
import { generateFAQSchema } from '@/lib/utils/structured-data';

export default function FAQPage() {
  const faqSchema = generateFAQSchema([
    {
      question: 'How long does implementation take?',
      answer: 'Custom AI agents are typically deployed within 3 weeks.',
    },
    {
      question: 'What if it doesn\'t work?',
      answer: 'If we don\'t save you 15+ hours per week, you don\'t pay. It\'s guaranteed.',
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Your FAQ content */}
    </>
  );
}
```

## Updating Sitemap

When adding new static pages, update `/src/app/sitemap.ts`:

```typescript
const staticPages = [
  {
    url: baseUrl,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  },
  // Add your new page:
  {
    url: `${baseUrl}/new-page`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7, // Adjust priority 0.0-1.0
  },
  // ... other pages
];
```

For dynamic pages, add to the function that generates them:

```typescript
// Example for blog posts
const posts = getAllPosts();
const postPages = posts.map((post) => ({
  url: `${baseUrl}/blog/${post.slug}`,
  lastModified: post.updatedAt || currentDate,
  changeFrequency: 'monthly' as const,
  priority: 0.6,
}));

return [...staticPages, ...postPages];
```

## SEO Checklist for New Pages

Before deploying a new page:

- [ ] Title is unique and under 60 characters
- [ ] Description is compelling and 150-160 characters
- [ ] Keywords are relevant and not stuffed
- [ ] OpenGraph title, description, and image are set
- [ ] Twitter card metadata matches OpenGraph
- [ ] Canonical URL is set correctly
- [ ] Page is added to sitemap.ts
- [ ] Structured data is included (if applicable)
- [ ] Images have proper alt text
- [ ] Links have descriptive text
- [ ] Heading hierarchy is proper (H1 → H2 → H3)
- [ ] Mobile responsive
- [ ] Page loads fast (Lighthouse score 90+)

## Testing New Pages

1. **Build locally**: `npm run build`
2. **Test metadata**: View page source, check meta tags
3. **Test OG preview**: Use Facebook Sharing Debugger
4. **Test structured data**: Use Google Rich Results Test
5. **Test sitemap**: Check `http://localhost:3000/sitemap.xml`
6. **Run Lighthouse**: Check SEO score in Chrome DevTools

## Common Mistakes to Avoid

❌ **Don't**: Use the same title/description across pages
✅ **Do**: Make each page unique and descriptive

❌ **Don't**: Stuff keywords unnaturally
✅ **Do**: Use keywords naturally in content

❌ **Don't**: Use relative URLs in metadata
✅ **Do**: Always use absolute URLs (with domain)

❌ **Don't**: Skip OpenGraph images
✅ **Do**: Always provide OG images (1200x630px)

❌ **Don't**: Forget to update sitemap
✅ **Do**: Add new pages to sitemap.ts

❌ **Don't**: Use generic descriptions
✅ **Do**: Write compelling, specific descriptions

## Quick Commands

```bash
# Build and test locally
npm run build && npm start

# Check build output for SEO issues
npm run build 2>&1 | grep -i "error\|warning"

# Test sitemap
curl http://localhost:3000/sitemap.xml

# Test robots.txt
curl http://localhost:3000/robots.txt
```

---

**Pro Tip**: Keep this reference handy when creating new pages. Good SEO starts with proper metadata from day one!
