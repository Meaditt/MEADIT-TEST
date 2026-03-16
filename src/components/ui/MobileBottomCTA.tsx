'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function MobileBottomCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
      }}
    >
      {/* Safe area padding for iOS */}
      <div
        style={{
          background: 'rgba(250, 250, 248, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(226, 224, 216, 0.6)',
          padding: '12px 20px',
          paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
        }}
      >
        <Link
          href="/start"
          className="flex items-center justify-center w-full rounded-full font-medium text-base"
          style={{
            background: '#1a1a18',
            color: '#fafaf8',
            height: 52,
            letterSpacing: '0.01em',
          }}
        >
          Start your project
        </Link>
      </div>
    </div>
  );
}
