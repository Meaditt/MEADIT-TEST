import type { Metadata } from 'next';
import { siteConfig } from '@/lib/data/siteConfig';

// ========================
// METADATA
// ========================

export const metadata: Metadata = {
  title: 'Success Stories',
  description:
    'See how custom AI agents are transforming businesses across industries. Real stories of companies saving 15+ hours per week with AI automation - from restaurants to law firms.',
  openGraph: {
    title: 'Success Stories - Real Results from AI Automation',
    description:
      'Real stories of businesses transformed by custom AI agents. See how companies are saving 15+ hours per week with AI automation.',
    type: 'website',
    url: `${siteConfig.url}/stories`,
    images: [
      {
        url: `${siteConfig.url}/og-stories.png`,
        width: 1200,
        height: 630,
        alt: 'AI Agency Success Stories',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Success Stories - Real Results from AI Automation',
    description:
      'Real stories of businesses transformed by custom AI agents. See how companies are saving 15+ hours per week with AI automation.',
    images: [`${siteConfig.url}/og-stories.png`],
  },
  keywords: [
    'AI success stories',
    'AI automation case studies',
    'custom AI agents',
    'business automation examples',
    'AI transformation',
    'productivity gains',
    'small business automation',
    'AI agent case studies',
  ],
};

// ========================
// LAYOUT COMPONENT
// ========================

export default function StoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
