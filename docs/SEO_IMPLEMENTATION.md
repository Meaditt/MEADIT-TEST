# SEO Implementation Guide

## Overview

This document describes the comprehensive SEO metadata implementation for the AI Agency website. The implementation follows Next.js 14+ best practices and includes metadata for all pages, dynamic sitemap generation, structured data (JSON-LD), and social media optimization.

## Key Features Implemented

### 1. Root Layout Metadata (`/src/app/layout.tsx`)

The root layout provides default metadata for the entire site:

- **Title Template**: Automatic suffix for all pages (`Page Name | AI Agency`)
- **Description**: Clear, compelling site description
- **Keywords**: Industry-relevant keywords for SEO
- **OpenGraph**: Facebook/LinkedIn sharing optimization
- **Twitter Cards**: Twitter sharing optimization with large image cards
- **Robots**: Search engine crawling directives
- **Icons**: Favicon and app icons configuration

```typescript
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  // ... comprehensive metadata
};
```

### 2. Page-Specific Metadata

Each page has custom metadata optimized for its content:

#### Home Page (`/`)
- Metadata handled by root layout
- Primary focus: "Get 15 Hours Back Every Week"
- Keywords: AI automation, business automation, time-saving

#### About Page (`/about`)
- Title: "About Us"
- Focus: Founder story and credentials
- OpenGraph image: `/og-about.png`

#### Stories Hub (`/stories`)
- Title: "Success Stories"
- Focus: Real results from AI automation
- Keywords: Case studies, success stories, AI transformation
- OpenGraph image: `/og-stories.png`

#### Individual Stories (`/stories/[slug]`)
- **Dynamic metadata** based on story content
- Title: Story title (e.g., "From 8 Hours to 30 Minutes")
- Description: Story hook for engagement
- Keywords: Derived from category and pain types
- **Article OpenGraph type** with proper metadata
- Canonical URL for each story

#### Start/Contact Page (`/start`)
- Title: "Get Started"
- Focus: Contact and conversion
- OpenGraph image: `/og-start.png`

### 3. Dynamic Sitemap (`/src/app/sitemap.ts`)

Automatically generates XML sitemap including:

- **Static pages**: Home, About, Stories hub, Start
- **Dynamic pages**: All story detail pages
- **Proper priorities**:
  - Homepage: 1.0
  - Stories hub: 0.9
  - Start page: 0.9
  - About: 0.8
  - Individual stories: 0.7
- **Change frequencies**: Weekly for main pages, monthly for stories

Access at: `https://example.com/sitemap.xml`

### 4. Robots.txt (`/public/robots.txt`)

Configures search engine crawling:

```txt
User-agent: *
Allow: /
Sitemap: https://example.com/sitemap.xml
```

### 5. OpenGraph Image Generation (`/src/app/opengraph-image.tsx`)

Dynamic OG image generation using Next.js Image Response API:

- **Size**: 1200x630px (Facebook/LinkedIn/Twitter recommended)
- **Design**: Electric violet gradient with key messaging
- **Text**: "Get 15 Hours Back Every Week"
- **Runtime**: Edge for fast generation

The image is automatically generated at `/opengraph-image` and used as the default OG image.

### 6. Structured Data (JSON-LD)

Helper functions in `/src/lib/utils/structured-data.ts` for:

#### Organization Schema
```typescript
generateOrganizationSchema()
```
Use on: Homepage, About page

#### Website Schema
```typescript
generateWebsiteSchema()
```
Use on: Homepage

#### Article Schema
```typescript
generateArticleSchema(story)
```
Use on: Individual story pages (already implemented)

#### Breadcrumb Schema
```typescript
generateBreadcrumbSchema(items)
```
Use on: All nested pages (already implemented for stories)

#### Service Schema
```typescript
generateServiceSchema()
```
Use on: Service/product pages

#### FAQ Schema
```typescript
generateFAQSchema(faqs)
```
Use on: FAQ sections (when added)

### 7. Site Configuration (`/src/lib/data/siteConfig.ts`)

Centralized configuration for all SEO metadata:

```typescript
export const siteConfig = {
  name: "AI Agency",
  tagline: "Get 15 Hours Back Every Week",
  description: "Custom AI agents that give you your time back...",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  ogImage: "/opengraph-image",
  keywords: [...],
  social: {
    twitter: "#",
    twitterHandle: "@aiagency",
    linkedin: "#",
  },
  author: {...},
};
```

## Environment Variables

Set these in your `.env.local` file:

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

This ensures all canonical URLs and OG images use the correct production domain.

## Best Practices Implemented

### 1. Title Optimization
- ✅ Descriptive and concise (under 60 characters)
- ✅ Includes primary keywords
- ✅ Consistent brand suffix
- ✅ Unique for each page

### 2. Description Optimization
- ✅ Compelling and action-oriented (150-160 characters)
- ✅ Includes primary keywords naturally
- ✅ Unique for each page
- ✅ Encourages click-through

### 3. OpenGraph Tags
- ✅ Title, description, images for all pages
- ✅ Proper image dimensions (1200x630)
- ✅ Appropriate type (website vs. article)
- ✅ Locale and site name specified

### 4. Twitter Cards
- ✅ Large image cards for better engagement
- ✅ Consistent with OpenGraph
- ✅ Creator/author attribution

### 5. Canonical URLs
- ✅ Set for all pages to avoid duplicate content
- ✅ Properly formatted absolute URLs

### 6. Structured Data
- ✅ JSON-LD format (Google preferred)
- ✅ Organization and WebSite schemas
- ✅ Article schema for case studies
- ✅ Breadcrumbs for navigation

### 7. Mobile Optimization
- ✅ Responsive meta tags
- ✅ Viewport configuration in root layout
- ✅ Mobile-friendly images

## Testing Your SEO Implementation

### 1. Google Rich Results Test
Test structured data:
```
https://search.google.com/test/rich-results
```

### 2. Facebook Sharing Debugger
Test OpenGraph tags:
```
https://developers.facebook.com/tools/debug/
```

### 3. Twitter Card Validator
Test Twitter cards:
```
https://cards-dev.twitter.com/validator
```

### 4. Lighthouse SEO Audit
Run in Chrome DevTools:
- Target score: 90-100
- Check mobile and desktop

### 5. Manual Checks

#### Sitemap
```bash
curl https://yourdomain.com/sitemap.xml
```

#### Robots.txt
```bash
curl https://yourdomain.com/robots.txt
```

#### Meta Tags
View page source and verify:
- Title tag
- Meta description
- OpenGraph tags
- Twitter card tags
- Canonical URL
- Structured data scripts

## Future Enhancements

### 1. Blog/News Section
Add blog with:
- Article metadata
- Publication dates
- Author attribution
- Tags/categories

### 2. Local SEO
If targeting specific locations:
- LocalBusiness schema
- Location pages
- Google My Business integration

### 3. Video SEO
If adding video content:
- VideoObject schema
- Video thumbnails
- Transcripts

### 4. FAQ Schema
Add FAQ section with:
- FAQPage schema
- Structured Q&A format

### 5. Performance Monitoring
- Google Search Console setup
- Core Web Vitals monitoring
- Search analytics tracking

### 6. International SEO
If expanding globally:
- hreflang tags
- Multi-language support
- Regional targeting

## Maintenance Checklist

### Monthly
- [ ] Review Google Search Console for issues
- [ ] Check for broken links
- [ ] Update sitemap if adding new pages
- [ ] Review meta descriptions for top pages

### Quarterly
- [ ] Run Lighthouse audit
- [ ] Check OpenGraph images render correctly
- [ ] Review and update keywords
- [ ] Analyze top-performing pages

### Annually
- [ ] Complete SEO audit
- [ ] Review all metadata for relevance
- [ ] Update structured data schemas
- [ ] Check competitor SEO strategies

## Common Issues & Solutions

### Issue: Sitemap not updating
**Solution**: Rebuild the site (`npm run build`) to regenerate static sitemap

### Issue: OpenGraph image not showing
**Solution**:
1. Check image is accessible at the URL
2. Clear Facebook cache using Sharing Debugger
3. Verify image is 1200x630px

### Issue: Wrong title showing in search results
**Solution**:
1. Check title length (keep under 60 characters)
2. Wait for Google to re-crawl (can take days/weeks)
3. Request re-indexing in Search Console

### Issue: Duplicate content warnings
**Solution**:
1. Verify canonical URLs are set correctly
2. Check for URL parameter issues
3. Use robots meta tags if needed

## Contact & Support

For questions about this SEO implementation:
- Review Next.js Metadata documentation: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- Check Google Search Central: https://developers.google.com/search
- Review this documentation regularly for updates

---

**Last Updated**: February 2026
**Next.js Version**: 16.1.6
**Implementation Status**: Complete ✅
