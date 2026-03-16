import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/data/siteConfig';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = siteConfig.name;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Background gradient orb */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 20,
              lineHeight: 1.2,
            }}
          >
            Get <span style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>15 Hours Back</span>
          </h1>
          <h1
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 30,
              lineHeight: 1.2,
            }}
          >
            Every Week
          </h1>
          <p
            style={{
              fontSize: 32,
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: 0,
              maxWidth: 900,
            }}
          >
            Custom AI agents that handle your repetitive work
          </p>
        </div>

        {/* Brand name at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            display: 'flex',
            alignItems: 'center',
            fontSize: 28,
            color: 'rgba(255, 255, 255, 0.6)',
          }}
        >
          {siteConfig.name}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
