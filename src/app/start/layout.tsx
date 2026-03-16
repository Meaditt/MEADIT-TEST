import type { Metadata } from 'next';
import { siteConfig } from '@/lib/data/siteConfig';

// ========================
// METADATA
// ========================

export const metadata: Metadata = {
  title: 'Get Started',
  description:
    'Ready to get 15 hours back every week? Tell us about your workflow challenges and discover how custom AI agents can transform your business. No sales pitch, just solutions.',
  openGraph: {
    title: 'Get Started - Transform Your Business with AI',
    description:
      'Ready to get 15 hours back every week? Tell us about your workflow challenges and discover how custom AI agents can transform your business.',
    type: 'website',
    url: `${siteConfig.url}/start`,
    images: [
      {
        url: `${siteConfig.url}/og-start.png`,
        width: 1200,
        height: 630,
        alt: 'Get Started with AI Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Started - Transform Your Business with AI',
    description:
      'Ready to get 15 hours back every week? Tell us about your workflow challenges and discover how custom AI agents can transform your business.',
    images: [`${siteConfig.url}/og-start.png`],
  },
  keywords: [
    'get started with AI',
    'AI consultation',
    'business automation consultation',
    'custom AI agents',
    'workflow automation',
    'contact AI agency',
  ],
  alternates: {
    canonical: `${siteConfig.url}/start`,
  },
};

// ========================
// LAYOUT COMPONENT
// ========================

export default function StartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
