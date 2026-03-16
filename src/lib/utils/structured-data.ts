import { siteConfig } from '@/lib/data/siteConfig';
import type { Story } from '@/lib/data/stories';

/**
 * Generate Organization structured data (JSON-LD)
 * Use this on the homepage and about page
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [
      siteConfig.social.twitter,
      siteConfig.social.linkedin,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: `${siteConfig.url}/start`,
    },
  };
}

/**
 * Generate WebSite structured data (JSON-LD)
 * Use this on the homepage
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/stories?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Article structured data (JSON-LD) for case studies
 * Use this on individual story pages
 */
export function generateArticleSchema(story: Story) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: story.title,
    description: story.hook,
    image: story.image || `${siteConfig.url}/og-story-default.png`,
    author: {
      '@type': 'Organization',
      name: siteConfig.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/stories/${story.slug}`,
    },
  };
}

/**
 * Generate BreadcrumbList structured data (JSON-LD)
 * Use this on nested pages for navigation
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQPage structured data (JSON-LD)
 * Use this if you add an FAQ section
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Service structured data (JSON-LD)
 * Use this on service/product pages
 */
export function generateServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Custom AI Agent Development',
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: 'Worldwide',
    description: siteConfig.longDescription,
    offers: {
      '@type': 'Offer',
      description: 'Custom AI agents built in 3 weeks with a satisfaction guarantee',
      url: `${siteConfig.url}/start`,
    },
  };
}

/**
 * Convert structured data to JSON-LD script string
 * Use this to inject structured data into your page head
 */
export function structuredDataToScript(data: object): string {
  return JSON.stringify(data);
}
