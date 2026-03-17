'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/lib/data/siteConfig';

// ========================
// MOBILE MENU
// ========================

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50"
          style={{ background: '#fafaf8' }}
        >
          <div className="container px-6">
            {/* Header */}
            <div className="flex justify-between items-center h-16">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-2 text-xl font-medium tracking-tight"
                style={{ fontFamily: 'var(--font-display)', color: '#1a1a18' }}
              >
                <Image src="/meadit-logo.png" alt="MeadITT logo" width={32} height={32} className="rounded-md" />
                {siteConfig.name}
              </Link>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="p-2"
                style={{ color: '#1a1a18' }}
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation */}
            <nav className="mt-10" style={{ borderTop: '1px solid #e2e0d8' }}>
              {siteConfig.navigation.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block py-5 text-3xl font-light tracking-tight"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: '#1a1a18',
                      borderBottom: '1px solid #e2e0d8',
                    }}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: siteConfig.navigation.length * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link
                  href="/book"
                  onClick={onClose}
                  className="block py-5 text-3xl font-light tracking-tight"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: '#c9a96e',
                    borderBottom: '1px solid #e2e0d8',
                  }}
                >
                  Book a Call
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (siteConfig.navigation.length + 1) * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link
                  href="/start"
                  onClick={onClose}
                  className="block py-5 text-3xl font-light tracking-tight"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: '#1a1a18',
                    borderBottom: '1px solid #e2e0d8',
                  }}
                >
                  Get Started
                </Link>
              </motion.div>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ========================
// HEADER
// ========================

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 px-4 py-2 rounded-lg text-sm"
        style={{ background: '#1a1a18', color: '#fafaf8' }}
      >
        Skip to main content
      </a>

      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          background: isScrolled
            ? 'rgba(250, 250, 248, 0.88)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(226, 224, 216, 0.6)' : '1px solid transparent',
        }}
      >
        <nav className="container">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-medium tracking-tight transition-opacity hover:opacity-70"
              style={{ fontFamily: 'var(--font-display)', color: '#1a1a18' }}
            >
              <Image src="/meadit-logo.png" alt="MeadITT logo" width={32} height={32} className="rounded-md" />
              {siteConfig.name}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-normal transition-all duration-200 relative group"
                  style={{
                    color: '#7a7a72',
                    letterSpacing: '0.01em',
                  }}
                >
                  {item.name}
                  <span
                    className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                    style={{ background: '#c9a96e' }}
                  />
                </Link>
              ))}
              <Link
                href="/book"
                className="text-sm font-normal transition-all duration-200 relative group"
                style={{
                  color: '#c9a96e',
                  letterSpacing: '0.01em',
                }}
              >
                Book a Call
                <span
                  className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ background: '#c9a96e' }}
                />
              </Link>
              <Link
                href="/start"
                className="text-sm font-medium px-5 py-2 rounded-full transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
                style={{
                  background: '#1a1a18',
                  color: '#fafaf8',
                  letterSpacing: '0.01em',
                }}
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2"
              style={{ color: '#1a1a18' }}
              aria-label="Open menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}

export default Header;
