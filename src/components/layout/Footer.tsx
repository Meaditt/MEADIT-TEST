'use client';

import Link from 'next/link';
import { siteConfig } from '@/lib/data/siteConfig';

const footerLinks = {
  services: [
    { name: 'AI Agents', href: '/stories' },
    { name: 'Automation', href: '/stories' },
    { name: 'Custom Development', href: '/stories' },
    { name: 'Consulting', href: '/start' },
  ],
  solutions: [
    { name: 'Sales Automation', href: '/stories' },
    { name: 'Customer Support', href: '/stories' },
    { name: 'Content Creation', href: '/stories' },
    { name: 'Data Analytics', href: '/stories' },
    { name: 'Workflow Ops', href: '/stories' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Case Studies', href: '/stories' },
    { name: 'Documentation', href: '/blog' },
    { name: 'AI Playbooks', href: '/blog' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Process', href: '/about' },
    { name: 'Pricing', href: '/start' },
    { name: 'Contact', href: '/start' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: '#f4f3ef', borderTop: '1px solid #e2e0d8' }}>
      {/* Main Footer Content */}
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <Link href="/" className="inline-block mb-5">
              <span
                className="text-2xl font-medium tracking-tight"
                style={{ fontFamily: 'var(--font-display)', color: '#1a1a18' }}
              >
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-8 max-w-xs" style={{ color: '#7a7a72' }}>
              AI automation for founders who move fast. Ship in weeks, not months.
            </p>
            <Link
              href="/start"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:opacity-90 hover:-translate-y-px whitespace-nowrap"
              style={{
                background: '#1a1a18',
                color: '#fafaf8',
                letterSpacing: '0.01em',
              }}
            >
              Start a project
            </Link>
          </div>

          {/* Services */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: '#c9a96e', letterSpacing: '0.12em' }}
            >
              Services
            </h4>
            <ul className="space-y-3.5">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:opacity-100"
                    style={{ color: '#7a7a72' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#1a1a18')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#7a7a72')}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: '#c9a96e', letterSpacing: '0.12em' }}
            >
              Solutions
            </h4>
            <ul className="space-y-3.5">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: '#7a7a72' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#1a1a18')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#7a7a72')}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: '#c9a96e', letterSpacing: '0.12em' }}
            >
              Resources
            </h4>
            <ul className="space-y-3.5">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: '#7a7a72' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#1a1a18')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#7a7a72')}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: '#c9a96e', letterSpacing: '0.12em' }}
            >
              Company
            </h4>
            <ul className="space-y-3.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: '#7a7a72' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#1a1a18')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#7a7a72')}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid #e2e0d8' }}>
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs order-2 md:order-1" style={{ color: '#7a7a72' }}>
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 order-1 md:order-2">
              <Link
                href="/privacy"
                className="text-xs transition-colors duration-200"
                style={{ color: '#7a7a72' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#1a1a18')}
                onMouseLeave={e => (e.currentTarget.style.color = '#7a7a72')}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs transition-colors duration-200"
                style={{ color: '#7a7a72' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#1a1a18')}
                onMouseLeave={e => (e.currentTarget.style.color = '#7a7a72')}
              >
                Terms of Use
              </Link>
              <Link
                href="/start"
                className="text-xs transition-colors duration-200"
                style={{ color: '#7a7a72' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#1a1a18')}
                onMouseLeave={e => (e.currentTarget.style.color = '#7a7a72')}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
